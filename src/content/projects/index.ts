import type { Project } from "../types";
import { draconian } from "./draconian";
import { itemPhysics } from "./item-physics";
import { AIPlayers } from "./rb-ai-players";
import { survivalEssenstials } from "./survival-essenstials";
import { betterStructures } from "./better-structures";
import { biomeCraft } from "./biome-craft";

/** Portfolio projects: shipped or client work. Display order = array order. */
export const projects: Project[] = [
  draconian,
  itemPhysics,
  AIPlayers,
  survivalEssenstials,
  betterStructures,
  biomeCraft,
];
