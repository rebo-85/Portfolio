# ReBo — Minecraft Bedrock Developer Portfolio

A static, single-page portfolio for Minecraft Bedrock scripting and gameplay work.

**Live site:** https://rebo-85.github.io/Portfolio/

---

## The big idea

You never edit HTML. All text, projects and media references live in typed TypeScript files under `src/content/`. At build time a small Vite plugin turns that content into HTML and injects it into `index.html`. A little client-side JavaScript then adds behaviour (filters, lazy video, scroll animations).

```
src/content/*.ts  ──►  src/render/*.ts  ──►  index.html  ──►  dist/ (static site)
 (your data)           (turns data into       ({{placeholders}}
                        HTML strings)          get filled in)
                                                      │
                                            src/main.ts + src/behaviors/
                                            (browser-only enhancements)
```

The page also works with JavaScript disabled. Filters stay hidden and every card is visible, videos fall back to their poster image, and the YouTube thumbnail is a normal link.

---

## Quick start

Requires **Node.js 22+** (see `.nvmrc`).

```bash
npm ci          # install dependencies (first time only)
npm run dev     # local dev server with live reload
```

Open the URL Vite prints. Because of the `base` setting, the site lives under `/Portfolio/`, not the root.

| Command             | What it does                                                                                 |
| ------------------- | -------------------------------------------------------------------------------------------- |
| `npm run dev`       | Dev server. Content problems show as warnings, not errors.                                   |
| `npm run build`     | Type-check (`tsc`), then production build into `dist/`. Content problems **fail** the build. |
| `npm run preview`   | Serve the built `dist/` locally.                                                             |
| `npm run lint`      | ESLint over the project.                                                                     |
| `npm run lint:html` | Validate `dist/index.html` (run after a build).                                              |
| `npm run check`     | `lint` → `build` → `lint:html`. This is the same sequence CI runs.                           |
| `npm run format`    | Prettier over everything.                                                                    |

---

## Project layout

```
src/
  content/            ← WHAT the site says (edit this most)
    site.ts             hero, about, work, skills, contact, footer, SEO info
    projects/           portfolio projects: one file each + index.ts to register them
    demos/              feature demos: one file each + index.ts to register them
    taxonomy.ts         allowed categories, kinds, link types, accent colours
    types.ts            TypeScript shapes for all content
    media.ts            mediaFor() helper for image/video paths
    validate.ts         build-time content checks
  render/             ← HOW content becomes HTML (rarely edited)
    index.ts            page layout: nav, sections order, footer, SEO tags
    sections/           hero, about, projects, work, skills, contact
    project-card.ts     the card in the project grid
    project-detail.ts   the full case-study section for a project
    media.ts, helpers.ts
  behaviors/          ← browser-only JavaScript, one file per feature
  styles/             ← CSS (base.css + components/*.css)
  main.ts             imports styles and starts every behaviour
public/               ← copied as-is into the site (media, favicon, og-image, robots.txt)
  media/projects/<id>/  media for each portfolio project
  media/demos/<id>/     media for each feature demo
  media/site/           site-wide media
scripts/optimize-media.sh   video/poster encoding helper
index.html            page shell with {{placeholders}}
vite.config.ts        the plugin that renders content into index.html
```

**Rule of thumb:** to change wording, edit `src/content/`. To change look, edit `src/styles/`. You rarely need to touch `src/render/` or `src/behaviors/`.

---

## How to change things

### Edit site-wide text

Open `src/content/site.ts`. Each key maps to a section on the page.

| Key                                                          | Section                                                              |
| ------------------------------------------------------------ | -------------------------------------------------------------------- |
| `brand`, `brandSub`, `role`, `description`, `url`, `ogImage` | Nav brand and SEO / social-share tags                                |
| `hotbar`                                                     | The Minecraft-style hotbar strip of skills                           |
| `hero`                                                       | Top of the page, including the "console" card on the right           |
| `about`                                                      | About section (facts + paragraphs)                                   |
| `work`                                                       | "Additional work" panels                                             |
| `skills`                                                     | Skill groups (`core` pills are highlighted, `more` pills are normal) |
| `contact`                                                    | Email, Discord handle (click-to-copy), links                         |
| `footer`                                                     | Footer lines                                                         |

In most text fields, `**bold**` and `` `code` `` work. Everything else is escaped, so you can't accidentally inject HTML.

### Add a project or a feature demo

Both work the same way. The only difference is **where the files go** and the project's `kind`.

|              | Portfolio project                  | Feature demo                                                        |
| ------------ | ---------------------------------- | ------------------------------------------------------------------- |
| Content file | `src/content/projects/<id>.ts`     | `src/content/demos/<id>.ts`                                         |
| Register in  | `src/content/projects/index.ts`    | `src/content/demos/index.ts`                                        |
| Media folder | `public/media/projects/<id>/`      | `public/media/demos/<id>/`                                          |
| `kind`       | `commercial`, `solo` or `contract` | **`feature`** (this is what puts it in the "Feature demos" section) |

Steps:

1. **Prepare media** (optional, see [Media](#media)). Put files in the media folder from the table.
2. **Create the content file.** The simplest way is to copy `wind-armor-pack.ts` for a minimal card, or `demos/boss-mechanics.ts` for a full case study.

   ```ts
   import { mediaFor } from "../media";
   import type { Project } from "../types";

   const { image, video } = mediaFor("projects/my-project"); // or "demos/my-project"

   export const myProject: Project = {
     id: "my-project", // lowercase-kebab-case, unique, same as the media folder name
     category: "minecraft", // see taxonomy.ts
     kind: "solo", // see taxonomy.ts ("feature" for demos)
     title: "My Project",
     summary: "One or two sentences shown on the card.",
     accent: "cyan", // cyan | red | gold | green
     tags: ["Script API", "JavaScript"],
     cover: image("cover.png", "Describe the image"),
   };
   ```

3. **Register it** in the matching `index.ts`: import it and add it to the array. Array order is the display order within its section.
4. Run `npm run dev` and check it, then `npm run check` before pushing.

> **The folder and the `kind` are separate things.** The page decides the section from `kind` alone (`feature` = Feature demos, anything else = Projects). The folders are just filing. If you move a project between groups, change **both** its folder/`mediaFor` path and its `kind`; the build won't warn you if they disagree.

### Project fields

| Field                               | Required | Notes                                                                                                                                                                                                                     |
| ----------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                                | yes      | Lowercase kebab-case. Becomes the URL anchor `#<id>` and the last part of the media folder. Must not be one of: `top`, `main`, `hero`, `about`, `projects`, `feature-demos`, `case-studies`, `work`, `skills`, `contact`. |
| `category`, `kind`, `accent`        | yes      | Must exist in `taxonomy.ts`. `kind: "feature"` places the project in the Feature demos section.                                                                                                                           |
| `title`, `summary`, `tags`, `cover` | yes      | Card shows the first 4 tags.                                                                                                                                                                                              |
| `year`                              | no       | Shown next to the kind label on the card.                                                                                                                                                                                 |
| `links`                             | no       | External buttons, e.g. `{ kind: "github", href: "https://…" }`. Optional custom `label`.                                                                                                                                  |
| `featured`                          | no       | `true` sorts the project to the top of its section.                                                                                                                                                                       |
| `status`                            | no       | Stored in the data but **not currently displayed** anywhere.                                                                                                                                                              |
| `detail`                            | no       | If present, the card gets a **Case study** button and a full section is rendered. If absent, you only get the card.                                                                                                       |

### Case study (`detail`) options

All optional except `intro`. Sections render in this order:

1. `kicker` and `intro` — heading text (supports `**bold**`)
2. `clipsKicker`, `clipsIntro`, `clips[]` — grid of `{ title, text, media }`
3. `youtube` — `{ id, title, kicker? }`, a click-to-load video (only the video ID is needed)
4. `panel` — `{ title, text, tags, deliverables[] }`, a labelled breakdown
5. `gallery` — list of media shown as figures

### Change the taxonomy

`src/content/taxonomy.ts` is the single source of truth for categories, kinds, link types and accent colours. Add one entry there and TypeScript types, card labels, filter buttons and link labels all update. The category filter appears automatically, but only when your projects span two or more categories. The split between "Projects" and "Feature demos" is not a filter: it comes from `kind: "feature"`.

### Remove a project

Delete its content file, remove it from `projects/index.ts` or `demos/index.ts`, and delete its media folder (`public/media/projects/<id>/` or `public/media/demos/<id>/`). If `site.ts` still references any of its media (the hero console does for `projects/draconian` and `projects/wind-armor-pack`), the build will fail until you fix that reference.

---

## Media

Media is grouped the same way as the content: `public/media/projects/<id>/` for portfolio projects, `public/media/demos/<id>/` for feature demos, and `public/media/site/` for site-wide assets.

```ts
const { image, video } = mediaFor("projects/draconian");

image("dragon-menu.png", "alt text"); // → media/projects/draconian/dragon-menu.png
video("dragon-shop-1", "alt text"); // → media/projects/draconian/dragon-shop-1.mp4
//   + media/projects/draconian/dragon-shop-1-poster.webp
```

Note the difference: `image()` takes the **full filename**, while `video()` takes a **name without extension** and expects both an `.mp4` and a `-poster.webp` next to each other.

### Encoding videos

```bash
scripts/optimize-media.sh <projects/id|demos/id|site> path/to/recording.mov
```

Requires `ffmpeg` on your PATH. It outputs a 720p, 30 fps, silent H.264 MP4 and a WebP poster frame into `public/media/<folder>/` (for example `public/media/demos/custom-spells/`), lowercases the name and swaps spaces/underscores for dashes, then prints the `mediaFor(...)` line to paste into your content.

### Other media

- `public/og-image.png`: the social-share preview image (referenced by `site.ogImage`)
- `public/favicon.svg`, `public/robots.txt`

### How videos behave on the page

Videos are muted, looping and lazy. They only download and play when scrolled into view (about 35% visible) and pause when scrolled away. Visitors with "reduce motion" enabled get native controls instead of autoplay.

---

## Build-time content checks

`validate.ts` runs at the start of every build and checks that:

- project ids are lowercase kebab-case, unique, and not reserved
- `category`, `kind`, `accent` and link `kind` values exist in `taxonomy.ts`
- **every referenced media file exists** in `public/` (including video posters), for both `site.ts` and all projects

In `npm run dev` problems are warnings so a half-finished project never blocks you. In `npm run build` (and CI) they are errors that stop the build. The error message lists exactly what is wrong.

---

## Behaviours (`src/behaviors/`)

| File         | What it does                                                                                   |
| ------------ | ---------------------------------------------------------------------------------------------- |
| `video.ts`   | Lazy-loads and plays/pauses videos based on visibility                                         |
| `reveal.ts`  | Scroll-in animations for anything with the `.reveal` class                                     |
| `hotbar.ts`  | Cycles the selected slot in the hero hotbar (pauses on hover, focus, off-screen or hidden tab) |
| `nav.ts`     | Highlights the current section in the nav while scrolling                                      |
| `filter.ts`  | Category / kind filter buttons for project cards                                               |
| `youtube.ts` | Swaps the thumbnail for an embedded player on click (privacy-friendly `youtube-nocookie`)      |
| `copy.ts`    | Click-to-copy for the Discord handle, with a legacy fallback                                   |
| `env.ts`     | Shared flags for reduced motion and IntersectionObserver support                               |

None of them hold content. They only enhance markup that the render step already produced.

---

## Styling

- `src/styles/base.css`: design tokens, reset, the reveal system, shared keyframes
- `src/styles/components/*.css`: one file per component
- `src/styles/components.css`: imports all component files

**Import order is the cascade order.** New component files go above `responsive.css`, which must stay last so its media queries override earlier rules.

Colour comes from `--accent`. Any element with `data-accent="cyan|red|gold|green"` recolours itself, which is how a project's `accent` field works.

---

## Tooling and automation

| Piece                         | Purpose                                                                                             |
| ----------------------------- | --------------------------------------------------------------------------------------------------- |
| **TypeScript** (`strict`)     | Catches content mistakes at build time. `npm run build` type-checks first.                          |
| **ESLint**                    | Code linting (`eslint.config.js`).                                                                  |
| **Prettier**                  | Formatting (`.prettierrc`: 100 columns, double quotes).                                             |
| **html-validate**             | Validates the generated `dist/index.html` (`.htmlvalidate.json`).                                   |
| **Husky + lint-staged**       | On `git commit`, staged files are auto-formatted with Prettier and `.ts` files are fixed by ESLint. |
| **Git LFS**                   | `.gitattributes` stores `*.mp4` and `*.webm` in LFS so the repo stays small.                        |
| **Husky `pre-push`**          | Uploads LFS objects when you push.                                                                  |
| **`.editorconfig`, `.nvmrc`** | Consistent editor settings, Node 22.                                                                |

### Git LFS setup (once per clone)

```bash
git lfs install
git check-attr filter -- public/media/projects/draconian/dragon-shop-1.mp4   # should print "lfs"
```

If you forget `git lfs install`, MP4s are committed as regular files and bloat the repo, and in the worst case videos can end up broken on the deployed site. Do it before your first commit on a new machine.

---

## Deployment

Hosting is **GitHub Pages**, deployed by `.github/workflows/deploy.yml`.

| Event          | What happens                                                          |
| -------------- | --------------------------------------------------------------------- |
| Pull request   | Checkout (with LFS) → `npm ci` → lint → build → HTML lint. No deploy. |
| Push to `main` | The same checks, then deploy the `dist/` folder to GitHub Pages.      |

One-time repo setting: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

The site URL is configured in two places that must match:

- `vite.config.ts` → `base: "/Portfolio/"` (asset paths)
- `src/content/site.ts` → `url` (canonical link, social tags, structured data)

If you rename the repo or move to a custom domain, update both. A custom domain would also need `base: "/"` and a `CNAME` file in `public/`.

---

## Troubleshooting

| Symptom                                                                                       | Likely cause                                                                                                                                                    |
| --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Build fails with **"Missing media file: public/…"**                                           | A path in content points to a file that isn't there. Check spelling and that you passed a video name without `.mp4`. Also check that the `-poster.webp` exists. |
| Build fails with **"unknown category / kind / accent"**                                       | Typo, or the value isn't in `taxonomy.ts` yet.                                                                                                                  |
| Build fails with **"Duplicate project id"** or **"clashes with an id the page already uses"** | Pick a different `id`.                                                                                                                                          |
| Project doesn't appear                                                                        | It isn't registered in `src/content/projects/index.ts` or `src/content/demos/index.ts`.                                                                         |
| No "Case study" button on a card                                                              | The project has no `detail` object.                                                                                                                             |
| Videos don't play on the live site                                                            | LFS wasn't set up when the MP4s were committed, or the LFS objects weren't pushed.                                                                              |
| Assets 404 locally                                                                            | Open `http://localhost:<port>/Portfolio/`, not the bare root.                                                                                                   |
| Dev server doesn't update after editing content                                               | Content and render changes trigger a full reload. Check the terminal for a warning.                                                                             |
