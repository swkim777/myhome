import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: {
        index: resolve(import.meta.dirname, 'index.html'),
        walker: resolve(import.meta.dirname, 'examples/walker/index.html'),
        village: resolve(import.meta.dirname, 'examples/village/index.html'),
        backyard: resolve(import.meta.dirname, 'examples/backyard/index.html'),
      },
    },
  },
});
