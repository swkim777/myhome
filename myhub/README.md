
# 조원 — 개인 홈페이지 (GitHub Pages)

순수 HTML/CSS/JS로 구성된 개인 사이트 초기 템플릿입니다.

## 폴더 구조
```
/
├── index.html
├── about.html
├── portfolio.html
├── blog.html
├── ai-tech-columns.html
├── ai-news.html
├── lecture.html
├── contact.html
├── assets/
│   ├── style.css
│   ├── main.js
│   └── favicon.svg
└── .nojekyll
```

## GitHub Pages 배포
1. 새 리포지토리 생성 (예: `jowon-site`).
2. 이 템플릿 파일을 리포지토리 루트에 업로드.
3. GitHub → Settings → Pages → **Source: Deploy from a branch** → **Branch: `main` / `/ (root)`** 선택 → Save.
4. 잠시 후 `https://<your-username>.github.io/<repo>/` 에서 확인.

## 사용 팁
- 메뉴/푸터는 각 파일에 공통으로 포함되어 있습니다. 페이지 추가 시 기존 파일을 복사해 사용하세요.
- 다크모드 전환은 우측 상단 버튼으로 `system → light → dark` 순환합니다.
- `ai-news.html`과 `ai-tech-columns.html`에는 필터가 포함되어 있으며, 카드 복제/편집만으로 손쉽게 갱신 가능합니다.
- 고급 기능(API 연동, RSS 자동화 등)을 원하면 Netlify Functions/Vercel Edge Functions 또는 GitHub Actions를 연결하세요.

## 라이선스
본 템플릿은 MIT 라이선스로 자유롭게 수정/배포할 수 있습니다.
