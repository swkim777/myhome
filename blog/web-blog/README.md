# 🚀 JOWON AI Blog

생성형 AI와 웹 기술의 만남, 창작과 코드의 기록을 담은 **Jowon**의 개인 포트폴리오 및 기술 블로그입니다.  
이론에 그치지 않고 바로 실무에 쓸 수 있는 구체적인 프롬프트와 개발 코드를 공유합니다.

---

## 🛠 Tech Stack
- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Theme**: Light / Dark Mode Toggle (`next-themes` or Custom Theme Context)
- **Deployment**: [Vercel](https://vercel.com/) / [Netlify](https://www.netlify.com/)

---

## 📂 Information Architecture (6 Core Sections)
1. **Profile**: 생성형 AI 크리에이터 & 개발자 Jowon 소개, 철학, 기술 스택
2. **App & Tool**: 일반앱, 업무, 미디어 관련 애플리케이션 및 유용한 도구 쇼케이스
3. **Portfolio**: 대표 작업 및 주요 프로젝트 큐레이션
4. **Blog**: 8대 카테고리(`AI`, `IT`, `소설`, `여행`, `영화`, `재테크`, `책`, `기타`) 기반 아카이브
5. **Recent Works**: 최신 프로젝트 및 릴리스 타임라인 (주 CTA 연결 목적지)
6. **Contacts**: 공식 GitHub 및 YouTube 채널 연결 (직접 연락처는 미공개)

---

## 💻 로컬 개발 환경 실행 (Getting Started)

### 1. 패키지 설치
```bash
npm install
```

### 2. 로컬 개발 서버 실행
```bash
npm run dev
```
브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속하여 실시간 변경 사항을 확인합니다.

### 3. 프로덕션 빌드 및 검사
```bash
npm run build
npm run start
```

---

## ✍️ 신규 글 및 프로젝트 작성 방법 (Content Guide)

본 블로그의 콘텐츠는 외부 데이터베이스 없이 로컬 TypeScript 데이터셋을 단일 진실 공급원(SSOT)으로 사용합니다.

- **새 블로그 글 추가**:
  `src/data/content.ts` (또는 `blogData.ts`)의 `blogPosts` 배열에 아래 형식으로 객체를 추가합니다:
  ```typescript
  {
    id: 'post-new-id',
    category: 'AI', // 8대 카테고리 중 선택: AI, IT, 소설, 여행, 영화, 재테크, 책, 기타
    title: '새로운 글 제목',
    summary: '한 줄 요약 내용',
    status: '게시됨', // '게시됨' | '작성 중' | '추후 작성'
    publishedAt: '2026.11.12',
    slug: 'new-post-slug'
  }
  ```
- **새 프로젝트 / 앱 추가**:
  `src/data/content.ts`의 `recentWorks` 또는 `appTools` 배열에 새 항목을 추가하면 화면에 즉시 자동 반영됩니다.

---

## 🌐 클라우드 배포 가이드 (Vercel & Netlify)

### 1. Vercel 원클릭 배포 (권장)
1. GitHub 저장소(`https://github.com/swkim777/<repo-name>`)에 코드를 푸시합니다.
2. [Vercel 대시보드](https://vercel.com/)에 로그인 후 **"Add New Project"**를 클릭합니다.
3. 해당 GitHub 저장소를 선택(Import)합니다.
4. Framework Preset이 **Next.js**로 자동 인식되는지 확인합니다.
5. **"Deploy"** 버튼을 누르면 1~2분 내에 글로벌 엣지 네트워크에 자동 배포됩니다.
   - 이후 `main` 브랜치에 코드를 푸시할 때마다 자동 빌드 및 미리보기가 생성됩니다.

### 2. Netlify 배포
1. [Netlify 대시보드](https://app.netlify.com/)에서 **"Add new site" > "Import an existing project"**를 선택합니다.
2. GitHub 저장소를 연결합니다.
3. Build command: `npm run build`, Publish directory: `.next` 설정 확인 후 **"Deploy site"**를 클릭합니다.

---

## 📄 License & Contact
- **Creator**: Jowon (`생성형 AI 크리에이터 & 개발자`)
- **GitHub**: [https://github.com/swkim777/](https://github.com/swkim777/)
- **YouTube**: [@JowonLife](https://youtube.com/@JowonLife)
- Copyright © 2026 JOWON AI Blog. All rights reserved.
