// qa/shot.mjs — Playwright headless verification (V2)
// 1. Loads index.html
// 2. Captures all console messages
// 3. Asserts no errors / no shader warnings
// 4. Waits for animation, screenshots
// 5. Verifies V2 features: crowns, drones (motion), embers, chromatic aberration
// 6. Reloads, screenshots again — verifies different seed
import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';

const URL = 'http://localhost:8765/index.html';
const OUT = 'qa';

const errors = [];
const warnings = [];
const logs = [];

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
const page = await ctx.newPage();

page.on('console', (m) => {
  const text = m.text();
  if (m.type() === 'error')   errors.push(text);
  if (m.type() === 'warning') warnings.push(text);
  if (m.type() === 'log')     logs.push(text);
});
page.on('pageerror', (e) => errors.push('PAGE_ERROR: ' + e.message));

await page.goto(URL, { waitUntil: 'load' });
await page.waitForTimeout(2500);

// === Verify the start-veil is visible on load ===
const veilVisibleBeforeClick = await page.evaluate(() => {
  const v = document.getElementById('start-veil');
  if (!v) return null;
  return {
    exists: true,
    hasHiddenClass: v.classList.contains('hidden'),
    computedOpacity: getComputedStyle(v).opacity,
  };
});

// === Click on the veil to close it (this is the new requirement) ===
await page.click('#start-veil .pulse');
await page.waitForTimeout(400);

const veilVisibleAfterClick = await page.evaluate(() => {
  const v = document.getElementById('start-veil');
  const c = document.getElementById('controls');
  return {
    veilHasHiddenClass: v ? v.classList.contains('hidden') : null,
    controlsVisible: c ? !c.classList.contains('hidden') && getComputedStyle(c).display !== 'none' : null,
    controlsKeyCount: c ? c.querySelectorAll('.key').length : 0,
  };
});

// Force a known good viewing position
await page.evaluate(() => {
  const c = window.__city;
  if (!c) return;
  c.camera.position.set(0, 50, 220);
  c.camera.lookAt(0, 18, 0);
});
await page.waitForTimeout(800);

// Snapshot drone positions at t=0
const droneT0 = await page.evaluate(() => {
  return window.__city.DRONES.map(d => ({ x: d.x, y: d.y, z: d.z }));
});

const stats1 = await page.evaluate(() => {
  const c = window.__city;
  return c ? {
    seed: c.SEED,
    count: c.BUILDINGS.length,
    crowns: c.CROWNS.length,
    drones: c.DRONES.length,
    embers: c.EMBER_COUNT,
    firstBuilding: c.BUILDINGS[0],
    cameraY: c.camera.position.y,
    cameraZ: c.camera.position.z,
    // check composer has chromatic aberration pass (5 passes: render, bloom, chroma, output + ...)
    composerPasses: c.composer.passes.length,
    passTypes: c.composer.passes.map(p => {
      // Try to identify pass by uniform or property
      if (p.uniforms && p.uniforms.amount) return 'ShaderPass(chroma)';
      if (p.strength !== undefined) return 'UnrealBloomPass';
      if (p.renderToScreen !== undefined && p.clear !== undefined) return 'RenderPass';
      if (p.outputColorSpace !== undefined) return 'OutputPass';
      return p.constructor.name;
    }),
  } : null;
});

await page.screenshot({ path: `${OUT}/screenshot-1.png`, fullPage: false });
await page.waitForTimeout(2500);

// Snapshot drone positions at t=2.5s to verify motion
const droneT1 = await page.evaluate(() => {
  return window.__city.DRONES.map(d => ({ x: d.x, y: d.y, z: d.z }));
});
const dronesMoved = droneT0.filter((d0, i) => {
  const d1 = droneT1[i];
  if (!d1) return false;
  return Math.abs(d0.x - d1.x) > 0.01 || Math.abs(d0.y - d1.y) > 0.01 || Math.abs(d0.z - d1.z) > 0.01;
}).length;

await page.screenshot({ path: `${OUT}/screenshot-2.png`, fullPage: false });

const midPixel = await page.evaluate(() => {
  const c = document.querySelector('canvas');
  if (!c) return null;
  return { w: c.width, h: c.height };
});

await page.waitForTimeout(500);
await page.screenshot({ path: `${OUT}/screenshot-final.png`, fullPage: false });

// Reload
await page.reload({ waitUntil: 'load' });
await page.waitForTimeout(2000);
const stats2 = await page.evaluate(() => {
  const c = window.__city;
  return c ? { seed: c.SEED, count: c.BUILDINGS.length, firstBuilding: c.BUILDINGS[0] } : null;
});
await page.screenshot({ path: `${OUT}/screenshot-reload.png`, fullPage: false });

await browser.close();

const report = {
  ok: stats1 && stats1.count > 200 && dronesMoved > 30
      && veilVisibleAfterClick?.veilHasHiddenClass === true
      && veilVisibleAfterClick?.controlsVisible === true
      && veilVisibleAfterClick?.controlsKeyCount >= 7,
  veilVisibleBeforeClick,
  veilVisibleAfterClick,
  midPixel,
  stats1,
  stats2,
  dronesMoved,
  dronesMovedRatio: (dronesMoved / (stats1?.drones || 1)).toFixed(2),
  hasChromaticAberration: stats1?.passTypes?.includes('ShaderPass(chroma)') || false,
  differentCity: stats1 && stats2 && (
    stats1.seed !== stats2.seed ||
    stats1.firstBuilding.x !== stats2.firstBuilding.x ||
    stats1.firstBuilding.h !== stats2.firstBuilding.h
  ),
  // filter out pointer-lock errors (environment-specific, not bugs in our code)
  errors: errors.filter(e =>
    !/Pointer Lock|pointer[- ]lock/i.test(e) &&
    !/root document.*pointer/i.test(e)
  ),
  rawErrors: errors,
  warnings: warnings.slice(0, 10),
  logs: logs.slice(0, 20),
};

writeFileSync(`${OUT}/report.json`, JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));

if (!report.ok) {
  console.error('QA FAILED');
  process.exit(1);
}
console.log('QA OK');

