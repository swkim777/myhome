# MobileApp — 모바일 우선 반응형 포트폴리오 웹앱

모바일 디바이스 환경에 최적화된 모던하고 경량화된 반응형 개인 포트폴리오 웹 애플리케이션입니다.  
번들러나 복잡한 빌드 과정 없이 순수 HTML5, CSS3, Vanilla JavaScript와 CDN 라이브러리로 구축되어 브라우저에서 즉시 실행 및 정적 호스팅이 가능합니다.

---

## ✨ 주요 기능 (Key Features)

- 📱 **모바일 우선(Mobile-First) 반응형 디자인**
  - 모바일 뷰포트(375px~430px)를 기준으로 설계되었으며, 태블릿 및 데스크톱 환경까지 자연스럽게 확장되는 유연한 그리드/플렉스 레이아웃을 제공합니다.
- ⚡ **Zero-Build & 빠른 렌더링**
  - Webpack, Vite 등의 번들러나 Node.js 빌드 단계 없이 `index.html` 파일을 직접 열거나 정적 웹 호스팅 서비스로 즉시 배포할 수 있습니다.
- 🌓 **다크 모드 / 라이트 모드 전환**
  - 시스템 테마(`prefers-color-scheme`) 감지 및 `localStorage` 저장을 지원하여 사용자 설정을 유지합니다.
- 🗂️ **데이터와 뷰의 엄격한 분리 (`data.js`)**
  - 프로필 정보, 핵심 역량, 프로젝트 목록, 경력 타임라인이 `data.js`에 구조화되어 있어 HTML 마크업을 건드리지 않고도 데이터 수정 및 관리가 가능합니다.
- 🏷️ **실시간 프로젝트 카테고리 필터링**
  - 전체(All), AI / Agent, Web App, Cloud / Ops 탭 버튼을 통해 프로젝트 목록을 실시간 필터링합니다.
- 📋 **원터치 이메일 클립보드 복사 & 토스트 알림**
  - 모바일 하단 플로팅 액션 바(Floating Action Bar)와 데스크톱 인터페이스에서 원클릭 이메일 복사 및 비동기 토스트 알림을 제공합니다.
- 🎨 **모던 UI/UX 스타일링**
  - Tailwind CSS CDN, Lucide Icons, 글래스모피즘(Glassmorphism), Pretendard 폰트를 적용하여 깔끔하고 세련된 시각 경험을 제공합니다.

---

## 📁 디렉터리 구조 (Directory Structure)

```text
MobileApp/
├── assets/
│   └── profile.jpg      # 프로필 사진 리소스
├── data.js              # 포트폴리오 데이터 모델 (프로필, 기술 스택, 프로젝트, 경력)
├── index.html           # 메인 시맨틱 HTML5 구조, SEO 및 메타태그
├── script.js            # 데이터 기반 동적 렌더링, 테마 토글, 필터 및 이벤트 핸들러
├── style.css            # Pretendard 웹폰트, 백드롭 블러(Glassmorphism), 트랜지션
├── GEMINI.md            # 작업 원칙 및 개발 가이드라인
├── TASKS.md             # 작업 로드맵 및 단계별 구현 현황
└── README.md            # 프로젝트 개요 및 사용 설명서
```

---

## 🛠️ 기술 스택 (Tech Stack)

| 구분 | 기술 / 라이브러리 | 설명 |
| :--- | :--- | :--- |
| **Markup & Logic** | HTML5, Vanilla JavaScript (ES6+) | 순수 웹 표준 기술 기반 |
| **Styling** | Tailwind CSS (CDN), CSS3 | 유틸리티 퍼스트 반응형 스타일링 |
| **Typography** | Pretendard | 현대적이고 가독성 높은 한글/영문 웹폰트 |
| **Icons** | Lucide Icons (CDN) | 경량 SVG 아이콘 팩 |
| **Data Storage** | `data.js` / Web Storage API | 클라이언트 사이드 데이터 관리 및 테마 캐싱 |

---

## 🚀 로컬 실행 방법 (How to Run)

빌드 또는 패키지 설치 과정이 필요하지 않습니다.

### 방법 1: 브라우저에서 바로 열기
[`MobileApp/index.html`](index.html) 파일을 Chrome, Edge, Safari 등의 브라우저로 더블 클릭하여 실행합니다.

### 방법 2: 로컬 HTTP 서버 실행 (권장)
로컬 서버 환경에서 테스트할 경우 아래 명령어를 사용할 수 있습니다:

```bash
# Node.js npx를 사용하는 경우
npx serve MobileApp

# Python 3를 사용하는 경우
cd MobileApp
python -m http.server 8080
```

브라우저에서 `http://localhost:8080` 또는 터미널에 표시된 포트로 접속합니다.

---

## ⚙️ 데이터 수정 가이드 (Customization Guide)

[`data.js`](data.js) 파일의 `portfolioData` 객체를 수정하여 자신만의 정보로 업데이트할 수 있습니다:

```javascript
const portfolioData = {
  // 1. 기본 프로필 정보
  profile: {
    name: "홍길동",
    title: "AI & Full-Stack Solutions Architect",
    tagline: "기술로 문제를 해결하고 사용자 경험을 혁신합니다.",
    bio: "자기소개 및 핵심 강점을 입력합니다.",
    status: "🚀 새로운 프로젝트 협업 가능",
    location: "Seoul, South Korea",
    email: "your-email@example.com",
    avatar: "assets/profile.jpg",
    socials: {
      github: "https://github.com/your-id",
      linkedin: "https://linkedin.com/in/your-id",
      blog: "https://velog.io/@your-id",
      resume: "#"
    }
  },

  // 2. 기술 스택 카테고리
  skills: [
    { category: "Frontend", items: ["JavaScript", "TypeScript", "React", "Tailwind CSS"] },
    { category: "AI & Agents", items: ["Python", "Gemini API", "FastAPI"] }
  ],

  // 3. 프로젝트 목록 (category: 'all', 'ai', 'web', 'cloud')
  projects: [
    {
      id: 1,
      title: "프로젝트 명",
      category: "ai",
      period: "2026.01 - 2026.06",
      description: "프로젝트 핵심 설명",
      tags: ["Python", "FastAPI", "Tailwind CSS"],
      demoUrl: "https://demo.example.com",
      githubUrl: "https://github.com/example/repo",
      badge: "Featured"
    }
  ],

  // 4. 경력 사항
  experiences: [
    {
      company: "회사명",
      role: "직무 / 직책",
      period: "2023.01 - 현재",
      description: [
        "담당 업무 및 주요 성과 불릿 포인트 1",
        "담당 업무 및 주요 성과 불릿 포인트 2"
      ]
    }
  ]
};
```

---

## 🌐 정적 배포 안내 (Deployment)

이 프로젝트는 정적 파일로만 구성되어 있어 정적 호스팅 서비스에 간편하게 배포할 수 있습니다.

- **GitHub Pages**: 저장소의 `Settings` ➔ `Pages`에서 `main` 브랜치 및 해당 디렉터리를 배포 경로로 지정
- **Vercel / Netlify**: 루트 디렉터리 또는 `MobileApp` 폴더를 프로젝트 루트로 지정하여 원클릭 배포

---

## 📄 라이선스 (License)

이 프로젝트는 자유롭게 수정 및 개인 포트폴리오 용도로 활용할 수 있습니다.
