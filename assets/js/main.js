/* Arrowlogy — minimal interactions: mobile menu, header state, scroll reveal, current year. */
(function () {
  "use strict";

  /* Gate reveal styling behind confirmed JS so content is never hidden without JS */
  document.documentElement.classList.add("js");

  /* Mobile menu toggle */
  var toggle = document.getElementById("nav-toggle");
  var links = document.getElementById("nav-links");

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    /* Close the menu when a link is chosen */
    links.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });

    /* Close on resize back to desktop */
    window.addEventListener("resize", function () {
      if (window.innerWidth > 760 && links.classList.contains("open")) {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* Header border on scroll */
  var header = document.getElementById("site-header");
  function onScroll() {
    if (header) header.classList.toggle("scrolled", window.scrollY > 8);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* Subtle reveal for section content (skipped if reduced motion or no IO) */
  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length && "IntersectionObserver" in window &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* Footer year */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();