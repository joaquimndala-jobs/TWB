/**
 * Página de produto: lê ?id= e preenche conteúdo oficial.
 */
(function (global) {
  "use strict";

  var T = global.TMCEL;
  var D = global.TMCEL_DATA;

  function param(name) {
    var q = location.search.replace(/^\?/, "").split("&");
    for (var i = 0; i < q.length; i += 1) {
      var p = q[i].split("=");
      if (decodeURIComponent(p[0] || "") === name) {
        return decodeURIComponent((p[1] || "").replace(/\+/g, " "));
      }
    }
    return "";
  }

  document.addEventListener("DOMContentLoaded", function () {
    var id = param("id") || "netgiro";
    var list = D.products || [];
    var product = null;
    for (var i = 0; i < list.length; i += 1) {
      if (list[i].id === id) { product = list[i]; break; }
    }
    if (!product) {
      T.qs("#product-title").textContent = "Produto não encontrado";
      T.qs("#product-summary").textContent = "Volte ao índice de serviços.";
      T.qs("#product-body").innerHTML = "<p><a class='btn btn-primary' href='servicos.html'>Ver todos os serviços</a></p>";
      return;
    }
    document.title = product.name + " – Tmcel";
    T.qs("#product-group").textContent = product.group;
    T.qs("#product-title").textContent = product.name;
    T.qs("#product-summary").textContent = product.summary || "";
    T.qs("#product-meta").innerHTML =
      (product.ussd ? "<span class='pill'>" + product.ussd + "</span>" : "") +
      "<span class='pill pill-lime'>" + product.group + "</span>";
    T.qs("#product-body").innerHTML = product.body || "";
    if (product.official) {
      T.qs("#product-official").innerHTML = "Fonte oficial: <a href='" + product.official + "' rel='noopener'>" + product.official + "</a>";
    }
    var cta = T.qs("#product-cta");
    if (cta) {
      var isFixo = (product.group || "").indexOf("Fixo") !== -1;
      if (isFixo) {
        cta.innerHTML = "<a class='btn btn-primary' href='lojas.html'>Assinar numa loja</a> <a class='btn btn-outline' href='tel:800375375'>800 375 375</a>";
      } else {
        cta.innerHTML = "<a class='btn btn-primary' href='pacotes.html'>Activar / comprar com M-Cash</a> <a class='btn btn-outline' href='conta.html'>Entrar na conta</a>";
      }
    }
    if (product.catalog) {
      var pkgs = D.packages.filter(function (p) { return p.category === product.catalog; }).slice(0, 6);
      T.qs("#product-catalog").innerHTML = pkgs.map(function (p) {
        var action = p.type === "pos-pago" ? "Assinar" : "Activar";
        return "<article class='card pkg-card'><span class='pill'>" + p.category + "</span><h3>" + p.name + "</h3>" +
          "<p class='muted'>" + T.formatMb(p.volumeMb) + " · " + p.validityLabel + "</p>" +
          "<p class='price'>" + T.formatMt(p.price) + "</p>" +
          "<div class='form-actions'>" +
            "<button class='btn btn-primary btn-sm' type='button' data-buy='" + p.id + "'>" + action + "</button>" +
            "<button class='btn btn-outline btn-sm' type='button' data-add='" + p.id + "'>Carrinho</button>" +
          "</div></article>";
      }).join("");
      T.qs("#product-catalog").addEventListener("click", function (e) {
        var buy = e.target.closest("[data-buy]");
        var add = e.target.closest("[data-add]");
        function find(id) {
          return D.packages.filter(function (x) { return x.id === id; })[0];
        }
        if (add) {
          var ap = find(add.getAttribute("data-add"));
          if (ap) { T.addToCart(ap); }
        }
        if (buy) {
          var bp = find(buy.getAttribute("data-buy"));
          if (bp && global.TMCEL_ACCOUNT) { global.TMCEL_ACCOUNT.buyPackage(bp); }
        }
      });
    }
  });
})(window);
