import { defineConfig } from 'astro/config';

export default defineConfig({
  server: { port: 4321 },
  devToolbar: { enabled: false },
  vite: {
    // O conteúdo mora fora do projeto, em ../manga.
    server: { fs: { allow: ['..'] } },
  },
});
