# ACCTIVE Sports Industries — Online Catalogue

The public product catalogue for **ACCTIVE Sports Industries**, Meerut — a single-page
Next.js site showing 145 designs across 5 categories, with WhatsApp enquiry links on
every product.

Built with Next.js 16 (App Router), React 19, Bootstrap 5, Framer Motion and three.js.

---

## Running it locally

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build      # production build
npm start          # serve the production build
npm run lint       # ESLint (must be clean before pushing)
```

---

## Deployment

The site is hosted on **Vercel** and deploys automatically on every push to `main`.

### Required environment variable

| Variable | Value | Why it matters |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Your live domain, e.g. `https://www.activesportsindustries.in` (no trailing slash) | Used for the canonical URL, `sitemap.xml`, `robots.txt` and the WhatsApp/Google link-preview image |

Set it in **Vercel → Project → Settings → Environment Variables** for the Production
environment, then redeploy. Without it the site falls back to the default in
[`src/config/site.js`](src/config/site.js), which is fine locally but will make search
engines and link previews point at the wrong host.

---

## Changing content

Almost everything is data-driven — you should rarely need to touch a component.

### Company details, phone numbers, address

All in **[`src/config/site.js`](src/config/site.js)**. Change the WhatsApp number,
email, address or Instagram handle there and it updates the navbar, every product
card, the modal, the footer and the structured data at once.

### Products

All in **[`src/data/catalogueData.js`](src/data/catalogueData.js)**.

To add a design:

1. Drop the image into `public/images/<CATEGORY>/<SUBCATEGORY>/`.
2. Add an entry (or bump the `length` of the generated array) in the matching
   subcategory.
3. Every product needs a unique `slug` — it is what `?product=<slug>` share links and
   the sitemap use.

Product counts on the homepage, the sitemap and the link-preview image are all
**derived from this file**, so they can never disagree with the actual catalogue.

> **Folder names with `&`, `,` or `()` are fine.** `catalogueData.js` percent-encodes
> every image path before it reaches the browser. Without that, paths like
> `FRONT & BACK SUBLIMATION/` return 404 — see the URL normalisation block in that file.

---

## How a few things work

**Share links.** Every product has a `?product=<slug>` URL. Opening one selects the
right category and subcategory and opens that product's modal. The address bar stays
in sync while the modal is open, so "Share Link" always copies something that works.

**Theme.** `<html data-theme>` is the single source of truth. A tiny inline script in
[`layout.js`](src/app/layout.js) applies the saved theme before first paint (no flash of
the wrong theme), and [`useTheme`](src/hooks/useTheme.js) reads it back via a
`MutationObserver` so the toggle button can never disagree with the page.

**The 3D background** is decoration only. It is skipped entirely on phones, on
low-core devices, and for visitors with `prefers-reduced-motion` — so ~1 MB of three.js
never reaches the people least able to afford it. It is also wrapped in
[`SceneErrorBoundary`](src/components/SceneErrorBoundary.js), so a device that cannot
create a WebGL context loses the background and nothing else.

**SEO.** `robots.txt`, `sitemap.xml` (the homepage plus all 145 products), Open Graph
and Twitter cards, and Organization structured data are all generated from the same
data and config. The link-preview card is rendered at build time by
[`opengraph-image.js`](src/app/opengraph-image.js) — this is what people see when the
link is pasted into WhatsApp.

---

## Images

Product photos are served straight from `public/images` with
`images.unoptimized: true` in [`next.config.mjs`](next.config.mjs), using plain `<img>`
tags with explicit `width`/`height` and `loading="lazy"`. They are cached for a year
via an immutable `Cache-Control` header.

The full set is ~30 MB (about 200 KB per photo). If mobile load time becomes a problem,
the options in rough order of effort are:

1. Re-compress the source JPEGs (biggest win, no code change).
2. Turn off `unoptimized` and switch to `next/image` for automatic WebP/AVIF and
   responsive sizes — note this consumes Vercel Image Optimization quota.

If you switch to `next/image`, also re-enable `@next/next/no-img-element` in
[`eslint.config.mjs`](eslint.config.mjs).

---

## Project layout

```
src/
  app/
    layout.js            metadata, structured data, no-flash theme script
    page.js              section composition + 3D scene gating
    globals.css          design tokens + all component styles
    opengraph-image.js   generated WhatsApp/Google link preview
    robots.js            robots.txt
    sitemap.js           sitemap.xml
    icon.svg             favicon
  components/            one file per section, plus the product modal and search
  config/site.js         company, contact and site URL — single source of truth
  data/catalogueData.js  all products, specs and derived totals
  hooks/                 useTheme, useMediaQuery
public/images/           product photography
```
