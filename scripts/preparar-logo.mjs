// Prepara a logo do estúdio a partir do arquivo enviado (fundo preto) para uso
// no site: remove o fundo preto (vira transparência), grava a logo e gera os
// ícones do navegador.
//
// Uso:   npm run logo                      (usa originals/logo-insta.jpg)
//        npm run logo -- caminho/logo.png  (outro arquivo, de preferência maior)
//
// Saídas (versionadas, a logo é pública):
//   src/assets/marca/logo.png      logo com fundo transparente
//   public/favicon.png             ícone da aba (64 px)
//   public/apple-touch-icon.png    ícone do iPhone (180 px, sobre o fundo do site)
//
// Quando o Silvio mandar a logo em alta resolução ou em vetor, basta rodar de novo.

import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const entrada = path.resolve(process.argv[2] ?? path.join(RAIZ, 'originals', 'logo-insta.jpg'));
const FUNDO_DO_SITE = '#13110d';
const LIMIAR = 14; // abaixo disso o pixel é considerado fundo preto (ruído de JPEG)
// Ao trocar o fundo preto por transparência, os tons de dourado escuro ficam
// "lavados". Realçar a opacidade em 60% devolve a riqueza do original sobre preto.
const REALCE_OPACIDADE = 1.6;

const { data, info } = await sharp(entrada).ensureAlpha().raw().toBuffer({ resolveWithObject: true });

// Logo clara sobre preto: o brilho do pixel vira a opacidade e a cor é "desmultiplicada",
// o que preserva o dourado e deixa o preto totalmente transparente.
const saida = Buffer.alloc(data.length);
for (let i = 0; i < data.length; i += 4) {
  const brilho = Math.max(data[i], data[i + 1], data[i + 2]);
  if (brilho < LIMIAR) continue; // continua 0,0,0,0 (transparente)
  saida[i] = Math.min(255, Math.round((data[i] * 255) / brilho));
  saida[i + 1] = Math.min(255, Math.round((data[i + 1] * 255) / brilho));
  saida[i + 2] = Math.min(255, Math.round((data[i + 2] * 255) / brilho));
  saida[i + 3] = Math.min(255, Math.round(brilho * REALCE_OPACIDADE));
}

const logo = () => sharp(saida, { raw: { width: info.width, height: info.height, channels: 4 } });

await mkdir(path.join(RAIZ, 'src', 'assets', 'marca'), { recursive: true });
await logo().png({ compressionLevel: 9 }).toFile(path.join(RAIZ, 'src', 'assets', 'marca', 'logo.png'));
await logo().resize(64, 64, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile(path.join(RAIZ, 'public', 'favicon.png'));
await logo()
  .resize(180, 180, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .flatten({ background: FUNDO_DO_SITE })
  .png()
  .toFile(path.join(RAIZ, 'public', 'apple-touch-icon.png'));

console.log(`Logo preparada a partir de ${path.relative(RAIZ, entrada)} (${info.width}x${info.height}).`);
if (info.width < 400) {
  console.log('Aviso: o arquivo é pequeno. Serve para tamanhos pequenos (cabeçalho, menu, ícone); peça uma versão maior ou em vetor ao Silvio.');
}
