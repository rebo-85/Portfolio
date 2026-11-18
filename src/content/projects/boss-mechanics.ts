import { mediaFor } from "../media";
import type { Project } from "../types";

const { video } = mediaFor("boss-mechanics");

export const bossMechanics: Project = {
  id: "boss-mechanics",
  category: "minecraft",
  kind: "experiment",
  title: "Boss Mechanics",
  summary:
    "Script API boss behaviors and combat encounters built around precise timing, player tracking, and custom animations.",
  accent: "cyan",
  tags: ["Script API", "Boss behavior", "Combat", "JavaScript"],
  cover: video("attack", "Boss heavy smash attack"),
  detail: {
    kicker: "Script API Logic",
    intro:
      "Complex boss behaviors and combat mechanics handled entirely through Script API. These interactions require precise timing, player tracking, and custom animations, all controlled dynamically via code to create challenging encounters.",
    clips: [
      {
        title: "Heavy Smash",
        text: "A close-range punish with strong knockback.",
        media: video("attack", "Boss heavy smash attack"),
      },
      {
        title: "Ice Crash",
        text: "Creates a frozen danger zone that slows and damages over time.",
        media: video("ice-crash", "Boss ice crash attack"),
      },
      {
        title: "Tornado Prison",
        text: "Pulls the player in, briefly traps them, then launches them away.",
        media: video("tornado-1", "Boss tornado prison attack"),
      },
      {
        title: "Teleport Strike",
        text: "Repositions behind the player for a sudden burst attack.",
        media: video("teleport", "Boss teleport strike"),
      },
    ],
  },
};
