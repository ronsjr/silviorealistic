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

export interface Destaque extends Foto {
  categoriaId: string;
  categoria: string;
}

/**
 * Fotos de uma categoria, em ordem alfabética do nome do arquivo.
 * As imagens de teste (teste-*.jpg) só aparecem enquanto a categoria não tem
 * nenhuma foto real; assim que entra uma foto real, as de teste somem sozinhas.
 */
export function fotosDaCategoria(slug: string): Foto[] {
  const prefixo = `/src/assets/portfolio/${slug}/`;
  const todas = Object.entries(modulos)
    .filter(([caminho]) => caminho.startsWith(prefixo))
    .sort(([a], [b]) => a.localeCompare(b, 'pt-BR', { numeric: true }))
    .map(([caminho, modulo]) => ({
      nome: caminho.slice(prefixo.length),
      imagem: modulo.default,
    }));

  const reais = todas.filter((foto) => !foto.nome.startsWith('teste-'));
  return reais.length > 0 ? reais : todas;
}

/**
 * Fotos para a abertura da home: uma de cada categoria por rodada, até `max`,
 * para mostrar a variedade do trabalho.
 */
export function destaquesDaHome(
  categorias: { id: string; titulo: string }[],
  max = 6,
): Destaque[] {
  const porCategoria = categorias.map((categoria) => ({
    ...categoria,
    fotos: fotosDaCategoria(categoria.id),
  }));

  const escolhidas: Destaque[] = [];
  for (let rodada = 0; escolhidas.length < max; rodada++) {
    let achouAlguma = false;
    for (const categoria of porCategoria) {
      const foto = categoria.fotos[rodada];
      if (!foto) continue;
      achouAlguma = true;
      escolhidas.push({ ...foto, categoriaId: categoria.id, categoria: categoria.titulo });
      if (escolhidas.length >= max) break;
    }
    if (!achouAlguma) break;
  }
  return escolhidas;
}
