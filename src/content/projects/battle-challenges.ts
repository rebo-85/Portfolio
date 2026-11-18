import { image } from "../media";
import type { Project } from "../types";

export const battleChallenges: Project = {
  id: "battle-challenges",
  kind: "experiment",
  title: "Battle Challenges",
  summary:
    "A data-driven challenge system exploring custom Bedrock JSON UI and Script API integration.",
  accent: "gold",
  tags: ["JSON UI", "Regolith", "Script API", "Pixel Art"],
  cover: image("hud-preview.png", "Real-time HUD showing mission progress"),
  detail: {
    kicker: "Experimental System",
    intro:
      "I built this experimental system to push the limits of Bedrock's JSON UI. My goal was to create a custom interface that felt completely unique, breaking away from the standard vanilla look while maintaining a tight integration with the Script API.",
    panel: {
      title: "Custom UI & Workflow",
      text: "This project was a deep dive into custom component design and automation, from the pixel art to the TSX generators.",
      tags: [
        "JSON UI",
        "Handmade Assets",
        "Regolith Generators",
        "Data-driven",
        "Script API",
        "Pixel Art",
      ],
      deliverables: [
        {
          label: "HUD Integration",
          text: "I modified the vanilla `hud_screen` to support live objective tracking, giving players immediate feedback on their progress without opening a menu.",
        },
        {
          label: "Handmade Assets",
          text: "I designed every button and frame from scratch, ensuring the pixel art style stayed consistent across the entire custom interface.",
        },
        {
          label: "Regolith Automation",
          text: "Using generators, I built a data-driven pipeline that makes adding new challenges as simple as editing a config file.",
        },
        {
          label: "Experimental Logic",
          text: "A prototype for complex challenge tracking and achievement rewards built as a technical exercise.",
        },
      ],
    },
    gallery: [
      image("demo.gif", "Battle Challenges animation"),
      image("hud-preview.png", "Real-time HUD showing mission progress"),
    ],
  },
};
