#!/usr/bin/env node
/**
 * Scaffold a portfolio project or feature demo.
 *
 *   node scripts/new-project.mjs            (asks everything)
 *   node scripts/new-project.mjs demo       (skips the project/demo question)
 *
 * Creates   src/content/<projects|demos>/<id>.ts
 *           public/media/<projects|demos>/<id>/
 * Registers the new export in the matching index.ts.
 *
 * Allowed categories, kinds, accents and reserved ids are READ from
 * taxonomy.ts / validate.ts, so nothing here needs updating when they change.
 * No dependencies. Needs Node 18+.
 */
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createInterface } from "node:readline";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const rel = (p) => join(root, p);
const read = (p) => readFileSync(rel(p), "utf8");

const fail = (msg) => {
  console.error(`\n✖ ${msg}`);
  process.exit(1);
};

/* ---------- read the rules from the repo ---------- */

const taxonomy = read("src/content/taxonomy.ts");
const validateSrc = read("src/content/validate.ts");

function registryKeys(name) {
  const m = taxonomy.match(new RegExp(`export const ${name} = \\{([\\s\\S]*?)\\n\\} as const`));
  if (!m) fail(`Could not find ${name} in taxonomy.ts (did its format change?)`);
  return [...m[1].matchAll(/^ {2}(\w+):/gm)].map((x) => x[1]);
}
const quoted = (s) => [...s.matchAll(/"([^"]+)"/g)].map((x) => x[1]);

const CATEGORIES = registryKeys("CATEGORIES");
const KINDS = registryKeys("KINDS");
const ACCENTS = quoted(taxonomy.match(/export const ACCENTS = \[([^\]]*)\]/)?.[1] ?? "");
const RESERVED = quoted(validateSrc.match(/RESERVED_IDS = \[([\s\S]*?)\]/)?.[1] ?? "");

/* ---------- the two flavours ---------- */

const GROUPS = {
  project: { dir: "projects", array: "projects", kinds: KINDS.filter((k) => k !== "feature") },
  demo: { dir: "demos", array: "demos", kinds: ["feature"] },
};

/* ---------- prompting (works on a TTY and with piped input) ---------- */

const rl = createInterface({ input: process.stdin });
const lines = rl[Symbol.asyncIterator]();
const ask = async (q) => {
  process.stdout.write(q);
  const { value, done } = await lines.next();
  if (done) fail("Input ended before all questions were answered.");
  return value.trim();
};

async function pick(label, options, fallback = options[0]) {
  if (options.length === 1) return options[0];
  console.log(`\n${label}`);
  options.forEach((o, i) => console.log(`  ${i + 1}) ${o}${o === fallback ? "  (default)" : ""}`));
  for (;;) {
    const a = await ask("> ");
    if (!a) return fallback;
    if (options.includes(a)) return a;
    const n = Number(a);
    if (Number.isInteger(n) && options[n - 1]) return options[n - 1];
    console.log(`  Pick 1-${options.length} or type a name.`);
  }
}

/* ---------- helpers ---------- */

const camel = (id) => {
  const s = id.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
  return /^\d/.test(s) ? `p${s[0].toUpperCase()}${s.slice(1)}` : s;
};
const titleCase = (id) =>
  id.replace(/(^|-)([a-z0-9])/g, (_, d, c) => (d ? " " : "") + c.toUpperCase());

function register(indexSrc, { id, varName, arrayName }) {
  const imports = [...indexSrc.matchAll(/^import .+;$/gm)];
  const arrayRe = new RegExp(`(export const ${arrayName}: Project\\[\\] = \\[)([\\s\\S]*?)(\\];)`);
  if (!imports.length || !arrayRe.test(indexSrc)) return null;

  let out = indexSrc.replace(arrayRe, (_, open, items, close) => {
    const existing = items.trim().replace(/,$/, "");
    return `${open}${existing ? `${existing}, ` : ""}${varName}${close}`;
  });
  const last = [...out.matchAll(/^import .+;$/gm)].at(-1);
  const at = last.index + last[0].length;
  return `${out.slice(0, at)}\nimport { ${varName} } from "./${id}";${out.slice(at)}`;
}

function template({ type, id, varName, category, kind, accent, title }) {
  const folder = `${GROUPS[type].dir}/${id}`;
  const detail =
    type === "demo"
      ? `
  // Add a write-up to get a "View demo" button. Add \`video\` to the mediaFor
  // destructure above when you use clips. See demos/boss-mechanics.ts.
  // detail: {
  //   kicker: "Script API Logic",
  //   intro: "What it is and what you built.",
  //   clips: [
  //     { title: "Clip", text: "What it shows.", media: video("clip-name", "alt") },
  //   ],
  // },`
      : `
  // featured: true,
  // detail: { intro: "Write-up shown in the overlay (adds a View project button)." },`;

  return `import { mediaFor } from "../media";
import type { Project } from "../types";

const { image } = mediaFor("${folder}");

export const ${varName}: Project = {
  id: "${id}",
  category: "${category}",
  kind: "${kind}",
  title: ${JSON.stringify(title)},
  summary: "TODO: one or two sentences shown on the card.",
  accent: "${accent}",
  tags: ["Script API"],
  cover: image("cover.png", "TODO: describe the cover image"),${detail}
};
`;
}

/* ---------- main ---------- */

const argType = process.argv[2];
const type = argType in GROUPS ? argType : await pick("What are you adding?", Object.keys(GROUPS));
const group = GROUPS[type];

let id;
for (;;) {
  id = await ask("\nId (lowercase-kebab-case, also the media folder name): ");
  const file = `src/content/${group.dir}/${id}.ts`;
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(id))
    console.log("  Use lowercase letters, digits and single dashes.");
  else if (RESERVED.includes(id)) console.log(`  "${id}" is used by the page already.`);
  else if (
    existsSync(rel(file)) ||
    existsSync(rel(`src/content/${type === "demo" ? "projects" : "demos"}/${id}.ts`))
  )
    console.log("  A project or demo with that id already exists.");
  else break;
}

const defTitle = titleCase(id);
const title = (await ask(`Title (${defTitle}): `)) || defTitle;
const category = await pick("Category", CATEGORIES);
const kind = await pick("Kind", group.kinds);
const accent = await pick("Accent", ACCENTS);
rl.close();

const varName = camel(id);
const indexPath = `src/content/${group.dir}/index.ts`;
const filePath = `src/content/${group.dir}/${id}.ts`;

const newIndex = register(read(indexPath), { id, varName, arrayName: group.array });
if (!newIndex) fail(`Could not update ${indexPath} automatically. Nothing was written.`);

writeFileSync(rel(filePath), template({ type, id, varName, category, kind, accent, title }));
writeFileSync(rel(indexPath), newIndex);
mkdirSync(rel(`public/media/${group.dir}/${id}`), { recursive: true });

// Tidy formatting (long arrays get wrapped). Skipped quietly if prettier isn't installed.
spawnSync("npx", ["--no-install", "prettier", "--write", filePath, indexPath], {
  cwd: root,
  stdio: "ignore",
  shell: true,
});

console.log(`
✔ Created ${filePath}
✔ Registered in ${indexPath}
✔ Created public/media/${group.dir}/${id}/

Next: drop cover.png into that media folder (the build fails without it),
fill in the TODOs, then run "npm run dev".`);

// Open the new file if the \`code\` CLI is available.
if (process.stdout.isTTY)
  spawnSync("code", ["-r", rel(filePath)], { stdio: "ignore", shell: true });
