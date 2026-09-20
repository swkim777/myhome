import path from 'path';
import fs from 'fs';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
    let apiKey = '';
    const envLocalPath = path.resolve(__dirname, '.env.local');
    if (fs.existsSync(envLocalPath)) {
      const content = fs.readFileSync(envLocalPath, 'utf-8');
      const match = content.match(/GEMINI_API_KEY=["']?([^"'\r\n]+)["']?/);
      if (match && match[1]) {
        apiKey = match[1].trim();
      }
    }

    if (!apiKey) {
      const env = loadEnv(mode, __dirname, '');
      apiKey = env.GEMINI_API_KEY || '';
    }

    // 프로덕션 빌드(배포 번들)에서는 비밀 키 유출 방지를 위해 번들에 하드코딩하지 않고,
    // 개발 모드(npm run dev)에서만 로컬 .env.local의 키를 주입합니다.
    const isDev = mode === 'development';
    const finalApiKey = isDev ? apiKey : '';

    return {
      base: './',
      define: {
        'process.env.API_KEY': JSON.stringify(finalApiKey),
        'process.env.GEMINI_API_KEY': JSON.stringify(finalApiKey)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
