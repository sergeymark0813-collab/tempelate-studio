import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { PRODUCTS } from './src/lib/studio/products';
import { DICTIONARIES } from './src/lib/i18n/dictionaries';
import { PRIVACY } from './src/data/privacy';

const SITE_URL = 'https://www.temlatestudio.site';

/*
  Static copy is written in Russian: the domain targets Russian queries and
  index.html has always shipped Russian. Note that the app's *runtime* default
  is English, so a crawler executing JavaScript sees English instead — see the
  note in README about picking one.
*/
const ru = DICTIONARIES.ru;
const fill = (template: string, vars: Record<string, string | number>) =>
  Object.entries(vars).reduce((text, [k, v]) => text.replaceAll(`{${k}}`, String(v)), template);

interface Page {
  path: string;
  title: string;
  description: string;
  /** Crawlable copy, replaced by React the moment it mounts. */
  heading: string;
  body: string;
}

function pages(): Page[] {
  const list: Page[] = [
    {
      path: '/',
      title: ru['meta.studio.title'],
      description: fill(ru['meta.studio.description'], { count: PRODUCTS.length }),
      heading: `${ru['studio.titleLine1']} ${ru['studio.titleLine2']}`,
      body: fill(ru['studio.intro'], { count: PRODUCTS.length }),
    },
    {
      path: '/templates',
      title: ru['meta.catalog.title'],
      description: ru['meta.catalog.description'],
      heading: ru['meta.catalog.title'],
      body: ru['meta.catalog.description'],
    },
    {
      path: '/community',
      title: ru['meta.community.title'],
      description: ru['meta.community.description'],
      heading: ru['community.title'],
      body: ru['community.intro'],
    },
    {
      path: '/privacy',
      title: `${PRIVACY.ru.title} — Template Studio`,
      description: PRIVACY.ru.intro,
      heading: PRIVACY.ru.title,
      body: PRIVACY.ru.intro,
    },
  ];

  for (const product of PRODUCTS) {
    list.push({
      path: `/design/${product.id}`,
      title: `${product.label} — ${ru['design.titleSuffix']}`,
      description: product.note,
      heading: product.label,
      // Notes are written without closing punctuation, so give them a full
      // stop before the sentence that follows runs into them.
      body: `${product.note.replace(/[.!?]$/, '')}. ${fill(ru['design.intro'], {
        product: product.label,
        count: PRODUCTS.length,
      })}`,
    });
  }

  return list;
}

const escape = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * Turns the single-page build into one real HTML file per address.
 *
 * There is no server rendering here — React still draws everything — but each
 * file carries its own title, description and canonical, plus a paragraph of
 * copy inside #root that React discards on mount. That is enough for a crawler
 * to tell the pages apart, which a hash-routed SPA never allowed.
 */
function staticPages(): Plugin {
  return {
    name: 'template-studio:static-pages',
    apply: 'build',
    closeBundle() {
      const outDir = 'dist';
      const shell = readFileSync(join(outDir, 'index.html'), 'utf8');
      const all = pages();

      for (const page of all) {
        const canonical = `${SITE_URL}${page.path === '/' ? '/' : page.path}`;

        const html = shell
          .replace(/<title>[\s\S]*?<\/title>/, `<title>${escape(page.title)}</title>`)
          .replace(
            /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
            `<meta name="description" content="${escape(page.description)}" />`,
          )
          .replace(
            /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/,
            `<link rel="canonical" href="${canonical}" />`,
          )
          .replace(
            /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/,
            `<meta property="og:url" content="${canonical}" />`,
          )
          .replace(
            /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/,
            `<meta property="og:title" content="${escape(page.title)}" />`,
          )
          .replace(
            /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
            `<meta property="og:description" content="${escape(page.description)}" />`,
          )
          .replace(
            '<div id="root"></div>',
            `<div id="root"><h1>${escape(page.heading)}</h1><p>${escape(page.body)}</p></div>`,
          );

        const file =
          page.path === '/' ? join(outDir, 'index.html') : join(outDir, page.path, 'index.html');
        mkdirSync(dirname(file), { recursive: true });
        writeFileSync(file, html, 'utf8');
      }

      const urls = all
        .map(
          (page) =>
            `  <url><loc>${SITE_URL}${page.path === '/' ? '/' : page.path}</loc><changefreq>weekly</changefreq></url>`,
        )
        .join('\n');

      writeFileSync(
        join(outDir, 'sitemap.xml'),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
        'utf8',
      );

      this.info?.(`static-pages: ${all.length} HTML files + sitemap.xml`);
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), staticPages()],
  build: {
    target: 'es2022',
    reportCompressedSize: false,
  },
  server: {
    // Vite doesn't read PORT on its own; honour it so an externally assigned
    // port (e.g. when 5174 is already taken) is actually used.
    port: Number(process.env.PORT) || 5174,
  },
});
