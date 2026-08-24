// IIA Hub — comportamiento compartido entre páginas
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector(".menu-btn");
  const sidebar = document.querySelector(".sidebar");

  if (menuBtn && sidebar) {
    menuBtn.addEventListener("click", () => {
      sidebar.classList.toggle("open");
    });
    document.addEventListener("click", (e) => {
      if (
        sidebar.classList.contains("open") &&
        !sidebar.contains(e.target) &&
        !menuBtn.contains(e.target)
      ) {
        sidebar.classList.remove("open");
      }
    });
  }

  initMalla();
});

// Mapa de correlativas — resalta prerrequisitos y dependientes al pasar
// el mouse o tocar una materia. Funciona con click (pin) y hover (desktop).
function initMalla() {
  const malla = document.getElementById("malla");
  if (!malla) return;

  const cards = Array.from(malla.querySelectorAll(".materia-card"));
  const byCode = {};
  cards.forEach((c) => {
    const code = c.dataset.code;
    if (code) byCode[code] = byCode[code] || [];
    if (code) byCode[code].push(c);
  });

  let pinned = null;

  function clear() {
    malla.classList.remove("has-selection");
    cards.forEach((c) => c.classList.remove("hl-self", "hl-prereq", "hl-dependent"));
  }

  function highlight(card) {
    const code = card.dataset.code;
    if (!code) return;
    clear();
    malla.classList.add("has-selection");
    card.classList.add("hl-self");

    const prereqs = (card.dataset.prereqs || "").split(",").map((s) => s.trim()).filter(Boolean);
    prereqs.forEach((p) => {
      (byCode[p] || []).forEach((c) => c.classList.add("hl-prereq"));
    });

    cards.forEach((c) => {
      const cPrereqs = (c.dataset.prereqs || "").split(",").map((s) => s.trim());
      if (cPrereqs.includes(code)) c.classList.add("hl-dependent");
    });
  }

  cards.forEach((card) => {
    if (!card.dataset.code) return; // electivas sin código no participan del resaltado
    card.addEventListener("mouseenter", () => {
      if (!pinned) highlight(card);
    });
    card.addEventListener("mouseleave", () => {
      if (!pinned) clear();
    });
    card.addEventListener("focus", () => {
      if (!pinned) highlight(card);
    });
    card.addEventListener("click", () => {
      if (pinned === card) {
        pinned = null;
        clear();
      } else {
        pinned = card;
        highlight(card);
      }
    });
  });

  document.addEventListener("click", (e) => {
    if (pinned && !malla.contains(e.target)) {
      pinned = null;
      clear();
    }
  });
}
