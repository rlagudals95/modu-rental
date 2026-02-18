import { cpSync, mkdirSync } from 'node:fs';

mkdirSync('dist', { recursive: true });
for (const file of ['manifest.json', 'newtab.html', 'styles.css']) {
  cpSync(file, `dist/${file}`);
}
