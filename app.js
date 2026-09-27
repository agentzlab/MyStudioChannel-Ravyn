(() => {
  const nav = document.querySelector("[data-nav]");
  const toggle = document.querySelector("[data-nav-toggle]");
  const modal = document.getElementById("consult-modal");
  const form = document.getElementById("contact-form");
  const formNote = document.querySelector("[data-form-note]");
  const modalNote = document.querySelector("[data-modal-note]");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    nav.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const openConsult = () => {
    if (modal && typeof modal.showModal === "function") {
      modal.showModal();
      if (modalNote) modalNote.hidden = true;
    }
  };

  document.querySelectorAll("[data-open-consult]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
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
})();
