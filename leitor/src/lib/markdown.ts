import { Marked } from 'marked';
import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';
import { catalogo, lerMd, resolverLink, urlPara } from './conteudo';

export interface ImagemOtimizada {
  src: string;
  width: number;
  height: number;
}

/** Converte para WebP, sem ampliar além do tamanho original. */
export async function otimizar(img: ImageMetadata, largura?: number, qualidade = 85): Promise<ImagemOtimizada> {
  const width = Math.min(largura ?? img.width, img.width);
  const r = await getImage({ src: img, width, format: 'webp', quality: qualidade });
  return { src: r.src, width, height: Math.round((img.height * width) / img.width) };
}

const escapar = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

/** Seções "Prompt ..." ficam recolhidas: são longas e servem só para regenerar imagens. */
function recolherPrompts(md: string): string {
  return md
    .split(/^(?=## )/m)
    .map((parte) => {
      const m = parte.match(/^## (.+)\n/);
      if (!m || !/prompt/i.test(m[1])) return parte;
      return `<details class="md-detalhes"><summary>${escapar(m[1])}</summary>\n\n${parte.slice(m[0].length).trim()}\n\n</details>\n\n`;
    })
    .join('');
}

export interface OpcoesMd {
  omitirTitulo?: boolean;
  omitirStatus?: boolean;
  omitirImagens?: string[];
  semImagens?: boolean;
}

const LINHA_IMAGEM = /^[ \t]*!\[[^\]]*\]\(([^)\s]+)[^)]*\)[ \t]*\n?/gm;

export async function renderizarMd(rel: string, opcoes: OpcoesMd = {}): Promise<string> {
  let md = lerMd(rel);
  if (opcoes.omitirTitulo) md = md.replace(/^#\s+.+\n+/m, '');
  if (opcoes.omitirStatus) md = md.replace(/^(?:>\s*|-\s*)?\*\*Status[^\n]*\n+/m, '');

  const omitir = new Set(opcoes.omitirImagens ?? []);
  md = md.replace(LINHA_IMAGEM, (linha, href: string) =>
    opcoes.semImagens || omitir.has(resolverLink(rel, href)) ? '' : linha,
  );

  const { artes } = catalogo();
  const imagens = new Map<string, { vista: ImagemOtimizada; cheia: ImagemOtimizada }>();
  for (const m of md.matchAll(/!\[[^\]]*\]\(([^)\s]+)[^)]*\)/g)) {
    const alvo = resolverLink(rel, m[1]);
    const arte = artes.get(alvo);
    if (!arte || imagens.has(alvo)) continue;
    const [vista, cheia] = await Promise.all([otimizar(arte.img, 1200), otimizar(arte.img, undefined, 90)]);
    imagens.set(alvo, { vista, cheia });
  }

  const marked = new Marked({
    gfm: true,
    renderer: {
      link({ href, tokens }) {
        const texto = this.parser.parseInline(tokens);
        if (/^[a-z]+:/i.test(href)) return `<a href="${escapar(href)}" target="_blank" rel="noreferrer">${texto}</a>`;
        if (href.startsWith('#')) return `<a href="${escapar(href)}">${texto}</a>`;
        const destino = urlPara(resolverLink(rel, href));
        return destino
          ? `<a href="${destino}">${texto}</a>`
          : `<span class="link-quebrado" title="${escapar(href)}">${texto}</span>`;
      },
      image({ href, text }) {
        const i = imagens.get(resolverLink(rel, href));
        if (!i) return `<span class="link-quebrado">${escapar(text)}</span>`;
        return (
          `<span class="md-figura"><img src="${i.vista.src}" width="${i.vista.width}" height="${i.vista.height}" ` +
          `alt="${escapar(text)}" loading="lazy" data-zoom="${i.cheia.src}" data-legenda="${escapar(text)}">` +
          (text ? `<span class="legenda">${escapar(text)}</span>` : '') +
          `</span>`
        );
      },
    },
  });

  return marked.parse(recolherPrompts(md)) as string;
}
