// Everything personal lives here. Edit this file, nothing else, to make the site yours.
// In text fields, wrap words in **double asterisks** to render them as <strong>.

export interface Link {
  label: string;
  href: string;
}

export interface Media {
  type: "video" | "image";
  src: string; // path inside public/media, e.g. "media/demo.mp4"
  alt: string;
  poster?: string;
}

/** One gameplay card: a looping clip plus a short explanation. */
export interface Clip {
  title: string;
  text: string;
  media: Media;
}

export type Accent = "cyan" | "red" | "gold";

/** A themed block of work: a clip grid, an optional detail panel, an optional image gallery. */
export interface Showcase {
  id: string;
  kicker: string;
  title: string;
  intro: string;
  accent: Accent;
  clips?: Clip[];
  panel?: {
    title: string;
    text: string;
    tags: string[];
    deliverables: { label: string; text: string }[];
  };
  gallery?: Media[];
}

export interface WorkPanel {
  title: string;
  paragraphs: string[];
  tags: string[];
  media?: Media;
  mediaNote?: string;
  terminal?: { key: string; text: string }[];
}

export interface SkillGroup {
  title: string;
  core: string[]; // highlighted pills
  more: string[]; // regular pills
}

export interface Site {
  lang: string;
  url: string; // final public URL, used for canonical + social cards
  ogImage: string; // 1200x630 PNG in public/, e.g. "og-image.png"
  brand: string;
  brandSub: string;
  role: string;
  description: string;
  hotbar: string[]; // up to 9 short labels shown in the hero
  hero: {
    eyebrow: string;
    title: string;
    accent: string; // last word(s) of the title, rendered with the glow
    intro: string;
    chips: string[];
    actions: { label: string; href: string; primary?: boolean; external?: boolean }[];
    console: {
      label: string;
      version: string;
      title: string;
      text: string;
      icon: Media;
      stats: { strong: string; rest: string }[];
      assets: { media: Media; caption: string }[];
    };
  };
  about: {
    kicker: string;
    title: string;
    facts: { label: string; value: string }[];
    paragraphs: string[];
  };
  featured: {
    id: string;
    kicker: string;
    title: string;
    intro: string;
    tags: string[];
    clipsKicker: string;
    clipsIntro: string;
    clips: Clip[];
    youtube: { kicker: string; id: string; title: string };
  };
  showcases: Showcase[];
  work: { kicker: string; title: string; intro: string; panels: WorkPanel[] };
  skills: { kicker: string; title: string; intro: string; groups: SkillGroup[] };
  contact: {
    kicker: string;
    heading: string;
    text: string;
    email: string;
    discord: string;
    links: Link[];
  };
  footer: string[];
}

// Helpers keep the data short. Videos get a matching poster made by scripts/optimize-media.sh.
const video = (name: string, alt: string): Media => ({
  type: "video",
  src: `media/${name}.mp4`,
  poster: `media/${name}-poster.webp`,
  alt,
});
const image = (file: string, alt: string): Media => ({ type: "image", src: `media/${file}`, alt });

export const site: Site = {
  lang: "en",
  url: "https://rebo-85.github.io/Portfolio/",
  ogImage: "og-image.png",
  brand: "Henrique Pereira",
  brandSub: "Minecraft Bedrock Dev",
  role: "Minecraft Bedrock Developer",
  description:
    "Henrique Pereira, Minecraft Bedrock developer working with Script API, JavaScript, JSON systems, custom items, gameplay logic and bug fixing.",
  hotbar: [
    "Script API",
    "TypeScript",
    "JSON",
    "Entities",
    "Items",
    "UI",
    "Regolith",
    "Debug",
    "Git",
  ],

  hero: {
    eyebrow: "Script API / JSON / Gameplay Systems",
    title: "Minecraft Bedrock",
    accent: "Developer",
    intro:
      "I work on Bedrock gameplay systems with **JavaScript, TypeScript, @minecraft/server and JSON configuration**. Most of my work is fixing broken logic, implementing features and making custom gameplay feel stable in-game.",
    chips: [
      "Script API focused",
      "Portuguese native",
      "English intermediate",
      "Private commercial project",
    ],
    actions: [
      { label: "Get in touch", href: "mailto:henriquevpsantos@hotmail.com", primary: true },
      {
        label: "Watch Gameplay",
        href: "https://www.youtube.com/watch?v=mdOrZldcCNc",
        external: true,
      },
      { label: "View project", href: "#project" },
    ],
    console: {
      label: "DRACONIAN_BP / production pack",
      version: "@minecraft/server 2.0.0",
      title: "Draconian Project",
      text: "Late-stage commercial Bedrock add-on with custom dragons, progression systems, combat, quests and guided player flow.",
      icon: image("draconian-bp-pack-icon.png", "Draconian behavior pack icon"),
      stats: [
        { strong: "Scripted gameplay", rest: "and custom items" },
        { strong: "Shops and", rest: "progression" },
        { strong: "UI and", rest: "VFX" },
      ],
      assets: [
        { media: image("dragon-menu.png", "Dragon shop preview"), caption: "Dragon shop" },
        { media: image("wind-chestplate-icon.png", "Armor icon"), caption: "Armor set" },
      ],
    },
  },

  about: {
    kicker: "About me",
    title: "I like taking messy systems and making them feel solid in-game.",
    facts: [
      { label: "Role", value: "Script Developer" },
      { label: "Stack", value: "JavaScript / TypeScript / JSON" },
      { label: "Language", value: "PT-BR native / EN intermediate" },
    ],
    paragraphs: [
      "I like figuring out how a system works, where it breaks and what it needs to behave consistently. I also come from production JavaScript and TypeScript work on the web, which helps a lot when I need to read, maintain and clean up larger Bedrock codebases.",
      "In Minecraft Bedrock, I work with **Script API, entity behavior files, resource packs, UI assets and gameplay configuration**. I also use **Regolith generators** for pack automation and general workflow improvements.",
    ],
  },

  featured: {
    id: "project",
    kicker: "Current project",
    title: "Draconian: private commercial Bedrock add-on in late-stage production.",
    intro:
      "I joined the project mid-production to help stabilize it. My daily work here is strictly **Bedrock scripting, tracking down bugs, and wiring up gameplay systems** across behavior and resource packs so everything feels solid in-game.",
    tags: [
      "Script API",
      "JavaScript",
      "Behavior pack",
      "Entity logic",
      "Custom items",
      "Shop systems",
      "Resource pack",
      "Custom UI / VFX",
      "QA fixes",
    ],
    clipsKicker: "Gameplay highlights",
    clipsIntro: "Here's how some of the code I worked on actually looks in-game.",
    clips: [
      {
        title: "Dragon Commerce",
        text: "Players buy dragons through an interactive entity shop, moving away from standard vanilla trading screens.",
        media: video("dragon-shop-1", "Dragon shop gameplay"),
      },
      {
        title: "Mounted Combat",
        text: "Scripting logic for flying combat, making sure custom weapons and armor sets actually change how you play.",
        media: video("grifo-combat", "Mounted griffin combat"),
      },
      {
        title: "GPS Navigation",
        text: "A custom GPS that uses the action-bar to guide the player to destinations selected on the main map.",
        media: video("gps-1", "Action-bar GPS guiding a player"),
      },
      {
        title: "NPC Merchants",
        text: "Custom dialog flows and trade systems where players buy potions and learn about mechanics.",
        media: video("comerciants", "NPC merchant dialog and trading"),
      },
      {
        title: "Arena Combat",
        text: "A fully scripted 15-wave arena system that handles enemy spawns, wave tracking, and end-of-run rewards.",
        media: video("arena-wave", "Wave arena combat"),
      },
    ],
    youtube: { kicker: "Video Demonstration", id: "mdOrZldcCNc", title: "Draconian Gameplay Demo" },
  },

  showcases: [
    {
      id: "custom-spells",
      kicker: "Script API Logic",
      title: "Custom Spells",
      accent: "red",
      intro:
        "A collection of custom magical abilities driven by the Script API. My work focuses strictly on the technical implementation: handling AoE calculations, timing loops, entity manipulation, and adapting existing open-source particle assets (modifying color, timing, and spread) to seamlessly synchronize with the script logic.",
      clips: [
        {
          title: "Rain of Fire",
          text: "Fire falls from the sky into a targeted area. Enemies caught inside the zone take continuous burn damage and are slowed for 5 seconds.",
          media: video("rain-fire", "Rain of Fire spell"),
        },
        {
          title: "Static Singularity",
          text: "Pulls nearby targets into an electric vortex, holds them in orbit, then launches them away in a final blast.",
          media: video("static-singularity", "Static Singularity spell"),
        },
        {
          title: "Divine Punishment",
          text: "A holy area spell that summons a radiant sigil overhead and rains sacred swords onto all enemies within its range.",
          media: video("divine-punishment", "Divine Punishment spell"),
        },
      ],
    },
    {
      id: "boss-mechanics",
      kicker: "Script API Logic",
      title: "Boss Mechanics",
      accent: "cyan",
      intro:
        "Complex boss behaviors and combat mechanics handled entirely through Script API. These interactions require precise timing, player tracking, and custom animations, all controlled dynamically via code to create challenging encounters.",
      clips: [
        {
          title: "Heavy Smash",
          text: "A close-range punish with strong knockback.",
          media: video("attack", "Boss heavy smash attack"),
        },
        {
          title: "Ice Crash",
          text: "Creates a frozen danger zone that slows and damages over time.",
          media: video("ice-crash", "Boss ice crash attack"),
        },
        {
          title: "Tornado Prison",
          text: "Pulls the player in, briefly traps them, then launches them away.",
          media: video("tornado-1", "Boss tornado prison attack"),
        },
        {
          title: "Teleport Strike",
          text: "Repositions behind the player for a sudden burst attack.",
          media: video("teleport", "Boss teleport strike"),
        },
      ],
    },
    {
      id: "battle-challenges",
      kicker: "Experimental System",
      title: "Battle Challenges: Custom JSON UI & Data-driven mechanics.",
      accent: "gold",
      intro:
        "I built this experimental system to push the limits of Bedrock's JSON UI. My goal was to create a custom interface that felt completely unique, breaking away from the standard vanilla look while maintaining a tight integration with the Script API.",
      panel: {
        title: "Custom UI & Workflow",
        text: "This project was a deep dive into custom component design and automation, from the pixel art to the TSX generators.",
        tags: [
          "JSON UI",
          "Handmade Assets",
          "Regolith Generators",
          "Data-driven",
          "Script API",
          "Pixel Art",
        ],
        deliverables: [
          {
            label: "HUD Integration",
            text: "I modified the vanilla `hud_screen` to support live objective tracking, giving players immediate feedback on their progress without opening a menu.",
          },
          {
            label: "Handmade Assets",
            text: "I designed every button and frame from scratch, ensuring the pixel art style stayed consistent across the entire custom interface.",
          },
          {
            label: "Regolith Automation",
            text: "Using generators, I built a data-driven pipeline that makes adding new challenges as simple as editing a config file.",
          },
          {
            label: "Experimental Logic",
            text: "A prototype for complex challenge tracking and achievement rewards built as a technical exercise.",
          },
        ],
      },
      gallery: [
        image("demo.gif", "Battle Challenges animation"),
        image("hud-preview.png", "Real-time HUD showing mission progress"),
      ],
    },
  ],

  work: {
    kicker: "Additional work",
    title: "Other experience that supports the Bedrock work.",
    intro:
      "Minecraft is the main focus here. The work below is just supporting background for the way I work with JavaScript, UI and production maintenance.",
    panels: [
      {
        title: "Custom Loading Screen System",
        paragraphs: [
          "During a studio technical trial, I implemented a custom loading screen system tied to world loading progress, including loading state synchronization, progress bar updates, animated spritesheet playback and Bedrock UI JSON integration.",
          "This loading screen system was later included in a released Minecraft Marketplace project.",
        ],
        tags: [
          "Bedrock UI JSON",
          "Loading Progress Sync",
          "Spritesheet Animation",
          "UI Integration",
          "Gameplay UI",
        ],
        media: video("load", "Custom loading screen with progress bar"),
        mediaNote:
          "Implementation and integration contribution. Visual assets were created by the project's art/UI team.",
      },
      {
        title: "Production background",
        paragraphs: [
          "Outside Minecraft, I also work on production web systems and interfaces. That experience helps with debugging, delivery rhythm and long-term maintenance.",
        ],
        tags: [
          "JavaScript / TypeScript",
          "Liferay",
          "React / Next.js",
          "Node.js / PostgreSQL",
          "Docker / Linux",
        ],
        terminal: [
          { key: "minecraft transfer", text: "legacy maintenance, debugging, release discipline" },
          {
            key: "client work",
            text: "production modules, templates and continuous feature delivery",
          },
          {
            key: "independent systems",
            text: "SaaS architecture, deploy, testing and production support",
          },
        ],
      },
    ],
  },

  skills: {
    kicker: "Toolkit",
    title: "What I can help with.",
    intro:
      "I work best where scripting, JSON configuration and practical debugging meet. I like fixing problems, finishing features and keeping things moving.",
    groups: [
      {
        title: "Minecraft Bedrock",
        core: ["Minecraft Script API", "@minecraft/server", "JavaScript logic"],
        more: [
          "TypeScript",
          "JSON configuration",
          "Entity behaviors",
          "Resource packs",
          "Custom items",
          "UI/HUD concepts",
          "TypeScript UI Development",
        ],
      },
      {
        title: "Production workflow",
        core: ["Debugging", "Refactoring", "Regolith generator development"],
        more: [
          "Production JavaScript/TypeScript",
          "Git / version control",
          "Pack automation",
          "Deployment and maintenance",
          "Technical English",
          "Team collaboration",
        ],
      },
    ],
  },

  contact: {
    kicker: "Let's talk",
    heading: "Available for Minecraft Bedrock scripting and gameplay work.",
    text: "Available for scripting, gameplay systems, bug fixing, feature implementation and behavior or resource pack maintenance.",
    email: "henriquevpsantos@hotmail.com",
    discord: ".henriquep",
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/henriquee-pereira/" },
      { label: "GitHub", href: "https://github.com/HenriqueVPS" },
    ],
  },

  footer: ["Copyright 2026 Henrique Pereira.", "Minecraft Bedrock Developer Portfolio"],
};
