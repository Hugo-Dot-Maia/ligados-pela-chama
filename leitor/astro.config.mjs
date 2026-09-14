import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';

const pastaManga = path.resolve(fileURLToPath(new URL('../manga', import.meta.url)));

/**
 * O Vite só vigia arquivos dentro de leitor/. Sem isto, imagens criadas ou movidas
 * em ../manga não entram no import.meta.glob até reiniciar o servidor.
 */
function vigiarManga() {
  return {
    name: 'vigiar-manga',
    configureServer(server) {
      server.watcher.add(pastaManga);

      let pendente;
      const aoMudar = (arquivo) => {
        const absoluto = path.resolve(arquivo).toLowerCase();
        if (!absoluto.startsWith(pastaManga.toLowerCase())) return;
        if (!/\.(png|md)$/.test(absoluto)) return;
        // Agrupa mudanças em lote (ex.: várias imagens movidas de uma vez).
        clearTimeout(pendente);
        pendente = setTimeout(() => {
          for (const ambiente of Object.values(server.environments)) ambiente.moduleGraph.invalidateAll();
          server.hot.send({ type: 'full-reload', path: '*' });
        }, 300);
      };

      server.watcher.on('add', aoMudar);
      server.watcher.on('unlink', aoMudar);
      server.watcher.on('change', aoMudar);
    },
  };
}

export default defineConfig({
  // No Node 24, "localhost" pode escutar só em IPv6 (::1) e quebrar o recarregamento
  // automático em navegadores que usam 127.0.0.1. Fixar o IPv4 mantém o acesso só local.
  server: { port: 4321, host: '127.0.0.1' },
  devToolbar: { enabled: false },
  vite: {
    // O conteúdo mora fora do projeto, em ../manga.
    server: { fs: { allow: ['..'] } },
    plugins: [vigiarManga()],
  },
});
