import { mediaFor } from "../media";
import type { Project } from "../types";

const { image, video } = mediaFor("projects/ai-players");

export const AIPlayers: Project = {
  id: "ai-players",
  category: "minecraft",
  kind: "solo",
  title: "AI Players",
  summary: "Custom AI behavior for Minecraft Bedrock entities.",
  year: 2026,
  status: "released",
  accent: "cyan",
  tags: ["Script API", "JavaScript", "Behavior pack", "Entity logic"],
  cover: image("pack_icon.png", "AI players icon"),
  detail: {
    intro:
      "I created a custom AI system for Minecraft Bedrock entities that allows for more complex behaviors and interactions. This system enables entities to navigate the environment, interact with players, and perform tasks autonomously.",
    clipsKicker: "Gameplay highlights",
    clipsIntro: "Here's how some of the code I worked on actually looks in-game.",
    clips: [
      {
        title: "Strip Mining AI",
        text: "A custom AI system for strip mining operations in Minecraft Bedrock.",
        media: video("video1", "Strip mining gameplay"),
      },
      {
        title: "Tree Cutting AI",
        text: "A custom AI system for tree cutting operations in Minecraft Bedrock.",
        media: video("video2", "Tree cutting gameplay"),
      },
      {
        title: "General Combat AI",
        text: "A custom AI system for general combat scenarios in Minecraft Bedrock.",
        media: video("video3", "General combat gameplay"),
      },
      {
        title: "Creeper Combat AI",
        text: "A custom AI system for creeper combat scenarios in Minecraft Bedrock.",
        media: video("video4", "Creeper combat gameplay"),
      },
    ],
  },
};
