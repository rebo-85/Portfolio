import { mediaFor } from "../media";
import type { Project } from "../types";

const { video } = mediaFor("demos/custom-spells");

export const customSpells: Project = {
  id: "custom-spells",
  category: "minecraft",
  kind: "feature",
  title: "Custom Spells",
  summary:
    "Script API-driven magical abilities with custom area effects, timing, and synchronized particle behavior.",
  accent: "red",
  tags: ["Script API", "Custom spells", "JavaScript", "Gameplay"],
  cover: video("rain-fire", "Rain of Fire spell"),
  detail: {
    kicker: "Script API Logic",
    intro:
      "A collection of custom magical abilities driven by the Script API. My work focuses strictly on the technical implementation: handling AoE calculations, timing loops, entity manipulation, and adapting existing open-source particle assets (modifying color, timing, and spread) to seamlessly synchronize with the script logic.",
    clips: [
      {
        title: "Rain of Fire",
        text: "Fire falls from the sky into a targeted area. Enemies caught inside the zone take continuous burn damage and are slowed for 5 seconds.",
        media: video("rain-fire", "Rain of Fire spell"),
      },
      {
        title: "Static Singularity",
        text: "Pulls nearby targets into an electric vortex, holds them in orbit, then launches them away in a final blast.",
        media: video("static-singularity", "Static Singularity spell"),
      },
      {
        title: "Divine Punishment",
        text: "A holy area spell that summons a radiant sigil overhead and rains sacred swords onto all enemies within its range.",
        media: video("divine-punishment", "Divine Punishment spell"),
      },
    ],
  },
};
