import { join } from 'path';

import { writeFile, mkdir } from 'fs/promises';
import { PUBLIC_PATHS, SITE } from '../src/consts';
import { getCurrentDate } from '../src/lib/utils';

const sitemap = [
  `<?xml version="1.0" encoding="UTF-8"?>`,
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
  ...PUBLIC_PATHS.map(
    item =>
      `<url><loc>${SITE}${item.path}</loc><lastmod>${getCurrentDate()}</lastmod><priority>1.0</priority></url>`
  ),
  `</urlset>`,
].join('');

const htaccess = `<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</IfModule>
`;

const robots = `User-agent: *
Disallow:

Sitemap: ${SITE}/sitemap.xml
LLMs: ${SITE}/llms.txt`;

const llms = [
  `# NeusGen

> Plataforma inteligente de preparación para exámenes de ingreso universitario.  
> Entrena con simuladores realistas, análisis de desempeño y guías adaptadas para exámenes como EXANI-II, UNAM, IPN, UAM, PAA y más.  
> Potenciada por tecnología educativa y diseño centrado en el estudiante.

## Features
- Simuladores de exámenes con retroalimentación inmediata.
- Guías de estudio y estrategias de aprendizaje personalizadas.
- Estadísticas de progreso y recomendaciones inteligentes.
- Interfaz moderna y accesible desde cualquier dispositivo.\n`,
  `# Contact
- Website: https://neusgen.com`,
].join(`\n`);

const makePoliciesFolder = async () => {
  const aiJSON = `{
  "name": "NeusGen",
  "description": "Plataforma inteligente de preparación universitaria.",
  "contact": "hello@neusgen.com",
  "policies": {
    "training": false,
    "summarization": true
  }
}`;

  try {
    await mkdir(join(process.cwd(), 'dist/.well-known'));
    await writeFile(join(process.cwd(), 'dist/.well-known/ai.json'), aiJSON);
  } catch (error) {
    console.error(error, 'Fallo al crear la carpeta dist');
    process.exit(1);
  }
};

try {
  const promises = [
    writeFile(join(process.cwd(), 'dist/sitemap.xml'), sitemap),
    writeFile(join(process.cwd(), 'dist/.htaccess'), htaccess),
    writeFile(join(process.cwd(), 'dist/robots.txt'), robots),
    writeFile(join(process.cwd(), 'dist/llms.txt'), llms),
    makePoliciesFolder(),
  ];

  await Promise.all(promises);

  console.log('\x1b[32mStatic files generated successfully with extiop\x1b[0m');
} catch (error) {
  console.error(error, 'Fallo al generar los archivos SEO');
  process.exit(1);
}
