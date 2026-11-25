# Product Requirements Document (PRD) - JOWON AI Blog

## 1. 프로젝트 목적
- **개요**: 생성형 AI 도구 활용, 모던 웹 프론트엔드 개발, AI 미디어 제작, 클라우드 및 강의 경험을 체계적으로 공유하는 개인 기술 포트폴리오 겸 블로그 구축.
- **핵심 목표**:
  - 방문자가 첫 화면 진입 시 운영자(Jowon)의 정체성(생성형 AI 크리에이터 & 개발자)과 핵심 전문 영역을 즉시 인지.
  - 최신 작업(Recent Works)과 실전 앱/도구(App & Tool)로 빠르게 진입하도록 유도.
  - 이론에 그치지 않고 바로 실무에 쓸 수 있는 구체적인 프롬프트와 개발 코드를 제공하여 방문자에게 실질적인 가치 전달.

---

## 2. 대상 사용자 (Target Audience)
| 사용자 그룹 | 주요 관심사 및 니즈 | 블로그가 제공하는 가치 |
| :--- | :--- | :--- |
| **생성형 AI 크리에이터 & 개발자** | 실전 AI 앱 제작, 프롬프트 엔지니어링, 풀스택 워크플로 | 실제 작동하는 웹앱, 미디어 제작 파이프라인, 오픈소스 코드 |
| **IT & 클라우드 학습자** | Next.js, TypeScript, 모던 클라우드 배포 및 개발 강의 자료 | 실무 중심의 체계적인 강의 콘텐츠 및 기술 아카이브 |
| **개인 창작자 및 일반 독자** | 소설, 영화, 여행, 재테크, 독서 등 다양한 주제의 인사이트 | 기술과 인문학적 창작이 결합된 다채로운 에세이 및 리뷰 |

---

## 3. 핵심 사용자 흐름 (Core User Journey)
```
[방문자 진입]
       │
       ▼
[1. Hero 인지]
  - 블로그 타이틀 ("JOWON AI Blog") & 헤드라인
  - 다크/라이트 모드 선택
  - 주 행동: [최신 프로젝트] CTA 클릭
       │
       ├─────────────────────────────────┐
       ▼                                 ▼
[2. Recent Works & Portfolio]    [3. App & Tool 탐색]
  - 대표 프로젝트 및 실제 작업물 확인     - 일반앱, 업무, 미디어 웹앱 탐색
       │                                 │
       └────────────────┬────────────────┘
                        │
                        ▼
[4. Blog 아카이브]
  - 8대 카테고리(AI, IT, 소설, 여행, 영화, 재테크, 책, 기타) 필터링
                        │
                        ▼
[5. Profile & Contacts]
  - Jowon 소개, 철학, 기술 스택, GitHub/YouTube 외부 링크 확인
```

---

## 4. MVP 기능 범위 (In-Scope)
- **1) Header**:
  - 브랜드 로고 (`JOWON AI Blog`)
  - 6대 섹션 내비게이션: `Profile`, `App & Tool`, `Portfolio`, `Blog`, `Recent Works`, `Contacts`
  - 라이트/다크 모드 전환 스위치 (Theme Toggle)
  - 모바일 반응형 내비게이션
- **2) Hero Section**:
  - 역할 배지 (`생성형 AI 크리에이터 & 개발자`)
  - 메인 헤드라인: "생성형 AI와 웹 기술의 만남, 창작과 코드의 기록"
  - 주 CTA 버튼: `최신 프로젝트` (Recent Works로 연결)
- **3) 6대 핵심 섹션 구조**:
  - `Profile`: 운영자 소개글, 철학, 프로필 사진(`assets/jowon.jpg`), 주요 기술 스택
  - `App & Tool`: 범용 웹앱, 업무 자동화, 미디어 관련 도구 쇼케이스
  - `Portfolio`: 대표 작업 및 주요 프로젝트 큐레이션
  - `Blog`: 8대 글 분류(`AI`, `IT`, `소설`, `여행`, `영화`, `재테크`, `책`, `기타`) 및 대표 글 3편(`일반앱`, `업무`, `미디어`)
  - `Recent Works`: 최신 공개 프로젝트 타임라인 및 작업물
  - `Contacts`: GitHub(`https://github.com/swkim777/`), YouTube(`@JowonLife`) 등 공식 채널
- **4) 테마 & 접근성 (A11y)**:
  - 라이트 모드 / 다크 모드 테마 영속성(localStorage / system preference 지원)
  - WCAG 2.1 AA 명도비 준수 (중립색 베이스 + 파란색 액센트)
  - 키보드 탐색 포커스 링 시각화 및 스킵 내비게이션
- **5) 배포 환경**:
  - Next.js (App Router) + TypeScript + Tailwind CSS
  - Vercel 및 Netlify CI/CD 자동 배포 지원

---

## 5. 제외 범위 (Out-of-Scope for MVP)
- 사용자 직접 연락처/이메일 공개 노출 (사용자 요청에 따라 미공개 원칙 준수)
- RSS 피드, 뉴스레터 구독 폼, 방문자 댓글 시스템 (초기 버전 미포함)
- 회원가입/로그인 등 사용자 계정 관리 시스템

---

## 6. 완료 기준 (Definition of Done)
1. **정확한 정보 일치**: [content-input.md](file:///c:/Users/ADMIN/Desktop/Antigravity/web/web-blog/content-input.md)의 모든 데이터(이름, URL, 카테고리 등)가 100% 일치.
2. **다크 모드 정상 구동**: 버튼 클릭 시 깜빡임 없이 부드럽게 라이트/다크 테마가 전환되고 상태가 유지됨.
3. **타입 안전성 및 린트**: TypeScript strict 모드 빌드 에러 0건.
4. **반응형 보장**: 모바일(375px), 태블릿(768px), 데스크톱(1024px+) 전 환경에서 깨짐 없는 레이아웃.
5. **Vercel/Netlify 빌드 성공**: `npm run build` 결과물이 에러 없이 생성되며 클라우드 플랫폼에 정상 배포.
