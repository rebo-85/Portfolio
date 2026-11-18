import { defineConfig, type Plugin } from "vite";
import { renderPage } from "./src/render";

/** Injects the content from src/content/site.ts into index.html (build + dev). */
function reboRender(): Plugin {
  return {
    name: "rebo-render",
    async transformIndexHtml(html, ctx) {
      const render = ctx.server
        ? (await ctx.server.ssrLoadModule("/src/render.ts")).renderPage
        : renderPage;
      return render(html);
    },
    handleHotUpdate({ file, server }) {
      const f = file.replace(/\\/g, "/");
      if (f.includes("/src/content/") || f.endsWith("/src/render.ts")) {
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
