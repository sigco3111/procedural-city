# 🏙️ Procedural City — Cyberpunk Flight (V2)

> Three.js 기반 무한 사이버펑크 도시 위 1인칭 비행 — 매번 다른 seed로 다른 도시가 생성됩니다

[`ICBM` 코딩 미션](https://cokac.com/list/announcement/24)으로 만든 인터랙티브 시각화 데모입니다.
약 **850개 건물 + 280개 옥상 크라운 + 60개 비행 드론 + 500개 부유 입자**가 InstancedMesh 한 draw call로 묶여 GPU에서 직접 셰이딩되며, **PointerLockControls** 1인칭 시점으로 끝없이 도시를 비행합니다. UnrealBloom + 인라인 크로마틱 어버레이션 후처리로 네온 야경의 디스토션을 살렸습니다.

[🇰🇷 한국어 (기본)](#) · [🇺🇸 English](./README.en.md)

---

## 🎬 라이브 데모 (Live Demo)

> **👉 [https://procedural-city.vercel.app/](https://procedural-city.vercel.app/)** — 클릭 후 마우스 잠금, 자유 비행 (60fps 권장)

| | |
|---|---|
| ![Live](https://img.shields.io/badge/Live-Demo-7C3AED?style=for-the-badge&logo=vercel&logoColor=white) | [![Repo](https://img.shields.io/badge/GitHub-sigco3111%2Fprocedural--city-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/sigco3111/procedural-city) |
| ![Status](https://img.shields.io/badge/Status-Live-22C55E?style=flat-square) | ![Stack](https://img.shields.io/badge/Stack-Three.js_WebGL-000000?style=flat-square&logo=three.js&logoColor=white) |
| ![License](https://img.shields.io/badge/License-MIT-F1C40F?style=flat-square) | ![Deps](https://img.shields.io/badge/Dependencies-0-9CA3AF?style=flat-square) |

### 🎮 빠른 사용법
1. 위 데모 링크 클릭 → 브라우저에서 페이지 열기
2. **"CLICK TO ENGAGE FLIGHT"** 클릭 → 마우스 잠금 (PointerLock)
3. **W/A/S/D** — 전진 / 좌 / 후진 / 우
4. **Space / Shift** — 상승 / 하강
5. **마우스** — 자유 시점 회전
6. **H** — 컨트롤 패널 표시 / 숨김
7. **ESC** — 마우스 잠금 해제

> 도시 배치는 매 새로고침마다 다른 seed로 생성됩니다.

---

## 🤖 생성 정보 (Attribution)

이 프로젝트의 코드는 아래 모델과 프롬프트를 이용해 **자동으로 생성**되었습니다.

| 항목 | 값 |
|---|---|
| **모델** | MiniMax-M3 |
| **실행 환경** | OpenCode CLI |
| **저장소** | [`sigco3111/procedural-city`](https://github.com/sigco3111/procedural-city) |
| **라이선스** | MIT |
| **의존성** | 없음 (Three.js r0.165 CDN via importmap, 단일 HTML) |

### 📝 사용된 프롬프트 (원문)

```
Three.js 라이브러리를 CDN으로 불러와서 끝없이 펼쳐진 밤의 도시 위를 비행하는 1인칭 시점을 구현하되,
매번 실행할 때마다 건물의 높이와 배치가 달라지는 절차적 생성(Procedural Generation) 알고리즘을 적용하고
건물 창문의 불빛과 도로 위를 달리는 차량들의 불빛이 흐릿하게 지나가는 사이버펑크 스타일의 야경을 코딩해줘.

Implementation Advice: Use Three.js. Leverage InstancedMesh for rendering thousands of buildings efficiently.
Use FogExp2 for the depth/atmosphere and GLSL shaders for the moving lights on roads.
모든 의존관계의 코드를 하나의 HTML에 담는 형태로 코드 작성.
```

### 📝 후속 프롬프트 (V2 고도화)

```
V1 → V2: 도시 밀도 2배, 옥상 크라운(안테나/탱크), 비행 드론, 대기 중 부유 입자(embers),
셰이더 안에서 동작하는 애니메이션 네온 빌보드, 크로마틱 어버레이션 후처리, 개선된 HUD까지 한 파일에 모두 인라인.
```

---

## ✨ 주요 특징 (Features)

- 🌃 **~850 건물 × 11×11 블록** — InstancedMesh 한 draw call로 묶음
- 🏗️ **280개 옥상 크라운** — 안테나/탱크 무작위 배치, 수직 그라데이션 셰이딩
- 🛸 **60개 비행 드론** — 옥타헤드론 + setColorAt, 공중 자유 비행
- ✨ **500개 부유 입자** — cyan/magenta/mint/amber, z축 드리프트
- 🌈 **애니메이션 네온 빌보드 셀** — 셰이더 안에서 1% 확률로 깜빡이는 가짜 광고판
- 💫 **크로마틱 어버레이션** — 인라인 GLSL로 RGB 채널 분리, 사이버펑크 디스토션
- 🌫️ **FogExp2 + UnrealBloom** — 거리 감쇠와 네온 후광
- 🎮 **PointerLockControls** — 1인칭 자유 비행 + WASD/Space/Shift
- ♻️ **Chunk 재활용** — 카메라 뒤로 가면 CITY_SPAN 만큼 앞으로 재배치 → 무한 도시
- 📦 **단일 HTML** — 모든 JS/GLSL/CSS/importmap inline (~32KB)
- 🔒 **온디바이스** — 모든 렌더링·물리가 브라우저 GPU에서 처리

---

## 🚀 실행 방법 (Quick Start)

### 방법 1: 라이브 데모 (가장 간단)
위 [Live Demo 링크](https://procedural-city.vercel.app/) 클릭만 하면 됩니다.

### 방법 2: 로컬 서버 (권장)
```bash
cd procedural-city
python3 -m http.server 8765
# → http://localhost:8765/index.html
```

### 방법 3: 그냥 브라우저로 열기
```bash
open index.html        # macOS
xdg-open index.html    # Linux
start index.html       # Windows
```
> ⚠️ `file://` 직접 열어도 동작하지만, 일부 브라우저는 importmap CDN 로드를 위해 `http://` 권장.

---

## 🎮 조작법 (Controls)

| 입력 | 효과 |
|---|---|
| **클릭** | 마우스 잠금 + 비행 시작 |
| **마우스 이동** | 시점 자유 회전 (잠금 후) |
| **W** | 전진 (자동 전진 30 u/s에 더해짐) |
| **A / S / D** | 좌 / 후진 / 우 측면 이동 |
| **Space** | 상승 |
| **Shift** | 하강 |
| **ESC** | 마우스 잠금 해제 |
| **H** | 컨트롤 패널 표시 / 숨김 |

### HUD 구성
- **좌상**: 섹터 ID + 유닛 수 (건물 수)
- **우상**: FPS / 고도 / 속도
- **좌하**: 코너 브래킷 데코
- **우하**: 현재 시드 + 실행 시간
- **하단 중앙**: 키캡 컨트롤 패널 (V2.1)

---

## 🛠️ 기술 스택 (Tech Stack)

| 영역 | 사용 기술 |
|---|---|
| **렌더링** | Three.js r0.165 (CDN importmap) |
| **건물** | `InstancedMesh` + `BoxGeometry` + 커스텀 `ShaderMaterial` (셀 해시 윈도우/패널/플리커/빌보드) |
| **크라운** | `InstancedMesh` + 수직 그라데이션 셰이더 |
| **드론** | `InstancedMesh` + `OctahedronGeometry` + `setColorAt` |
| **부유 입자** | `THREE.Points` + Additive blending |
| **차량 불빛** | GLSL `ShaderMaterial` per-plane (가우시안 streak) |
| **안개** | `FogExp2(0x0a0820, 0.0085)` |
| **후처리** | `UnrealBloomPass` + 인라인 크로마틱 어버레이션 `ShaderPass` + `OutputPass` |
| **카메라** | `PointerLockControls` |
| **무한화** | Chunk 재활용 (z-recycling) |
| **의존성** | 없음 (CDN만 사용) |

---

## 📂 프로젝트 구조

```
procedural-city/
├── index.html              # 모든 코드/스타일/GLSL inline (V2 — ~32KB)
├── package.json            # playwright (devDep)
├── package-lock.json
├── README.md               # 한국어 (기본)
├── README.en.md            # English (옵션)
├── qa/
│   ├── shot.mjs            # Playwright 헤드리스 V2 QA
│   ├── report.json         # 검증 결과
│   ├── screenshot-1.png    # 첫 시점
│   ├── screenshot-2.png    # +2.5s (드론/카메라 모션 확인)
│   ├── screenshot-final.png# +5s
│   └── screenshot-reload.png # 새로고침 (다른 시드 → 다른 도시)
└── vercel.json             # Vercel 정적 호스팅 설정
```

---

## 🎨 디자인 결정 (Design Choices)

브레인스토밍 단계에서 내린 결정 4가지:

| 결정 포인트 | 선택 | 이유 |
|---|---|---|
| **렌더링** | `InstancedMesh` + 커스텀 `ShaderMaterial` | ~850 건물 × 6면 윈도우 셀 해시를 GPU에서 직접 계산, draw call 1회로 절감 |
| **심볼/팔레트** | 사이버펑크 네온 6색 (시안/마젠타/옐로우/민트/앰버/바이올렛) | HSL로 셀 해시 → 6색 × flicker × 패널 × 빌보드 자동 매핑 |
| **카메라** | `PointerLockControls` + 자동 forward 30 u/s | 1인칭 자유 비행 + 별도 입력 없이도 풍경이 흐름 → "끝없이 도시를 날아가는" 감각 |
| **후처리** | `UnrealBloomPass` + 인라인 크로마틱 어버레이션 | 네온 후광 + RGB 채널 분리로 사이버펑크 디스토션 (r165엔 `ChromaticAberrationShader`가 없어 인라인 GLSL 직접 작성) |

### 직접 커스터마이즈하고 싶다면

`index.html` 상단 CONFIG 블록에서 다음 상수를 조정하면 분위기를 바꿀 수 있어요:

```js
const CONFIG = {
  CITY_RADIUS: 5,           // 도시 그리드 반경 (11×11 → 9×9 등)
  BUILDING_MIN: 4,          // 블록당 최소 빌딩 수
  BUILDING_MAX: 10,         // 블록당 최대 빌딩 수
  CROWN_CHANCE: 0.32,       // 옥상 크라운 비율
  DRONE_COUNT: 60,          // 비행 드론 수
  EMBER_COUNT: 500,         // 부유 입자 수
  AUTO_FORWARD_SPEED: 30,   // 자동 전진 속도 (u/s)
  // ... 더 많은 옵션은 코드 내 주석 참조
};
```

고급 사용자용: 크라운 형태를 `Mesh`/`Group`으로 바꿔 회전식 비콘·풍차·풍력 터빈 추가 가능.

---

## 🧠 절차적 생성 알고리즘

```text
seed = (Math.random() * 0xFFFFFFFF) >>> 0
rng  = mulberry32(seed)

# === 1. 도시: 11×11 블록 × 4..10 빌딩 ===
for bx in [-5..5]:
  for bz in [-5..5]:
    count = 4..10  (rng)
    for _ in count:
      w, d, h, x, z, seed = (rng-driven, 8..22, 6..120)
      push { x, z, w, d, h, seed }   # seed → window pattern

# === 2. 크라운: 32% 빌딩 ===
for b in BUILDINGS:
  if rng() < 0.32:
    isAntenna = rng() < 0.6
    if isAntenna: cw,ch,cd = 0.5..1.2, 6..28, 0.5..1.2
    else:         cw,ch,cd = 3..7,   2..5,  3..7
    colorIdx = 0..5     # 6 neon 중 하나

# === 3. 드론: 60개 ===
for _ in 60:
  pos, vel, colorIdx = (rng-driven, 25..120 고도)

# === 4. 부유 입자: 500 ===
for _ in 500:
  pos, color(cyan/magenta/mint/amber), size = (rng)
  drift_speed = 4..16
```

---

## 🎨 빌딩 셰이더 — V2 추가 (애니메이션 빌보드 셀)

기존 윈도우 그리드 / 패널 / flicker 외에 **V2에서 추가된 빌보드 셀**:

```glsl
// 셀 블록 단위로 ~1% 확률
vec2 bbBlockCell  = floor(cell * vec2(0.33, 0.4));
float bbBlockHash = hash21(bbBlockCell + vec2(vSeed * 19.7, 0.0));
if (bbBlockHash > 0.99) {
  float scroll = fract(uTime * 0.35 + bbBlockHash * 5.0);
  float rowY   = fract(cl.y * 4.0 - scroll);
  float bar    = step(0.45, fract(rowY * 3.0));
  float kanji  = step(0.55, hash21(floor(cell * vec2(0.5, 0.25)) + ...));
  float pulse  = 0.55 + 0.25 * sin(uTime * 3.0 + bbBlockHash * 9.0);
  vec3  bbCol  = mix(neon, uNeonC1, fract(bbBlockHash * 3.7));
  emit += bbCol * (bar * 0.18 + kanji * 0.35) * pulse * bbBorder;
}
```

---

## 🛰 크라운 셰이더 (옥상 안테나/탱크)

```glsl
varying float vY;            // 0 (바닥) ~ 1 (꼭대기)
varying float vColorIdx;     // 0..5
// ... 안테나의 위쪽이 더 밝게 빛남
float verticalGlow = mix(0.4, 2.4, vY);
float phase = vColorIdx * 7.31;
float pulse = 0.75 + 0.35 * sin(uTime * 1.3 + phase);
col = base * verticalGlow * pulse * 1.2;
```

---

## 💨 부유 입자 (Embers) 셰이더

```glsl
// size attenuation by depth
gl_PointSize = aSize * 30.0 * uPixelRatio / max(vDepth, 1.0);
// soft circular falloff
float a = smoothstep(0.5, 0.0, length(gl_PointCoord - 0.5));
a = pow(a, 1.6);
gl_FragColor = vec4(finalColor * 1.6, a * 0.85);
```

---

## 🌀 크로마틱 어버레이션 (인라인)

```glsl
vec2 dir = vec2(cos(angle), sin(angle));
vec2 ofs = dir * amount * (vUv - 0.5);
float r = texture(tDiffuse, vUv + ofs).r;
float g = texture(tDiffuse, vUv).g;
float b = texture(tDiffuse, vUv - ofs).b;
gl_FragColor = vec4(r, g, b, 1.0);
```

---

## ✅ 검증 (`qa/shot.mjs`)

```bash
node qa/shot.mjs
```

체크 항목 (V2):
1. 페이지 로드 후 `console.error` 0건
2. 셰이더 컴파일 에러 0건 (모든 addons)
3. `BUILDINGS.length >= 200` (V2는 800~900)
4. `CROWNS.length > 200` (옥상 크라운 데이터)
5. 60개 드론 모두 2.5초 사이에 위치 변화 (애니메이션 동작)
6. composer 패스에 `ShaderPass(chroma)` 포함 (크로마틱 어버레이션)
7. 500개 부유 입자 데이터
8. 두 개의 다른 시드 → 매번 다른 도시

---

## 📊 V1 → V2 비교

| 항목 | V1 | V2 | 배율 |
|---|---|---|---|
| 도시 그리드 | 9×9 | **11×11** | +50% |
| 빌딩 밀도 | 3-9 / 블록 | **4-10** | +20% |
| 총 빌딩 수 | ~480 | **~850** | **+77%** |
| 옥상 크라운 | — | **~280** | ∞ |
| 비행 드론 | — | **60** | ∞ |
| 부유 입자 | — | **500** | ∞ |
| 후처리 패스 | 2 | **4** | +2 |
| HUD 정보 | 4 | **8** | +2 |
| 단일 파일 크기 | 24KB | **~32KB** | +33% |
| 0 에러 | ✅ | ✅ | |

---

## 📝 변경 이력

- **V1 (초안)**: 리드미 스캐폴딩
- **V1 (구현)**: `index.html` 한 파일에 CDN Three.js, InstancedMesh, FogExp2, 커스텀 GLSL 셰이더 (빌딩 윈도우 + 도로 streak), UnrealBloomPass, PointerLockControls, chunk 재활용. `qa/shot.mjs`로 Playwright 헤드리스 검증.
- **V2 (고도화)**:
  - 옥상 크라운(안테나/탱크) → `InstancedMesh` + 수직 그라데이션 셰이더
  - 비행 드론 60개 → `InstancedMesh` + `setColorAt`
  - 부유 입자 500개 → `THREE.Points` + Additive blending
  - 빌딩 셰이더에 애니메이션 네온 빌보드 셀 추가
  - 인라인 크로마틱 어버레이션 셰이더 (r165에 ChromaticAberrationShader 없음)
  - 도시 밀도 2배 (RADIUS 4→5, density 3-9 → 4-10)
  - HUD 재디자인: 코너 브래킷, 섹터 ID, 유닛 수, 실행 시간, 속도
- **V2.1**: 컨트롤 패널 키캡 시각화 + 페이드인 애니메이션
- **V2.2 (배포)**: Vercel 정적 호스팅 배포 + README 다층 형식 통합

---

## ⚙️ 한계와 개선 여지

- 헤드리스 Chromium에서 ~15 fps (1280×800). 실제 GPU 가속 브라우저에서는 60 fps 근처.
- `InstancedMesh.matrix` 매 프레임 갱신은 recycling된 인스턴스만 dirty로 관리하면 더 효율적이지만, 현재는 단순화를 위해 모든 인스턴스 갱신 (수천 개라 무시 가능).
- 안테나/탱크 외에 다른 크라운 형태(예: 회전식 비콘, 풍차, 풍력 터빈) 추가 가능.
- 비행 드론에 트레일 라이트(잔상 꼬리) 셰이더 추가 가능.
- 부유 입자가 단순 z축 드리프트 — 회전/스파이럴 모션 추가 가능.
- 비/안개/먼지 등 날씨 효과 추가 가능.

---

## 📄 라이선스 (License)

**MIT License** — 자유롭게 사용, 수정, 배포 가능합니다.

---

## 🙏 Credits

- **Three.js** — r0.165 ([mrdoob/three.js](https://github.com/mrdoob/three.js))
- **UnrealBloomPass** — Three.js examples ([three.js/examples/jsm/postprocessing](https://github.com/mrdoob/three.js/tree/dev/examples/jsm/postprocessing))
- **PointerLockControls** — Three.js examples
- 코딩미션 참조 페이지: [cokac.com](https://cokac.com/list/announcement/24)

---

<p align="center"><sub>🏙️ Built with <code>Three.js + GLSL</code> · sigco3111 · MIT · AI-generated by MiniMax-M3</sub></p>