/**
 * myhome 로컬 정적 웹 서버 (Node.js 기본 내장 모듈 기반)
 * 외부 라이브러리(node_modules) 설치 없이 즉시 실행 가능합니다.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const DEFAULT_PORT = 3000;
const ROOT_DIR = __dirname;

// 파일 확장자별 MIME 타입 맵
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.htm': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.mp4': 'video/mp4',
  '.pdf': 'application/pdf',
  '.txt': 'text/plain; charset=utf-8'
};

// 기본 브라우저 열기 함수
function openBrowser(url) {
  const startCommand = process.platform === 'win32' ? `start ${url}` :
                       process.platform === 'darwin' ? `open ${url}` : `xdg-open ${url}`;
  exec(startCommand, (err) => {
    if (err) {
      // 브라우저 열기 실패 시 무시 (수동 접속 가능)
    }
  });
}

// HTTP 요청 핸들러
function handleRequest(req, res) {
  // CORS 및 캐시 헤더 설정 (로컬 개발 편의성)
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Method Not Allowed');
    return;
  }

  // URL에서 쿼리스트링 분리 및 디코딩 (한글 경로 지원)
  let cleanUrl = req.url.split('?')[0];
  try {
    cleanUrl = decodeURIComponent(cleanUrl);
  } catch (e) {
    // 디코딩 실패 시 원래 url 사용
  }

  let filePath = path.join(ROOT_DIR, cleanUrl);

  // 상위 경로 탈출 방지 보안 검사
  if (!filePath.startsWith(ROOT_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`
        <!DOCTYPE html>
        <html lang="ko">
        <head><meta charset="utf-8"><title>404 Not Found</title></head>
        <body style="font-family: sans-serif; text-align: center; padding: 50px;">
          <h2>페이지를 찾을 수 없습니다 (404 Not Found)</h2>
          <p>요청 경로: <code>${cleanUrl}</code></p>
          <a href="/">홈으로 돌아가기</a>
        </body>
        </html>
      `);
      return;
    }

    // 디렉토리인 경우 index.html 서빙
    if (stats.isDirectory()) {
      // 슬래시로 끝나지 않으면 리디렉션 처리하여 상대 경로 보장
      if (!req.url.split('?')[0].endsWith('/')) {
        const query = req.url.includes('?') ? req.url.substring(req.url.indexOf('?')) : '';
        res.writeHead(301, { 'Location': req.url.split('?')[0] + '/' + query });
        res.end();
        return;
      }
      filePath = path.join(filePath, 'index.html');
    }

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Server Error: ' + readErr.code);
        return;
      }

      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';

      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    });
  });
}

// 사용 가능한 포트를 찾아 서버 구동
function startServer(port) {
  const server = http.createServer(handleRequest);

  server.listen(port, '0.0.0.0', () => {
    const localUrl = `http://localhost:${port}`;
    console.log('========================================================');
    console.log('🚀 myhome 로컬 웹 서버가 성공적으로 실행되었습니다!');
    console.log(`🌐 접속 주소: ${localUrl}`);
    console.log('🛑 서버를 종료하려면 [Ctrl + C]를 누르세요.');
    console.log('========================================================');

    // 서버 시작 시 기본 웹 브라우저 자동 오픈
    openBrowser(localUrl);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`⚠️ 포트 ${port}번이 이미 사용 중입니다. 다음 포트(${port + 1})로 재시도합니다...`);
      startServer(port + 1);
    } else {
      console.error('서버 실행 오류:', err);
    }
  });
}

// 서버 실행 시작
startServer(DEFAULT_PORT);
