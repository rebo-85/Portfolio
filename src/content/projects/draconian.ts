import { image, video } from "../media";
import type { Project } from "../types";

export const draconian: Project = {
  id: "draconian",
  kind: "commercial",
  title: "Draconian",
  summary:
    "A private commercial Bedrock add-on with custom dragons, progression, combat, quests, and guided player flow.",
  status: "private",
  accent: "cyan",
  tags: [
    "Script API",
    "JavaScript",
    "Behavior pack",
    "Entity logic",
    "Custom items",
    "Shop systems",
    "Resource pack",
    "Custom UI / VFX",
    "QA fixes",
  ],
  cover: image("draconian-bp-pack-icon.png", "Draconian behavior pack icon"),
  featured: true,
  detail: {
    kicker: "Current project",
    intro:
      "I joined the project mid-production to help stabilize it. My daily work here is strictly **Bedrock scripting, tracking down bugs, and wiring up gameplay systems** across behavior and resource packs so everything feels solid in-game.",
    clipsKicker: "Gameplay highlights",
    clipsIntro: "Here's how some of the code I worked on actually looks in-game.",
    clips: [
      {
        title: "Dragon Commerce",
        text: "Players buy dragons through an interactive entity shop, moving away from standard vanilla trading screens.",
        media: video("dragon-shop-1", "Dragon shop gameplay"),
      },
      {
        title: "Mounted Combat",
        text: "Scripting logic for flying combat, making sure custom weapons and armor sets actually change how you play.",
        media: video("grifo-combat", "Mounted griffin combat"),
      },
      {
        title: "GPS Navigation",
        text: "A custom GPS that uses the action-bar to guide the player to destinations selected on the main map.",
        media: video("gps-1", "Action-bar GPS guiding a player"),
      },
      {
        title: "NPC Merchants",
        text: "Custom dialog flows and trade systems where players buy potions and learn about mechanics.",
        media: video("comerciants", "NPC merchant dialog and trading"),
      },
      {
        title: "Arena Combat",
        text: "A fully scripted 15-wave arena system that handles enemy spawns, wave tracking, and end-of-run rewards.",
        media: video("arena-wave", "Wave arena combat"),
      },
    ],
    youtube: {
      kicker: "Video Demonstration",
      id: "mdOrZldcCNc",
      title: "Draconian Gameplay Demo",
    },
  },
};
