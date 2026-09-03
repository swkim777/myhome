/**
 * Personal Portfolio Data
 * 유지보수 및 수정을 위해 데이터만 별도로 관리합니다.
 */
const portfolioData = {
  profile: {
    name: "조원 (Jowon)",
    title: "AI & Full-Stack Solutions Architect",
    tagline: "기술로 문제를 해결하고, 에이전트 기술로 워크플로를 혁신합니다.",
    bio: "클라우드 네이티브 아키텍처와 생성형 AI 에이전트 시스템을 설계하고 개발합니다. 견고한 프론트엔드 인터페이스와 유연한 백엔드 파이프라인 구축에 강점이 있습니다.",
    status: "🚀 새로운 프로젝트 협업 가능",
    location: "Seoul, South Korea",
    email: "swkim777@gmail.com",
    avatar: "assets/profile.jpg",
    socials: {
      github: "https://swkim777.github.io/myhome",
      linkedin: "https://linkedin.com",
      blog: "https://velog.io",
      resume: "#"
    }
  },

  skills: [
    { category: "AI & Agents", items: ["Gemini 3.x API", "Antigravity SDK", "LangChain", "MCP Protocol", "Python"] },
    { category: "Frontend", items: ["JavaScript (ES6+)", "TypeScript", "React", "Next.js", "Tailwind CSS", "HTML5/CSS3"] },
    { category: "Backend & Cloud", items: ["FastAPI", "Node.js", "Google Cloud (GCP)", "Docker", "PostgreSQL", "SQLite"] },
    { category: "Tools & DevOps", items: ["Git / GitHub Actions", "VS Code", "Cursor", "Linux", "Figma"] }
  ],

  projects: [
    {
      id: 1,
      title: "Agentic Web Workflow Platform",
      category: "ai",
      period: "2026.03 - 2026.07",
      description: "Antigravity 2.0 및 MCP 서버를 연동하여 코드 리뷰, 브라우저 검증, 자동 배포를 수행하는 다중 에이전트 관제 대시보드입니다.",
      tags: ["Python", "Antigravity SDK", "FastAPI", "Tailwind CSS", "MCP"],
      demoUrl: "https://example.com/demo1",
      githubUrl: "https://github.com/example/agentic-platform",
      badge: "Featured"
    },
    {
      id: 2,
      title: "Intelligent Weblog & Docs Hub",
      category: "web",
      period: "2025.10 - 2026.01",
      description: "마크다운 기반의 정적 문서 엔진과 시맨틱 검색 에이전트를 결합한 초경량 개인 지식 베이스 웹앱입니다.",
      tags: ["Vanilla JS", "HTML5/CSS3", "Markdown", "Vector Search"],
      demoUrl: "https://example.com/demo2",
      githubUrl: "https://github.com/example/weblog-hub",
      badge: "Popular"
    },
    {
      id: 3,
      title: "Cloud Infrastructure Auto-Scaler",
      category: "cloud",
      period: "2025.04 - 2025.08",
      description: "Google Cloud Run 및 이벤트 트리거를 활용하여 트래픽 스파이크 시 컨테이너를 자율 확장하는 오케스트레이터입니다.",
      tags: ["Google Cloud", "Docker", "Terraform", "Python"],
      demoUrl: "https://example.com/demo3",
      githubUrl: "https://github.com/example/cloud-autoscaler",
      badge: null
    }
  ],

  experiences: [
    {
      company: "ETRI",
      role: "Lead Software Architect",
      period: "1989.02 - 현재",
      description: [
        "자율형 멀티 에이전트 시스템 및 내부 자동화 파이프라인 아키텍처 총괄",
        "MCP 기반 사내 데이터 커넥터 구축으로 개발자 온보딩 및 리서치 효율 40% 향상",
        "클라우드 인프라 리팩토링을 통한 월 서버 비용 25% 절감"
      ]
    },
    {
      company: "Dawol Software",
      role: "Senior Full-Stack Engineer",
      period: "2023.03 - 2024.12",
      description: [
        "모바일 최적화 B2B SaaS 웹 애플리케이션 프론트엔드/백엔드 코어 모듈 개발",
        "디자인 시스템 구축 및 Tailwind CSS 기반 모바일 반응형 표준 정립",
        "CI/CD 자동화 파이프라인 도입으로 배포 주기 단축 (주 1회 -> 일 3회)"
      ]
    },
    {
      company: "Inno Platform",
      role: "Frontend Developer",
      period: "2021.06 - 2023.02",
      description: [
        "단일 페이지 웹 애플리케이션(SPA) 반응형 UI 컴포넌트 개발",
        "웹 성능 최적화(Core Web Vitals)를 통해 LCP 1.8초 달성"
      ]
    }
  ]
};
