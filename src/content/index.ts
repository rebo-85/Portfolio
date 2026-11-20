import { demos } from "./demos";
import { projects as portfolioProjects } from "./projects";
import type { Project } from "./types";

export { site } from "./site";

/** Everything the renderer sees. The page splits them into sections by `kind`. */
export const projects: Project[] = [...portfolioProjects, ...demos];
