# Alex Rivera — Personal Blog Web App

A high-performance, lightweight, and modern personal blog website optimized for static hosting on **GitHub Pages**. 

Built entirely with pure HTML5, CSS3 (Variables + Grid/Flexbox), and Vanilla JavaScript—no external frameworks or heavy libraries required.

---

## ✨ Features

- 🌓 **Dynamic Theme Toggle**: Seamless dark and light mode transitions caching preferences in `localStorage`.
- ⚡ **Zero-Dependency SPA Routing**: Responsive client-side routing using URL hashes (`#post/post-id`), allowing seamless transitions and shareable deep links.
- 🔍 **Interactive Filtering**: Real-time article search and category-pill filters.
- 🎨 **Rich Modern Aesthetics**: Responsive layout using custom HSL colors, smooth cards hover lift states, floating profile avatars, and glassmorphic navigation headers.
- 🚀 **GitHub Pages Deployment CI/CD**: Ready-to-go GitHub Actions configuration to build and deploy code automatically on branch pushes.
- 🧪 **Lightweight Integrity Testing**: Custom automated Node-based test script to verify DOM layouts, code tags, variables, and schema validity.

---

## 📁 File Structure

```text
BlogPage/
├── .github/
│   └── workflows/
│       └── deploy.yml   # GitHub Actions deployment workflow
├── assets/
│   └── img/
│       ├── profile.png  # Generated profile avatar
│       ├── article1.png # CSS Design Systems article banner
│       ├── article2.png # SPA Routing article banner
│       └── article3.png # Focus-mode article banner
├── index.html           # Main semantic structure and SEO meta tags
├── style.css            # Responsive layout & custom CSS variables
├── main.js              # State logic, hash-router, and Markdown parser
├── data.js              # Local database of profile information and posts
├── test.js              # Test script checking layout structure
└── package.json         # Scripts and project configurations
```

---

## 🛠️ Local Setup & Running

Because this is a pure static page, you do not need any compilation step!

### 1. Installation
Clone the repository and run:
```bash
npm install
```

### 2. Run Locally
You can open `index.html` directly in any modern browser, or use a lightweight local server (such as Visual Studio Code Live Server) to run it locally.

### 3. Run Automated Tests
Execute the custom validation suite to verify syntax and file structures:
```bash
npm test
```

---

## 🚀 Deploying to GitHub Pages

This project comes preconfigured with GitHub Actions to handle pages publication:

1. Push your repository to your GitHub account.
2. In your repository on GitHub, navigate to **Settings** -> **Pages**.
3. Under **Build and deployment** -> **Source**, select **GitHub Actions** (instead of Deploy from branch).
4. The `.github/workflows/deploy.yml` workflow will automatically trigger on pushes to the `main` branch, building and deploying your blog page in minutes.
