import { mediaFor } from "../media";
import type { Project } from "../types";

const { image } = mediaFor("demos/custom-ui");

export const customUI: Project = {
  id: "custom-ui",
  category: "minecraft",
  kind: "feature",
  title: "Custom UI",
  summary:
    "A showcase of custom Bedrock JSON UI, from pixel-art interface elements to an in-game HUD.",
  accent: "gold",
  tags: ["JSON UI", "Script API", "Pixel Art"],
  cover: image("custom-ui-showcase.gif", "Custom in-game HUD interface"),
  detail: {
    kicker: "Custom UI Showcase",
    intro:
      "A showcase of custom Bedrock JSON UI focused on a distinctive visual style. The interface pairs handmade pixel art with an in-game HUD that feels integrated with the experience while moving beyond the standard vanilla look.",
    panel: {
      title: "Interface Design",
      text: "This showcase highlights custom component design, handmade pixel art, and a polished HUD built for Bedrock.",
      tags: [],
      deliverables: [
        {
          label: "In-game HUD",
          text: "A customized `hud_screen` presents objective progress directly in the game, without requiring players to open a menu.",
        },
        {
          label: "Handmade UI Assets",
          text: "Buttons, frames, and other interface elements were designed from scratch to keep a consistent pixel-art style.",
        },
        {
          label: "Custom Components",
          text: "The interface combines custom components into a cohesive, distinctive alternative to the vanilla look.",
        },
        {
          label: "Visual Showcase",
          text: "The gallery focuses on the HUD and its visual details, including the layout, pixel art, and in-game presentation.",
        },
      ],
    },
    gallery: [
      image("custom-ui-showcase.gif", "Custom UI showcase animation"),
      image("custom-ui-hud.png", "Custom in-game HUD interface"),
    ],
  },
};
