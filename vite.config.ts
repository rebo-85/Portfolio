import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { defineConfig, type Plugin } from "vite";
import { projects, site } from "./src/content";
import { validateContent } from "./src/content/validate";
import { renderPage } from "./src/render/index";

/** Injects the content from src/content/site.ts into index.html (build + dev). */
function reboRender(): Plugin {
  return {
    name: "rebo-render",
    buildStart() {
      // Fail the production build on duplicate ids, unknown taxonomy values or missing media.
      // In dev (watch mode) it only warns, so a half-finished project never blocks the server.
      const problems = validateContent(site, projects, (file) =>
        existsSync(fileURLToPath(new URL(`./public/${file}`, import.meta.url))),
      );
      if (problems.length) {
        const message = `Content check failed:\n - ${problems.join("\n - ")}`;
        if (this.meta.watchMode) this.warn(message);
        else this.error(message);
      }
    },
    async transformIndexHtml(html, ctx) {
      const render = ctx.server
        ? (await ctx.server.ssrLoadModule("/src/render/index.ts")).renderPage
        : renderPage;
      return render(html);
    },
    handleHotUpdate({ file, server }) {
      const f = file.replace(/\\/g, "/");
      if (f.includes("/src/content/") || f.includes("/src/render/")) {
        server.ws.send({ type: "full-reload" });
        return [];
      }
    },
  };
}

export default defineConfig({
  base: "/Portfolio/",
  plugins: [reboRender()],
});
