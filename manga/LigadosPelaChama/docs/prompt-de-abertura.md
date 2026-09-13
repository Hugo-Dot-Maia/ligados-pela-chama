# Prompt de retomada para o GPT

O GPT construiu este projeto: a bíblia do mundo, as fichas, as concept arts e os storyboards das páginas 1 a 4. Durante o período em que ficou sem créditos, o trabalho continuou com outra IA. Esta mensagem serve para atualizá-lo sobre o que mudou.

**Se estiver retomando a conversa antiga:** cole só a mensagem abaixo. Ele já tem todo o contexto do mundo.

**Se precisar começar conversa nova:** cole a mensagem e anexe `docs/estado-atual.md`, `docs/prompts-cenarios.md`, `solar-da-vigilia-v1.png` e `pagina-001-storyboard-v2-color.png`.

---

```
Estou de volta. Enquanto você estava sem créditos, continuei o projeto com outra
IA. Ela leu todo o material que você produziu, apontou inconsistências, alterou
alguns arquivos e me ajudou a decidir coisas de roteiro. Preciso te atualizar
antes de continuarmos, porque vários arquivos mudaram desde a última vez que você
os viu.

Nada abaixo invalida o que você construiu. A bíblia, as fichas, as concept arts e
os storyboards continuam sendo a base. O que segue são correções e acréscimos.

1. INCONSISTÊNCIAS CORRIGIDAS NOS ARQUIVOS

- O balde não "quase cai" nas páginas 3 e 4: ele se solta na 3, acerta Garran em
  cheio na 4 e é recuperado depois. A continuidade local dizia outra coisa.
- Quem entrega a bolsa de ervas para Mira é Garran, na página 8, não Maela na 9.
  A cadeia agora é: Maela pede na 6, Garran entrega a bolsa vazia na 8, Mira enche
  na botica na 10, devolve na 12.
- Na página 12 havia contradição entre Mira entregar as ervas no salão e as ervas
  terem ficado na enfermaria. Resolvido: Maela recebe no salão e sai um instante
  para guardar.
- A página 4 dizia que Garran "desvia por pouco", mas o storyboard mostra o balde
  acertando em cheio. O roteiro foi ajustado para a arte, que ficou melhor.
- Os storyboards coloridos não estavam registrados em nenhum documento. Agora estão.
- As versões preto e branco das páginas 1 a 4 foram descartadas.

2. REGRA NOVA DE ALTURA E CÂMERA

Foi identificado um erro de escala: na página 4, quadros 3 e 4, Mira e Téo aparecem
sobre uma parede baixa, quase na altura de Garran, contradizendo o quadro 1, onde
estão no alto. O quadro 1 é a leitura correta.

Para não acontecer de novo, foi fixada uma tabela de alturas do Solar em
docs/cenarios/vigilia-do-corvo.md. O essencial:

- Beiral do telhado do salão, onde se trabalha: 7 metros acima do pátio.
- Cumeeira: 10 metros. Estrado do andaime: 7. Pescante do balde: 8.
- Muralha externa baixa: 3 metros — é a única estrutura baixa do conjunto.
- Torre de observação: 18 metros.

E a regra que decorre disso: Mira e Téo estão no telhado, Garran e os demais no
pátio, e os dois grupos NUNCA dividem um quadro em nível de olhar. Quando aparecem
juntos, é contra-plongée de baixo ou plongée de cima. Se um quadro permite que
Garran e Mira conversem cara a cara, o quadro está errado.

3. STATUS DOS STORYBOARDS

- Página 1: aprovada.
- Página 2: refazer. A capa do Téo saiu vermelho-amarronzada, quase idêntica à de
  Mira, e os dois ficam indistinguíveis. A ficha dele define túnica verde-escura e
  marrom. A paleta dele nunca pode se aproximar do vermelho-terroso dela.
- Página 3: aprovada.
- Página 4: refazer os quadros 3 e 4 pelo erro de altura descrito acima.

Os prompts de regeração das páginas 2 e 4 já estão escritos em
capitulos/00-piloto/prompts-storyboard.md.

4. DECISÕES DE ROTEIRO QUE EU TOMEI

- Vael, o ceifeiro, é o vilão final. Míscar é derrotado antes dele.
- Míscar aparece já no capítulo 1, como silhueta ou vulto mal visível: foi ele quem
  conduziu os Umbrais até o Solar.
- A história se divide em sagas, uma por país. O gancho que move Mira é perseguir o
  conhecimento sobre os Umbrais, que é proibido em toda a península. Míscar vai
  soltando generais enquanto o grupo ainda não sabe da trama maior.
- Uma das sagas: eles tentam convencer o país de que Umbrais atravessaram as
  montanhas, não conseguem, acabam entrando no sul e descobrem as atrocidades
  cometidas contra a população local, com as riquezas minerais sendo exportadas
  para os países dominantes.
- A Península de Arkenor tem o tamanho da Península Ibérica.
- O grupo cresce ao longo do caminho: uma garota que luta com poderes de luz,
  desertora de uma ordem de Kharvann cujos membros descendem de um general da Luz;
  um rapaz que usa eletricidade e busca vingança contra um usuário de gravidade;
  um rapaz que usa gelo; uma garota que luta com katana.
- Sistema de magia: ÂNIMA. A alma é produzida pelo coração e corre nas veias.
  Quem consegue tirá-la do corpo a transforma em energia ou matéria. Mira manifesta
  fogo.
- Quero uma classe de Umbral no topo da escala, inspirada nos Vasto Lorde de Bleach:
  tão distorcida que volta a ter feições humanas. Fica reservada para mais adiante.

5. PROPOSTAS DA OUTRA IA QUE ESTOU ADOTANDO

Estas não são fatos que eu inventei sozinho — vieram como sugestão. Quero sua
opinião sobre elas, mas parta delas como base.

- Ânima tem CUSTO: o que se gasta o coração precisa refazer. Quem usa demais esfria
  — extremidades geladas, pulso lento, exaustão que dormir não resolve. No limite, o
  coração para. Isso explica de uma vez: por que as Chamas da Vida matam (são a
  conversão de toda a Ânima do usuário num golpe só); por que o selo do pai é uma
  pista visível desde o começo (Mira nunca sente o custo porque nunca gastou Ânima
  própria, e todos ao redor terminam as lutas trêmulos enquanto ela termina
  inteira); por que os Umbrais devoram (são anti-Ânima, a ferida em crescente é o
  vazio que tentam preencher); e por que o conhecimento sobre Umbrais é proibido
  (saber que eles comem Ânima leva ao cadáver divino, aos selos nas montanhas e à
  mineração — a proibição é abafamento, não superstição).
- A classe nova se chama UMBRAL PLENO (alternativa: Umbral Coroado). Um Umbral que
  consome Ânima suficiente fecha a ferida e recupera forma própria: proporções
  humanas, feições de beleza errada, cicatriz clara em forma de lua onde havia a
  ferida, e OLHOS — nenhuma outra classe tem olhos. Fala fluente, nome escolhido por
  si, manifesta Ânima como um usuário humano. É duelista, não criatura de cerco.
  Passa por humano. A fala imitativa rara dos Menores é o primeiro sintoma da
  ascensão, o que significa que o Umbral que fala com Mira no início é um Menor a
  meio caminho.
- Cada país revela uma camada da MESMA conspiração, não cinco descobertas soltas:
  Valedorn a negação (o Estado já sabia, relatórios confiscados); Lúmara o custo
  humano (a pedra saturada de Ânima, os mineiros definhando com os sintomas de
  exaustão de Ânima, que Mira reconhece como futura médica antes de entender a
  causa); Orvena a colusão (as duas potências, publicamente hostis, cooperando em
  silêncio no vazio jurisdicional do Lago Partido); Namaris a finalidade (a pedra
  não vira arma — está substituindo os selos das montanhas por uma versão barata que
  não funciona, o que faz da ocupação a CAUSA da Muralha estar falhando); Kharvann a
  origem (a ordem guarda a história verdadeira da guerra divina e é onde Mira
  aprende as Chamas da Vida).
- Míscar deve ter um motivo só, não dois: acordar generais serve à obsessão por
  Aelyra — quebrar o selo hereditário e tirá-la da linhagem.
- Pagamento guardado para o fim: a guilda não morreu por azar, morreu porque Mira
  estava lá.
- O usuário de gravidade deve ser um dos generais despertados por Míscar, para que a
  vingança pessoal do rapaz elétrico e a trama maior sejam a mesma linha.
- A garota da katana não manifesta elemento: extrai Ânima para dentro da lâmina.
  Assim o sistema tem escolas, não só elementos.
- As chamas não são treinadas, são desbloqueadas por acontecimento: azul na raiva
  diante das minas, negra numa perda que ela não consegue impedir, dourada quando o
  grupo decide seguir mesmo sabendo o tamanho da coisa.

6. ARQUIVOS NOVOS QUE NÃO EXISTIAM ANTES

- docs/estado-atual.md — brief completo do projeto, com tudo acima organizado.
- docs/prompts-cenarios.md — prompts das pranchas de cenário que faltam.
- docs/prompt-de-abertura.md — esta mensagem.
- capitulos/00-piloto/prompts-storyboard.md — prompts de regeração das páginas 2 e 4.

7. O QUE ESTÁ TRAVANDO A PRODUÇÃO AGORA

As páginas 6 a 10 se passam em quatro ambientes que nunca foram desenhados: a
enfermaria de Maela, o salão de contratos, a rua e praça de Rochafria e o interior
da botica. Existe prancha do Solar e vista externa de Rochafria, mas nenhum
interior. Sem referência, cada storyboard vai inventar um cômodo diferente e a Mira
vai voltar três vezes à mesma enfermaria em três lugares distintos — o mesmo tipo de
erro que aconteceu com a altura do telhado.

A primeira tarefa é gerar essas quatro pranchas, uma por vez, com os prompts de
prompts-cenarios.md. Depois vamos para os storyboards das páginas 5 a 16.

Lembrete das regras de arte que consolidamos: nenhum texto legível dentro das
imagens, e texto que apareça mesmo assim não é cânone; nomes próprios não se
inventam, se faltar um escreva [A DEFINIR]; proposta não vira estabelecido sem eu
aprovar; uma imagem por pedido, sem acrescentar elementos que o prompt não listou.

Comece me dizendo o que achou das propostas do item 5, principalmente da Ânima com
custo e do Umbral Pleno, e o que você acha que ficou frouxo. NÃO GERE NENHUMA
IMAGEM até eu mandar o primeiro prompt de cenário.
```

---

## Ordem de trabalho

1. Colar a mensagem acima e esperar a resposta.
2. Mandar o prompt da **enfermaria** (`docs/prompts-cenarios.md`, seção 1).
3. Mandar o prompt do **salão de contratos** (seção 2).
4. Mandar o prompt da **rua e praça de Rochafria** (seção 3).
5. Mandar o prompt da **botica** (seção 4).
6. Salvar as quatro em `imagens/concept-art/cenarios/` e voltar para os storyboards das páginas 5 a 16 com os ambientes travados.

## Se o GPT começar a errar

- Inventou um nome próprio → lembrar da regra e pedir `[A DEFINIR]`.
- Apareceu texto dentro da imagem → regerar, o texto nunca é cânone.
- Um cômodo mudou de forma entre duas imagens → reanexar a prancha do cenário.
- Mira e Garran conversando cara a cara → reanexar a regra dos sete metros.
