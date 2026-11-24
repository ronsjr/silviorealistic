// Transforma as fotos ORIGINAIS (originals/<categoria>/*) em versões publicáveis
// (src/assets/portfolio/<categoria>/*.jpg). O repositório é público, então só
// a versão processada pode ir para o git. Em cada foto o script:
//   1. aplica a rotação do EXIF e REMOVE todos os metadados (inclusive GPS);
//   2. reduz para no máximo 1600 px no lado maior (sem ampliar);
//   3. aplica a marca d'água discreta no canto inferior direito;
//   4. grava como JPEG.
//
// Uso:
//   npm run imagens                      (todas as categorias)
//   npm run imagens -- realismo          (só uma categoria)
//   npm run imagens -- --forcar          (reprocessa mesmo as já feitas)
// A marca d'água pode ser trocada com a variável de ambiente MARCA_DAGUA.

import { mkdir, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ORIGINAIS = path.join(RAIZ, 'originals');
const DESTINO = path.join(RAIZ, 'src', 'assets', 'portfolio');
const CATEGORIAS = path.join(RAIZ, 'src', 'content', 'categorias');

const MARCA_DAGUA = process.env.MARCA_DAGUA ?? '@silviorealistictattoo';
const LADO_MAXIMO = 1600;
const EXTENSOES = new Set(['.jpg', '.jpeg', '.png', '.webp']);

const argumentos = process.argv.slice(2);
const forcar = argumentos.includes('--forcar');
const filtro = argumentos.filter((a) => !a.startsWith('--'));

function escapaXml(texto) {
  return texto.replace(/[<>&"']/g, (c) => `&#${c.charCodeAt(0)};`);
}

function slugDoNome(nomeArquivo) {
  return path
    .parse(nomeArquivo)
    .name.toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function svgMarcaDagua(largura, altura) {
  const tamanho = Math.max(14, Math.round(Math.min(largura, altura) * 0.03));
  const margem = Math.round(tamanho * 1.2);
  const contorno = Math.max(1, Math.round(tamanho / 14));
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${largura}" height="${altura}">
  <text x="${largura - margem}" y="${altura - margem}" text-anchor="end"
    font-family="Arial, Helvetica, sans-serif" font-size="${tamanho}" font-weight="600"
    fill="#ffffff" fill-opacity="0.55" stroke="#000000" stroke-opacity="0.35"
    stroke-width="${contorno}" paint-order="stroke">${escapaXml(MARCA_DAGUA)}</text>
</svg>`,
  );
}

async function existe(caminho) {
  return stat(caminho).then(
    () => true,
    () => false,
  );
}

async function processaFoto(origem, destino) {
  // .rotate() sem argumentos aplica a orientação do EXIF; o sharp não copia
  // metadados para a saída, então EXIF/GPS não chegam ao arquivo final.
  const reduzida = await sharp(origem)
    .rotate()
    .resize({ width: LADO_MAXIMO, height: LADO_MAXIMO, fit: 'inside', withoutEnlargement: true })
    .toBuffer({ resolveWithObject: true });

  await sharp(reduzida.data)
    .composite([{ input: svgMarcaDagua(reduzida.info.width, reduzida.info.height) }])
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(destino);
}

if (!(await existe(ORIGINAIS))) {
  console.error('Pasta originals/ não encontrada. Crie originals/<categoria>/ e coloque as fotos nela.');
  process.exit(1);
}

const pastas = (await readdir(ORIGINAIS, { withFileTypes: true }))
  .filter((d) => d.isDirectory() && !d.name.startsWith('_'))
  .map((d) => d.name)
  .filter((nome) => filtro.length === 0 || filtro.includes(nome));

if (pastas.length === 0) {
  console.log('Nenhuma pasta de categoria encontrada em originals/. Nada a fazer.');
  process.exit(0);
}

let feitas = 0;
let puladas = 0;

for (const slug of pastas) {
  if (!(await existe(path.join(CATEGORIAS, `${slug}.json`)))) {
    console.warn(`Aviso: "${slug}" não tem src/content/categorias/${slug}.json. A categoria não aparece no site até criar esse arquivo.`);
  }

  const pastaOrigem = path.join(ORIGINAIS, slug);
  const pastaDestino = path.join(DESTINO, slug);
  await mkdir(pastaDestino, { recursive: true });

  const arquivos = (await readdir(pastaOrigem)).filter((a) =>
    EXTENSOES.has(path.extname(a).toLowerCase()),
  );

  for (const arquivo of arquivos) {
    const origem = path.join(pastaOrigem, arquivo);
    const destino = path.join(pastaDestino, `${slugDoNome(arquivo)}.jpg`);

    if (!forcar && (await existe(destino))) {
      const [o, d] = await Promise.all([stat(origem), stat(destino)]);
      if (d.mtimeMs >= o.mtimeMs) {
        puladas += 1;
        continue;
      }
    }

    try {
      await processaFoto(origem, destino);
      feitas += 1;
      console.log(`  ${slug}/${arquivo}`);
    } catch (erro) {
      console.error(`  Falhou: ${slug}/${arquivo} (${erro.message})`);
    }
  }
}

console.log(`Concluído: ${feitas} processadas, ${puladas} já estavam em dia.`);
