import { reduce, hasIO } from "./env";

// ---------- Hotbar cycling ----------
// Only the .selected class moves; the CSS handles the transition.
export function initHotbar(): void {
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
