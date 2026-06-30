# 🏙️ Procedural City

**OpenCode + MiniMax-M3**으로 절차적 생성 도시에 도전한 코딩 미션.

## 🎯 사용한 프롬프트

> Three.js 라이브러리를 CDN으로 불러와서 끝없이 펼쳐진 밤의 도시 위를 비행하는 1인칭 시점을 구현하되, 매번 실행할 때마다 건물의 높이와 배치가 달라지는 절차적 생성(Procedural Generation) 알고리즘을 적용하고 건물 창문의 불빛과 도로 위를 달리는 차량들의 불빛이 흐릿하게 지나가는 사이버펑크 스타일의 야경을 코딩해줘.
>
> _Implementation Advice: Use Three.js. Leverage InstancedMesh for rendering thousands of buildings efficiently. Use FogExp2 for the depth/atmosphere and GLSL shaders for the moving lights on roads. 모든 의존관계의 코드를 하나의 HTML에 담는 형태로 코드 작성._

## 🛰 구현 메타데이터

| 결정 | 선택 | 이유 |
|---|---|---|
| 렌더러 | Three.js (CDN) | 단일 HTML 의존성 요구 충족 |
| 건물 배치 | `InstancedMesh` | 수천 개 건물을 한 draw call에 묶어 GPU 효율 극대화 |
| 안개/분위기 | `FogExp2` | 거리 감쇠를 부드럽게, 사이버펑크 야경의 깊이감 |
| 도로 차량 불빛 | **GLSL Shader** | 픽셀 단위로 흐릿하게(광 번짐) 지나가는 모션 표현 |
| 컨테이너 | **단일 `index.html`** | 모든 의존성을 inline으로 포함 |

## 🎯 미션 개요

코드만으로 도시를 한 블록씩 그려내는 절차적 생성(Procedural Generation) 실험입니다.
작은 규칙(seed + 작은 알고리즘)이 어떻게 거대한 도시 풍경으로 자라나는지를 살펴봅니다.

## 🧪 만든 방법

| 단계 | 도구 / 모델 | 역할 |
|------|------------|------|
| 1. 리드미 작성 | OpenCode + **MiniMax-M3** | 이 문서 초안 |
| 2. 절차적 생성 로직 | OpenCode + **MiniMax-M3** | 시드 → 도로/구역/건물 생성 알고리즘 설계 |
| 3. 시각화/렌더링 | (작업 예정) | 2D 캔버스 또는 3D로 도시를 화면에 띄우기 |

## 🚀 실행 방법

```bash
# 추후 채워질 예정 — 실제 구현 후 명령어로 교체
python3 src/generate_city.py --seed 42
```

## 📂 디렉터리 (초안)

```
procedural-city/
├── README.md
└── src/
    └── (생성 로직 채워질 자리)
```

## 📝 변경 이력

- **초안** — 리드미 스캐폴딩만 생성. 절차적 생성 로직은 OpenCode 미션에서 이어집니다.
