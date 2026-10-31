/**
 * Catálogo de pacotes Tmcel
 * Busca O(n), ordenação e acções do visitante (carrinho, favorito, M-Cash).
 * O catálogo oficial é imutável — o público não adiciona nem remove ofertas.
 */
(function (global) {
  "use strict";

  var T = global.TMCEL;
  var DATA = global.TMCEL_DATA;
  var ACC = global.TMCEL_ACCOUNT;

  var state = {
    query: "",
    category: "todas",
    type: "todos",
    sort: "price-asc"
  };

  function allPackages() {
    return DATA.packages.slice();
  }

  function matches(pkg, q) {
    if (!q) { return true; }
    var hay = (pkg.name + " " + pkg.category + " " + pkg.type + " " + (pkg.ussd || "")).toLowerCase();
    return hay.indexOf(q) !== -1;
  }

  function compare(a, b, key) {
    if (key === "price-asc") { return a.price - b.price; }
    if (key === "price-desc") { return b.price - a.price; }
    if (key === "volume-desc") { return (b.volumeMb || 0) - (a.volumeMb || 0); }
    if (key === "volume-asc") { return (a.volumeMb || 0) - (b.volumeMb || 0); }
    if (key === "validity") { return b.validityDays - a.validityDays; }
    if (key === "date") { return (b.date || "").localeCompare(a.date || ""); }
    if (key === "name") { return a.name.localeCompare(b.name, "pt"); }
    return 0;
  }

  function filtered() {
    var q = state.query.toLowerCase().trim();
    return allPackages()
      .filter(function (p) {
        if (!matches(p, q)) { return false; }
        if (state.category !== "todas" && p.category !== state.category) { return false; }
        if (state.type !== "todos" && p.type !== state.type) { return false; }
        return true;
      })
      .sort(function (a, b) { return compare(a, b, state.sort); });
  }

  function actionLabel(p) {
    if (p.type === "pos-pago") { return "Assinar"; }
    return "Activar";
  }

  function cardHtml(p) {
    var fav = ACC && ACC.isFavorite(p.id);
    return (
      "<article class='card pkg-card' data-id='" + p.id + "'>" +
        "<div class='pkg-top'>" +
          "<span class='pill'>" + p.category + "</span>" +
          "<span class='pill pill-lime'>" + p.type + "</span>" +
        "</div>" +
        "<h3>" + p.name + "</h3>" +
        "<p class='muted'>" + T.formatMb(p.volumeMb) + " · " + p.validityLabel + "</p>" +
        "<p class='price'>" + T.formatMt(p.price) + " <small>USSD " + (p.ussd || "—") + "</small></p>" +
        "<div class='form-actions'>" +
          "<button class='btn btn-primary btn-sm' type='button' data-buy='" + p.id + "'>" + actionLabel(p) + "</button>" +
          "<button class='btn btn-outline btn-sm' type='button' data-add='" + p.id + "'>Carrinho</button>" +
          "<button class='btn btn-ghost-ink btn-sm' type='button' data-fav='" + p.id + "' aria-pressed='" + (fav ? "true" : "false") + "'>" + (fav ? "Nos favoritos" : "Favorito") + "</button>" +
        "</div>" +
      "</article>"
    );
  }

  function render() {
    var list = filtered();
    var grid = T.qs("#package-grid");
    var meta = T.qs("#results-meta");
    if (!grid) { return; }
    grid.innerHTML = list.length ? list.map(cardHtml).join("") : "<p class='empty'>Nenhum pacote corresponde à pesquisa.</p>";
    if (meta) {
      meta.textContent = list.length + " oferta(s) · ordenação: " + state.sort;
    }
  }

  function fillCategories() {
    var sel = T.qs("#filter-category");
    if (!sel) { return; }
    var cats = {};
    DATA.packages.forEach(function (p) { cats[p.category] = true; });
    Object.keys(cats).forEach(function (c) {
      var opt = document.createElement("option");
      opt.value = c;
      opt.textContent = c;
      sel.appendChild(opt);
    });
  }

  function findById(id) {
    return allPackages().filter(function (p) { return p.id === id; })[0];
  }

  function bindGrid() {
    var grid = T.qs("#package-grid");
    if (!grid) { return; }
    grid.addEventListener("click", function (e) {
      var add = e.target.closest("[data-add]");
      var buy = e.target.closest("[data-buy]");
      var fav = e.target.closest("[data-fav]");
      if (add) {
        var p = findById(add.getAttribute("data-add"));
        if (p) { T.addToCart(p); }
      }
      if (buy) {
        var bp = findById(buy.getAttribute("data-buy"));
        if (bp && ACC) { ACC.buyPackage(bp); }
      }
      if (fav) {
        var id = fav.getAttribute("data-fav");
        if (ACC) { ACC.toggleFavorite(id); }
        render();
        T.toast(ACC && ACC.isFavorite(id) ? "Adicionado aos seus favoritos." : "Retirado dos favoritos.");
      }
    });
  }

  function bindToolbar() {
    var q = T.qs("#filter-q");
    var cat = T.qs("#filter-category");
    var type = T.qs("#filter-type");
    var sort = T.qs("#filter-sort");
    if (!q) { return; }
    var params = new URLSearchParams(location.search);
    if (params.get("q")) { q.value = params.get("q"); state.query = params.get("q"); }
    if (params.get("cat")) {
      state.category = params.get("cat");
      if (cat) { cat.value = state.category; }
    }
    function apply() {
      state.query = q.value;
      state.category = cat.value;
      state.type = type.value;
      state.sort = sort.value;
      render();
    }
    q.addEventListener("input", apply);
    cat.addEventListener("change", apply);
    type.addEventListener("change", apply);
    sort.addEventListener("change", apply);
  }

  document.addEventListener("DOMContentLoaded", function () {
    if (!T.qs("#package-grid")) { return; }
    fillCategories();
    bindToolbar();
    bindGrid();
    render();
  });
})(window);
