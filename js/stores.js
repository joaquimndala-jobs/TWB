/**
 * Lojas Tmcel – pesquisa por nome, cidade ou província
 * e ordenação por cidade / categoria.
 * Lista oficial imutável; o visitante só pesquisa e ordena.
 */
(function (global) {
  "use strict";

  var T = global.TMCEL;
  var DATA = global.TMCEL_DATA;

  var state = { q: "", province: "todas", sort: "city" };

  function all() {
    return DATA.stores.slice();
  }

  function apply() {
    var q = state.q.toLowerCase().trim();
    return all()
      .filter(function (s) {
        var hay = (s.name + " " + s.city + " " + s.province + " " + s.address).toLowerCase();
        if (q && hay.indexOf(q) === -1) { return false; }
        if (state.province !== "todas" && s.province !== state.province) { return false; }
        return true;
      })
      .sort(function (a, b) {
        if (state.sort === "city") { return a.city.localeCompare(b.city, "pt"); }
        if (state.sort === "name") { return a.name.localeCompare(b.name, "pt"); }
        return a.category.localeCompare(b.category, "pt");
      });
  }

  function card(s) {
    var tel = String(s.phone || "").replace(/\s/g, "");
    return (
      "<article class='card store-card'>" +
        "<span class='pill'>" + s.category + "</span>" +
        "<h3>" + s.name + "</h3>" +
        "<p>" + s.address + "</p>" +
        "<p class='muted'>" + s.city + " · " + s.province + "</p>" +
        "<p><a href='tel:" + tel + "'><strong>" + s.phone + "</strong></a><br><small>" + s.hours + "</small></p>" +
      "</article>"
    );
  }

  function render() {
    var list = apply();
    var grid = T.qs("#store-grid");
    var meta = T.qs("#store-meta");
    if (!grid) { return; }
    grid.innerHTML = list.length ? list.map(card).join("") : "<p class='empty'>Nenhuma loja encontrada.</p>";
    if (meta) { meta.textContent = list.length + " ponto(s) de atendimento"; }
  }

  function provinces() {
    var sel = T.qs("#store-province");
    if (!sel) { return; }
    var set = {};
    DATA.stores.forEach(function (s) { set[s.province] = true; });
    Object.keys(set).sort().forEach(function (p) {
      var o = document.createElement("option");
      o.value = p; o.textContent = p;
      sel.appendChild(o);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    if (!T.qs("#store-grid")) { return; }
    provinces();
    var params = new URLSearchParams(location.search);
    var qEl = T.qs("#store-q");
    if (params.get("q")) { qEl.value = params.get("q"); state.q = params.get("q"); }

    function sync() {
      state.q = qEl.value;
      state.province = T.qs("#store-province").value;
      state.sort = T.qs("#store-sort").value;
      render();
    }
    qEl.addEventListener("input", sync);
    T.qs("#store-province").addEventListener("change", sync);
    T.qs("#store-sort").addEventListener("change", sync);
    render();
  });
})(window);
