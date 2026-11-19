/**
 * Personal Portfolio Data
 * Jowon Home (Interactive Digital Hub)의 실제 구축 프로젝트 및 최신 활동 내역을 반영한 데이터입니다.
 */
const portfolioData = {
  profile: {
    name: "조원 (Jowon)",
    title: "AI & Cloud Architector",
    tagline: "AI 기술로 더 좋은 세상이 열리길 바랍니다. 에이전트와 클라우드 기술로 일상의 워크플로를 혁신합니다.",
    bio: "클라우드 네이티브 아키텍처와 생성형 AI·프롬프트 엔지니어링 기반의 웹 애플리케이션을 설계·개발하고, 실무 중심의 AI 교육을 진행합니다. 35개 이상의 인터랙티브 앱·유틸리티와 9개 전문 도메인 블로그를 아우르는 디지털 허브(Jowon Home)를 운영하고 있습니다.",
    status: "🚀 AI 아키텍처 자문 · 강의 · 프로젝트 협업 가능",
    location: "South Korea",
    email: "swkim777@gmail.com",
    avatar: "../../image/profile.jpg",
    socials: {
      github: "https://github.com/swkim777",
      notion: "https://app.notion.com/p/swkim-work/082fa54416e54037aff115360bd0c2be",
      home: "https://swkim777.github.io/myhome",
      email: "mailto:swkim777@gmail.com"
    }
  },

  skills: [
    {
      category: "AI & Prompt Engineering",
      items: ["Gemini API & Imagen", "Antigravity Agent", "7-Step Prompt Architecture", "Slide Visual Prompting", "AI Lecture & Coaching"]
    },
    {
      category: "Frontend & Interactive UI",
      items: ["JavaScript (ES6+)", "React & Vite", "Tailwind CSS", "Chart.js", "Interactive SVG Visualization", "Responsive Web Design"]
    },
    {
      category: "Cloud & Data Integration",
      items: ["Google Apps Script (GAS)", "Google Sheets & Drive API", "RESTful API", "LocalStorage Persistence", "GitHub Pages CI/CD"]
    },
    {
      category: "Domain & Content Solutions",
      items: ["Financial & Economic Analytics", "Elevation & Weather Simulation", "Multi-Topic Blog Engine", "Real-time Web Photo Search"]
    }
  ],

  projects: [
    {
      id: 1,
      title: "VERTEX 모던 산악 & 등산 익스플로러",
      category: "web",
      period: "2026.11",
      description: "산림청 공식 100대 명산 및 높은 산 TOP 20(총 107대 명산) 데이터를 수록하고, 구간별 인터랙티브 SVG 고도 프로필 차트와 국제표준대기(ISA) 기반 고도·기온 감률 및 윈드칠 시뮬레이터를 제공하는 산악 플랫폼입니다.",
      tags: ["Vanilla JS", "Tailwind CSS", "SVG Chart", "ISA Physics", "100대 명산"],
      demoUrl: "../../blog/mountain/index.html",
      githubUrl: "https://github.com/swkim777/myhome/tree/main/blog/mountain",
      badge: "NEW"
    },
    {
      id: 2,
      title: "JowonPlace 추천 여행지 감성 블로그",
      category: "web",
      period: "2026.11",
      description: "원하는 여행지를 검색하면 대중적인 인기 핫플레이스 5곳을 엄선하여 1인칭 감성 여행기와 실시간 꿀팁을 생성하고, 실시간 웹 사진 검색을 통한 명소 사진 자동 추천·일괄 교체 및 직접 업로드를 지원하는 웹앱입니다.",
      tags: ["Travel Curation", "Web Image Search", "Photo Editor Modal", "Responsive UI"],
      demoUrl: "../../blog/travel/recommend/index.html",
      githubUrl: "https://github.com/swkim777/myhome/tree/main/blog/travel/recommend",
      badge: "Featured"
    },
    {
      id: 3,
      title: "Slide Prompt Maker (슬라이드 프롬프트 생성기)",
      category: "ai",
      period: "2026.11",
      description: "Gemini 기반으로 프레젠테이션 슬라이드 및 학술 가이드를 기획하고, 장표별 핵심 메시지와 시각 연출 지시문 프롬프트를 자동으로 설계·생성하는 전문 프레젠테이션 도구입니다.",
      tags: ["Gemini AI", "Presentation", "Prompt Engineering", "React"],
      demoUrl: "../../prompt/slide-prompt/dist/index.html",
      githubUrl: "https://github.com/swkim777/myhome/tree/main/prompt/slide-prompt",
      badge: "Featured"
    },
    {
      id: 4,
      title: "Prompt Studio (7단계 대화형 프롬프트 생성기)",
      category: "ai",
      period: "2026.11",
      description: "Gemini 프롬프팅 전략에 기반한 7단계 대화형 위저드를 통해 목적에 최적화된 고품질 프롬프트를 설계·미리보기·편집·복사할 수 있으며, 다크/화이트 테마 토글 및 브라우저 드래프트 저장을 지원합니다.",
      tags: ["7-Step Wizard", "Prompt Studio", "Dark/Light Mode", "Local Drafts"],
      demoUrl: "../../prompt/prompt-creator/index.html",
      githubUrl: "https://github.com/swkim777/myhome/tree/main/prompt/prompt-creator",
      badge: "AI Tool"
    },
    {
      id: 5,
      title: "Jowon Multi-Topic Blog Archive (9개 테마 블로그 허브)",
      category: "web",
      period: "2026.09 - 2026.11",
      description: "AI, IT, 소설, 여행, 등산, 음악, 영화, 재테크, 요리 등 9개 세부 도메인별 독립형 블로그와 Google Apps Script 연동 게시글 관리 시스템을 통합한 멀티 토픽 디지털 아카이브입니다.",
      tags: ["9-Category Blog", "Travel & Mountain", "AI & Tech", "Content Hub"],
      demoUrl: "../../index.html?route=blog",
      githubUrl: "https://github.com/swkim777/myhome/tree/main/blog",
      badge: "Archive"
    },
    {
      id: 6,
      title: "TodoWebApp (구글 스프레드시트 & 드라이브 양방향 연동)",
      category: "productivity",
      period: "2026.09",
      description: "React & Vite 기반의 모던 할 일 관리 웹앱으로, Google Apps Script를 통해 구글 스프레드시트(Todos) 실시간 양방향 동기화 및 지정 구글 드라이브 폴더 내 CSV 자동 백업을 수행합니다.",
      tags: ["React", "Vite", "Google Sheets API", "Google Drive", "Apps Script"],
      demoUrl: "../../TodoWebApp/index.html",
      githubUrl: "https://github.com/swkim777/myhome/tree/main/TodoWebApp",
      badge: "Popular"
    },
    {
      id: 7,
      title: "제미니 타로 (Gemini Tarot) 운세 & 해석 서비스",
      category: "ai",
      period: "2026.09",
      description: "Gemini API를 연동하여 사용자가 선택한 타로 카드의 상징과 고민 주제를 심층 해석해 주는 인터랙티브 웹앱입니다. 로컬 스토리지 API 키 캐싱 및 프로덕션 번들 최적화가 적용되었습니다.",
      tags: ["Gemini API", "Interactive Card", "LocalStorage Cache", "Web App"],
      demoUrl: "../../Tarot/dist/index.html",
      githubUrl: "https://github.com/swkim777/myhome/tree/main/Tarot",
      badge: null
    },
    {
      id: 8,
      title: "이미지 생성 스튜디오 (NanoBanana) & AI 미디어 스위트",
      category: "ai",
      period: "2026.08 - 2026.09",
      description: "Gemini Imagen 모델을 활용한 고화질 이미지 생성 스튜디오를 비롯하여 AI 이미지 에디터, 멀티뷰 캐릭터 시트 생성기, 이미지 데이터 추출기 등 창작 미디어 도구 모음입니다.",
      tags: ["Gemini Imagen", "Image Studio", "Character Sheet", "Media Suite"],
      demoUrl: "../../nanobanana/dist/index.html",
      githubUrl: "https://github.com/swkim777/myhome/tree/main/nanobanana",
      badge: null
    },
    {
      id: 9,
      title: "실시간 금융·주식 대시보드 & 2026 한국경제 전망 리포트",
      category: "productivity",
      period: "2026.08 - 2026.09",
      description: "실시간 금융·주식 뉴스 및 주요 지표를 시각화하는 대시보드(FinNews, StockNews)와 2025~2026년 한국 경제 트렌드 및 시나리오별 자산 관리 전략을 담은 인터랙티브 분석 보고서입니다.",
      tags: ["FinNews", "Stock Dashboard", "Chart.js", "2026 경제전망"],
      demoUrl: "../../FinNews/index.html",
      githubUrl: "https://github.com/swkim777/myhome/tree/main/FinNews",
      badge: "Finance"
    }
  ],

  experiences: [
    {
      company: "DaolIS (다올아이에스)",
      role: "AI & Cloud Solutions Architect",
      period: "2026.01 - 현재",
      description: [
        "기업용 클라우드 아키텍처 설계 및 생성형 AI·에이전트 기반 업무 혁신 솔루션 구축",
        "AI 프롬프트 엔지니어링 표준화 및 스마트 워크플로 자동화 기술 자문",
        "차세대 IT 서비스 아키텍처 고도화 및 디지털 전환(DX/AX) 프로젝트 리딩"
      ]
    },
    {
      company: "AI 전문 강의 및 교육 (AI Lecturer & Educator)",
      role: "AI 활용 · 프롬프트 엔지니어링 전문 강사",
      period: "2024.03 - 현재",
      description: [
        "생성형 AI(Gemini, ChatGPT 등) 개념 구조(AI·머신러닝·딥러닝) 및 실무 활용 교육 과정 진행",
        "7단계 대화형 프롬프트 설계, AI 기반 프레젠테이션 기획 및 업무 효율화·자동화 실습 강의",
        "AI 에이전트와 웹 도구를 결합한 디지털 콘텐츠 제작 및 스마트 워크 교육 콘텐츠 개발"
      ]
    },
    {
      company: "ETRI (한국전자통신연구원)",
      role: "책임연구원 / Principal Researcher & Software Architect",
      period: "1989.02 - 2024.12",
      description: [
        "35년간 국가 핵심 정보통신(ICT), 소프트웨어 아키텍처, 클라우드 및 지능형 시스템 연구개발 수행",
        "대규모 분산 시스템, 네트워크 및 차세대 SW 플랫폼 아키텍처 설계·총괄",
        "다수의 국책 R&D 프로젝트 리딩 및 정보통신 기술 표준화·상용화 기여"
      ]
    }
  ]
};
