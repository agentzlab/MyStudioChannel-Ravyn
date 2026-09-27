/* PRIME TIME — signal lock + interactions */
(function () {
  function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function wrapWords(el) {
    if (!el || el.dataset.wordsWrapped === "1") return;
    const text = el.textContent.trim();
    if (!text) return;
    el.dataset.wordsWrapped = "1";
    el.innerHTML = text
      .split(/(\s+)/)
      .map((token) => {
        if (/^\s+$/.test(token)) return token;
        return `<span class="word">${token}</span>`;
      })
      .join("");
  }

  function applyWordStagger(section) {
    section.querySelectorAll("[data-words]").forEach((heading) => {
      wrapWords(heading);
      heading.querySelectorAll(".word").forEach((word, i) => {
        word.style.transitionDelay = `${i * 55}ms`;
      });
    });
  }

  function initSignalLock() {
    const sections = document.querySelectorAll("[data-signal]");
    if (!sections.length) return;

    if (prefersReducedMotion()) {
      sections.forEach((section) => {
        section.classList.add("is-locked");
        section.querySelectorAll("[data-words]").forEach(wrapWords);
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const section = entry.target;
          applyWordStagger(section);
          section.classList.add("is-locked");
          observer.unobserve(section);
        });
      },
      { threshold: 0.18 }
    );

    sections.forEach((section) => observer.observe(section));
  }

  function initHeroChoreography() {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const items = Array.from(hero.querySelectorAll("[data-choreo]"));

    if (prefersReducedMotion()) {
      hero.classList.add("is-ready", "is-locked");
      return;
    }

    requestAnimationFrame(() => {
      hero.classList.add("is-ready");
      items.forEach((el, i) => {
        el.style.transitionDelay = `${i * 70}ms`;
      });
    });
  }

  function initAccordion() {
    const root = document.getElementById("accordion");
    if (!root) return;

    root.querySelectorAll(".acc-trigger").forEach((trigger) => {
      trigger.addEventListener("click", () => {
        const item = trigger.closest(".acc-item");
        if (!item) return;
        const opening = !item.classList.contains("is-open");

        root.querySelectorAll(".acc-item").forEach((other) => {
          other.classList.remove("is-open");
          const btn = other.querySelector(".acc-trigger");
          if (btn) btn.setAttribute("aria-expanded", "false");
        });

        if (opening) {
          item.classList.add("is-open");
          trigger.setAttribute("aria-expanded", "true");
        }
      });
    });
  }

  function initMobileNav() {
    const toggle = document.getElementById("navToggle");
    const panel = document.getElementById("mobileNav");
    if (!toggle || !panel) return;

    const close = () => {
      panel.hidden = true;
      toggle.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
      document.body.style.overflow = "";
    };

    const open = () => {
      panel.hidden = false;
      toggle.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Close menu");
      document.body.style.overflow = "hidden";
    };

    toggle.addEventListener("click", () => {
      if (panel.hidden) open();
      else close();
    });

    panel.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", close);
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth >= 860) close();
    });
  }

  function initSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (event) => {
        const id = link.getAttribute("href");
        if (!id || id === "#") return;
        const target = document.querySelector(id);
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({
          behavior: prefersReducedMotion() ? "auto" : "smooth",
          block: "start",
        });
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initHeroChoreography();
    initSignalLock();
    initAccordion();
    initMobileNav();
    initSmoothAnchors();
  });
})();
