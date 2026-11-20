import { mediaFor } from "../media";
import type { Project } from "../types";

const { image } = mediaFor("projects/better-structures");

export const betterStructures: Project = {
  id: "better-structures",
  category: "minecraft",
  kind: "commercial",
  title: "Better Structures",
  summary: "One or two sentences for the card.",
  accent: "cyan",
  tags: ["Script API", "Structures", "Vanilla+"],
  cover: image("cover.avif", "Better Structures cover"),
  featured: true,
  detail: {
    intro: "Write-up shown in the overlay. **Bold** and `code` work.",

    // Text block: what the project includes
    panel: {
      title: "What's included",
      text: "A short paragraph introducing the feature list below.",
      tags: [],
      deliverables: [
        { label: "New Structures", text: "New temples, outposts, and more." },
        { label: "New Exploration", text: "Discover new things in each new structures." },
      ],
    },

    // Thumbnail grid: each item opens in the lightbox
    gallery: [
      image("image1.avif", "New Structures", "New Structures"),
      image("image2.avif", "Dessert Temple Exploration", "Dessert Temple Exploration"),
      image("image3.avif", "Jungle Temple Exploration", "Jungle Temple Exploration"),
      image("image4.avif", "Pillager Ship Exploration", "Pillager Ship Exploration"),
      image("image5.avif", "New Dungeon Treasure", "New Dungeon Treasure"),
      image("image6.avif", "Nether Fortress Exploration", "Nether Fortress Exploration"),
    ],
  },
};
