import { resetYouTube } from "./youtube";

// ---------- Case-study overlay ----------
// Case studies are server-rendered as ordinary sections (so the page works without JS).
// With JS they stay hidden (see case-study.css) and the card's "Case study" link opens
// one at a time in a modal <dialog>. The URL hash (#<project-id>) is the single source of
// truth, so links can be shared and the browser Back button closes the overlay.
export function initCaseStudies(): void {
  const holder = document.getElementById("case-studies");
  if (!holder || typeof HTMLDialogElement === "undefined") return;

  const studies = new Map<string, HTMLElement>();
  holder.querySelectorAll<HTMLElement>(":scope > section[id]").forEach((s) => studies.set(s.id, s));
  if (!studies.size) return;

  const dialog = document.createElement("dialog");
  dialog.className = "case-dialog";
  dialog.innerHTML = `
    <div class="case-bar">
      <button class="btn case-close" type="button">&larr; Back to projects</button>
    </div>
    <div class="case-content"></div>`;
  document.body.append(dialog);
  const content = dialog.querySelector<HTMLElement>(".case-content");
  const closeButton = dialog.querySelector<HTMLButtonElement>(".case-close");
  if (!content || !closeButton) return;

  let current: HTMLElement | undefined;

  const idFromHash = (hash: string): string => {
    try {
      return decodeURIComponent(hash.slice(1));
    } catch {
      return "";
    }
  };

  const show = (section: HTMLElement): void => {
    if (current === section) return;
    if (current) release();
    current = section;
    content.append(section);
    dialog.setAttribute("aria-labelledby", `${section.id}-title`);
    if (!dialog.open) dialog.showModal();
    document.documentElement.classList.add("case-open");
    dialog.scrollTop = 0;
  };

  // Moves the open case study back into its hidden holder and stops any video in it.
  const release = (): void => {
    if (!current) return;
    resetYouTube(current);
    holder.append(current);
    current = undefined;
  };

  const hide = (): void => {
    release();
    if (dialog.open) dialog.close();
    document.documentElement.classList.remove("case-open");
  };

  // Show whichever case study the hash names, or none.
  const sync = (): void => {
    const section = studies.get(idFromHash(location.hash));
    if (section) show(section);
    else hide();
  };

  // Closing goes through history so Back and the close button agree. If the visitor
  // arrived straight on a #<id> link there is nothing to go back to, so tidy the URL instead.
  const requestClose = (): void => {
    const pushedByUs = (history.state as { caseStudy?: string } | null)?.caseStudy;
    if (pushedByUs) {
      history.back(); // popstate -> sync() -> hide()
      return;
    }
    history.replaceState(null, "", `${location.pathname}${location.search}#projects`);
    hide();
    document.getElementById("projects")?.scrollIntoView();
  };

  document.addEventListener("click", (event) => {
    if (event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (!(event.target instanceof Element)) return;
    const a = event.target.closest<HTMLAnchorElement>("a[href^='#']");
    const id = a ? idFromHash(a.hash) : "";
    if (!a || !studies.has(id)) return;
    event.preventDefault();
    if (location.hash !== `#${id}`) history.pushState({ caseStudy: id }, "", `#${id}`);
    sync();
  });

  // Tell assistive tech that these links open a dialog.
  document.querySelectorAll<HTMLAnchorElement>("a[href^='#']").forEach((a) => {
    if (studies.has(idFromHash(a.hash))) a.setAttribute("aria-haspopup", "dialog");
  });

  closeButton.addEventListener("click", requestClose);

  // Esc is handled on the key itself. Relying on the dialog's `cancel` event alone is not
  // enough: browsers may skip it (or make it non-cancelable) when the page has had no user
  // interaction, and then the dialog would close natively behind our back.
  dialog.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || event.defaultPrevented) return;
    event.preventDefault(); // also stops the browser's own close request
    requestClose();
  });
  // Fallbacks for close requests that are not a keypress (e.g. Android Back, some Safari paths).
  dialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    requestClose();
  });
  // If the dialog still ends up closed natively, bring the URL and page state back in line.
  dialog.addEventListener("close", () => {
    if (current) requestClose();
  });
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) requestClose(); // the dimmed backdrop
  });

  window.addEventListener("popstate", sync);
  window.addEventListener("hashchange", sync);
  sync(); // a shared #<id> link opens straight away
}
