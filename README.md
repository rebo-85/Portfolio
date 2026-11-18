# ReBo — Minecraft Bedrock Developer

Portfolio for Minecraft Bedrock scripting, gameplay systems, and project work.

**Live site:** [rebo-85.github.io/Portfolio](https://rebo-85.github.io/Portfolio/)

## Stack

- Vite and TypeScript
- Static HTML rendered from typed content in `src/content/`
- GitHub Pages deployment through GitHub Actions

## Local development

Requires Node.js 22 or newer.

```bash
npm ci
npm run dev
```

Run the complete project checks and create a production build with:

```bash
npm run check
npm run build
```

## Content and media

- Edit site-wide content in `src/content/site.ts`.
- Add or update projects in `src/content/projects/`; register each project in `src/content/projects/index.ts`.
- Add site-wide styles in `src/styles/`.
- Store images and video in `public/media/`.
- The 13 gameplay videos are encoded as silent 720p MP4s with WebP posters.
- `.gitattributes` tracks MP4 and WebM files with Git LFS.

To prepare Git LFS in a local clone, run `git lfs install` once before the first commit. Confirm that a video uses LFS with:

```bash
git check-attr filter -- public/media/dragon-shop-1.mp4
```

The GitHub Actions checkout step enables LFS for deployment.
The Husky `pre-push` hook uploads the LFS objects when pushing.

## Deployment

The site is configured for the GitHub Pages project URL:

`https://rebo-85.github.io/Portfolio/`

No `CNAME` file is needed for this default URL. In the repository settings, choose **Settings → Pages → Build and deployment → GitHub Actions**. Pushing to `main` runs `.github/workflows/deploy.yml`, which checks, builds, and deploys the site.
