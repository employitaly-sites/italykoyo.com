// ns-hugo-imp:/tmp/hugo_cache_eor/modules/filecache/modules/pkg/mod/github.com/gethinode/hinode/v3@v3.42.1/assets/js/modules/lightbox/lightbox.mjs
var lastTrigger = null;
function dialogEl() {
  return document.querySelector("dialog.lightbox");
}
function resolveSource(trigger) {
  const closest = trigger.getAttribute("data-lightbox-source-closest");
  if (closest) return trigger.closest(closest);
  const sel = trigger.getAttribute("data-lightbox-source");
  if (sel) return document.querySelector(sel);
  return null;
}
function open(trigger) {
  const dialog = dialogEl();
  const source = resolveSource(trigger);
  if (!dialog || !source) return;
  const mount = dialog.querySelector(".lightbox-content");
  if (!mount) return;
  const clone = source.cloneNode(true);
  clone.querySelectorAll("[data-lightbox-trigger]").forEach((el) => el.remove());
  clone.querySelectorAll("[data-panzoom-init]").forEach((el) => el.removeAttribute("data-panzoom-init"));
  mount.replaceChildren(clone);
  lastTrigger = trigger;
  dialog.showModal();
}
function initDialog(dialog) {
  if (dialog.dataset.lightboxInit) return;
  dialog.dataset.lightboxInit = "true";
  const closeBtn = dialog.querySelector(".lightbox-close");
  if (closeBtn) closeBtn.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) dialog.close();
  });
  dialog.addEventListener("close", () => {
    const mount = dialog.querySelector(".lightbox-content");
    if (mount) mount.replaceChildren();
    if (lastTrigger) {
      lastTrigger.focus();
      lastTrigger = null;
    }
  });
}
function initTrigger(trigger) {
  if (trigger.dataset.lightboxInit) return;
  trigger.dataset.lightboxInit = "true";
  trigger.addEventListener("click", () => open(trigger));
}
function initAll() {
  const dialog = dialogEl();
  if (dialog) initDialog(dialog);
  document.querySelectorAll("[data-lightbox-trigger]").forEach(initTrigger);
}
initAll();
new MutationObserver((mutations) => {
  mutations.forEach((m) => {
    m.addedNodes.forEach((node) => {
      if (node.nodeType !== Node.ELEMENT_NODE) return;
      if (node.matches && node.matches("dialog.lightbox")) initDialog(node);
      if (node.matches && node.matches("[data-lightbox-trigger]"))
        initTrigger(node);
      if (node.querySelectorAll)
        node.querySelectorAll("[data-lightbox-trigger]").forEach(initTrigger);
    });
  });
}).observe(document.body, { childList: true, subtree: true });
//# sourceMappingURL=core.bundle.ja.mjs.map
