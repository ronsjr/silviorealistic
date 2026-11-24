// Gera imagens de TESTE (fumaça em tons de cinza) para desenvolver o layout
// sem usar fotos reais. Grava em src/assets/portfolio/<categoria>/teste-NN.jpg
// para cada categoria de src/content/categorias/.
//
// Uso:   npm run imagens:teste
// Limpar: apagar os arquivos teste-*.jpg (ver "npm run imagens:teste -- --limpar").

import { mkdir, readdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CATEGORIAS = path.join(RAIZ, 'src', 'content', 'categorias');
const DESTINO = path.join(RAIZ, 'src', 'assets', 'portfolio');

// Proporções variadas (largura, altura), como numa galeria real.
const FORMATOS = [
  [900, 1200],
  [1200, 900],
  [1000, 1000],
  [960, 1280],
  [1200, 800],
  [900, 1200],
  [1080, 1350],
  [1200, 1200],
];

function svgFumaca(largura, altura, semente) {
  const freq = (0.003 + (semente % 5) * 0.0011).toFixed(4);
  const focoX = 25 + ((semente * 17) % 50);
  const focoY = 20 + ((semente * 29) % 50);
  const tamanhoTexto = Math.round(Math.min(largura, altura) * 0.028);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${largura}" height="${altura}">
  <defs>
    <filter id="f" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="${freq}" numOctaves="5" seed="${semente}"/>
      <feColorMatrix type="matrix" values="0.33 0.33 0.33 0 0  0.33 0.33 0.33 0 0  0.33 0.33 0.33 0 0  0 0 0 0 1"/>
      <feComponentTransfer>
        <feFuncR type="linear" slope="1.9" intercept="-0.42"/>
        <feFuncG type="linear" slope="1.9" intercept="-0.42"/>
        <feFuncB type="linear" slope="1.9" intercept="-0.42"/>
      </feComponentTransfer>
    </filter>
    <radialGradient id="luz" cx="${focoX}%" cy="${focoY}%" r="85%">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.14"/>
      <stop offset="0.55" stop-color="#000000" stop-opacity="0.35"/>
      <stop offset="1" stop-color="#000000" stop-opacity="0.82"/>
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="#0d0f12"/>
  <rect width="100%" height="100%" filter="url(#f)"/>
  <rect width="100%" height="100%" fill="url(#luz)"/>
  <text x="${tamanhoTexto}" y="${altura - tamanhoTexto}" font-family="Arial, Helvetica, sans-serif" font-size="${tamanhoTexto}" fill="#a3a9b3" fill-opacity="0.7">Imagem de teste</text>
</svg>`;
}

const limpar = process.argv.includes('--limpar');
const arquivos = await readdir(CATEGORIAS);
const slugs = arquivos.filter((a) => a.endsWith('.json')).map((a) => a.replace(/\.json$/, ''));

let total = 0;
let semente = 1;

for (const slug of slugs) {
  const pasta = path.join(DESTINO, slug);

  if (limpar) {
    const existentes = await readdir(pasta).catch(() => []);
    for (const nome of existentes.filter((n) => n.startsWith('teste-'))) {
      await rm(path.join(pasta, nome));
      total += 1;
    }
    continue;
  }

  await mkdir(pasta, { recursive: true });
  for (const [indice, [largura, altura]] of FORMATOS.entries()) {
    const nome = `teste-${String(indice + 1).padStart(2, '0')}.jpg`;
    await sharp(Buffer.from(svgFumaca(largura, altura, semente)))
      .jpeg({ quality: 70, mozjpeg: true })
      .toFile(path.join(pasta, nome));
    semente += 1;
    total += 1;
  }
}

console.log(`${limpar ? 'Removidas' : 'Geradas'} ${total} imagens de teste em ${slugs.length} categorias.`);
