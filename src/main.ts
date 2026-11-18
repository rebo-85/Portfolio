import "./styles/base.css";
import "./styles/components.css";

/* ==========================================================================
   Behaviour only. No content and no personal data lives here: it all comes from
   the markup that render.ts produced. Every feature below is an enhancement,
   so the page still works without any of it.
   ========================================================================== */

// Activates the reveal system in base.css. index.html also sets this in <head>
// so there is no flash; doing it here as well is harmless and keeps main.ts self-contained.
document.documentElement.classList.add("js");

const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const hasIO = "IntersectionObserver" in window;

// ---------- Lazy video ----------
// Videos only download and play while visible, and never autoplay for reduced-motion users.
function initVideos(): void {
  const videos = document.querySelectorAll<HTMLVideoElement>("video[data-src]");
  const load = (v: HTMLVideoElement): void => {
    if (!v.src) v.src = v.dataset.src ?? "";
  };

  if (reduce || !hasIO) {
    videos.forEach((v) => {
      v.controls = true; // the visitor decides when to play
      v.removeAttribute("role");
      load(v);
    });
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const { target, isIntersecting } of entries) {
        const v = target as HTMLVideoElement;
        if (isIntersecting) {
          load(v);
          void v.play().catch(() => undefined);
        } else {
          v.pause();
        }
      }
    },
    { threshold: 0.35 },
  );
  videos.forEach((v) => io.observe(v));
}

// ---------- Scroll reveal ----------
function initReveal(): void {
  const items = document.querySelectorAll<HTMLElement>(".reveal");

  if (reduce || !hasIO) {
    items.forEach((el) => el.classList.add("visible"));
    return;
  }

  const io = new IntersectionObserver(
    (entries, observer) => {
      for (const { target, isIntersecting } of entries) {
        if (!isIntersecting) continue;
        target.classList.add("visible");
        observer.unobserve(target);
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
  );
  items.forEach((el) => io.observe(el));
}

// ---------- Hotbar cycling ----------
// Only the .selected class moves; the CSS handles the transition.
function initHotbar(): void {
  const bar = document.querySelector<HTMLElement>(".hotbar");
  if (!bar || reduce) return; // reduced motion: slot 0 stays selected

  const slots = Array.from(bar.querySelectorAll<HTMLElement>(".slot"));
  if (slots.length < 2) return;

  const STEP_MS = 1800;
  let current = Math.max(
    0,
    slots.findIndex((s) => s.classList.contains("selected")),
  );
  let timer: number | undefined;
  let inView = !hasIO; // without IntersectionObserver, assume visible
  let hovered = false;
  let focused = false;

  const step = (): void => {
    slots[current]?.classList.remove("selected");
    current = (current + 1) % slots.length;
    slots[current]?.classList.add("selected");
  };

  const sync = (): void => {
    const shouldRun = inView && !hovered && !focused && !document.hidden;
    if (shouldRun && timer === undefined) {
      timer = window.setInterval(step, STEP_MS);
    } else if (!shouldRun && timer !== undefined) {
      window.clearInterval(timer);
      timer = undefined;
    }
  };

  if (hasIO) {
    new IntersectionObserver((entries) => {
      for (const e of entries) inView = e.isIntersecting;
      sync();
    }).observe(bar);
  }

  // Mouse only: a tap on touch would otherwise leave the hotbar "hovered" and frozen.
  bar.addEventListener("pointerenter", (e) => {
    if (e.pointerType !== "mouse") return;
    hovered = true;
    sync();
  });
  bar.addEventListener("pointerleave", (e) => {
    if (e.pointerType !== "mouse") return;
    hovered = false;
    sync();
  });
  bar.addEventListener("focusin", () => {
    focused = true;
    sync();
  });
  bar.addEventListener("focusout", () => {
    focused = false;
    sync();
  });
  document.addEventListener("visibilitychange", sync);

  sync();
}

// ---------- Nav highlight ----------
// A section with its own nav link highlights that link. A section without one
// (the showcases) inherits the nearest earlier link, so they count as part of
// the project above them. Sections before the first link (the hero) highlight nothing.
function initNav(): void {
  if (!hasIO) return;

  const links = Array.from(document.querySelectorAll<HTMLAnchorElement>(".nav-links a[href^='#']"));
  const sections = Array.from(document.querySelectorAll<HTMLElement>("main > section[id]"));
  if (!links.length || !sections.length) return;

  const linkById = new Map<string, HTMLAnchorElement>();
  for (const a of links) linkById.set((a.getAttribute("href") ?? "").slice(1), a);

  const owner = new Map<HTMLElement, HTMLAnchorElement | undefined>();
  let inherited: HTMLAnchorElement | undefined;
  for (const s of sections) {
    inherited = linkById.get(s.id) ?? inherited;
    owner.set(s, inherited);
  }

  const inBand = new Set<HTMLElement>();
  let shown: HTMLAnchorElement | undefined;

  const apply = (): void => {
    let active: HTMLAnchorElement | undefined;
    for (const s of sections) if (inBand.has(s)) active = owner.get(s);

    // A short last section may never reach the middle of the screen, so at the bottom of the page it wins.
    const lastSection = sections[sections.length - 1];
    const atBottom =
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
    if (atBottom && lastSection) active = owner.get(lastSection);

    if (active === shown) return;
    shown = active;
    for (const a of links) {
      if (a === active) a.setAttribute("aria-current", "true");
      else a.removeAttribute("aria-current");
    }
  };

  // A thin band just above the middle of the viewport decides which section is "current".
  const io = new IntersectionObserver(
    (entries) => {
      for (const { target, isIntersecting } of entries) {
        if (isIntersecting) inBand.add(target as HTMLElement);
        else inBand.delete(target as HTMLElement);
      }
      apply();
    },
    { rootMargin: "-40% 0px -55% 0px" },
  );
  sections.forEach((s) => io.observe(s));
  window.addEventListener("scroll", apply, { passive: true });
}

// ---------- Click-to-load YouTube ----------
// The thumbnail is a real link, so without JS it opens YouTube. With JS it becomes an inline player.
function initYouTube(): void {
  document.querySelectorAll<HTMLElement>(".yt[data-yt]").forEach((box) => {
    const id = box.dataset.yt;
    const play = box.querySelector<HTMLAnchorElement>(".yt-play");
    if (!id || !play) return;

    play.addEventListener("click", (e) => {
      // Let "open in new tab" gestures behave normally.
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();

      const frame = document.createElement("iframe");
      frame.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0`;
      frame.title = box.dataset.title ?? "YouTube video player";
      frame.allow = "autoplay; encrypted-media; picture-in-picture";
      frame.allowFullscreen = true;
      frame.referrerPolicy = "strict-origin-when-cross-origin";
      play.replaceWith(frame);
      frame.focus();
    });
  });
}

// ---------- Copy to clipboard ----------
async function copyText(text: string): Promise<boolean> {
  if (window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // fall through to the legacy path
    }
  }

  const previous = document.activeElement;
  const area = document.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "");
  area.style.cssText = "position:fixed;top:0;left:0;opacity:0;";
  document.body.append(area);
  area.select();
  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch {
    ok = false;
  }
  area.remove();
  if (previous instanceof HTMLElement) previous.focus(); // do not strand keyboard users
  return ok;
}

function initCopy(): void {
  const buttons = document.querySelectorAll<HTMLButtonElement>("button[data-copy]");
  if (!buttons.length) return;

  // Visually hidden, so announcements never move the layout. It must exist before its text changes.
  const live = document.createElement("span");
  live.setAttribute("aria-live", "polite");
  live.setAttribute("aria-atomic", "true");
  live.style.cssText =
    "position:absolute;width:1px;height:1px;margin:-1px;padding:0;border:0;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;";
  document.body.append(live);

  const RESET_MS = 1800;

  buttons.forEach((btn) => {
    const text = btn.dataset.copy ?? "";
    const handle = btn.querySelector("code");
    const original = handle?.textContent ?? "";
    let timer: number | undefined;

    const reset = (): void => {
      btn.classList.remove("copied");
      btn.style.minWidth = "";
      if (handle) handle.textContent = original;
      live.textContent = "";
      timer = undefined;
    };

    btn.addEventListener("click", () => {
      void copyText(text).then((ok) => {
        if (timer !== undefined) window.clearTimeout(timer);

        if (ok) {
          // Freeze the width so swapping the handle for "Copied" cannot shift the layout.
          btn.style.minWidth = `${btn.offsetWidth}px`;
          btn.classList.add("copied");
          if (handle) handle.textContent = "Copied";
          live.textContent = "Copied to clipboard";
        } else {
          // Leave the handle visible and select it so the visitor can copy it by hand.
          if (handle) window.getSelection()?.selectAllChildren(handle);
          live.textContent =
            "Could not copy automatically. The handle is selected so you can copy it.";
        }
        timer = window.setTimeout(reset, RESET_MS);
      });
    });
  });
}

initVideos();
initReveal();
initHotbar();
initNav();
initYouTube();
initCopy();
