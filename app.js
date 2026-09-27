(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const nav = document.querySelector("[data-nav]");
  const toggle = document.querySelector("[data-nav-toggle]");
  const backdrop = document.querySelector("[data-nav-backdrop]");
  const header = document.querySelector("[data-site-header]");
  const modal = document.getElementById("consult-modal");
  const demoModal = document.getElementById("demo-modal");
  const demoTitle = document.getElementById("demo-title");
  const form = document.getElementById("contact-form");
  const formNote = document.querySelector("[data-form-note]");
  const modalNote = document.querySelector("[data-modal-note]");
  const cmdk = document.getElementById("cmdk");
  const cmdkInput = document.querySelector("[data-cmdk-input]");
  const mqDesktop = window.matchMedia("(min-width: 900px)");

  /* —— Mobile nav sheet —— */
  const setNavOpen = (open) => {
    if (!nav || !toggle) return;
    nav.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("nav-open", open);
    if (backdrop) {
      backdrop.classList.toggle("open", open);
      backdrop.hidden = !open;
    }
    if (!open) {
      nav.querySelectorAll("[data-mega-item]").forEach((item) => {
        item.classList.remove("is-open");
        const t = item.querySelector("[data-mega-trigger]");
        if (t) t.setAttribute("aria-expanded", "false");
      });
    }
  };

  if (toggle && nav) {
    toggle.addEventListener("click", () => setNavOpen(!nav.classList.contains("open")));
    if (backdrop) backdrop.addEventListener("click", () => setNavOpen(false));
    nav.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => setNavOpen(false));
    });
  }

  /* —— Mega menu (desktop) —— */
  const megaNav = document.querySelector("[data-mega-nav]");
  const highlight = document.querySelector("[data-mega-highlight]");
  const track = document.querySelector("[data-mega-track]");
  let openTimer = null;
  let closeTimer = null;
  let activeItem = null;

  const moveHighlight = (el) => {
    if (!highlight || !track || !el || !mqDesktop.matches) return;
    const tr = track.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    highlight.style.width = `${r.width}px`;
    highlight.style.transform = `translate(${r.left - tr.left}px, -50%)`;
    highlight.classList.add("is-on");
  };

  const hideHighlight = () => {
    if (highlight) highlight.classList.remove("is-on");
  };

  const closeAllMega = () => {
    if (!megaNav) return;
    megaNav.querySelectorAll("[data-mega-item]").forEach((item) => {
      item.classList.remove("is-open");
      const t = item.querySelector("[data-mega-trigger]");
      if (t) t.setAttribute("aria-expanded", "false");
      const panel = item.querySelector("[data-mega-panel]");
      if (panel) panel.hidden = true;
    });
    activeItem = null;
  };

  const openMega = (item) => {
    if (!item) return;
    closeAllMega();
    item.classList.add("is-open");
    const t = item.querySelector("[data-mega-trigger]");
    const panel = item.querySelector("[data-mega-panel]");
    if (t) t.setAttribute("aria-expanded", "true");
    if (panel) panel.hidden = false;
    activeItem = item;
    moveHighlight(t);
  };

  if (megaNav) {
    megaNav.querySelectorAll("[data-mega-item]").forEach((item) => {
      const trigger = item.querySelector("[data-mega-trigger]");
      if (!trigger) return;

      const scheduleOpen = () => {
        clearTimeout(closeTimer);
        clearTimeout(openTimer);
        openTimer = setTimeout(() => {
          if (mqDesktop.matches) openMega(item);
        }, 80);
      };
      const scheduleClose = () => {
        clearTimeout(openTimer);
        clearTimeout(closeTimer);
        closeTimer = setTimeout(() => {
          if (mqDesktop.matches) {
            item.classList.remove("is-open");
            trigger.setAttribute("aria-expanded", "false");
            const panel = item.querySelector("[data-mega-panel]");
            if (panel) panel.hidden = true;
            if (activeItem === item) activeItem = null;
            hideHighlight();
          }
        }, 140);
      };

      item.addEventListener("pointerenter", scheduleOpen);
      item.addEventListener("pointerleave", scheduleClose);
      trigger.addEventListener("focus", scheduleOpen);
      trigger.addEventListener("click", (e) => {
        if (!mqDesktop.matches) {
          e.preventDefault();
          const willOpen = !item.classList.contains("is-open");
          megaNav.querySelectorAll("[data-mega-item]").forEach((other) => {
            if (other === item) return;
            other.classList.remove("is-open");
            const ot = other.querySelector("[data-mega-trigger]");
            if (ot) ot.setAttribute("aria-expanded", "false");
          });
          item.classList.toggle("is-open", willOpen);
          trigger.setAttribute("aria-expanded", String(willOpen));
          const panel = item.querySelector("[data-mega-panel]");
          if (panel) panel.hidden = !willOpen;
          return;
        }
        e.preventDefault();
        if (item.classList.contains("is-open")) {
          closeAllMega();
          hideHighlight();
        } else {
          openMega(item);
        }
      });
    });

    megaNav.querySelectorAll("[data-mega-plain]").forEach((link) => {
      link.addEventListener("pointerenter", () => {
        if (!mqDesktop.matches) return;
        clearTimeout(closeTimer);
        closeAllMega();
        moveHighlight(link);
      });
      link.addEventListener("pointerleave", () => {
        if (!mqDesktop.matches) return;
        hideHighlight();
      });
      link.addEventListener("focus", () => moveHighlight(link));
    });

    megaNav.addEventListener("pointerleave", () => {
      if (!mqDesktop.matches) return;
      clearTimeout(openTimer);
      closeTimer = setTimeout(() => {
        closeAllMega();
        hideHighlight();
      }, 160);
    });
  }

  mqDesktop.addEventListener("change", () => {
    closeAllMega();
    setNavOpen(false);
    hideHighlight();
  });

  /* —— Sticky header scrolled state —— */
  const onScrollHeader = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };
  onScrollHeader();
  window.addEventListener("scroll", onScrollHeader, { passive: true });

  /* —— Spotlight pointer tracking —— */
  const bindSpotlight = (el) => {
    el.addEventListener("pointermove", (e) => {
      if (reduceMotion) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
      el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
    });
  };
  document.querySelectorAll("[data-spotlight]").forEach(bindSpotlight);

  /* —— Scroll reveal / stagger —— */
  if (!reduceMotion && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const root = entry.target;
          root.classList.add("is-in");
          root.querySelectorAll("[data-reveal-item]").forEach((child) => {
            child.classList.add("is-in");
          });
          io.unobserve(root);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    document.querySelectorAll("[data-reveal], [data-chapter-reveal]").forEach((el) => io.observe(el));
    document.querySelectorAll("[data-reveal-item]").forEach((el) => {
      if (!el.closest("[data-reveal]")) io.observe(el);
    });
  } else {
    document
      .querySelectorAll("[data-reveal-item], [data-chapter-reveal], [data-reveal]")
      .forEach((el) => el.classList.add("is-in"));
  }

  /* —— Consult modal —— */
  const openConsult = () => {
    if (modal && typeof modal.showModal === "function") {
      modal.showModal();
      if (modalNote) modalNote.hidden = true;
    }
  };

  document.querySelectorAll("[data-open-consult]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      if (demoModal && demoModal.open) demoModal.close();
      setNavOpen(false);
      openConsult();
    });
  });

  document.querySelectorAll("[data-stub-submit]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      if (modalNote) modalNote.hidden = false;
    });
  });

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (formNote) formNote.hidden = false;
    });
  }

  /* —— Demo stub modal —— */
  document.querySelectorAll("[data-open-demo]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const name = btn.getAttribute("data-open-demo") || "Concept";
      if (demoTitle) demoTitle.textContent = name;
      if (demoModal && typeof demoModal.showModal === "function") demoModal.showModal();
    });
  });

  /* —— Command palette ⌘K / Ctrl+K —— */
  const cmdButtons = () =>
    Array.from(document.querySelectorAll("[data-cmdk-goto]")).filter(
      (b) => !b.closest("li")?.hidden
    );

  const openCmdk = () => {
    if (!cmdk || typeof cmdk.showModal !== "function") return;
    cmdk.showModal();
    if (cmdkInput) {
      cmdkInput.value = "";
      filterCmdk("");
      setTimeout(() => cmdkInput.focus(), 10);
    }
  };

  const closeCmdk = () => {
    if (cmdk && cmdk.open) cmdk.close();
  };

  const filterCmdk = (q) => {
    const query = q.trim().toLowerCase();
    document.querySelectorAll("[data-cmdk-list] li").forEach((li) => {
      const label = li.textContent.toLowerCase();
      li.hidden = Boolean(query) && !label.includes(query);
    });
    const visible = cmdButtons();
    visible.forEach((b, i) => b.setAttribute("data-active", String(i === 0)));
  };

  document.addEventListener("keydown", (e) => {
    const meta = e.metaKey || e.ctrlKey;
    if (meta && e.key.toLowerCase() === "k") {
      e.preventDefault();
      if (cmdk?.open) closeCmdk();
      else openCmdk();
      return;
    }
    if (e.key === "Escape") {
      setNavOpen(false);
      if (mqDesktop.matches) {
        closeAllMega();
        hideHighlight();
      }
    }
    if (!cmdk?.open) return;
    const visible = cmdButtons();
    const activeIdx = visible.findIndex((b) => b.getAttribute("data-active") === "true");
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = visible[(Math.max(activeIdx, 0) + 1) % visible.length];
      visible.forEach((b) => b.setAttribute("data-active", String(b === next)));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = visible[(activeIdx - 1 + visible.length) % visible.length];
      visible.forEach((b) => b.setAttribute("data-active", String(b === next)));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const target = visible[Math.max(activeIdx, 0)];
      if (target) target.click();
    }
  });

  if (cmdkInput) {
    cmdkInput.addEventListener("input", () => filterCmdk(cmdkInput.value));
  }

  document.querySelectorAll("[data-cmdk-goto]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const href = btn.getAttribute("data-cmdk-goto");
      closeCmdk();
      if (href) {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
        history.replaceState(null, "", href);
      }
    });
  });
})();
