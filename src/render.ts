import {
  site,
  type Clip,
  type Media,
  type Showcase,
  type Site,
  type WorkPanel,
} from "./content/site";

/* ==========================================================================
   Renders src/content/site.ts to HTML at build time. No logic lives here that
   belongs in the data, and no data lives here that belongs in site.ts.
   Class names match src/styles/*.css; behaviour (reveal, video, nav) is in main.ts.
   ========================================================================== */

// ---------- Escaping + rich text ----------

const esc = (s: string): string =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Escapes, then turns **bold** into <strong> and `code` into <code>. Safe: escaping runs first. */
const rich = (s: string): string =>
  esc(s)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`(.+?)`/g, "<code>$1</code>");

/** class="… reveal" + stagger index + optional direction (left | right | zoom). */
const rv = (cls = "", i = 0, variant = ""): string =>
  `class="${cls ? `${cls} ` : ""}reveal" style="--i: ${i}"${variant ? ` data-reveal="${variant}"` : ""}`;

const link = (href: string, label: string, cls: string, external = false): string =>
  `<a class="${cls}" href="${esc(href)}"${external ? ` target="_blank" rel="noopener noreferrer"` : ""}>${esc(label)}</a>`;

const pills = (items: string[], cls = "tag"): string =>
  items.map((t, i) => `<li class="${cls}" style="--i: ${i}">${esc(t)}</li>`).join("");

// ---------- Media ----------

/** Videos are lazy: main.ts sets src from data-src when the card scrolls into view. */
const media = (m: Media, eager = false): string =>
  m.type === "video"
    ? `<video muted loop playsinline preload="none"${m.poster ? ` poster="${esc(m.poster)}"` : ""} data-src="${esc(m.src)}" role="img" aria-label="${esc(m.alt)}"></video>`
    : `<img src="${esc(m.src)}" alt="${esc(m.alt)}" decoding="async"${eager ? "" : ` loading="lazy"`} />`;

// ---------- Building blocks ----------

/** Kicker + h2 + optional intro, shared by every section. */
const head = (id: string, kicker: string, title: string, intro?: string): string => `
      <div class="section-head">
        <p ${rv("eyebrow section-kicker")}>${esc(kicker)}</p>
        <h2 ${rv("section-title", 1)} id="${esc(id)}-title">${esc(title)}</h2>
        ${intro ? `<p ${rv("section-copy", 2)}>${rich(intro)}</p>` : ""}
      </div>`;

const clip = (c: Clip, i: number): string => `
        <article ${rv("clip", i % 3, "zoom")}>
          <div class="clip-media">${media(c.media)}</div>
          <div class="clip-body"><h3>${esc(c.title)}</h3><p>${rich(c.text)}</p></div>
        </article>`;

const clipGrid = (clips: Clip[]): string =>
  `<div class="clip-grid">${clips.map(clip).join("")}</div>`;

/** Click-to-load YouTube: a thumbnail link that main.ts swaps for the iframe. Works without JS. */
const youtube = (y: Site["featured"]["youtube"]): string => `
      <div ${rv("video-block")}>
        <p class="eyebrow section-kicker">${esc(y.kicker)}</p>
        <div class="yt" data-yt="${esc(y.id)}" data-title="${esc(y.title)}">
          <a class="yt-play" href="https://www.youtube.com/watch?v=${esc(y.id)}" target="_blank" rel="noopener noreferrer">
            <img src="https://i.ytimg.com/vi/${esc(y.id)}/hqdefault.jpg" alt="" loading="lazy" decoding="async" />
            <span class="yt-btn" aria-hidden="true"></span>
            <span class="yt-label">Play: ${esc(y.title)}</span>
          </a>
        </div>
      </div>`;

const showcase = (s: Showcase): string => `
    <section class="showcase" id="${esc(s.id)}" data-accent="${s.accent}" aria-labelledby="${esc(s.id)}-title">
      <div class="wrap">${head(s.id, s.kicker, s.title, s.intro)}
        ${s.clips?.length ? clipGrid(s.clips) : ""}
        ${
          s.panel
            ? `<div ${rv("panel")}>
          <h3>${esc(s.panel.title)}</h3>
          <p>${rich(s.panel.text)}</p>
          <ul class="tags">${pills(s.panel.tags)}</ul>
          <dl class="deliverables">${s.panel.deliverables
            .map(
              (d, i) =>
                `<div class="deliverable" style="--i: ${i}"><dt>${esc(d.label)}</dt><dd>${rich(d.text)}</dd></div>`,
            )
            .join("")}</dl>
        </div>`
            : ""
        }
        ${
          s.gallery?.length
            ? `<div class="gallery">${s.gallery
                .map(
                  (m, i) =>
                    `<figure ${rv("shot", i, i % 2 ? "right" : "left")}>${media(m)}</figure>`,
                )
                .join("")}</div>`
            : ""
        }
      </div>
    </section>`;

const panel = (p: WorkPanel, i: number): string => `
        <article ${rv("panel", i, i % 2 ? "right" : "left")}>
          <h3>${esc(p.title)}</h3>
          ${p.paragraphs.map((t) => `<p>${rich(t)}</p>`).join("")}
          <ul class="tags">${pills(p.tags)}</ul>
          ${p.media ? `<div class="panel-media">${media(p.media)}</div>` : ""}
          ${p.mediaNote ? `<p class="media-note">${esc(p.mediaNote)}</p>` : ""}
          ${
            p.terminal
              ? `<div class="terminal">
            <div class="term-bar" aria-hidden="true"><span></span><span></span><span></span></div>
            <dl>${p.terminal
              .map(
                (l) => `<div class="term-line"><dt>${esc(l.key)}</dt><dd>${esc(l.text)}</dd></div>`,
              )
              .join("")}</dl>
          </div>`
              : ""
          }
        </article>`;

// ---------- Page ----------

export function renderApp(s: Site): string {
  const h = s.hero;
  const c = h.console;
  const f = s.featured;

  const nav: [string, string][] = [
    ["About", "about"],
    ["Draconian", f.id],
    ["Battle Challenges", "battle-challenges"],
    ["Work", "work"],
    ["Skills", "skills"],
  ];

  const hotbar = s.hotbar
    .slice(0, 9)
    .map(
      (label, i) =>
        `<li class="slot${i === 0 ? " selected" : ""}" style="--i: ${i}"><span class="slot-key" aria-hidden="true">${i + 1}</span><span class="slot-label">${esc(label)}</span></li>`,
    )
    .join("");

  return `
  <header class="nav">
    <div class="wrap nav-inner">
      <a class="brand" href="#top" aria-label="${esc(s.brand)}, back to top">
        <span class="brand-mark" aria-hidden="true">${"<span></span>".repeat(9)}</span>
        <span class="brand-text">${esc(s.brand)}<small>${esc(s.brandSub)}</small></span>
      </a>
      <nav aria-label="Main">
        <ul class="nav-links">
          ${nav.map(([label, id]) => `<li><a href="#${esc(id)}">${esc(label)}</a></li>`).join("")}
          <li><a class="nav-cta" href="#contact">Contact</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <main id="main">
    <section class="hero" id="top" aria-labelledby="hero-title">
      <div class="wrap hero-stage">
        <div class="hero-content">
          <p ${rv("eyebrow")}>${esc(h.eyebrow)}</p>
          <h1 ${rv("", 1)} id="hero-title">${esc(h.title)} <span class="glow-text">${esc(h.accent)}</span></h1>
          <p ${rv("hero-copy", 2)}>${rich(h.intro)}</p>
          <ul ${rv("chips", 3)}>${h.chips.map((t) => `<li class="chip">${esc(t)}</li>`).join("")}</ul>
          <div ${rv("actions", 4)}>${h.actions
            .map((a) => link(a.href, a.label, a.primary ? "btn primary" : "btn", a.external))
            .join("")}</div>
        </div>

        <aside ${rv("console", 2, "right")} aria-label="${esc(c.title)} preview">
          <div class="console-top">
            <span><span class="status-dot" aria-hidden="true"></span> ${esc(c.label)}</span>
            <span>${esc(c.version)}</span>
          </div>
          <div class="pack-preview">
            <div class="pack-icon">${media(c.icon, true)}</div>
            <div class="pack-title"><h2>${esc(c.title)}</h2><p>${esc(c.text)}</p></div>
          </div>
          <ul class="stats">${c.stats
            .map(
              (t, i) =>
                `<li class="stat" style="--i: ${i}"><strong>${esc(t.strong)}</strong> <span>${esc(t.rest)}</span></li>`,
            )
            .join("")}</ul>
          <ul class="asset-strip">${c.assets
            .map(
              (a, i) =>
                `<li class="asset" style="--i: ${i}"><figure>${media(a.media, true)}<figcaption>${esc(a.caption)}</figcaption></figure></li>`,
            )
            .join("")}</ul>
        </aside>
      </div>

      <div class="wrap">
        <div role="group" aria-label="Core skills">
          <ol ${rv("hotbar", 5, "zoom")}>${hotbar}</ol>
        </div>
      </div>
    </section>

    <section id="about" aria-labelledby="about-title">
      <div class="wrap about-grid">
        <div>${head("about", s.about.kicker, s.about.title)}
          <dl ${rv("facts", 3)}>${s.about.facts
            .map((x) => `<div class="fact"><dt>${esc(x.label)}</dt><dd>${esc(x.value)}</dd></div>`)
            .join("")}</dl>
        </div>
        <div ${rv("about-text", 2, "right")}>${s.about.paragraphs.map((p) => `<p>${rich(p)}</p>`).join("")}</div>
      </div>
    </section>

    <section class="project" id="${esc(f.id)}" aria-labelledby="${esc(f.id)}-title">
      <div class="wrap">${head(f.id, f.kicker, f.title, f.intro)}
        <ul ${rv("tags", 3)}>${pills(f.tags)}</ul>
        <div class="subhead">
          <p ${rv("eyebrow section-kicker")}>${esc(f.clipsKicker)}</p>
          <p ${rv("section-copy", 1)}>${rich(f.clipsIntro)}</p>
        </div>
        ${clipGrid(f.clips)}
        ${youtube(f.youtube)}
      </div>
    </section>
${s.showcases.map(showcase).join("")}

    <section id="work" aria-labelledby="work-title">
      <div class="wrap">${head("work", s.work.kicker, s.work.title, s.work.intro)}
        <div class="panel-grid">${s.work.panels.map(panel).join("")}</div>
      </div>
    </section>

    <section id="skills" aria-labelledby="skills-title">
      <div class="wrap">${head("skills", s.skills.kicker, s.skills.title, s.skills.intro)}
        <div class="skill-grid">${s.skills.groups
          .map(
            (g, i) => `
          <div ${rv("skill-group", i, "zoom")}>
            <h3>${esc(g.title)}</h3>
            <ul class="pills">${pills(g.core, "pill core")}${pills(g.more, "pill")}</ul>
          </div>`,
          )
          .join("")}</div>
      </div>
    </section>

    <section class="contact" id="contact" aria-labelledby="contact-title">
      <div class="wrap">${head("contact", s.contact.kicker, s.contact.heading, s.contact.text)}
        <div ${rv("actions", 3)}>
          ${link(`mailto:${s.contact.email}`, s.contact.email, "btn primary")}
          <button class="btn" type="button" data-copy="${esc(s.contact.discord)}">Discord <code>${esc(s.contact.discord)}</code></button>
          ${s.contact.links.map((l) => link(l.href, l.label, "btn", true)).join("")}
        </div>
      </div>
    </section>
  </main>

  <footer>
    <div class="wrap">${s.footer.map((line) => `<p>${esc(line)}</p>`).join("")}</div>
  </footer>`;
}

/** Fills the {{placeholders}} in index.html. Runs at build time, so crawlers see real content. */
export function renderPage(html: string): string {
  const title = `${site.brand} | ${site.role}`;
  const jsonld = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.brand,
    jobTitle: site.role,
    description: site.description,
    url: site.url,
    sameAs: site.contact.links.map((l) => l.href),
  }).replace(/</g, "\\u003c");
  const values: Record<string, string> = {
    lang: esc(site.lang),
    title: esc(title),
    description: esc(site.description),
    url: esc(site.url),
    ogImage: esc(new URL(site.ogImage, site.url).href),
    jsonld,
    app: renderApp(site),
  };
  return html.replace(/\{\{(\w+)\}\}/g, (_, k: string) => values[k] ?? "");
}
