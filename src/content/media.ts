import type { Media } from "./types";

export const video = (name: string, alt: string): Media => ({
  type: "video",
  src: `media/${name}.mp4`,
  poster: `media/${name}-poster.webp`,
  alt,
});

export const image = (file: string, alt: string): Media => ({
  type: "image",
  src: `media/${file}`,
  alt,
});
