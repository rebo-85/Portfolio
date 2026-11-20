import { mediaFor } from "../media";
import type { Project } from "../types";

const { image } = mediaFor("projects/item-physics");

export const itemPhysics: Project = {
  id: "item-physics",
  category: "minecraft",
  kind: "commercial",
  title: "Item Physics",
  summary:
    "Transform your Minecraft experience with satisfying item physics — because the little details make every adventure feel legendary.",
  status: "released",
  accent: "cyan",
  tags: [
    "Script API",
    "JavaScript",
    "Behavior pack",
    "Entity logic",
    "Utility",
    "Technology",
    "Vanilla+",
  ],
  cover: image("cover.png", "Item physics cover image"),
  featured: true,
  detail: {
    intro:
      "A physics add-on that makes the world react: dropped items bounce and roll, trees topple, and entities and block debris tumble. The effects are driven by **Bedrock scripting** on top of behavior and resource packs.",
    clipsKicker: "Physics in action",
    clipsIntro: "A look at each physics system in-game.",
    clips: [
      {
        title: "Dropped Items",
        text: "Dropped items bounce, roll and settle against the terrain.",
        media: image("image1.png", "Item physics in action"),
      },
      {
        title: "Tree Physics",
        text: "Felled trees topple and break apart into logs and leaves.",
        media: image("image2.png", "Tree physics in action"),
      },
      {
        title: "Entity Physics",
        text: "Falling entities react to the ground and blocks they land on.",
        media: image("image3.png", "Entity physics in action"),
      },
      {
        title: "Block Debris Physics",
        text: "Falling block debris tumbles and settles around the impact.",
        media: image("image4.png", "Block debris physics in action"),
      },
    ],
  },
};
