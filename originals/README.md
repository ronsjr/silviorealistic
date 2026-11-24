# originals/

Pasta LOCAL para as fotos originais (alta resolucao) dos trabalhos do Silvio.

**Tudo aqui, exceto este README, e ignorado pelo git e nunca vai para o GitHub.**
O repositorio e publico, entao os originais nao podem sair desta maquina.

## Organizacao

Uma subpasta por categoria, com o mesmo slug usado no site:

```
originals/
  <categoria>/
    foto-001.jpg
    foto-002.jpg
```

## Fluxo

1. Colocar as fotos originais na subpasta da categoria.
2. Rodar o script de processamento de imagens (ver CLAUDE.md na raiz).
3. O script gera as versoes reduzidas, com marca d'agua e sem metadados EXIF
   (que podem conter GPS), e as grava em `src/assets/portfolio/<categoria>/`.
4. Apenas `src/assets/` e versionado.

Backup dos originais: guardar tambem fora desta pasta (Google Drive, HD externo),
porque ela nao esta no git.
