# Silvio Realistic — Portfólio

> Guia de código e decisões do projeto. Lido automaticamente pelo Claude Code.
> Este repositório é **público** (GitHub Pages gratuito). Nunca colocar aqui segredos, dados pessoais ou fotos originais.

## O que é

Site de portfólio pessoal de **Silvio Muniz** (Instagram: `@silviorealistictattoo`), artista tatuador de arte realista. Organizado em categorias de trabalhos (as categorias ainda serão definidas por ele). Idioma do site e da documentação: **português brasileiro**.

Quem mantém o site e atualiza o conteúdo: o mantenedor do site. O Silvio é o dono do portfólio.

## Stack

- **Astro 5.x** (site estático, sem framework de UI), fixado na linha 5.18.x porque a máquina usa **Node 20.19.6** e o mantenedor não quer instalar nem trocar versões de Node. **Não atualizar para uma major nova do Astro** (a 7.x exige Node >= 22.23.4) sem decisão dele. No GitHub Actions usar também Node 20, igual ao local.
- **CSS puro** com variáveis (design tokens). **Sem React e sem Tailwind**, por decisão.
- JavaScript só onde for necessário (lightbox da galeria). Preferir HTML/CSS.
- **Mobile first**: escrever o CSS base para celular e ampliar com `min-width` para telas maiores.
- **Tema escuro** como identidade visual.
- Ver `memory/decisions.md` para o histórico e o motivo de cada decisão.

## Hospedagem e deploy

- **GitHub Pages**, com deploy por GitHub Actions a cada push na `main`.
- URL provisória: `https://ronsjr.github.io/silviorealistic/`. Por isso o `astro.config` usa `site` e `base`. Todos os links internos e de assets devem respeitar o `base` (usar `import.meta.env.BASE_URL`).
- Domínio provável: `silviorealistictattoo.com.br` (consta no link da bio do Instagram do Silvio e hoje está estacionado na Hostinger; confirmar titularidade e acesso ao DNS). Ao conectar: criar `public/CNAME`, ajustar `site`, remover `base` e apontar o DNS no painel da Hostinger.
- Plano B se o GitHub Pages não servir: **Cloudflare Pages** (aceita repositório privado).

## Regras de imagens (obrigatórias)

O repositório é público e o risco real é cópia indevida das fotos. Portanto:

1. **Originais em alta resolução ficam só em `originals/`**, ignorada pelo git. Nunca commitar.
2. Um script de processamento (a criar em `scripts/`) gera as versões publicáveis: lado maior até ~1600 px, **marca d'água discreta**, **metadados EXIF removidos** (podem conter GPS), gravadas em `src/assets/portfolio/<categoria>/`.
3. Só `src/assets/` é versionado. O Astro ainda converte para WebP/AVIF no build.
4. Sem licença open source no repositório (todos os direitos reservados por padrão).
5. Estimativa de volume: algumas centenas de fotos. Manter o site publicado abaixo do limite de ~1 GB do GitHub Pages.

## Contato

- Apenas **botões de WhatsApp** (link `wa.me`) e **link do Instagram**. Sem formulário e sem backend.
- Botão de WhatsApp **não flutuante**: seguir a linguagem visual do botão de outro projeto do mantenedor (botão inline, cor cheia com hover invertido), adaptada ao tema escuro.

## CMS (futuro)

Hoje o conteúdo é atualizado por arquivos, pelo mantenedor. Está previsto um CMS gratuito baseado em Git (candidatos: Pages CMS, Sveltia CMS). Para facilitar a adoção depois: manter o conteúdo em **content collections / arquivos de dados** (nada de texto de categoria ou legenda fixo em componentes).

## Estrutura de pastas

```
silviorealistic/
├── CLAUDE.md
├── memory/            ← decisões e contexto do projeto (versionado, só conteúdo técnico)
├── originals/         ← fotos originais, LOCAL, ignorada pelo git
├── scripts/           ← processamento de imagens
├── public/            ← arquivos servidos como estão (favicon, CNAME futuro)
└── src/
    ├── assets/portfolio/<categoria>/   ← fotos publicáveis (reduzidas, com marca d'água)
    ├── components/
    ├── content/ ou data/               ← categorias e metadados das fotos
    ├── layouts/
    ├── pages/
    └── styles/                         ← tokens e CSS global
```

## Regras gerais

- Todo contexto persistente deste projeto vai em `memory/` (nunca no sistema interno do Claude Code), conforme a regra do ecossistema Raccoon Digital.
- Commits: e-mail noreply do GitHub já está configurado no git. Não expor e-mail pessoal em commits.
- O Claude usa sempre a forma masculina ao se referir a si mesmo em português.
