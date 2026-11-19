import { mediaFor } from "../media";
import type { Project } from "../types";

const { image } = mediaFor("projects/item-physics");

export const itemPhysics: Project = {
  id: "item-physics",
  category: "minecraft",
  kind: "commercial",
  title: "Item Physics",
  summary:
    "Transform your Minecraft experience with satisfying item physics  — because the little details make every adventure feel legendary.",
  status: "released",
  accent: "cyan",
  tags: ["Script API", "JavaScript", "Behavior pack", "Entity logic", "QA fixes"],
  cover: image("cover.png", "Item physics cover image"),
  featured: true,
  detail: {
    intro:
      "I joined the project mid-production to help stabilize it. My daily work here is strictly **Bedrock scripting, tracking down bugs, and wiring up gameplay systems** across behavior and resource packs so everything feels solid in-game.",
    clipsKicker: "Gameplay highlights",
    clipsIntro: "Here's how some of the code I worked on actually looks in-game.",
    clips: [
      {
        title: "Item Physics",
        text: "Custom physics for dropped items, making them bounce, roll and collide with the world in a satisfying way.",
        media: image("image1.png", "Item physics in action"),
      },
      {
        title: "Tree Physics",
        text: "Scripting logic for falling trees, making sure they break into logs and leaves in a satisfying way.",
        media: image("image2.png", "Tree physics in action"),
      },
      {
        title: "Entity Physics",
        text: "Scripting logic for falling entities, making sure they interact with the world in a satisfying way.",
        media: image("image3.png", "Entity physics in action"),
      },
      {
        title: "Block Debris Physics",
        text: "Scripting logic for falling block debris, making sure they interact with the world in a satisfying way.",
        media: image("image4.png", "Block debris physics in action"),
      },
    ],
  },
};
