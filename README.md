# manuelbrandt.com

Personal website and blog of Manuel Brandt. Built with Astro as a fully static site – no WordPress, no CMS, no database.
Articles are Markdown files in `src/content/blog/`. See [`CLAUDE.md`](./CLAUDE.md) for the content format and how to edit.

```bash
npm install
npm run dev     # http://localhost:4321
npm run build   # outputs static files to dist/
```

## Deploying
The output in `dist/` is plain HTML/CSS and can be hosted anywhere. Easiest: connect this GitHub repo to
Cloudflare Pages, Netlify or Vercel (framework preset "Astro", build command `npm run build`, output dir `dist`).
Every push to the main branch then redeploys the site automatically.

