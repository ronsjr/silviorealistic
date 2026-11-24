import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Uma categoria = um arquivo JSON em src/content/categorias/.
// O nome do arquivo (sem .json) é o slug da URL e o nome da pasta de fotos.
const categorias = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/categorias' }),
  schema: z.object({
    titulo: z.string(),
    descricao: z.string(),
    ordem: z.number(),
  }),
});

export const collections = { categorias };
