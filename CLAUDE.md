# manuelbrandt.com

Personal site & blog of Manuel Brandt. Static site built with [Astro](https://astro.build). There is **no CMS**:
all content lives in this repository and is edited by changing files (usually by prompting Claude).

## Commands
- `npm install` – install dependencies
- `npm run dev` – local dev server at http://localhost:4321 (drafts are visible here)
- `npm run build` – build the static site into `dist/` (always run before committing to catch errors)

## Where things live
| What | File |
|---|---|
| Blog articles | `src/content/blog/<slug>.md` – the filename is the URL: `/blog/<slug>/` |
| Article images | `public/images/<year>/<month>/<file>` – referenced as `/images/<year>/<month>/<file>` |
| Name, nav menu, "My Lists", social links, projects, newsletter links | `src/site.config.ts` |
| Categories (allowed values) | `CATEGORIES` in `src/content.config.ts` |
| Home / About / Newsletter pages | `src/pages/index.astro`, `about.astro`, `newsletter.astro` |
| Startup Handbook (currently **hidden**) | `src/pages/_startup-handbook.astro` – the `_` prefix keeps it out of the build; rename to `startup-handbook.astro`, re-add it to `NAV` and remove its redirect in `astro.config.mjs` to show it again |
| Instagram grid on the homepage | `src/data/instagram.json` + `public/images/instagram/` (static, updated by prompt) |
| Styling | `src/styles/global.css` |

## Article format
```md
---
title: "How to Build Your Company's Strategy"
description: "One or two sentences, used for SEO and social previews (max ~160 chars)."
date: 2026-11-03            # publish date, controls ordering
updated: 2026-11-10         # optional, shown if >30 days after `date`
category: business          # business | personal | self-growth | book-notes
image: /images/2026/11/cover.jpg   # optional cover image (also the social preview image)
imageAlt: "Description of the image"  # optional
toc: true                   # optional, auto-generated table of contents from ## / ### headings
noindex: true               # optional, hides from search engines + sitemap (used for book notes)
draft: true                 # optional, hides the post: kept in the repo, visible in `npm run dev`, not published
---

Article body in Markdown. Use `##` for sections and `###` for subsections (never `#` – the title is the H1).
```

## Conventions when editing via prompts
- New article: create `src/content/blog/<short-kebab-case-slug>.md` with the frontmatter above. Use today's date.
- Never rename an existing file unless asked – it changes the public URL (and breaks links/SEO).
  If a rename is requested, add a redirect in `astro.config.mjs` (`redirects`) from the old URL.
- Images: save into `public/images/<year>/<month>/` and reference with an absolute `/images/...` path.
  Add a caption by putting an `_italic line_` directly under the image.
- YouTube embeds: `<div class="embed"><iframe src="https://www.youtube.com/embed/<id>" title="..." loading="lazy" allowfullscreen></iframe></div>`
- Internal links use root-relative URLs with trailing slash: `/blog/creating-focus/`.
- Book/podcast notes use `category: book-notes` and `noindex: true`. Everything else shows under "Recent Articles".
- To hide a post without deleting it, add `draft: true`; to show it again, remove that line. All book notes are currently hidden this way.
- Category pages and blog filter chips appear automatically only for categories that have visible posts.
- Updating the Instagram grid: for each post URL `https://www.instagram.com/p/<id>/`, download
  `https://www.instagram.com/p/<id>/media/?size=l` (follows a redirect to the image), center-crop to a 640×640 JPG,
  save as `public/images/instagram/<id>.jpg`, and list it (newest first, 8 total) in `src/data/instagram.json`
  with `url`, `image`, `caption`, `date`. Delete images that are no longer listed.
- Commit and push directly to `main` (Vercel deploys from `main`).
- Keep the author's voice; change only what is asked. Run `npm run build` after changes.
