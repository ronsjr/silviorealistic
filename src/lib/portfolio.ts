import type { ImageMetadata } from 'astro';

// Todas as fotos publicáveis ficam em src/assets/portfolio/<categoria>/.
// Para ganhar uma foto nova basta colocá-la na pasta (via scripts/processar-imagens.mjs).
const modulos = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/portfolio/*/*.{jpg,jpeg,png,webp}',
  { eager: true },
);

export interface Foto {
  nome: string;
  imagem: ImageMetadata;
}

export function fotosDaCategoria(slug: string): Foto[] {
  const prefixo = `/src/assets/portfolio/${slug}/`;
  return Object.entries(modulos)
    .filter(([caminho]) => caminho.startsWith(prefixo))
    .sort(([a], [b]) => a.localeCompare(b, 'pt-BR', { numeric: true }))
    .map(([caminho, modulo]) => ({
      nome: caminho.slice(prefixo.length),
      imagem: modulo.default,
    }));
}
