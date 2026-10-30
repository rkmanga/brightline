/* Bright Line Consulting: shared page script.
   ------------------------------------------------------------------
   PRODUCT SETTINGS: edit these values, then commit. Every product
   button and price on the site reads from here, so each value lives
   in one place.
   ------------------------------------------------------------------ */
const BL_PRODUCTS = {
  playbook: {
    price: "$197",          // e.g. "$97"
    checkout: ""        // Stripe Payment Link with Managed Payments on, e.g. "https://buy.stripe.com/..."
  },
  calculator: {
    price: "$49",          // e.g. "$29"
    etsy: ""           // Etsy listing URL
  }
};
const BL_SUPPORT = "rk@brightlineops.llc";

/* ------------------------------------------------------------------ */

(function applyProducts(){
  // Prices: fill [data-price="playbook"], hide wrappers marked [data-price-wrap] when blank.
  document.querySelectorAll("[data-price]").forEach(el => {
    const p = (BL_PRODUCTS[el.dataset.price] || {}).price;
    if (p) { el.textContent = p; }
    else {
      const wrap = el.closest("[data-price-wrap]");
      (wrap || el).hidden = true;
    }
  });

  // Playbook checkout: until the Stripe link is set, buttons open an email instead.
  document.querySelectorAll('[data-buy="playbook"]').forEach(a => {
    const url = BL_PRODUCTS.playbook.checkout;
    if (url) { a.href = url; }
    else {
      a.href = "mailto:" + BL_SUPPORT + "?subject=" +
        encodeURIComponent("Hygienist Compensation & Recruitment Playbook");
    }
  });

  // Calculator marketplace links: hidden until set.
  ["etsy"].forEach(key => {
    document.querySelectorAll('[data-buy="' + key + '"]').forEach(a => {
      const url = BL_PRODUCTS.calculator[key];
      if (url) { a.href = url; } else { a.hidden = true; }
    });
  });

  // Current year in footers.
  document.querySelectorAll("[data-year]").forEach(el => { el.textContent = new Date().getFullYear(); });
})();

(function lineAndReveal(){
  const fill = document.getElementById("lineFill");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function updateLine(){
    if (!fill) return;
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    const p = max > 0 ? Math.min(1, window.scrollY / max) : 1;
    fill.style.height = (p * 100).toFixed(2) + "%";
  }
  if (reduce){ if (fill) fill.style.height = "100%"; }
  else {
    updateLine();
    window.addEventListener("scroll", updateLine, {passive:true});
    window.addEventListener("resize", updateLine);
  }

  const els = document.querySelectorAll(".reveal");
  if (reduce || !("IntersectionObserver" in window)){
    els.forEach(e => e.classList.add("in"));
  } else {
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting){ en.target.classList.add("in"); io.unobserve(en.target); } });
    }, {threshold:0.12});
    els.forEach(e => io.observe(e));
  }
})();
