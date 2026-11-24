import { defineConfig } from 'astro/config';

// URL provisória do GitHub Pages.
// Ao registrar o domínio novo: trocar `site` pelo domínio, REMOVER `base`
// e criar public/CNAME com o domínio.
export default defineConfig({
  site: 'https://ronsjr.github.io',
  base: '/silviorealistic',
  trailingSlash: 'always',
});
