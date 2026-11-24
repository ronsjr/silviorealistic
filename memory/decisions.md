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
| Domínio | Ainda não existe | Usar `site` + `base` agora; trocar quando o domínio chegar. |

## Pendências

- Versão do Node: o Astro mais recente (7.x) exige Node >= 22.23.4. A máquina de desenvolvimento está em Node 20.19.6 (fim de vida em abril de 2026). Decisão pendente: instalar Node 22 (via gerenciador de versões) ou usar Astro 5.18.x.
- Categorias, textos, fotos, número de WhatsApp e @ do Instagram: aguardando o Silvio.
- Marca d'água: definir texto/logotipo e posição.
