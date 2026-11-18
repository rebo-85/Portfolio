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

export function initCopy(): void {
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
