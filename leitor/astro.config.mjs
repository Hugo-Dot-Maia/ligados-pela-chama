import { defineConfig } from 'astro/config';

export default defineConfig({
  // No Node 24, "localhost" pode escutar só em IPv6 (::1) e quebrar o recarregamento
  // automático em navegadores que usam 127.0.0.1. Fixar o IPv4 mantém o acesso só local.
  server: { port: 4321, host: '127.0.0.1' },
  devToolbar: { enabled: false },
  vite: {
    // O conteúdo mora fora do projeto, em ../manga.
    server: { fs: { allow: ['..'] } },
  },
});
