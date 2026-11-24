# Decisões do projeto

Registro das decisões e do motivo. Conteúdo estritamente técnico (o repositório é público).

## 2026-11-24 — Início do projeto

| Tema | Decisão | Motivo |
|---|---|---|
| Framework | **Astro** | Muitas imagens (otimização automática), categorias ainda indefinidas (uma página de categoria gera todas), quase nenhum JS no cliente. |
| Node e versão do Astro | **Node 20.19.6 (o da máquina) e Astro 5.18.x** | O mantenedor não quer mexer em versões de Node nem ter várias no computador (risco de quebrar outros projetos). O Astro 7.x exige Node >= 22.23.4. Não subir de major sem nova decisão. |
| Estilo | **CSS puro** com variáveis | Visual autoral de portfólio de arte pede controle total. Sem React e sem Tailwind. |
| Hospedagem | **GitHub Pages** | Grátis, HTTPS e domínio próprio. Testar primeiro; se ruim, migrar para Cloudflare Pages. |
| Repositório | **Público**, conta `ronsjr` | GitHub Pages gratuito exige repositório público. |
| Proteção das fotos | Originais fora do git; versões reduzidas, com marca d'água e sem EXIF no repo | Mitigar cópia indevida e vazamento de GPS. Script validado com foto de teste contendo EXIF, GPS e orientação. |
| Origem das fotos | Originais enviados pelo próprio Silvio. **Não** raspar o Instagram | O perfil público só entrega capas de reels (360 px) e o restante exige login; automatizar a coleta viola os termos do Instagram e a qualidade (máx. ~1080 px, comprimida, sem EXIF) fica abaixo do necessário. |
| Docker | **Não usar** | Site estático sem serviços; Node direto é mais simples e mais rápido no Windows. |
| Layout | **Mobile first**, responsivo para telas maiores | Tráfego principal vem do Instagram, no celular. |
| Tema | **Escuro** | Identidade visual definida pelo mantenedor. |
| Contato | Botões de WhatsApp (não flutuantes, cheio com hover invertido) e link do Instagram | Sem formulário nem backend. |
| Volume | Algumas centenas de fotos, sem passar disso | Cabe no limite do GitHub Pages. |
| CMS | Adiar; avaliar Pages CMS ou Sveltia CMS | Conteúdo já fica em arquivos. Um CMS que envie fotos direto ao repo pularia marca d'água e remoção de EXIF. |
| Domínio | **Será registrado um domínio novo, depois.** O `silviorealistictattoo.com.br` (estacionado na Hostinger) **não será usado** | Usar `site` + `base` agora; ao registrar o novo, apontar o DNS para o GitHub Pages. |

## 2026-11-24 — Direção visual e implementação

| Tema | Decisão | Motivo |
|---|---|---|
| Paleta | Tinta `#111418`, Carvão `#181c22`, Grafite `#2b313a`, Osso `#ece7dd`, Névoa `#a3a9b3`, Azul-tinta `#8fafd1` | O azul vem do ofício (preto envelhecido sob a pele). Sem acento saturado: a cor da página são as fotos. |
| Tipografia | **Gloock** (títulos) + **Hanken Grotesk** (texto), hospedadas no próprio site (Fontsource) | Serifa de contraste forte lembra chiaroscuro; sem chamada ao Google (desempenho e privacidade). |
| Elemento memorável | Índice de categorias em tipografia grande, em vez de grade de cards | Diferencia o site do visual padrão de portfólio. |
| Galeria | Mosaico em colunas (2, 3 e 4) + **PhotoSwipe** | Mantém a proporção original das fotos; zoom por pinça é importante para ver detalhe de realismo. |
| Conteúdo | Categorias em JSON (content collection) e fotos por pasta | Adicionar categoria ou foto não exige mexer em código; facilita um CMS depois. |
| Em construção | `noindex` ligado e WhatsApp sem número real | Evitar indexação do site provisório e mensagens para número errado. |
| Imagens de teste | Geradas localmente (`teste-*.jpg`) | Desenvolver o layout sem usar fotos de terceiros. Remover quando entrarem as reais. |
| Deploy | GitHub Actions com `withastro/action` em Node 20 | A ação usa Node 24 por padrão; fixado em 20 para igualar o ambiente local. |

## Pendências

- Número de WhatsApp de orçamento do Silvio (confirmar com ele) e o texto da marca d'água definitivo.
- Categorias, textos e fotos originais do Silvio. Marca d'água atual: `@silviorealistictattoo`.
- Fotos de abertura (hero) e retrato para a seção Sobre.
- Registrar o domínio novo e conectar ao GitHub Pages.
- Node 20 saiu de suporte em abril de 2026. Quando o mantenedor decidir atualizar o Node da máquina, reavaliar a migração para o Astro mais recente.
