# Decisões do projeto

Registro cronológico das decisões e do motivo. Conteúdo estritamente técnico (o repositório é público).

## 2026-11-24 — Início do projeto

| Tema | Decisão | Motivo |
|---|---|---|
| Framework | **Astro** | Muitas imagens (otimização automática), categorias ainda indefinidas (uma página de categoria gera todas), quase nenhum JS no cliente. |
| Estilo | **CSS puro** com variáveis | Visual autoral de portfólio de arte pede controle total. Sem React e sem Tailwind. |
| Hospedagem | **GitHub Pages** | Grátis, HTTPS e domínio próprio. Testar primeiro; se ruim, migrar para Cloudflare Pages. |
| Repositório | **Público**, conta `ronsjr` | GitHub Pages gratuito exige repositório público. |
| Proteção das fotos | Originais fora do git; versões reduzidas, com marca d'água e sem EXIF no repo | Mitigar cópia indevida e vazamento de GPS. |
| Docker | **Não usar** | Site estático sem serviços; Node direto é mais simples e mais rápido no Windows. |
| Layout | **Mobile first**, responsivo para telas maiores | Tráfego principal vem do Instagram, no celular. |
| Tema | **Escuro** | Identidade visual definida pelo mantenedor. |
| Contato | Botões de WhatsApp (não flutuantes, estilo de outro projeto do mantenedor) e link do Instagram | Sem formulário nem backend. |
| Volume | Algumas centenas de fotos, sem passar disso | Cabe no limite do GitHub Pages. |
| CMS | Adiar; avaliar Pages CMS ou Sveltia CMS | o mantenedor atualiza o site por enquanto. Manter conteúdo em arquivos de dados para facilitar a adoção. |
| Domínio | `silviorealistictattoo.com.br` existe e está estacionado na Hostinger (achado no link da bio do Instagram, em 2026-11-24). Titularidade e acesso ao DNS ainda a confirmar com o Silvio | Usar `site` + `base` agora; ao conectar, apontar o DNS no painel da Hostinger. |
| Origem das fotos | Originais enviados pelo próprio Silvio. **Não** raspar o Instagram | Perfil público só entrega capas de reels (360 px) e o restante exige login; automatizar a coleta viola os termos do Instagram e a qualidade (máx. ~1080 px, comprimida, sem EXIF) fica abaixo do necessário. Para desenvolver o layout, usar imagens de teste geradas localmente. |
| Node e versão do Astro | **Node 20.19.6 (o da máquina) e Astro 5.18.x** | o mantenedor não quer mexer em versões de Node nem ter várias no computador (risco de quebrar outros projetos). O Astro 7.x exige Node >= 22.23.4. Não atualizar o Astro para uma major que exija Node mais novo sem nova decisão. |

## Pendências

- Node 20 saiu de suporte em abril de 2026. Quando o mantenedor decidir atualizar o Node da máquina, reavaliar a migração para o Astro mais recente.
- Categorias, textos, fotos, número de WhatsApp e @ do Instagram: aguardando o Silvio.
- Marca d'água: definir texto/logotipo e posição.
