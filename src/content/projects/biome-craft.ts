import { mediaFor } from "../media";
import type { Project } from "../types";

const { image } = mediaFor("projects/biome-craft");

export const biomeCraft: Project = {
  id: "biome-craft",
  category: "minecraft",
  kind: "commercial",
  title: "Biome Craft",
  summary:
    "Expand your world with BiomeCraft’s four breathtaking biomes and two re-imagined classics. Towering redwoods, mist-laden rainforests, golden prairies, and sun-parched veldts each overflow with bespoke blocks and fresh scenery.",
  accent: "cyan",
  tags: ["Script API"],
  cover: image("cover.webp", "Biome Craft cover image"),
  detail: {
    intro:
      "Biomecraft makes each biome feel alive with new blocks, plants, and trees. Explore the towering redwoods, mist-laden rainforests, golden prairies, and sun-parched veldts, each overflowing with bespoke blocks and fresh scenery.",
    clipsIntro: "Here's how some of the code I worked on actually looks in-game.",
    clips: [
      {
        title: "New Items and Blocks",
        text: "Discover the new items and blocks introduced in Biome Craft, which provide players with enhanced building and crafting capabilities.",
        media: image("image0.avif", "New items and blocks showcase"),
      },
      {
        title: "Plains Biome",
        text: "Discover the unique features of the Plains biome in Biome Craft, including new flora and fauna.",
        media: image("image1.avif", "Plains biome showcase"),
      },
      {
        title: "Old Growth Taiga Biome",
        text: "Discover the unique features of the Old Growth Taiga biome in Biome Craft, including new flora and fauna.",
        media: image("image2.avif", "Old Growth Taiga biome showcase"),
      },
      {
        title: "Desert Biome",
        text: "Discover the unique features of the Desert biome in Biome Craft, including new flora and fauna.",
        media: image("image3.avif", "Desert biome showcase"),
      },
      {
        title: "Deep Jungle Biome",
        text: "Discover the unique features of the Deep Jungle biome in Biome Craft, including new flora and fauna.",
        media: image("image4.avif", "Deep Jungle biome showcase"),
      },
      {
        title: "Savanna Biome",
        text: "Discover the unique features of the Savanna biome in Biome Craft, including new flora and fauna.",
        media: image("image5.avif", "Savanna biome showcase"),
      },
      {
        title: "Birch Forest Biome",
        text: "Discover the unique features of the Birch Forest biome in Biome Craft, including new flora and fauna.",
        media: image("image6.avif", "Birch Forest biome showcase"),
      },
    ],
  },
};
