import { mediaFor } from "../media";
import type { Project } from "../types";

const { image } = mediaFor("projects/wind-armor-pack");

export const windArmorPack: Project = {
  id: "wind-armor-pack",
  category: "minecraft",
  kind: "solo",
  title: "Wind Armor Pack",
  summary: "Custom armor set with Script API abilities and a set bonus.",
  year: 2026,
  status: "released",
  accent: "cyan",
  tags: ["Custom items", "Script API", "Resource pack"],
  cover: image("wind-chestplate-icon.png", "Wind armor icon"),
};
