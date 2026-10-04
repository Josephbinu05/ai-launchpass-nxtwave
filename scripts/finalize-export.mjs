import { readdir, copyFile } from 'node:fs/promises';
import { join, relative, resolve, sep } from 'node:path';

// Next 16's Windows static exporter emits some segment payloads as nested
// directories; its browser router requests the dot-separated URLs instead.
// Preserve the originals and add the equivalent files for any static host.
// Upstream: https://github.com/vercel/next.js/issues/85374
const root = resolve('out');
let copies = 0;
async function visit(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const source = join(directory, entry.name);
    if (entry.isDirectory()) await visit(source);
    else if (entry.name.endsWith('.txt')) {
      const parts = relative(root, source).split(sep);
      const segment = parts.findIndex(part => part.startsWith('__next.'));
      if (segment >= 0 && segment < parts.length - 1) {
        const target = join(root, ...parts.slice(0, segment), parts.slice(segment).join('.'));
        await copyFile(source, target);
        copies++;
      }
    }
  }
}
await visit(root);
console.log(`Static export ready; ${copies} portable route payload aliases created.`);
