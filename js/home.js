/**
 * Página inicial: serviços em destaque, notícias e atalhos USSD.
 */
(function (global) {
  "use strict";

  var T = global.TMCEL;
  var D = global.TMCEL_DATA;

  function icon(name) {
    var svg = {
      wifi: "<svg viewBox='0 0 24 24' width='22' height='22' fill='none' stroke='#fff' stroke-width='2'><path d='M4 10a12 12 0 0 1 16 0'/><path d='M7 13a8 8 0 0 1 10 0'/><path d='M10 16a4 4 0 0 1 4 0'/><circle cx='12' cy='19' r='1' fill='#fff' stroke='none'/></svg>",
      send: "<svg viewBox='0 0 24 24' width='22' height='22' fill='none' stroke='#fff' stroke-width='2'><path d='M4 12h12'/><path d='M12 6l6 6-6 6'/></svg>",
      home: "<svg viewBox='0 0 24 24' width='22' height='22' fill='none' stroke='#fff' stroke-width='2'><path d='M4 11l8-7 8 7v9H4z'/></svg>",
      building: "<svg viewBox='0 0 24 24' width='22' height='22' fill='none' stroke='#fff' stroke-width='2'><rect x='5' y='3' width='14' height='18'/><path d='M9 8h1M14 8h1M9 12h1M14 12h1M9 16h6'/></svg>",
      users: "<svg viewBox='0 0 24 24' width='22' height='22' fill='none' stroke='#fff' stroke-width='2'><circle cx='9' cy='8' r='3'/><path d='M3 19c1-3 3-5 6-5s5 2 6 5'/><circle cx='17' cy='9' r='2'/><path d='M21 19c0-2-1-4-3-5'/></svg>",
      sim: "<svg viewBox='0 0 24 24' width='22' height='22' fill='none' stroke='#fff' stroke-width='2'><path d='M7 3h8l4 4v14H7z'/><rect x='9' y='11' width='6' height='6'/></svg>",
      phone: "<svg viewBox='0 0 24 24' width='22' height='22' fill='none' stroke='#fff' stroke-width='2'><rect x='7' y='2' width='10' height='20' rx='2'/><path d='M11 18h2'/></svg>",
      globe: "<svg viewBox='0 0 24 24' width='22' height='22' fill='none' stroke='#fff' stroke-width='2'><circle cx='12' cy='12' r='9'/><path d='M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18'/></svg>"
    };
    return svg[name] || svg.globe;
  }

  document.addEventListener("DOMContentLoaded", function () {
    var sg = T.qs("#services-grid");
    if (sg) {
      sg.innerHTML = D.services.map(function (s) {
        return "<a class='card' href='" + s.href + "'><div class='service-icon' aria-hidden='true'>" + icon(s.icon) + "</div><h3>" + s.name + "</h3><p class='muted'>" + s.desc + "</p></a>";
      }).join("");
    }
    var ng = T.qs("#news-grid");
    if (ng) {
      ng.innerHTML = D.news.slice(0, 4).map(function (n) {
        return "<a class='card news-card' href='noticia.html?id=" + n.id + "'><img src='" + n.image + "' alt=''><time datetime='" + n.date + "'>" + n.date + "</time><h3>" + n.title + "</h3><p class='muted'>" + n.excerpt + "</p><span class='read-more'>Ler mais</span></a>";
      }).join("");
    }
    var tg = T.qs("#tariff-grid");
    if (tg) {
      tg.innerHTML = D.tariffs.map(function (t) {
        return "<div class='stat'><strong>" + t.value + "</strong><span class='muted'>" + t.name + "</span></div>";
      }).join("");
    }
  });
})(window);
