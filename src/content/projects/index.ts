import type { Project } from "../types";
import { draconian } from "./draconian";
import { itemPhysics } from "./item-physics";
import { AIPlayers } from "./ai-players";

/** Portfolio projects: shipped or client work. Display order = array order. */
export const projects: Project[] = [draconian, itemPhysics, AIPlayers];
