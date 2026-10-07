# BAB — Business Analyst Brain

**Business Analyst Brain** is a bilingual practical learning blog for new and aspiring Business Analysts. Its brand promise is **Gate for Every Business Brain**: an open doorway to practical knowledge, tools, people, books, and learning resources.

## Local tutorial editor

The editor is intentionally separate from the public Astro site. Start the public site with `npm run dev` on port 4321, or start the local-only tutorial editor with:

```bash
npm run editor
```

Open `http://localhost:4322`. The server binds to `127.0.0.1` only and serves the interface from `admin/`; the public GitHub Pages build does not include an admin route.

The editor supports bilingual English/Arabic tutorials, Markdown and MDX imports, safe Markdown preview, local private drafts, validation, and publishing. New drafts are written to `.bab-drafts/`; legacy `.bac9-drafts/` content remains readable during the migration. Both directories are ignored by Git. Publishing requires both language versions, validates the content, runs `npm run validate:content`, `npm run check`, and `npm run build`, then commits only the affected tutorial files and pushes `origin/main`.

If a build fails, the previous content files are restored and no commit is created. If the push fails after the commit succeeds, the editor keeps the local commit and provides a retry action.

The editor references existing images through `/images/...` paths. Uploading new binary image files is not part of this first version.
