/* =========================================================
   Le Galion — moteur de rendu de la carte
   Charge menu.json et l'injecte dans #menu.
   Aucune dépendance, vanilla JS.
   ========================================================= */

(async function () {
  const root = document.getElementById("menu");
  if (!root) return;

  let data;
  try {
    const res = await fetch("menu.json", { cache: "no-cache" });
    if (!res.ok) throw new Error("HTTP " + res.status);
    data = await res.json();
  } catch (err) {
    root.innerHTML = '<p class="loading">Carte momentanément indisponible.</p>';
    console.error("[Galion] menu.json load failed:", err);
    return;
  }

  // Échappe le HTML pour éviter toute injection depuis menu.json
  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[c]));

  // "19,00€" → "19,00<sup>€</sup>"
  const fmtPrice = (p) => {
    if (!p) return "";
    const m = String(p).match(/^(.*?)(\s?€)\s*$/);
    return m ? `${esc(m[1])}<sup>€</sup>` : esc(p);
  };

  const renderItem = (it) => `
    <div class="item">
      <h3 class="item__name">${esc(it.name)}</h3>
      <span class="item__price">${fmtPrice(it.price)}</span>
      ${it.description ? `<p class="item__desc">${esc(it.description)}</p>` : ""}
    </div>`;

  const renderSubsection = (s) => `
    <div class="subsection">
      <p class="subsection__title">${esc(s.title)}</p>
      <span class="subsection__price">${fmtPrice(s.price)}</span>
    </div>`;

  const renderFormula = (s) => `
    <section class="section section--formula" id="${esc(s.id)}">
      <div class="formula">
        <h2 class="formula__title">${esc(s.title)}</h2>
        ${s.note ? `<p class="formula__note">${esc(s.note)}</p>` : ""}
        <span class="formula__price">${fmtPrice(s.price)}</span>
        <div class="formula__group">
          <p class="formula__starter">${esc(s.formula.starter)}</p>
        </div>
        <div class="formula__group">
          <ul class="formula__choices">
            ${s.formula.mains.map((m) => `<li>${esc(m)}</li>`).join("")}
          </ul>
        </div>
        <div class="formula__group">
          <ul class="formula__choices">
            ${s.formula.desserts.map((d) => `<li>${esc(d)}</li>`).join("")}
          </ul>
        </div>
      </div>
    </section>`;

  const renderList = (s) => {
    const subs = (s.subsections || []).map(renderSubsection).join("");
    const items = (s.items || []).map(renderItem).join("");
    const addons = (s.addons || []).length
      ? `<div class="addons">${s.addons.map(renderItem).join("")}</div>`
      : "";
    const flavors = s.flavors
      ? `<div class="flavors">
          ${s.flavors.ice_creams ? `<div class="flavors__group">
            <p class="flavors__label">Parfums des glaces</p>
            <p class="flavors__list">${esc(s.flavors.ice_creams)}</p>
          </div>` : ""}
          ${s.flavors.sorbets ? `<div class="flavors__group">
            <p class="flavors__label">Parfums des sorbets</p>
            <p class="flavors__list">${esc(s.flavors.sorbets)}</p>
          </div>` : ""}
        </div>`
      : "";
    return `
      <section class="section" id="${esc(s.id)}">
        <h2 class="section__title">${esc(s.title)}</h2>
        ${subs}
        ${items}
        ${addons}
        ${flavors}
      </section>`;
  };

  const renderSection = (s) =>
    s.type === "formula" ? renderFormula(s) : renderList(s);

  // Render menu sections
  root.innerHTML = data.sections.map(renderSection).join("");

  // Lien Facebook (révélé une fois l'URL connue)
  const fb = document.getElementById("facebook-link");
  if (fb && data.facebook_url) {
    fb.href = data.facebook_url;
    fb.hidden = false;
  }

  // Navigation par section : chips sticky avec état actif synchronisé au scroll
  const navEl = document.getElementById("section-nav");
  if (navEl) {
    navEl.innerHTML = `
      <ul class="section-nav__list">
        ${data.sections.map((s) => `
          <li class="section-nav__item">
            <a class="section-nav__link" href="#${esc(s.id)}" data-target="${esc(s.id)}">
              ${esc(s.nav_label || s.title)}
            </a>
          </li>`).join("")}
      </ul>`;
    navEl.hidden = false;

    // Centre une pastille horizontalement DANS le conteneur nav,
    // sans toucher au scroll du document (sinon ça annule le scroll vers la section).
    const centerChipInNav = (chip) => {
      const list = chip.closest(".section-nav__list");
      if (!list) return;
      const target = chip.offsetLeft + chip.offsetWidth / 2 - list.clientWidth / 2;
      list.scrollTo({ left: target, behavior: "smooth" });
    };

    const links = new Map();
    navEl.querySelectorAll("a[data-target]").forEach((a) => {
      links.set(a.dataset.target, a);
      // Au clic : scroll fluide vers la section + recentrage horizontal de la pastille
      a.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.getElementById(a.dataset.target);
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
        centerChipInNav(a);
        history.replaceState(null, "", "#" + a.dataset.target);
      });
    });

    // Met à jour la pastille active selon la section visible en haut du viewport.
    // rootMargin : on cible une fine bande sous le nav sticky (~80px en haut).
    const setActive = (id) => {
      links.forEach((link, key) => link.classList.toggle("is-active", key === id));
      const active = links.get(id);
      if (active) centerChipInNav(active);
    };

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          if (visible.length) setActive(visible[0].target.id);
        },
        { rootMargin: "-80px 0px -65% 0px", threshold: 0 }
      );
      document.querySelectorAll("main .section").forEach((s) => observer.observe(s));
    }
  }

  // Render boissons button + footer
  const tail = document.getElementById("tail");
  if (tail && data.boissons_pdf) {
    tail.innerHTML = `
      <a class="boissons" href="${esc(data.boissons_pdf)}" target="_blank" rel="noopener">
        Les boissons (PDF)
      </a>
      <footer class="footer">
        ${(data.footer_notices || []).map((n) => `<p>${esc(n)}</p>`).join("")}
        <p class="footer__credit">
          Conçu par <a href="https://paper34.com" target="_blank" rel="noopener">Paper34</a>
        </p>
      </footer>`;
  }
})();
