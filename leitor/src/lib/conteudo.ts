// Lê a pasta ../manga/LigadosPelaChama e monta o catálogo do site.
// Nada aqui escreve no conteúdo: o mangá continua sendo a fonte da verdade.
import fs from 'node:fs';
import path from 'node:path';
import type { ImageMetadata } from 'astro';

export const RAIZ = path.resolve(process.cwd(), '../manga/LigadosPelaChama');

const modulosPng = import.meta.glob<{ default: ImageMetadata }>(
  '../../../manga/LigadosPelaChama/**/*.png',
  { eager: true },
);
const PREFIXO_GLOB = '../../../manga/LigadosPelaChama/';
const imagens = new Map<string, ImageMetadata>(
  Object.entries(modulosPng).map(([chave, m]) => [chave.slice(PREFIXO_GLOB.length), m.default]),
);

// ---------------------------------------------------------------------------
// Utilidades de arquivo e texto

function listarArquivos(dirRel = ''): string[] {
  const abs = path.join(RAIZ, dirRel);
  if (!fs.existsSync(abs)) return [];
  const saida: string[] = [];
  for (const entrada of fs.readdirSync(abs, { withFileTypes: true })) {
    const rel = dirRel ? `${dirRel}/${entrada.name}` : entrada.name;
    if (entrada.isDirectory()) saida.push(...listarArquivos(rel));
    else saida.push(rel);
  }
  return saida.sort((a, b) => a.localeCompare(b, 'pt-BR', { numeric: true }));
}

export function existe(rel: string): boolean {
  return fs.existsSync(path.join(RAIZ, rel));
}

export function lerMd(rel: string): string {
  return fs.readFileSync(path.join(RAIZ, rel), 'utf8').replace(/\r\n/g, '\n');
}

const dirname = (rel: string) => path.posix.dirname(rel);
const basename = (rel: string, ext = '') => path.posix.basename(rel, ext);

export function resolverLink(deRel: string, href: string): string {
  const semAncora = href.split('#')[0];
  return path.posix.normalize(path.posix.join(dirname(deRel), decodeURIComponent(semAncora)));
}

function limparInline(s: string): string {
  return s
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\*\*|__|`/g, '')
    .trim();
}

export function tituloDoMd(md: string): string | undefined {
  const m = md.match(/^#\s+(.+)$/m);
  return m ? limparInline(m[1]) : undefined;
}

export function statusDoMd(md: string): string {
  const m = md.match(/\*\*Status[^*]*\*\*\s*(.+)/);
  if (m) return limparInline(m[1]);
  const e = md.match(/^##\s+Estado[ \t]*\n+\s*[-*]\s*(.+)/m);
  return e ? limparInline(e[1]) : '';
}

export function humanizar(slug: string): string {
  const s = slug.replace(/-v\d+$/, '').replace(/-/g, ' ');
  return s.charAt(0).toUpperCase() + s.slice(1);
}

interface Referencia {
  imagem: boolean;
  texto: string;
  href: string;
}

function referenciasDoMd(md: string): Referencia[] {
  const saida: Referencia[] = [];
  for (const m of md.matchAll(/(!?)\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) {
    saida.push({ imagem: m[1] === '!', texto: m[2], href: m[3] });
  }
  return saida;
}

const externo = (href: string) => /^[a-z]+:/i.test(href) || href.startsWith('#');

// ---------------------------------------------------------------------------
// Status

export type Status = 'canonica' | 'avaliacao' | 'historica' | 'nenhum';

/** Classifica um texto de status. O caráter histórico só vale na primeira oração,
 *  para que "a versão 1 é histórica" numa ficha vigente não esconda a ficha. */
export function classificar(texto: string): Status {
  const s = texto.toLowerCase();
  if (!s.trim()) return 'nenhum';
  const primeira = s.split(/[.;]/)[0];
  if (/hist[óo]ric|substitu[íi]d/.test(primeira)) return 'historica';
  if (/aguard|proposta|refer[êe]ncia de trabalho|em avalia|planejad/.test(s)) return 'avaliacao';
  if (/can[ôo]nic|estabelecid|aprovad/.test(s)) return 'canonica';
  return 'nenhum';
}

export function rotuloStatus(status: Status, contexto: 'arte' | 'pagina' = 'arte'): string {
  if (contexto === 'pagina') {
    return { canonica: 'Aprovada', avaliacao: 'Em avaliação', historica: 'Histórica', nenhum: '' }[status];
  }
  return { canonica: 'Canônica', avaliacao: 'Em avaliação', historica: 'Histórica', nenhum: '' }[status];
}

// ---------------------------------------------------------------------------
// URLs do site

export function urlPara(rel: string): string | undefined {
  let m: RegExpMatchArray | null;
  if ((m = rel.match(/^docs\/personagens\/.+\/([^/]+)\.md$/))) return `/personagens/${m[1]}/`;
  if ((m = rel.match(/^docs\/cenarios\/([^/]+)\.md$/))) return `/lugares/${m[1]}/`;
  if ((m = rel.match(/^capitulos\/([^/]+)\/paginas\/pagina-(\d+)\.md$/))) return `/ler/${m[1]}/#p=${Number(m[2])}`;
  if ((m = rel.match(/^capitulos\/([^/]+)\/README\.md$/))) return `/capitulos/${m[1]}/`;
  if ((m = rel.match(/^capitulos\/([^/]+)\/.*pagina-(\d+)-[^/]*\.png$/))) return `/ler/${m[1]}/#p=${Number(m[2])}`;
  if (/^imagens\/.+\.md$/.test(rel) && existe(rel.replace(/\.md$/, '.png'))) {
    return `/arte/${rel.replace(/\.md$/, '')}/`;
  }
  if (rel.endsWith('.md')) return urlDoc(rel);
  if (/^imagens\/.+\.png$/.test(rel)) return `/arte/${rel.replace(/\.png$/, '')}/`;
  return undefined;
}

export function urlDoc(rel: string): string {
  const semExt = rel.replace(/\.md$/, '');
  return semExt.startsWith('docs/') ? `/docs/${semExt.slice(5)}/` : `/docs/projeto/${semExt}/`;
}

export function relDoCaminhoDoc(caminho: string): string {
  return caminho.startsWith('projeto/') ? `${caminho.slice(8)}.md` : `docs/${caminho}.md`;
}

// ---------------------------------------------------------------------------
// Artes

export interface Arte {
  rel: string;
  id: string;
  pasta: string;
  nomeBase: string;
  versao: number;
  md?: string;
  titulo: string;
  statusTexto: string;
  status: Status;
  img: ImageMetadata;
  url: string;
}

export interface GrupoArte {
  chave: string;
  pasta: string;
  titulo: string;
  versoes: Arte[];
  atual: Arte;
}

export interface Personagem {
  slug: string;
  ficha?: string;
  nome: string;
  epiteto?: string;
  papel?: string;
  secao: string;
  statusTexto: string;
  historico: boolean;
  grupos: GrupoArte[];
  subgalerias: { nome: string; grupos: GrupoArte[] }[];
  capa?: Arte;
  url: string;
}

export interface Lugar {
  slug: string;
  doc?: string;
  nome: string;
  grupos: GrupoArte[];
  capa?: Arte;
  status: Status;
  statusTexto: string;
  url: string;
}

export interface SecaoMundo {
  id: string;
  rotulo: string;
  grupos: GrupoArte[];
  docs: string[];
}

export interface PaginaLeitura {
  numero: number;
  titulo?: string;
  final: Arte;
  storyboard?: Arte;
  md?: string;
  status: Status;
  statusTexto: string;
}

export interface Leitura {
  id: string;
  tipo: 'capitulo' | 'cena';
  titulo: string;
  statusTexto: string;
  status: Status;
  readme?: string;
  resumo?: string;
  paginas: PaginaLeitura[];
  url: string;
  urlLer: string;
}

export interface Catalogo {
  artes: Map<string, Arte>;
  grupos: GrupoArte[];
  personagens: Personagem[];
  secoesPersonagens: { id: string; rotulo: string; personagens: Personagem[] }[];
  lugares: Lugar[];
  mundo: SecaoMundo[];
  leituras: Leitura[];
  docs: string[];
  referenciadoPor: Map<string, string[]>;
}

const SECOES_PERSONAGENS = [
  { id: 'guilda-vigilia-do-corvo', rotulo: 'Guilda Vigília do Corvo' },
  { id: 'grandes-generais/luz', rotulo: 'Grandes Generais da Luz' },
  { id: 'grandes-generais/trevas', rotulo: 'Grandes Generais das Trevas' },
  { id: 'companheiros-de-jornada', rotulo: 'Companheiros de jornada' },
];

const SECOES_MUNDO: { id: string; rotulo: string; docs: string[] }[] = [
  { id: 'mapa', rotulo: 'Mapas', docs: ['docs/mapa-e-geografia.md'] },
  { id: 'divindades', rotulo: 'Divindades', docs: ['docs/mundo-e-magia.md'] },
  { id: 'grupos', rotulo: 'Os Grandes Generais', docs: ['docs/lista-dos-vinte-generais.md', 'docs/caca-aos-generais-e-ritual.md'] },
  { id: 'criaturas', rotulo: 'Criaturas', docs: ['docs/criaturas/umbrais.md'] },
  { id: 'sistema-de-anima', rotulo: 'Sistema de Ânima', docs: ['docs/sistema-de-anima.md', 'docs/sistema-de-chamas.md'] },
  { id: 'referencias', rotulo: 'Referências e esboços', docs: ['docs/referencias-visuais.md'] },
];

function tituloDoGrupo(titulo: string): string {
  const partes = titulo.split(' — ');
  if (partes.length > 1 && /v\d|vers[ãa]o/i.test(partes[partes.length - 1])) {
    return partes.slice(0, -1).join(' — ');
  }
  return titulo;
}

function montarGrupos(artes: Arte[]): GrupoArte[] {
  const porChave = new Map<string, Arte[]>();
  for (const a of artes) {
    const chave = `${a.pasta}/${a.nomeBase}`;
    if (!porChave.has(chave)) porChave.set(chave, []);
    porChave.get(chave)!.push(a);
  }
  return [...porChave.entries()].map(([chave, versoes]) => {
    versoes.sort((x, y) => x.versao - y.versao || x.rel.localeCompare(y.rel));
    const canonicas = versoes.filter((v) => v.status === 'canonica');
    const vigentes = versoes.filter((v) => v.status !== 'historica');
    const atual = canonicas.at(-1) ?? vigentes.at(-1) ?? versoes.at(-1)!;
    return { chave, pasta: versoes[0].pasta, titulo: tituloDoGrupo(atual.titulo), versoes, atual };
  });
}

// ---------------------------------------------------------------------------
// Catálogo

let cache: Catalogo | undefined;
let montadoEm = 0;

export function catalogo(): Catalogo {
  // Em desenvolvimento, relê o conteúdo a cada poucos segundos para refletir edições.
  const validade = import.meta.env.DEV ? 2000 : Infinity;
  if (cache && Date.now() - montadoEm < validade) return cache;
  cache = montarCatalogo();
  montadoEm = Date.now();
  return cache;
}

function montarCatalogo(): Catalogo {
  const arquivos = listarArquivos();
  const mds = arquivos.filter((f) => f.endsWith('.md'));

  // Quem referencia cada arquivo (imagem ou link).
  const referenciadoPor = new Map<string, string[]>();
  const refsPorMd = new Map<string, Referencia[]>();
  for (const md of mds) {
    const refs = referenciasDoMd(lerMd(md)).filter((r) => !externo(r.href));
    refsPorMd.set(md, refs);
    for (const r of refs) {
      const alvo = resolverLink(md, r.href);
      if (!referenciadoPor.has(alvo)) referenciadoPor.set(alvo, []);
      const lista = referenciadoPor.get(alvo)!;
      if (!lista.includes(md)) lista.push(md);
    }
  }

  // Artes
  const artes = new Map<string, Arte>();
  for (const rel of arquivos.filter((f) => f.endsWith('.png'))) {
    const img = imagens.get(rel);
    if (!img) continue;
    const nome = basename(rel, '.png');
    const mv = nome.match(/^(.*?)-v(\d+)(?:-[a-z0-9]+)?$/);
    const mdRel = rel.replace(/\.png$/, '.md');
    const temMd = existe(mdRel);
    let titulo = humanizar(nome);
    let statusTexto = '';
    if (temMd) {
      const md = lerMd(mdRel);
      titulo = tituloDoMd(md) ?? titulo;
      statusTexto = statusDoMd(md);
    } else {
      const docs = (referenciadoPor.get(rel) ?? []).filter((d) => /^docs\/(cenarios|criaturas|cenas)\//.test(d));
      if (docs.length) {
        const md = lerMd(docs[0]);
        statusTexto = statusDoMd(md);
        const pngsDoDoc = (refsPorMd.get(docs[0]) ?? []).filter((r) => r.href.endsWith('.png'));
        if (pngsDoDoc.length === 1) titulo = tituloDoMd(md) ?? titulo;
      }
    }
    artes.set(rel, {
      rel,
      id: rel.replace(/\.png$/, ''),
      pasta: dirname(rel),
      nomeBase: mv ? mv[1] : nome,
      versao: mv ? Number(mv[2]) : 0,
      md: temMd ? mdRel : undefined,
      titulo,
      statusTexto,
      status: classificar(statusTexto),
      img,
      url: rel.startsWith('imagens/') ? `/arte/${rel.replace(/\.png$/, '')}/` : '#',
    });
  }
  const artesDeImagens = [...artes.values()].filter((a) => a.rel.startsWith('imagens/'));
  const grupos = montarGrupos(artesDeImagens);

  return {
    artes,
    grupos,
    ...montarPersonagens(mds, grupos, refsPorMd),
    lugares: montarLugares(mds, grupos, referenciadoPor),
    mundo: montarMundo(grupos),
    leituras: montarLeituras(arquivos, artes, referenciadoPor),
    docs: mds,
    referenciadoPor,
  };
}

function montarPersonagens(mds: string[], grupos: GrupoArte[], refsPorMd: Map<string, Referencia[]>) {
  const PREFIXO_FICHAS = 'docs/personagens/';
  const PREFIXO_ARTES = 'imagens/concept-art/personagens/';

  // Ordem e papel vêm do índice docs/personagens.md.
  const papelPorFicha = new Map<string, string>();
  const ordem: string[] = [];
  if (existe('docs/personagens.md')) {
    let cabecalho: string[] = [];
    for (const linha of lerMd('docs/personagens.md').split('\n')) {
      if (!linha.startsWith('|')) {
        cabecalho = [];
        continue;
      }
      const celulas = linha.split('|').slice(1, -1).map((c) => c.trim());
      if (celulas.every((c) => /^:?-+:?$/.test(c))) continue;
      if (!cabecalho.length) {
        cabecalho = celulas;
        continue;
      }
      const link = celulas.map((c) => c.match(/\]\(([^)]+\.md)\)/)).find(Boolean);
      if (!link) continue;
      const ficha = resolverLink('docs/personagens.md', link[1]);
      ordem.push(ficha);
      const papel = celulas[1] ?? '';
      const rotulo = cabecalho[1] && !/papel/i.test(cabecalho[1]) ? `${cabecalho[1]}: ${papel}` : papel;
      papelPorFicha.set(ficha, `${celulas[0]}|${rotulo}`);
    }
  }

  const fichas = mds.filter((f) => f.startsWith(PREFIXO_FICHAS));
  const secaoDe = (dirRelativo: string) =>
    SECOES_PERSONAGENS.map((s) => s.id).find((id) => dirRelativo === id || dirRelativo.startsWith(`${id}/`)) ?? dirRelativo;

  // Pastas de arte de cada personagem.
  type PastaArte = { secao: string; pasta: string; grupos: GrupoArte[] };
  const pastas = new Map<string, PastaArte>();
  for (const g of grupos.filter((g) => g.pasta.startsWith(PREFIXO_ARTES))) {
    const resto = g.pasta.slice(PREFIXO_ARTES.length);
    const secao = secaoDe(resto);
    const pasta = resto.slice(secao.length + 1).split('/')[0];
    if (!pasta) continue;
    const chave = `${secao}/${pasta}`;
    if (!pastas.has(chave)) pastas.set(chave, { secao, pasta, grupos: [] });
    pastas.get(chave)!.grupos.push(g);
  }

  const fichaDaPasta = (p: PastaArte): string | undefined => {
    const mesmoNome = fichas.find((f) => f === `${PREFIXO_FICHAS}${p.secao}/${p.pasta}.md`);
    if (mesmoNome) return mesmoNome;
    const votos = new Map<string, number>();
    for (const g of p.grupos) {
      if (g.pasta !== `${PREFIXO_ARTES}${p.secao}/${p.pasta}`) continue;
      for (const v of g.versoes) {
        if (!v.md) continue;
        for (const r of refsPorMd.get(v.md) ?? []) {
          const alvo = resolverLink(v.md, r.href);
          if (fichas.includes(alvo)) votos.set(alvo, (votos.get(alvo) ?? 0) + 1);
        }
      }
    }
    return [...votos.entries()].sort((a, b) => b[1] - a[1])[0]?.[0];
  };

  const artesPorFicha = new Map<string, PastaArte>();
  const orfas: PastaArte[] = [];
  for (const p of pastas.values()) {
    const ficha = fichaDaPasta(p);
    if (ficha && !artesPorFicha.has(ficha)) artesPorFicha.set(ficha, p);
    else orfas.push(p);
  }

  const criar = (ficha: string | undefined, pastaArte: PastaArte | undefined, secao: string): Personagem => {
    const md = ficha ? lerMd(ficha) : '';
    const [nomeIndice, papel] = ficha ? (papelPorFicha.get(ficha) ?? '').split('|') : [];
    const tituloCompleto = nomeIndice || (ficha ? tituloDoMd(md) : undefined) || humanizar(pastaArte!.pasta);
    const [nome, ...resto] = tituloCompleto.split(/, | — /);
    const statusTexto = statusDoMd(md);
    const raiz = pastaArte ? `${PREFIXO_ARTES}${pastaArte.secao}/${pastaArte.pasta}` : '';
    const diretos = pastaArte?.grupos.filter((g) => g.pasta === raiz) ?? [];
    const subs = new Map<string, GrupoArte[]>();
    for (const g of pastaArte?.grupos.filter((g) => g.pasta !== raiz) ?? []) {
      const nomeSub = humanizar(g.pasta.slice(raiz.length + 1));
      if (!subs.has(nomeSub)) subs.set(nomeSub, []);
      subs.get(nomeSub)!.push(g);
    }
    const slug = ficha ? basename(ficha, '.md') : pastaArte!.pasta;
    const capaGrupo = diretos.find((g) => g.atual.status !== 'historica') ?? diretos[0];
    return {
      slug,
      ficha,
      nome,
      epiteto: resto.join(', ') || undefined,
      papel: papel || undefined,
      secao,
      statusTexto,
      historico: classificar(statusTexto) === 'historica',
      grupos: diretos,
      subgalerias: [...subs.entries()].map(([nome, grupos]) => ({ nome, grupos })),
      capa: capaGrupo?.atual,
      url: `/personagens/${slug}/`,
    };
  };

  const personagens: Personagem[] = [];
  const posicao = (f?: string) => {
    const i = f ? ordem.indexOf(f) : -1;
    return i === -1 ? Number.MAX_SAFE_INTEGER : i;
  };
  for (const ficha of [...fichas].sort((a, b) => posicao(a) - posicao(b) || a.localeCompare(b))) {
    const secao = secaoDe(dirname(ficha).slice(PREFIXO_FICHAS.length));
    personagens.push(criar(ficha, artesPorFicha.get(ficha), secao));
  }
  for (const p of orfas) personagens.push(criar(undefined, p, p.secao));

  const ids = [...new Set([...SECOES_PERSONAGENS.map((s) => s.id), ...personagens.map((p) => p.secao)])];
  const secoesPersonagens = ids
    .map((id) => ({
      id,
      rotulo: SECOES_PERSONAGENS.find((s) => s.id === id)?.rotulo ?? humanizar(id.split('/').pop()!),
      personagens: personagens.filter((p) => p.secao === id),
    }))
    .filter((s) => s.personagens.length);

  return { personagens, secoesPersonagens };
}

function montarLugares(mds: string[], grupos: GrupoArte[], referenciadoPor: Map<string, string[]>): Lugar[] {
  const docsCenarios = mds.filter((f) => /^docs\/cenarios\/[^/]+\.md$/.test(f));
  const lugares = new Map<string, Lugar>();

  const obter = (slug: string, doc?: string): Lugar => {
    if (!lugares.has(slug)) {
      const md = doc ? lerMd(doc) : '';
      lugares.set(slug, {
        slug,
        doc,
        nome: (doc && tituloDoMd(md)) || humanizar(slug),
        grupos: [],
        status: 'nenhum',
        statusTexto: '',
        url: `/lugares/${slug}/`,
      });
    }
    return lugares.get(slug)!;
  };

  for (const doc of docsCenarios) obter(basename(doc, '.md'), doc);

  for (const g of grupos.filter((g) => g.pasta.startsWith('imagens/concept-art/cenarios/'))) {
    const doc = g.versoes
      .flatMap((v) => referenciadoPor.get(v.rel) ?? [])
      .find((d) => docsCenarios.includes(d));
    const lugar = doc ? obter(basename(doc, '.md'), doc) : obter(basename(g.pasta));
    if (!doc) lugar.nome = tituloDoGrupo(g.atual.titulo);
    lugar.grupos.push(g);
  }

  for (const l of lugares.values()) {
    l.capa = l.grupos[0]?.atual;
    l.status = l.capa?.status ?? 'nenhum';
    l.statusTexto = l.capa?.statusTexto ?? '';
  }
  return [...lugares.values()].sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
}

function montarMundo(grupos: GrupoArte[]): SecaoMundo[] {
  const excluidos = ['imagens/concept-art/personagens/', 'imagens/concept-art/cenarios/', 'imagens/cenas/'];
  const porSecao = new Map<string, GrupoArte[]>();
  for (const g of grupos) {
    if (excluidos.some((e) => `${g.pasta}/`.startsWith(e))) continue;
    const partes = g.pasta.split('/');
    const id = partes[1] === 'concept-art' ? partes[2] : partes[1];
    if (!id) continue;
    if (!porSecao.has(id)) porSecao.set(id, []);
    porSecao.get(id)!.push(g);
  }
  const ids = [...new Set([...SECOES_MUNDO.map((s) => s.id), ...porSecao.keys()])];
  return ids
    .filter((id) => porSecao.has(id))
    .map((id) => {
      const def = SECOES_MUNDO.find((s) => s.id === id);
      return {
        id,
        rotulo: def?.rotulo ?? humanizar(id),
        grupos: porSecao.get(id)!,
        docs: (def?.docs ?? []).filter(existe),
      };
    });
}

function montarLeituras(arquivos: string[], artes: Map<string, Arte>, referenciadoPor: Map<string, string[]>): Leitura[] {
  const leituras: Leitura[] = [];

  // Capítulos
  const capitulos = [...new Set(arquivos.filter((f) => f.startsWith('capitulos/')).map((f) => f.split('/')[1]))];
  for (const cap of capitulos) {
    const base = `capitulos/${cap}`;
    const readme = existe(`${base}/README.md`) ? `${base}/README.md` : undefined;
    const readmeMd = readme ? lerMd(readme) : '';

    const situacao = new Map<number, string>();
    for (const m of readmeMd.matchAll(/^\|\s*(\d{1,3})\s*\|[^|\n]*\|\s*([^|\n]+?)\s*\|\s*$/gm)) {
      situacao.set(Number(m[1]), m[2]);
    }

    const numeros = new Set<number>();
    const finais = new Map<number, Arte>();
    for (const a of artes.values()) {
      const m = a.rel.match(new RegExp(`^${base}/paginas-finais/pagina-(\\d+)-letreirada-v(\\d+)\\.png$`));
      if (!m) continue;
      const n = Number(m[1]);
      numeros.add(n);
      if (!finais.has(n) || finais.get(n)!.versao < a.versao) finais.set(n, a);
    }
    for (const f of arquivos) {
      const m = f.match(new RegExp(`^${base}/paginas/pagina-(\\d+)\\.md$`));
      if (m) numeros.add(Number(m[1]));
    }

    const paginas: PaginaLeitura[] = [];
    for (const n of [...numeros].sort((a, b) => a - b)) {
      const mdRel = `${base}/paginas/pagina-${String(n).padStart(3, '0')}.md`;
      const md = existe(mdRel) ? lerMd(mdRel) : '';
      const storyboards = referenciasDoMd(md)
        .filter((r) => r.imagem && /storyboard/.test(r.href))
        .map((r) => artes.get(resolverLink(mdRel, r.href)))
        .filter((a): a is Arte => !!a);
      const storyboard = storyboards.at(-1);
      const final = finais.get(n) ?? storyboard;
      if (!final) continue;
      const titulo = tituloDoMd(md)?.split(' — ').slice(1).join(' — ');
      const statusTexto = situacao.get(n) ?? statusDoMd(md);
      paginas.push({
        numero: n,
        titulo: titulo || undefined,
        final,
        storyboard: storyboard && storyboard !== final ? storyboard : undefined,
        md: md ? mdRel : undefined,
        statusTexto,
        status: /aprovad/i.test(statusTexto) && !/aguard/i.test(statusTexto) ? 'canonica' : classificar(statusTexto),
      });
    }
    if (!paginas.length) continue;

    const statusTexto = statusDoMd(readmeMd);
    const resumo = `${base}/paginas-finais/resumo-do-capitulo.md`;
    leituras.push({
      id: cap,
      tipo: 'capitulo',
      titulo: tituloDoMd(readmeMd) ?? humanizar(cap),
      statusTexto,
      status: classificar(statusTexto),
      readme,
      resumo: existe(resumo) ? resumo : undefined,
      paginas,
      url: `/capitulos/${cap}/`,
      urlLer: `/ler/${cap}/`,
    });
  }

  // Cenas avulsas
  const pastasCenas = [...new Set([...artes.values()].filter((a) => a.rel.startsWith('imagens/cenas/')).map((a) => a.pasta))];
  for (const pasta of pastasCenas) {
    const porNumero = new Map<number, Arte>();
    for (const a of artes.values()) {
      if (a.pasta !== pasta) continue;
      const m = basename(a.rel, '.png').match(/pagina-(\d+)/);
      const n = m ? Number(m[1]) : porNumero.size + 1;
      if (!porNumero.has(n) || porNumero.get(n)!.versao < a.versao) porNumero.set(n, a);
    }
    const paginas: PaginaLeitura[] = [...porNumero.entries()]
      .sort((a, b) => a[0] - b[0])
      .map(([numero, final]) => ({
        numero,
        final,
        md: final.md,
        status: final.status,
        statusTexto: final.statusTexto,
      }));
    const doc = paginas
      .flatMap((p) => referenciadoPor.get(p.final.md ?? '') ?? [])
      .concat(paginas.flatMap((p) => referenciadoPor.get(p.final.rel) ?? []))
      .find((d) => d.startsWith('docs/cenas/'))
      ?? arquivos.find((f) => f.startsWith('docs/cenas/') && lerMd(f).includes(basename(pasta)));
    const docMd = doc ? lerMd(doc) : '';
    const id = `cena-${basename(pasta)}`;
    leituras.push({
      id,
      tipo: 'cena',
      titulo: (doc && tituloDoMd(docMd)) || humanizar(basename(pasta)),
      statusTexto: paginas[0]?.statusTexto ?? '',
      status: paginas[0]?.status ?? 'nenhum',
      resumo: doc,
      paginas,
      url: `/capitulos/${id}/`,
      urlLer: `/ler/${id}/`,
    });
  }

  return leituras;
}
