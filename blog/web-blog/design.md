# Design System & UI Specification - JOWON AI Blog

## 1. 디자인 원칙 (Design Principles)
- **Bold & Editorial Minimalism (Jaspreet Singh 레퍼런스)**:
  - 거대한 타이포그래피와 과감한 여백, 정제된 그리드 시스템을 사용하여 현대적이고 신뢰감 있는 테크 포트폴리오 감성을 연출합니다.
  - 불필요한 장식(형광색, 과도한 그라데이션)을 철저히 배제하고 본질적인 콘텐츠와 타이포그래피의 대비에 집중합니다.
- **AI · 강의 · 클라우드 키워드 반영**:
  - 엔지니어링의 구조적 정밀함과 지식 전달자의 명료함을 시각화합니다.
- **중립색과 고대비 파란색 액센트**:
  - 눈이 편안한 중립색(Neutral Slate/Gray)을 기반으로 본문을 구성하고, 시선 유도가 필요한 버튼과 링크에만 세련된 블루 액센트를 전략적으로 배치합니다.
- **라이트/다크 듀얼 테마 (Dual Theme System)**:
  - 라이트 모드와 다크 모드 간 전환 시 눈부심 없이 자연스러운 대비와 가독성을 보장합니다.

---

## 2. 디자인 토큰 명세 (Tailwind CSS 매핑)

### 2.1 Color Palette
| 역할 | 라이트 모드 (Light) | 다크 모드 (Dark) | Tailwind 매핑 | 비고 |
| :--- | :--- | :--- | :--- | :--- |
| **배경 (Base)** | `#F8FAFC` (Slate-50) | `#0F172A` (Slate-900) | `bg-slate-50 dark:bg-slate-900` | 눈부심 없는 중립색 |
| **카드 표면 (Surface)** | `#FFFFFF` | `#1E293B` (Slate-800) | `bg-white dark:bg-slate-800` | 카드 및 패널 배경 |
| **은은한 배경 (Subtle)** | `#F1F5F9` (Slate-100) | `#334155` (Slate-700) | `bg-slate-100 dark:bg-slate-700` | 배지, 태그, 코드 영역 |
| **주 텍스트 (Primary)** | `#0F172A` (Slate-900) | `#F8FAFC` (Slate-50) | `text-slate-900 dark:text-slate-50` | 고대비 헤드라인 및 본문 |
| **보조 텍스트 (Secondary)**| `#475569` (Slate-600) | `#94A3B8` (Slate-400) | `text-slate-600 dark:text-slate-400` | 요약문, 부제목 |
| **메타 텍스트 (Muted)** | `#64748B` (Slate-500) | `#64748B` (Slate-500) | `text-slate-500 dark:text-slate-500` | 날짜, 각주, 캡션 |
| **강조 액센트 (Accent)** | `#2563EB` (Blue-600) | `#3B82F6` (Blue-500) | `bg-blue-600 dark:bg-blue-500` | 주 CTA 버튼, 활성 탭 |
| **강조 호버 (Hover)** | `#1D4ED8` (Blue-700) | `#60A5FA` (Blue-400) | `hover:bg-blue-700 dark:hover:bg-blue-400` | 버튼 호버 상태 |
| **테두리 (Border)** | `#E2E8F0` (Slate-200) | `#334155` (Slate-700) | `border-slate-200 dark:border-slate-700` | 카드 구분선 |
| **포커스 링 (Focus Ring)** | `#2563EB` (Blue-600) | `#60A5FA` (Blue-400) | `ring-2 ring-blue-600` | 키보드 접근성 링 |

> **금지 사항**: 형광색, 네온 컬러, 넓은 면적에 고채도 원색 배경 사용 엄격 금지.

### 2.2 Typography
- **글꼴 스택**:
  - 기본 산세리프: `Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans KR", sans-serif`
  - 모노스페이스: `ui-monospace, "SFMono-Regular", "JetBrains Mono", Menlo, monospace`
- **스케일**:
  - `Hero Display`: `clamp(2.5rem, 6vw, 4.25rem)` / line-height: 1.1 / font-weight: 800 / tracking: -0.03em
  - `Section Title (H2)`: `clamp(1.75rem, 3.5vw, 2.5rem)` / line-height: 1.25 / font-weight: 700 / tracking: -0.02em
  - `Item Title (H3)`: `1.25rem ~ 1.5rem` / line-height: 1.35 / font-weight: 600
  - `Body Regular`: `1rem (16px)` / line-height: 1.7 / font-weight: 400
  - `Meta / Label`: `0.875rem (14px)` / font-mono / font-weight: 500

### 2.3 레이아웃 규격
- **컨테이너 최대 너비**: `1200px` (`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`)
- **섹션 간 수직 간격**: `py-16 sm:py-24 lg:py-32`

---

## 3. 다크 모드 토글 및 접근성 명세
1. **테마 전환기 (Theme Switcher)**:
   - Header 우측에 상시 고정 배치.
   - 해(Sun) / 달(Moon) 아이콘과 함께 현재 모드를 시각적으로 표현.
   - `localStorage`에 `theme` (`light` | `dark`)를 저장하고 시스템 선호(`prefers-color-scheme`)와 동기화.
   - 테마 변경 시 `html` 태그에 `.dark` 클래스를 토글.
2. **웹 접근성 (WCAG 2.1 AA)**:
   - 본문 텍스트 명도비: 라이트 12.6:1, 다크 13.8:1 달성.
   - 키보드 탐색 포커스 링: `:focus-visible` 시 파란색 외곽선 2px 노출.
   - 스킵 링크: 최상단에 `#main-content` 바로가기 제공.

---

## 4. 6대 섹션별 UI 상세 명세

### 4.1 Header (Sticky)
- **좌측**: 브랜드 로고 `JOWON AI Blog`
- **중앙**: 6대 섹션 내비게이션 (`Profile`, `App & Tool`, `Portfolio`, `Blog`, `Recent Works`, `Contacts`)
- **우측**: 라이트/다크 모드 토글 버튼 및 모바일 햄버거 메뉴.

### 4.2 Hero Section
- **상단 배지**: `생성형 AI 크리에이터 & 개발자` (모노스페이스 뱃지)
- **메인 카피**: "생성형 AI와 웹 기술의 만남, <br /><span className="text-blue-600 dark:text-blue-400">창작과 코드</span>의 기록"
- **설명문**: "이론에 그치지 않고 바로 실무에 쓸 수 있는 구체적인 프롬프트와 개발 코드를 공유합니다."
- **주 CTA**: `최신 프로젝트` (솔리드 파란색 버튼 → `#recent-works`로 스크롤)

### 4.3 Profile Section (`#profile`)
- **레이아웃**: 2열 그리드 (데스크톱) / 1열 (모바일)
- **좌측**: 프로필 사진 프레임 (`assets/jowon.jpg` 연결 지원, 미로딩 시 세련된 이니셜 아바타 폴백)
- **우측**: 이름(`Jowon`), 역할, 자기소개 3문장, 핵심 키워드 뱃지 (`AI`, `강의`, `클라우드`, `Next.js`, `TypeScript`)

### 4.4 App & Tool Section (`#app-tool`)
- **소개**: 일상과 실무를 개선하는 웹 애플리케이션 및 도구 쇼케이스
- **카드 그리드**: 범용 웹앱, 업무 자동화 툴, 미디어 제작 보조 도구 등 3개 카드 배치.

### 4.5 Portfolio Section (`#portfolio`)
- **소개**: 엄선된 대표 작업 및 프로젝트 아카이브
- **스타일**: Jaspreet Singh 스타일의 대형 카드 및 태그 기반 프로젝트 쇼케이스.

### 4.6 Blog Section (`#blog`)
- **8대 카테고리 필터 바**: `AI`, `IT`, `소설`, `여행`, `영화`, `재테크`, `책`, `기타`
- **대표 글 3편 노출 카드**:
  1. `일반앱` (범용의 웹앱 / 상태: 작성 중)
  2. `업무` (일상 작업 / 상태: 작성 중)
  3. `미디어` (미디어 관련 앱 / 상태: 작성 중)

### 4.7 Recent Works Section (`#recent-works`)
- **소개**: 최근 진행 중인 프로젝트 및 최신 릴리스 타임라인
- **CTA 연결**: Hero의 주 CTA 버튼 클릭 시 이동하는 핵심 목적지.

### 4.8 Contacts & Footer (`#contacts`)
- **외부 채널 카드**:
  - GitHub: `https://github.com/swkim777/`
  - YouTube: `@JowonLife`
- **보안/개인정보 보호**: 직접적인 이메일 주소 및 전화번호는 화면에 노출하지 않음 (`미공개` 원칙).
- **하단 푸터**: 저작권 표기 (`© 2026. JOWON AI Blog. All rights reserved.`).
