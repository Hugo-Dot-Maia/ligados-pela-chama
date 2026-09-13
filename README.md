# Ligados pela Chama

Repositório do mangá **Ligados pela Chama** e do compêndio usado para lê-lo.

| Pasta | Conteúdo |
|---|---|
| [`manga/LigadosPelaChama/`](manga/LigadosPelaChama/README.md) | O projeto do mangá: documentos, fichas, concept arts e capítulos. É a fonte da verdade. |
| [`leitor/`](leitor/) | Site local que lê a pasta `manga/` e mostra capítulos, personagens, lugares e mundo. Nunca altera o conteúdo. |

## Rodar o leitor

Requer Node.js 20 ou superior.

```bash
cd leitor
npm install
npm run dev
```

Depois abra <http://localhost:4321>.

Regras de trabalho no conteúdo do mangá: [`manga/LigadosPelaChama/AGENTS.md`](manga/LigadosPelaChama/AGENTS.md).
