// ---------- Click-to-load YouTube ----------
// The thumbnail is a real link, so without JS it opens YouTube. With JS it becomes an inline player.

// Remembers each box's original thumbnail link so a player can be swapped back out.
const thumbnails = new WeakMap<HTMLElement, HTMLAnchorElement>();

/** Puts the thumbnail back wherever a player was started, which also stops the video. */
export function resetYouTube(root: ParentNode = document): void {
  root.querySelectorAll<HTMLIFrameElement>(".yt iframe").forEach((frame) => {
    const box = frame.closest<HTMLElement>(".yt");
    const play = box ? thumbnails.get(box) : undefined;
    if (play) frame.replaceWith(play);
  });
}

export function initYouTube(): void {
  document.querySelectorAll<HTMLElement>(".yt[data-yt]").forEach((box) => {
    const id = box.dataset.yt;
    const play = box.querySelector<HTMLAnchorElement>(".yt-play");
    if (!id || !play) return;
    thumbnails.set(box, play);

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
