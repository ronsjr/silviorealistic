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

// Um curso (ou e-book) = um arquivo JSON em src/content/cursos/.
// Título e descrição são extraídos da página do produto na Hotmart;
// a capa fica em src/assets/cursos/ e o link leva à Hotmart.
const cursos = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/cursos' }),
  schema: ({ image }) =>
    z.object({
      tipo: z.string(),
      titulo: z.string(),
      descricao: z.string(),
      link: z.string().url(),
      capa: image(),
      ordem: z.number(),
    }),
});

export const collections = { categorias, cursos };
