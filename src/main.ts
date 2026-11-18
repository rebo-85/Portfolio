import "./styles/base.css";
import "./styles/components.css";
import { initCopy } from "./behaviors/copy";
import { initFilter } from "./behaviors/filter";
import { initHotbar } from "./behaviors/hotbar";
import { initNav } from "./behaviors/nav";
import { initReveal } from "./behaviors/reveal";
import { initVideos } from "./behaviors/video";
import { initYouTube } from "./behaviors/youtube";

/* ==========================================================================
   Behaviour only (see src/behaviors/). No content lives here: it all comes from
   the markup that src/render/ produced. Every feature is an enhancement,
   so the page still works without any of it.
   ========================================================================== */

// Activates the reveal system in base.css. index.html also sets this in <head>
// so there is no flash; doing it here as well is harmless and keeps main.ts self-contained.
document.documentElement.classList.add("js");

initVideos();
initReveal();
initHotbar();
initNav();
initFilter();
initYouTube();
initCopy();
