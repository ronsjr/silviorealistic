# Silvio Realistic — Portfólio

> Guia de código e decisões do projeto. Lido automaticamente pelo Claude Code.
> Este repositório é **público** (GitHub Pages gratuito). Nunca colocar aqui segredos, dados pessoais ou fotos originais.

## O que é

Site de portfólio pessoal de **Silvio Muniz** (Instagram: `@silviorealistictattoo`), artista tatuador de arte realista, organizado em categorias de trabalhos (as categorias definitivas ainda serão definidas por ele). Idioma do site e da documentação: **português brasileiro**.

## Comandos

Requer Node 20 (o da máquina de desenvolvimento). Sem Docker: o site é estático.

| Comando | O que faz |
|---|---|
| `npm install` | Instala as dependências |
| `npm run dev` | Servidor local com recarga automática: http://localhost:4321/silviorealistic/ |
| `npm run build` | Gera o site em `dist/` |
| `npm run preview` | Serve o `dist/` (conferir o build antes de publicar) |
| `npm run imagens` | Processa `originals/` e grava em `src/assets/portfolio/` (marca d'água, sem EXIF) |
| `npm run logo` | Prepara a logo (fundo transparente e ícones do navegador) a partir de `originals/logo-insta.jpg`; aceita outro arquivo: `npm run logo -- caminho.png` |
| `npm run imagens:teste` | Gera imagens de teste. Com `-- --limpar` remove `teste-*.jpg` |

## Stack

- **Astro 5.x** (site estático, sem framework de UI), fixado na linha 5.18.x porque a máquina usa **Node 20** e o mantenedor não quer instalar nem trocar versões de Node. **Não atualizar para uma major nova do Astro** (a 7.x exige Node >= 22.23.4) sem decisão dele. No GitHub Actions usar também Node 20, igual ao local.
- **CSS puro** com variáveis (design tokens em `src/styles/global.css`), mais estilos escopados em cada componente `.astro`. **Sem React e sem Tailwind**, por decisão.
- JavaScript só onde é necessário: lightbox da galeria (**PhotoSwipe**, com zoom por pinça). O resto é HTML/CSS.
- Fontes **dentro do site** via Fontsource (Gloock nos títulos, Hanken Grotesk no texto, Cinzel no nome da marca), sem chamadas ao Google.
- O `npm install` mostra um aviso de engine do `undici@8` (dependência interna do Astro usada só pelo recurso experimental de fontes, que não usamos). É inofensivo no Node 20.
- Histórico e motivos das decisões: `memory/decisions.md`.

## Design

- **Mobile first**: o CSS base é o do celular e as telas maiores ampliam com `min-width` (48rem e 80rem). Alvos de toque com no mínimo 44 px. Respeitar `prefers-reduced-motion`.
- **Tema escuro** e neutro, porque o trabalho do Silvio é **realismo colorido, muito vivo, em fotos verticais** (braços e pernas): a moldura não pode competir com as fotos. O fundo é um preto **quente**, derivado dos tons da logo (a umbra escura do emblema `#342711` clareia até o ouro `#d8b442`): Tinta `#13110d` (fundo), Carvão `#1c1913`, Grafite `#352e20` (linhas), Osso `#ece7dd` (texto), Névoa `#aaa292` (texto secundário). O **Ouro `#dfc053`** marca as ações: botão principal (cheio em ouro), títulos de seção, foco, hover e seleção. O site continua predominantemente escuro.
- **Navegação**: cabeçalho fixo com a logo (grande no topo da página, encolhe ao rolar) e o **menu lateral** (`<dialog>` nativo, no componente `Cabecalho`) que lista todas as categorias de qualquer página. Não há botão de orçamento no cabeçalho: o pedido fica no corpo da página e no menu, então escala para muitas categorias sem exigir rolagem. A home mostra o trabalho logo na primeira tela: nome grande e fotos de destaque (faixa que se arrasta no celular, mosaico no desktop), depois as categorias em tiles com foto.
- Como as fotos são verticais, **não usar hero com foto horizontal em tela cheia** (corta a foto). Um único movimento automático: a entrada do nome no hero. Evitar rótulos em caixa-alta, numeração decorativa e setas nos botões.
- **Rodapé** em todas as páginas termina com a faixa de crédito "Copyright © ano Silvio Muniz | Powered by Raccoon Digital", no formato usado nos outros projetos do mantenedor (uma linha, fonte fluida).
- **Logo**: o arquivo recebido tem só 150 px, então não passa de ~80 px na tela (cabeçalho no topo da página; menu e ícones menores). **Não aparece no rodapé** (lá só o nome). Pedir ao Silvio uma versão grande ou em vetor e rodar `npm run logo`.
- **Nome da marca** ("SILVIO MUNIZ" no cabeçalho, menu e rodapé) em Cinzel, letras romanas como a faixa da logo; títulos em Gloock; texto em Hanken Grotesk.
- Botões: cheio (Osso) com hover invertido, como o botão de WhatsApp de outros projetos do mantenedor. Classes globais `.botao` e `.botao--vazado`.

## Conteúdo

- **Categorias**: um arquivo `src/content/categorias/<slug>.json` com `titulo`, `descricao` e `ordem`. O `<slug>` vira a URL (`/trabalhos/<slug>/`) e o nome da pasta de fotos.
- **Fotos**: `src/assets/portfolio/<slug>/*.jpg`. Basta colocar o arquivo na pasta que ele aparece na galeria (ordem alfabética). A primeira foto da categoria é a capa do tile; a home mostra até 6 fotos de destaque (uma de cada categoria por rodada).
- **Dados gerais** (nome, Instagram, WhatsApp, `noindex`): `src/data/site.ts`.
- As categorias atuais (Realismo, Cover up, Fechamentos) e seus textos são **provisórios**, inspirados nos destaques do Instagram. O Silvio define as definitivas.
- As imagens de teste (`teste-*.jpg`, geradas por `npm run imagens:teste`) foram removidas do repositório; o script continua disponível. Elas somem sozinhas de uma categoria que tenha fotos reais.
- As fotos `provisorio-*.jpg` são capas de reels baixadas do perfil público do Instagram (360 px), usadas **como placeholders** até o Silvio mandar os originais. A publicação foi autorizada pelo mantenedor em 2026-11-24. Estão distribuídas de forma arbitrária entre as 3 categorias provisórias. **Substituir pelas fotos reais** (e apagar estas) assim que chegarem.
- **Cursos**: `src/content/cursos/*.json` (`tipo`, `titulo`, `descricao`, `link`, `capa`, `ordem`), com as capas em `src/assets/cursos/`. Títulos e descrições foram extraídos das páginas dos produtos na Hotmart (pontuação dos títulos ajustada) e os links são os da bio do Instagram, que levam à Hotmart. Aparecem na seção "Cursos e e-book" da home e no menu.

## Regras de imagens (obrigatórias)

O repositório é público e o risco real é cópia indevida das fotos. Portanto:

1. **Originais em alta resolução ficam só em `originals/`**, ignorada pelo git. Nunca commitar. As fotos vêm do próprio Silvio. Não raspar o Instagram; a única exceção são as capas provisórias descritas em "Conteúdo", baixadas uma vez, sem login, e a substituir.
2. O fluxo é `originals/<categoria>/foto.jpg` → `npm run imagens` → `src/assets/portfolio/<categoria>/foto.jpg`. O script **remove todos os metadados** (inclusive GPS, validado em teste), aplica a rotação do EXIF, reduz para no máximo 1600 px e aplica **marca d'água** discreta (`@silviorealistictattoo`, mudável por `MARCA_DAGUA`). Aceita jpg, jpeg, png e webp.
3. Só `src/assets/` é versionado. O Astro ainda converte para WebP no build.
4. Sem licença open source no repositório (todos os direitos reservados por padrão).
5. Volume estimado: algumas centenas de fotos. Manter o site publicado abaixo do limite de ~1 GB do GitHub Pages.

## Contato

- Apenas **botões de WhatsApp** (link `wa.me`, não flutuante) e **link do Instagram**. Sem formulário e sem backend.
- O número de WhatsApp fica em `src/data/site.ts` e está **vazio** até o Silvio confirmar qual usar. Não colocar número real no código sem essa confirmação.

## Hospedagem e deploy

- **GitHub Pages**, com deploy por GitHub Actions (`.github/workflows/deploy.yml`) a cada push na `main`.
- URL provisória: `https://ronsjr.github.io/silviorealistic/`. Por isso o `astro.config.mjs` usa `site` e `base`. Todos os links internos devem usar o helper `url()` de `src/lib/url.ts`.
- Domínio: **ainda não existe**; será registrado um novo depois. O `silviorealistictattoo.com.br` (estacionado na Hostinger) **não será usado**. Ao conectar o novo: criar `public/CNAME`, ajustar `site`, remover `base` e apontar o DNS.
- Enquanto o site estiver em construção: `noindex` ligado (flag em `src/data/site.ts`) e **nenhum número de WhatsApp real** no código. Desligar o `noindex` só no lançamento.
- Plano B se o GitHub Pages não servir: **Cloudflare Pages** (aceita repositório privado).

## CMS (futuro)

Hoje o conteúdo é atualizado por arquivos. Está previsto um CMS gratuito baseado em Git (candidatos: Pages CMS, Sveltia CMS). O conteúdo já está em arquivos de dados (categorias em JSON, fotos por pasta). Atenção: um CMS que envie fotos direto ao repositório pularia a marca d'água e a remoção de EXIF; nesse caso a marca d'água precisa passar a ser aplicada no build.

## Estrutura de pastas

```
silviorealistic/
├── CLAUDE.md
├── memory/                  decisões e contexto (versionado, só conteúdo técnico)
├── originals/               fotos originais, LOCAL, ignorada pelo git
├── scripts/                 processar-imagens.mjs, gerar-imagens-teste.mjs, preparar-logo.mjs
├── public/                  favicon.png, apple-touch-icon.png (e CNAME no futuro)
└── src/
    ├── assets/marca/logo.png           logo do estúdio (fundo transparente)
    ├── assets/cursos/                  capas dos cursos (extraídas da Hotmart)
    ├── assets/portfolio/<categoria>/   fotos publicáveis
    ├── components/          Cabecalho, Rodape, Orcamento, Cursos, BotaoWhatsapp, Icone
    ├── content/categorias/  uma categoria por JSON
    ├── content/cursos/      um curso ou e-book por JSON
    ├── data/site.ts         nome, Instagram, WhatsApp, noindex
    ├── layouts/Base.astro
    ├── lib/                 url.ts, portfolio.ts
    ├── pages/               index, trabalhos/[slug], 404
    └── styles/global.css    tokens e estilos base
```

## Regras gerais

- Todo contexto persistente deste projeto vai em `memory/` dentro do repositório, não no sistema interno do Claude Code.
- Repositório público: não escrever nomes pessoais, e-mails, telefones nem detalhes de outros projetos do mantenedor em arquivos versionados.
- Commits usam o e-mail noreply do GitHub, já configurado no git.
- O Claude usa sempre a forma masculina ao se referir a si mesmo em português.
