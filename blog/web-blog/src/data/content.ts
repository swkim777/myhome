import { SiteContent } from '../types';

export const siteContent: SiteContent = {
  title: 'JOWON AI Blog',
  headline: '생성형 AI와 웹 기술의 만남, 창작과 코드의 기록',
  primaryCtaText: '최신 프로젝트',
  profile: {
    name: 'Jowon',
    role: '생성형 AI 크리에이터 & 개발자',
    headline: '이론에 그치지 않고 바로 실무에 쓸 수 있는 구체적인 프롬프트와 개발 코드',
    bio: '생성형 AI와 웹 기술을 결합하여 새로운 디지털 경험과 프로덕트를 만듭니다. 복잡한 이론보다 실제 작동하는 코드와 워크플로를 중시하며, 프롬프트 엔지니어링부터 풀스택 웹 구현, AI 미디어 제작까지 1인 제작자로서 실험한 모든 과정을 기록합니다.',
    detailedBio: [
      '소프트웨어 엔지니어링의 정밀함과 크리에이티브 미디어의 직관을 결합하는 실험을 지속하고 있습니다.',
      '혼자서도 아이디어를 기획, 개발, 음악, 영상까지 완결성 있는 하나의 프로덕트로 만들어내는 1인 제작자(Solo Maker) 문화를 지향합니다.'
    ],
    avatarSrc: '/blog/web-blog/assets/jowon.jpg',
    keywords: ['AI', '강의', '클라우드', 'Next.js', 'TypeScript', 'Prompt Engineering']
  },
  appTools: [
    {
      id: 'app-1',
      category: '일반앱',
      title: '범용 웹 애플리케이션',
      summary: '일상의 문제를 해결하고 직관적인 사용자 경험을 제공하는 모던 웹 애플리케이션 모음입니다.',
      status: '작성 중',
      tags: ['Next.js', 'React', 'Utility']
    },
    {
      id: 'app-2',
      category: '업무',
      title: '업무 자동화 및 워크스페이스',
      summary: '반복 작업을 자동화하고 작업 효율을 극대화하는 생산성 도구 및 에이전트 인터페이스입니다.',
      status: '작성 중',
      tags: ['Automation', 'CLI', 'Productivity']
    },
    {
      id: 'app-3',
      category: '미디어',
      title: 'AI 미디어 창작 도구',
      summary: '생성형 이미지, 오디오, 비디오 파이프라인을 제어하고 후반 작업을 돕는 미디어 제작 툴입니다.',
      status: '작성 중',
      tags: ['Media', 'Suno', 'Runway', 'Pipeline']
    }
  ],
  portfolioItems: [
    {
      id: 'portfolio-1',
      title: 'Fullstack AI Agent Pipeline',
      category: 'Agent Architecture',
      description: '로컬 환경 및 클라우드를 연동하여 코드 생성, 테스트, 배포를 자율 수행하는 멀티 에이전트 시스템 아키텍처.',
      tags: ['Next.js', 'TypeScript', 'Tailwind', 'AI Agent'],
      year: '2026'
    },
    {
      id: 'portfolio-2',
      title: 'Cloud & AI Lecture Curriculum',
      category: 'Education & Tech',
      description: '실무 엔지니어와 크리에이터를 위한 생성형 AI 실전 활용 및 클라우드 아키텍처 강의 커리큘럼.',
      tags: ['Cloud', 'Lecture', 'Curriculum', 'Prompting'],
      year: '2026'
    },
    {
      id: 'portfolio-3',
      title: 'Autonomous Media Production Kit',
      category: 'Creative Production',
      description: '프롬프트 시퀀싱부터 음악 합성, 비디오 렌더링까지 결합한 1인 시네마틱 미디어 프로덕션 파이프라인.',
      tags: ['AI Media', 'Suno', 'Midjourney', 'Workflow'],
      year: '2026'
    }
  ],
  blogCategories: [
    'AI',
    'IT',
    '소설',
    '여행',
    '영화',
    '재테크',
    '책',
    '기타'
  ],
  blogPosts: [
    {
      id: 'post-1',
      category: '일반앱',
      title: '일반앱',
      summary: '범용의 웹앱',
      status: '작성 중',
      publishedAt: '2026.11',
      slug: 'general-webapp'
    },
    {
      id: 'post-2',
      category: '업무',
      title: '업무',
      summary: '일상 작업',
      status: '작성 중',
      publishedAt: '2026.11',
      slug: 'daily-work-automation'
    },
    {
      id: 'post-3',
      category: '미디어',
      title: '미디어',
      summary: '미디어 관련 앱',
      status: '작성 중',
      publishedAt: '2026.11',
      slug: 'media-related-apps'
    }
  ],
  recentWorks: [
    {
      id: 'rw-1',
      title: 'JOWON AI Web Platform',
      category: 'Web Platform',
      description: 'Next.js 15와 Tailwind CSS, 다크 모드를 탑재한 고성능 개인 포트폴리오 및 기술 블로그 플랫폼 릴리스.',
      date: '2026.11',
      badge: 'Release v1.0'
    },
    {
      id: 'rw-2',
      title: 'AI Prompt Engineering Lab',
      category: 'Research',
      description: '최신 멀티모달 LLM과 에이전트 시스템을 위한 고정밀 프롬프트 템플릿 및 벤치마킹 실험.',
      date: '2026.10',
      badge: 'In Progress'
    },
    {
      id: 'rw-3',
      title: 'Cloud Deployment Pipeline',
      category: 'DevOps',
      description: 'GitHub Actions와 Vercel/Netlify를 연동한 제로 다운타임 엣지 자동 배포 파이프라인 구축.',
      date: '2026.10',
      badge: 'Completed'
    }
  ],
  externalLinks: [
    {
      name: 'GitHub',
      url: 'https://github.com/swkim777/',
      label: 'GitHub 프로필 방문'
    },
    {
      name: 'YouTube',
      url: 'https://youtube.com/@JowonLife',
      label: 'YouTube 채널 (@JowonLife) 방문'
    }
  ]
};
