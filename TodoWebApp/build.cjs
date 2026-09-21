const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const indexHtmlPath = path.join(rootDir, 'index.html');
const distHtmlPath = path.join(rootDir, 'dist', 'index.html');
const distAssetsDir = path.join(rootDir, 'dist', 'assets');
const targetAssetsDir = path.join(rootDir, 'assets');

const sourceIndexHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="./vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>FocusMode - Todo WebApp</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`;

console.log('[build.js] Setting up source index.html for Vite...');
fs.writeFileSync(indexHtmlPath, sourceIndexHtml, 'utf8');

console.log('[build.js] Running tsc && vite build...');
execSync('npx tsc && npx vite build', { stdio: 'inherit', cwd: rootDir });

console.log('[build.js] Deploying built assets to root...');
if (fs.existsSync(distHtmlPath)) {
  fs.copyFileSync(distHtmlPath, indexHtmlPath);
}

if (fs.existsSync(distAssetsDir)) {
  if (!fs.existsSync(targetAssetsDir)) {
    fs.mkdirSync(targetAssetsDir, { recursive: true });
  }
  const existingFiles = fs.readdirSync(targetAssetsDir);
  for (const f of existingFiles) {
    fs.unlinkSync(path.join(targetAssetsDir, f));
  }
  const newFiles = fs.readdirSync(distAssetsDir);
  for (const f of newFiles) {
    fs.copyFileSync(path.join(distAssetsDir, f), path.join(targetAssetsDir, f));
  }
}

console.log('[build.js] Build & deploy sync completed successfully!');
