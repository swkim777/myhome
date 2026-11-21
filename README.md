# 🏠 Jowon Home (Interactive Digital Hub)

AI & Cloud 아키텍처, 포트폴리오, 생성형 AI 도구, 미디어 유틸리티 및 웹 애플리케이션을 통합 관리하는 개인 대시보드 허브입니다.

---

## 📌 프로젝트 개요 (Overview)

* **프로젝트명**: Jowon Home - Interactive Digital Hub
* **소유자/작성자**: Jowon (`AI & Cloud Architector`, `swkim777@gmail.com`)
* **형태**: 모던 반응형 단일 페이지 대시보드 (SPA) 및 37개 독립 웹앱 모음
* **기반 기술**: Vanilla JS, React, TypeScript, Tailwind CSS, Node.js (경량 내장 서버)

---

## 🚀 주요 기능 및 대시보드 구성

메인 대시보드(`index.html`)는 좌측 내비게이션을 통해 주요 메뉴와 카테고리를 체계적으로 탐색할 수 있습니다.

### 1. 대시보드 허브 (Overview & Navigation)
* **통계 및 현황**: 전체 등록 앱(Total Apps: 37개), 주요 프로젝트 상태, 최근 업데이트 내역 실시간 확인
* **포트폴리오 (Portfolio)**: VERTEX 산악 플랫폼, DaolIS 경력, AI 강의 이력 등 주요 9대 핵심 프로젝트 쇼케이스
* **블로그 (Blog)**: JowonPlace(인기 여행지 추천), 감성 미니 블로그 및 Google Apps Script 연동 글 관리 시스템

### 2. 앱 & 도구 (Apps & Tools - 총 37개)

| 카테고리 | 대표 앱 및 도구 | 주요 기능 및 설명 |
| :--- | :--- | :--- |
| **🎬 미디어 (Media)** | **LineArt** | SVG 기반 실시간 인터랙티브 라인아트 애니메이션 (Walker, Village, Backyard 씬) |
| | **Image Extractor** | HTML5 Canvas 기반 동영상 시점별 다중 프레임 캡처 및 이미지 추출기 |
| | **AI 이미지 에디터** | Gemini AI 기반 이미지 업로드 및 자연어 프롬프트 분위기 변환 에디터 |
| | **이미지 생성 스튜디오** | Gemini Imagen 모델을 활용한 고화질 생성 스튜디오 (`nanobanana`) |
| | **캐릭터 시트 / 뮤직 플레이어** | AI 기반 멀티뷰 캐릭터 시트 생성기 및 미니멀 오디오/뮤직 플레이어 |
| **✨ 프롬프트 (Prompt)** | **Prompt Studio** | Gemini 전략 기반 7단계 대화형 고도화 프롬프트 생성기 |
| | **Slide Prompt Maker** | AI 기반 프레젠테이션 슬라이드 및 학술 가이드 프롬프트 빌더 |
| **💼 업무 & 금융 (Work & Finance)** | **페인트웹앱** | 전국 대리점 페인트 매입 목표·실적 분석 영업 상황판 (Vercel 배포) |
| | **Todo WebApp** | React & Vite 기반 모던 할 일 관리 및 생산성 도구 |
| | **금융 뉴스 & 경제 전망** | 실시간 금융 뉴스 대시보드, 2025/2026 한국 경제 전망 보고서 |
| **📱 일반 앱 (General Apps)** | **AI & 리소스 허브** | OpenAI / Google 모델 탐색, 인공지능 개념 구조 인포그래픽 |
| | **유틸리티** | 다기능 테마별 계산기 패키지, 아날로그 시계 등 |
| **🎮 게임 (Games)** | **제미니 타로** | Gemini API 기반 타로 카드 셔플, 스프레드 리딩 및 운세 해석 |
| | **레트로 게임** | 클래식 웹 테트리스, 너구리(Racoon) 레트로 아케이드 |

---

## 📂 디렉토리 구조 (Directory Structure)

```text
myhome/
├── index.html                 # 메인 대시보드 허브 (Tailwind SPA)
├── server.js / server.cjs     # 무의존성 내장 Node.js 정적 웹 서버
├── start.bat                  # 윈도우 원클릭 서버 실행 스크립트
├── package.json               # 프로젝트 설정 및 실행 스크립트
│
├── ImageTools/                # 미디어 및 이미지 처리 도구 패키지
│   ├── ImageEditor/           # Gemini AI 기반 사진 편집기
│   ├── ImageExtract/          # 동영상 프레임 이미지 추출기
│   └── line-art-animation/    # SVG 라인아트 애니메이션 라이브러리 및 씬 (Vite/TS)
│
├── prompt/                    # 프롬프트 엔지니어링 웹앱 모음
│   ├── prompt-creator/        # Prompt Studio (7단계 대화형 프롬프트 생성기)
│   └── slide-prompt/          # Slide Prompt Maker (발표 슬라이드 프롬프트 빌더)
│
├── TodoWebApp/                # React & Vite 기반 할 일 관리 웹앱
├── nanobanana/                # Imagen AI 이미지 생성 스튜디오
├── Tarot/                     # Gemini API 연동 웹 타로 카드
├── MobileApp/                 # 모바일 퍼스트 포트폴리오 & 블로그
├── FinNews/ & finance/        # 금융 뉴스 대시보드 및 경제 전망 보고서
├── blog/ & BlogPage/          # 개인 블로그 및 JowonPlace 추천 여행지
├── game/                      # 테트리스, 너구리 등 웹 게임
├── audio/                     # 브라우저 오디오 편집기
└── chatgpt/                   # 뮤직 플레이어, 계산기, 시계 등
```

---

## 🛠️ 기술 스택 (Tech Stack)

* **Frontend**: HTML5, CSS3, JavaScript (ES6+), React, TypeScript, Tailwind CSS, Lucide Icons, Vite
* **Backend & Server**: Node.js (내장 `http`, `fs`, `path` 모듈 기반 무설치 정적 웹 서버)
* **AI & API Integration**: Google Gemini API (Gemini Flash, Imagen 3, 프롬프트 전략)
* **Graphics & Animation**: SVG DOM Manipulations, Canvas API, Line-Art Physics Engine (gait, springs, day/night)

---

## 🏃‍♂️ 로컬 실행 방법 (How to Run Locally)

Node.js 환경이 준비되어 있다면 외부 라이브러리 설치(`npm install`) 없이 즉시 실행할 수 있습니다.

### 1. 배치 파일 실행 (Windows 권장)
* [start.bat](file:///c:/Users/ADMIN/Desktop/git/myhome/start.bat) 파일을 더블 클릭하면 사용 가능한 포트(기본 `3000`)로 서버가 즉시 구동되고 브라우저가 자동 실행됩니다.

### 2. npm 스크립트 실행
```bash
npm start
# 또는
npm run dev
```

### 3. Node.js 직접 실행
```bash
node server.js
```
* 서버 구동 후 웹 브라우저에서 `http://localhost:3000`에 접속합니다.

---

## 📌 라이선스 (License)

* 본 프로젝트는 [ISC License](LICENSE)를 따릅니다.
