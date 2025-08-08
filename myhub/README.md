
# 조원 — 개인 홈페이지 (폴더별 1파일 구조)

각 섹션이 **자기 폴더 내 `index.html` 1개**로 구성된 GitHub Pages 템플릿입니다.
- 모든 페이지는 **순수 HTML/CSS/JS**이며, **내장(Inline) 스타일/스크립트**로 동작합니다.
- GitHub Pages에서 예쁜 경로(`/about/` 등)를 사용합니다.

## 구조
```
/
├─ index.html                # 홈
├─ about/ index.html
├─ portfolio/ index.html
├─ blog/ index.html
├─ ai-tech-columns/ index.html
├─ ai-news/ index.html
├─ lecture/ index.html
├─ contact/ index.html
└─ .nojekyll
```

## 배포
1. 새 리포지토리 생성(예: `jowon-site`).
2. 이 폴더 전체를 업로드(루트에 배치).
3. GitHub → Settings → Pages → **Deploy from a branch** → `main` / `/ (root)` 저장.
4. 잠시 후 `https://<username>.github.io/<repo>/`에서 확인.

## 팁
- 링크는 현재 파일 위치에 맞는 **상대경로**로 설정되어 있습니다.
- 새로운 메뉴를 추가하려면 폴더를 새로 만들고 `index.html`을 복사해 수정하세요.
- 다크모드: 우측 상단 버튼으로 `system → light → dark` 전환.

© 2025 MIT License
