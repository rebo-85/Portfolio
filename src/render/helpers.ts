export const esc = (s: string): string =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export const rich = (s: string): string =>
  esc(s)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`(.+?)`/g, "<code>$1</code>");

export const rv = (cls = "", i = 0, variant = ""): string =>
  `class="${cls ? `${cls} ` : ""}reveal" style="--i: ${i}"${variant ? ` data-reveal="${variant}"` : ""}`;

export const link = (href: string, label: string, cls: string, external = false): string =>
  `<a class="${cls}" href="${esc(href)}"${external ? ` target="_blank" rel="noopener noreferrer"` : ""}>${esc(label)}</a>`;

export const pills = (items: string[], cls = "tag"): string =>
  items.map((t, i) => `<li class="${cls}" style="--i: ${i}">${esc(t)}</li>`).join("");

export const head = (id: string, kicker: string, title: string, intro?: string): string => `
      <div class="section-head">
        <p ${rv("eyebrow section-kicker")}>${esc(kicker)}</p>
        <h2 ${rv("section-title", 1)} id="${esc(id)}-title">${esc(title)}</h2>
        ${intro ? `<p ${rv("section-copy", 2)}>${rich(intro)}</p>` : ""}
      </div>`;
