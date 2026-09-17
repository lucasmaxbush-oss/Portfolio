/* Lightbox + viewer fallback for the portfolio sheet. No dependencies. */
(function () {
  "use strict";

  var figs = [];
  var index = 0;
  var lb, lbImg, lbNum, lbCap, lastFocus;

  function collect() {
    figs = Array.prototype.slice.call(document.querySelectorAll("[data-full]"));
    figs.forEach(function (el, i) {
      el.addEventListener("click", function () { open(i); });
    });
  }

  function build() {
    lb = document.createElement("div");
    lb.className = "lb";
    lb.hidden = true;
    lb.setAttribute("role", "dialog");
    lb.setAttribute("aria-modal", "true");
    lb.setAttribute("aria-label", "Image viewer");
    lb.innerHTML =
      '<img alt="">' +
      '<div class="lb__bar">' +
        '<p><b class="lb-num"></b><span class="lb-cap"></span></p>' +
        '<button class="lb__btn" data-act="prev" type="button">← Prev</button>' +
        '<button class="lb__btn" data-act="next" type="button">Next →</button>' +
        '<button class="lb__btn" data-act="close" type="button">Close ✕</button>' +
      "</div>";
    document.body.appendChild(lb);
    lbImg = lb.querySelector("img");
    lbNum = lb.querySelector(".lb-num");
    lbCap = lb.querySelector(".lb-cap");

    lb.addEventListener("click", function (e) {
      var act = e.target.getAttribute && e.target.getAttribute("data-act");
      if (act === "next") { step(1); return; }
      if (act === "prev") { step(-1); return; }
      if (act === "close" || e.target === lb || e.target === lbImg) close();
    });
  }

  function show() {
    var el = figs[index];
    lbImg.src = el.getAttribute("data-full");
    lbImg.alt = el.getAttribute("data-cap") || "";
    lbNum.textContent = (index + 1) + " / " + figs.length;
    lbCap.textContent = el.getAttribute("data-cap") || "";
  }

  function open(i) {
    index = i;
    lastFocus = document.activeElement;
    show();
    lb.hidden = false;
    document.documentElement.style.overflow = "hidden";
    lb.querySelector('[data-act="close"]').focus();
  }

  function close() {
    lb.hidden = true;
    document.documentElement.style.overflow = "";
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function step(d) {
    index = (index + d + figs.length) % figs.length;
    show();
  }

  document.addEventListener("keydown", function (e) {
    if (!lb || lb.hidden) return;
    if (e.key === "Escape") { close(); }
    else if (e.key === "ArrowRight") { step(1); }
    else if (e.key === "ArrowLeft") { step(-1); }
  });

  /* If <model-viewer> never upgrades (script blocked, no WebGL), say so plainly. */
  function viewerWatch() {
    var mv = document.querySelector("model-viewer");
    var fb = document.querySelector(".viewer__fallback");
    if (!mv || !fb) return;
    setTimeout(function () {
      if (!window.customElements || !customElements.get("model-viewer")) {
        mv.hidden = true;
        fb.hidden = false;
        fb.textContent =
          "The 3D viewer could not load in this browser. The STEP file is linked below.";
      }
    }, 4000);
  }

  /* Autoplay the fold animation when it scrolls into view, unless the viewer
     has asked for reduced motion, in which case leave it paused with controls. */
  function autoplayWatch() {
    var vids = document.querySelectorAll("video[data-autoplay]");
    if (!vids.length) return;
    var reduce = window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var v = e.target;
        if (e.isIntersecting) {
          var p = v.play();
          if (p && p.catch) p.catch(function () {});
        } else if (!v.paused) {
          v.pause();
        }
      });
    }, { threshold: 0.35 });

    Array.prototype.forEach.call(vids, function (v) { io.observe(v); });
  }

  function init() {
    build();
    collect();
    viewerWatch();
    autoplayWatch();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
