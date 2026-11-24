// Monta URLs internas respeitando o `base` do astro.config (GitHub Pages usa
// um subcaminho enquanto não houver domínio próprio).
const base = import.meta.env.BASE_URL.replace(/\/+$/, '');

export function url(caminho = ''): string {
  return `${base}/${caminho.replace(/^\/+/, '')}`;
}
