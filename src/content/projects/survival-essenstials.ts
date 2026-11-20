import { mediaFor } from "../media";
import type { Project } from "../types";

const { image, video } = mediaFor("projects/survival-essenstials");

export const survivalEssenstials: Project = {
  id: "survival-essenstials",
  category: "minecraft",
  kind: "commercial",
  title: "Survival Essenstials",
  summary:
    "Amplify your survival experience with new mobs, custom blocks, and epic expansions. Face down powerful bosses, gear up with fresh tools and armor, and explore dungeons teeming with treasure!",
  accent: "cyan",
  tags: ["Behavior pack", "Mobs", "Cosmetics", "Survival", "Weapons & Armor", "Vanilla+"],
  cover: image("cover.avif", "Survival Essentials cover image"),
  // featured: true,
  detail: {
    intro:
      "Survival Essenstials is a commercial Minecraft Bedrock add-on that enhances the survival experience with new mobs, custom blocks, and epic expansions. Players can face powerful bosses, gear up with fresh tools and armor, and explore dungeons teeming with treasure!",
    clips: [
      {
        title: "Add-on Trailer",
        text: "Check out the trailer for Survival Essenstials, showcasing the new mobs, custom blocks, and epic expansions that await players in this commercial Minecraft Bedrock add-on.",
        media: video("trailer", "Add-on trailer"),
      },
      {
        title: "Custom Blocks",
        text: "Discover the new custom blocks introduced in Survival Essenstials, which enhance the building and crafting experience for players.",
        media: image("image1.avif", "Custom blocks showcase"),
      },
      {
        title: "New Items and Armor",
        text: "Discover the new items and armor introduced in Survival Essenstials, which provide players with enhanced combat and survival capabilities.",
        media: image("image2.avif", "New items and armor showcase"),
      },
      {
        title: "New Monsters",
        text: "Discover the new monsters introduced in Survival Essenstials, each with unique behaviors and challenges.",
        media: image("image4.avif", "New monsters showcase"),
      },
      {
        title: "Boss Battle",
        text: "A custom AI system for boss combat scenarios in Minecraft Bedrock.",
        media: image("image5.avif", "Boss combat gameplay"),
      },
    ],
  },
};
