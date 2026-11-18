import type { Media } from "./types";

/**
 * Media helpers scoped to one folder under public/media/.
 * Each project uses its own id as the folder name, so file names never collide:
 *
 *   const { image, video } = mediaFor("draconian");
 *   video("dragon-shop-1", "…")  ->  media/draconian/dragon-shop-1.mp4 (+ -poster.webp)
 *   image("icon.png", "…")       ->  media/draconian/icon.png
 *
 * Site-wide assets live in the "site" folder.
 */
export function mediaFor(folder: string) {
  const base = `media/${folder}`;
  return {
    video: (name: string, alt: string): Media => ({
      type: "video",
      src: `${base}/${name}.mp4`,
      poster: `${base}/${name}-poster.webp`,
      alt,
    }),
    image: (file: string, alt: string): Media => ({
      type: "image",
      src: `${base}/${file}`,
      alt,
    }),
  };
}
