/**
 * Build sin dependencias: une los partials HTML y copia css, js y public a dist/.
 * Uso: node build.js
 * En index.html, cada <!-- @include partials/archivo.html --> se reemplaza por el contenido del archivo.
 */
const fs = require('node:fs');
const path = require('node:path');

const SRC = path.join(__dirname, 'src');
const OUT = path.join(__dirname, 'dist');
const PUBLIC = path.join(__dirname, 'public');
const INCLUDE = /<!--\s*@include\s+(.+?)\s*-->/g;

function resolveIncludes(html, depth = 0) {
  if (depth > 5) throw new Error('Demasiados niveles de @include. Revisa si hay un ciclo.');
  return html.replace(INCLUDE, (_, file) => {
    const target = path.join(SRC, file.trim());
    if (!fs.existsSync(target)) throw new Error(`No existe el partial: src/${file.trim()}`);
    return resolveIncludes(fs.readFileSync(target, 'utf8'), depth + 1).trimEnd();
  });
}

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

fs.writeFileSync(path.join(OUT, 'index.html'), resolveIncludes(fs.readFileSync(path.join(SRC, 'index.html'), 'utf8')));
for (const dir of ['css', 'js']) fs.cpSync(path.join(SRC, dir), path.join(OUT, dir), { recursive: true });
if (fs.existsSync(PUBLIC)) fs.cpSync(PUBLIC, OUT, { recursive: true });

console.log('Build listo en dist/');
