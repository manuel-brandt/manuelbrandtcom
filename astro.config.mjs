// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync } from 'node:fs';

// Posts marked `noindex: true` are kept out of the sitemap.
const noindexSlugs = readdirSync('./src/content/blog')
  .filter((f) => f.endsWith('.md') && /^noindex:\s*true\s*$/m.test(readFileSync(`./src/content/blog/${f}`, 'utf8')))
  .map((f) => f.replace(/\.md$/, ''));

export default defineConfig({
  site: 'https://manuelbrandt.com',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      filter: (page) =>
        !page.endsWith('/category/book-notes/') && !noindexSlugs.some((s) => page.endsWith(`/blog/${s}/`)),
    }),
  ],
  redirects: {
    '/feed': '/rss.xml',
    '/blog/feed': '/rss.xml',
    // Startup Handbook is hidden (source kept in src/pages/_startup-handbook.astro)
    '/startup-handbook': '/blog/',
  },
});
