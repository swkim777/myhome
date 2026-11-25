# Implementation Tasks & Roadmap - JOWON AI Blog

## 1. 개요
본 문서는 `content-input.md`에 확정된 데이터와 `Next.js + TypeScript + Tailwind CSS` 기술 스택, Vercel/Netlify 배포 목표를 달성하기 위한 세부 구현 체크리스트입니다.

---

## 2. 세부 구현 체크리스트

### Phase 1. Next.js & Tailwind CSS 기반 스캐폴딩
- [x] **Task 1.1: Next.js (App Router) + TypeScript + Tailwind CSS 환경 구성**
  - **작업 내용**: Next.js 15, React 19, Tailwind CSS 3, TypeScript strict 모드 셋업.
  - **완료 조건**: 프로덕션 빌드 통과 및 Tailwind 유틸리티 클래스 정상 작동 확인 완료.
- [x] **Task 1.2: 다크 모드(Dark Mode) 테마 인프라 구축**
  - **작업 내용**: `next-themes` 기반 `ThemeProvider` 및 `ThemeToggle` 컴포넌트 구현.
  - **완료 조건**: 헤더의 토글 버튼 클릭 시 부드럽게 라이트 ↔ 다크 모드로 전환되고 로컬스토리지 영속화.
- [x] **Task 1.3: 디자인 토큰 및 전역 스타일 정돈**
  - **작업 내용**: Slate/Neutral 중립색 베이스와 Blue 액센트 컬러 시스템 설정.
  - **완료 조건**: WCAG 2.1 AA 명도비 및 한글 Pretendard 폰트, `:focus-visible` 고대비 링 적용.

---

### Phase 2. 정적 데이터 바인딩 (Data Layer)
- [x] **Task 2.1: 데이터 모델 인터페이스 정의 (`src/types/index.ts`)**
  - **작업 내용**: ProfileData, AppItem, PortfolioItem, BlogPost, RecentWorkItem, ExternalLink, SiteContent 인터페이스 선언.
  - **완료 조건**: TypeScript `strict: true` 무에러.
- [x] **Task 2.2: SSOT 콘텐츠 데이터셋 작성 (`src/data/content.ts`)**
  - **작업 내용**: `content-input.md`의 모든 내용을 데이터 객체로 구성.
    - 운영자: Jowon (`생성형 AI 크리에이터 & 개발자`)
    - 프로필 이미지: `assets/jowon.jpg` (미로딩 시 이니셜 아바타 폴백)
    - 6대 섹션: Profile, App & Tool, Portfolio, Blog, Recent Works, Contacts
    - 8대 글 카테고리: AI, IT, 소설, 여행, 영화, 재테크, 책, 기타
    - 3편의 대표 글: 일반앱, 업무, 미디어 (상태: 작성 중)
    - 외부 채널: GitHub(`https://github.com/swkim777/`), YouTube(`@JowonLife`)
    - 연락처 미공개 원칙 적용
  - **완료 조건**: 컴포넌트에 타입 안전하게 주입 완료.

---

### Phase 3. 헤더, 푸터 및 공통 컴포넌트
- [x] **Task 3.1: 스킵 네비게이션 (`SkipLink`)**
  - **완료 조건**: 키보드 Tab 시 최상단에 `#main-content` 바로가기 노출.
- [x] **Task 3.2: 고정 헤더 (`Header`) & 다크모드 토글 스위처**
  - **완료 조건**: 데스크톱 6대 메뉴 앵커 링크, 모바일 햄버거 드로어, 해/달 아이콘 테마 토글 버튼 탑재.
- [x] **Task 3.3: 푸터 (`Footer`)**
  - **완료 조건**: 저작권 표기 및 상단 이동 링크, 외부 링크 연결.

---

### Phase 4. 6대 메인 섹션 구현
- [x] **Task 4.1: Hero Section (`Hero`)**
  - **완료 조건**: 정체성 배지, 헤드라인, "최신 프로젝트" 주 CTA 버튼 (클릭 시 `#recent-works` 스크롤).
- [x] **Task 4.2: Profile Section (`Profile`)**
  - **완료 조건**: 프로필 사진(`assets/jowon.jpg` 폴백 아바타 포함), 자기소개 3문장, 핵심 기술 스택 뱃지.
- [x] **Task 4.3: App & Tool Section (`AppTool`)**
  - **완료 조건**: 일반앱, 업무 자동화, 미디어 관련 도구 쇼케이스 카드 그리드.
- [x] **Task 4.4: Portfolio Section (`Portfolio`)**
  - **완료 조건**: Jaspreet Singh 스타일의 모던한 대표 프로젝트 큐레이션 카드.
- [x] **Task 4.5: Blog Section (`Blog`)**
  - **완료 조건**: 8대 카테고리 필터 탭 및 3개 대표 글 카드(일반앱, 업무, 미디어 / 상태: 작성 중).
- [x] **Task 4.6: Recent Works Section (`RecentWorks`)**
  - **완료 조건**: 최신 릴리스 및 진행 중인 프로젝트 타임라인 쇼케이스.
- [x] **Task 4.7: Contacts Section (`Contacts`)**
  - **완료 조건**: GitHub, YouTube 외부 카드 링크 (직접 이메일 노출 없음).

---

### Phase 5. 배포 및 검증 (Vercel / Netlify)
- [x] **Task 5.1: 접근성 및 반응형 레이아웃 검증**
  - **완료 조건**: 모바일/태블릿/데스크톱 뷰포트 및 키보드 탭 탐색 확인.
- [x] **Task 5.2: 프로덕션 빌드 검증 (`npm run build`)**
  - **완료 조건**: Next.js 15 정적 빌드 0 에러, 0 경고 완료 (First Load JS: 110kB).
- [x] **Task 5.3: README.md 배포 가이드 작성**
  - **완료 조건**: 로컬 실행, 글 작성 방법, GitHub 연동 Vercel/Netlify 원클릭 배포 가이드 문서화 완료.
