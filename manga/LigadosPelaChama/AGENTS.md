# AGENTS.md — Ligados pela Chama

Este arquivo orienta qualquer agente que trabalhe neste projeto. Leia-o antes de criar, mover ou alterar documentos, imagens, personagens ou páginas do mangá.

## Objetivo do projeto

`Ligados pela Chama` é um mangá shōnen colorido de fantasia medieval com alta magia, aventura, mistério cósmico, conflitos políticos e laços de amizade.

O trabalho deve preservar três pilares:

1. Mira deseja curar, mas o poder que carrega destrói.
2. A aventura cresce do cotidiano caloroso da guilda para uma conspiração política e divina.
3. Poder, identidade e herança devem ter consequências emocionais e físicas.

## Idioma e colaboração

- Escreva documentos e converse com o autor em português do Brasil.
- Use a grafia canônica, incluindo acentos: Míscar, Téo, Lúmara, Ânima e Arkenor.
- Explique decisões visuais em linguagem acessível. O autor não precisa saber desenhar para avaliar composição, expressão, proporção ou continuidade.
- Ao sugerir mudanças, apresente o efeito narrativo ou visual de forma concreta.
- Planeje páginas, sequências e concept arts antes de gerá-las.

## Leitura obrigatória antes de trabalhar

Para qualquer tarefa ampla, leia nesta ordem:

1. `README.md`
2. `docs/estado-atual.md`
3. `docs/continuidade.md`
4. Os documentos específicos da tarefa

Leituras específicas:

- Personagens: `docs/personagens.md` e a ficha individual.
- Aparência: ficha individual, Markdown ao lado da imagem e `docs/referencias-visuais.md`.
- Mundo e mitologia: `docs/mundo-e-magia.md`.
- Países e mapa: `docs/mapa-e-geografia.md`.
- Magia: `docs/sistema-de-anima.md` e `docs/sistema-de-chamas.md`.
- Umbrais: `docs/criaturas/umbrais.md` e as descrições junto às artes.
- Capítulo: `README.md`, `continuidade-local.md` e arquivos de página dentro da pasta do capítulo.
- Texto gráfico: `docs/guia-de-letreiramento.md`.

Não releia todo o projeto sem necessidade. Depois da leitura inicial, carregue apenas os arquivos ligados à tarefa.

## Hierarquia do cânone

Quando duas fontes divergirem, use esta prioridade:

1. Decisão explícita mais recente do autor.
2. Informação marcada como **canônica** ou **estabelecida** nos documentos.
3. `docs/continuidade.md` e `docs/estado-atual.md`.
4. Continuidade local do capítulo.
5. Fichas individuais e descrições visuais ao lado das imagens.
6. Roteiros, prompts e versões antigas.

Textos, nomes, escalas e biografias impressos acidentalmente dentro de imagens geradas **nunca são canônicos**. A arte de Míscar, por exemplo, contém texto dizendo que ele não ergue a voz, mas o cânone determina que ele fala gritando e é espalhafatoso.

Se uma decisão nova do autor mudar o cânone, atualize na mesma tarefa os documentos afetados e registre a mudança em `docs/continuidade.md` ou `docs/estado-atual.md`, conforme o alcance.

## Vocabulário de estado

- **Canônico** ou **estabelecido:** decisão aprovada e vigente.
- **Proposta:** solução sugerida que ainda pode mudar.
- **Gancho:** possibilidade narrativa ainda não confirmada como fato.
- **A definir:** lacuna deliberada.
- **Referência de trabalho:** arte útil, mas ainda não aprovada definitivamente.
- **Histórico** ou **substituído:** versão preservada, porém não vigente.

Não transforme uma proposta em cânone apenas porque ela parece coerente.

## Organização de personagens

As fichas ficam em `docs/personagens/`, separadas por núcleo:

- `guilda-vigilia-do-corvo/`
- `grandes-generais/`
- `companheiros-de-jornada/`

Dentro de `grandes-generais/`, separe fichas e artes por origem divina:

- `luz/`: Aelyra, Ordan, Iriane, Thámer, Sérad e Selka.
- `trevas/`: Vael, Míscar, Dargan, Nemeia, Ossaur, Ilvena e Zarekh.

As artes espelham essa organização em `imagens/concept-art/personagens/`.

Regras:

- Cada personagem possui um arquivo Markdown próprio.
- Cada PNG de personagem possui um Markdown de mesmo nome na mesma pasta.
- O Markdown companheiro da imagem deve conter status, prévia, descrição, elementos obrigatórios, elementos proibidos ou não canônicos e links para a ficha relevante.
- Estados de poder de Mira permanecem dentro de `mira/chamas/`.
- Uma personagem deve ser classificada pelo núcleo narrativo atual, não duplicada em várias pastas. Mira pertence à guilda, mesmo carregando Aelyra.
- Personagens sem nome ou aparência definidos continuam em Markdown; não invente dados para preencher a ficha sem marcar como proposta.
- Ao adicionar uma ficha, atualize `docs/personagens.md`.

## Organização de imagens

- Use nomes em minúsculas e `kebab-case`.
- Nomeie versões como `nome-v1.png`, `nome-v2.png` e assim por diante.
- Não sobrescreva uma imagem anterior ao produzir uma nova versão.
- Marque claramente no Markdown qual versão é canônica e quais são históricas.
- Toda imagem nova deve receber imediatamente seu Markdown companheiro.
- Ao mover imagens, atualize todas as referências Markdown no projeto.
- Não trate detalhes gerados por acaso como novas decisões de design.

Antes de produzir uma nova arte, inspecione visualmente as referências vigentes. Não dependa apenas do nome do arquivo ou de memória textual.

## Direção visual geral

- Quadrinho colorido com energia de shōnen, fantasia medieval e leitura clara de ação e expressão.
- Preserve silhuetas reconhecíveis, paletas, idades aparentes, proporções e acessórios canônicos.
- Mãos, armas, baldes, portas, móveis e corpos devem manter escala coerente entre quadros.
- Mira tem 15 anos, corpo compacto e atlético e mãos femininas com palmas menores e dedos afilados.
- O gótico do Solar da Vigília deve parecer habitável e funcional, não apenas ornamental.
- Os níveis espaciais do Solar devem respeitar `docs/cenarios/vigilia-do-corvo.md` e a continuidade local do capítulo.
- Não copie literalmente o estilo de um artista vivo ou de uma obra existente. Traduza referências em características amplas, como energia, clareza, expressividade e composição.

Ao descrever uma correção visual, seja geométrico e verificável: posição relativa, altura, direção do olhar, escala, contato entre personagens, origem de líquidos, perspectiva e continuidade de objetos.

## Concept arts

Uma boa concept art deve, quando pertinente, mostrar:

- Vista frontal e traseira.
- Silhueta completa.
- Expressões essenciais.
- Roupa e acessórios separados.
- Arma ou ferramenta na escala correta.
- Paleta e materiais.
- Uma pose de ação coerente com a personalidade.

Depois de gerar ou revisar a arte:

1. Confira rosto, idade aparente, mãos e anatomia.
2. Confira traje, símbolos, armas e acessórios.
3. Compare com a ficha textual.
4. Registre divergências no Markdown companheiro.
5. Só marque como canônica após aprovação do autor.

## Capítulos e páginas

Cada capítulo deve possuir:

- Um `README.md` com função dramática, resumo e estado de produção.
- Um arquivo de continuidade local.
- Um Markdown por página.
- Pastas separadas para storyboards, painéis e páginas finais, quando aplicável.
- Um resumo do capítulo junto às páginas finais.

O Markdown de cada página deve registrar:

- Objetivo dramático.
- Número e disposição dos quadros.
- Personagens presentes.
- Ação, câmera e cenário.
- Diálogos, balões, gritos, recordatórios e efeitos sonoros.
- Continuidade de roupas, objetos, ferimentos, luz, clima e posição.
- Referência à imagem vigente e histórico de versões.

Não avance várias páginas sem revisar a transição entre elas. Uma página isolada pode parecer boa e ainda quebrar a sequência.

## Fluxo para criar ou revisar páginas

1. Leia a página anterior, a página atual e a seguinte.
2. Confira a continuidade local e as fichas dos personagens presentes.
3. Resuma o propósito emocional e a informação nova da página.
4. Planeje quadros, ritmo, câmera e ordem de leitura.
5. Gere ou revise a imagem sem apagar versões anteriores.
6. Faça uma inspeção visual completa.
7. Corrija proporções, anatomia, perspectiva e objetos antes do letreiramento.
8. Aplique diálogos e efeitos conforme `docs/guia-de-letreiramento.md`.
9. Leia os balões na ordem visual real e confira se expressões correspondem às falas.
10. Atualize o Markdown da página, o resumo do capítulo e o estado de produção.

## Continuidade espacial e visual

Sempre confira:

- De onde cada personagem veio e para onde está olhando.
- Altura relativa entre telhado, muralha, pátio e interiores.
- Lado em que armas, bolsas, pingentes e ferramentas aparecem.
- Estado de portas, janelas, telhas, baldes, livros, ferimentos e roupas.
- Direção e intensidade da luz.
- Distância aparente entre personagens.
- Contato físico não solicitado ou ambíguo.
- Se líquidos, fumaça, fogo e destroços possuem uma origem física legível.

No piloto, a regra de altura entre telhado e pátio é especialmente importante. Consulte a continuidade local em vez de estimar.

## Diálogos, fontes e expressão

- Use `docs/guia-de-letreiramento.md` como autoridade para fontes, cores, balões, gritos e efeitos sonoros.
- Voz normal, pensamento, sussurro, grito, fala monstruosa e fala de Míscar devem ser visualmente distintos.
- Evite excesso de texto em um único balão.
- A ordem dos balões deve acompanhar a direção de leitura estabelecida para o capítulo.
- A expressão e a postura precisam sustentar o tom da fala.
- Humor não deve quebrar lógica médica, espacial ou emocional. Maela pode interromper Mira com humor físico, mas não deve contaminar material higienizado nem agir de modo incompetente.
- Míscar é teatral, caricato e normalmente fala gritando; Vael é frio, distante e econômico nas palavras.

## Regras narrativas essenciais

- Vael é o vilão final.
- Míscar é o antagonista visível da jornada e é derrotado antes de Vael.
- A obsessão de Míscar por Aelyra é posse e violência, nunca romance correspondido.
- Aelyra é arrogante e petulante, mas não enlouqueceu.
- Mira não sabe no início que carrega Aelyra.
- A manifestação das chamas deve obedecer ao custo e às pistas da Ânima.
- Novas chamas surgem de transformações e decisões emocionais, não de treinamento mecânico.
- As Chamas da Vida matam o usuário; Aelyra escolhe morrer para salvar Mira.
- As Chamas Puras pertencem somente a Mira.
- A referência canônica das Chamas Puras é `mira-chama-pura-v2.png`, com núcleo branco e as sete cores do arco-íris distinguíveis.
- Umbrais não são monstros aleatórios: estão ligados à anti-Ânima, ao cadáver divino e ao colapso político dos selos.

## Preservação e mudanças

- Preserve alterações existentes que não fazem parte da tarefa.
- Não apague versões históricas sem pedido explícito.
- Não renomeie personagens, países, poderes ou arquivos canônicos por conveniência.
- Não modifique páginas aprovadas sem informar claramente o motivo e receber autorização quando a mudança for material.
- Se uma alteração afetar vários documentos, corrija todos na mesma tarefa.
- Se houver dúvida que mudaria substancialmente a história, pare e peça uma decisão ao autor.

## Verificação antes de concluir

Para mudanças em documentos ou estrutura:

- Procure referências aos caminhos antigos.
- Confirme que links relativos apontam para arquivos existentes.
- Confirme que cada PNG novo possui Markdown companheiro.
- Confira acentos, nomes e marcações de estado.
- Atualize índices e `docs/estado-atual.md` quando necessário.

Para imagens ou páginas:

- Abra e inspecione o resultado em tamanho legível.
- Compare com as referências vigentes.
- Revise mãos, anatomia, escala, perspectiva, cenário e continuidade.
- Verifique balões, ordem de leitura, fontes, cores, gritos e expressões.
- Informe ao autor o que foi criado, o que foi alterado e o que ainda aguarda aprovação.

## Fonte dinâmica do progresso

Não registre aqui números de versão ou páginas aprovadas, pois mudam com frequência. O estado corrente, a próxima etapa e as pendências ficam em:

- `docs/estado-atual.md`
- `capitulos/<numero-e-nome>/README.md`
- `capitulos/<numero-e-nome>/continuidade-local.md`

Atualize essas fontes ao terminar uma etapa relevante.
