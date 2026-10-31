/**
 * Tmcel redesenho – lógica partilhada
 * Manipulação do DOM, localStorage (carrinho + contactos),
 * busca global e feedback visual (toasts).
 * UniSCED / Tecnologias Web 2026
 */
(function (global) {
  "use strict";

  var CART_KEY = "tmcel_cart_v1";
  var CONTACT_KEY = "tmcel_contacts_v1";

  function qs(sel, root) { return (root || document).querySelector(sel); }
  function qsa(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function read(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (err) {
      return fallback;
    }
  }

  function write(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function formatMt(n) {
    return Number(n).toLocaleString("pt-MZ", { minimumFractionDigits: 0, maximumFractionDigits: 2 }) + " MT";
  }

  function formatMb(mb) {
    if (!mb) { return "Ilimitado"; }
    if (mb >= 1024) { return (mb / 1024).toFixed(mb % 1024 === 0 ? 0 : 1) + " GB"; }
    return mb + " MB";
  }

  /* ---------- Carrinho (adicionar / remover) ---------- */
  function getCart() { return read(CART_KEY, []); }

  function saveCart(items) {
    write(CART_KEY, items);
    updateCartBadge();
    renderCart();
  }

  function addToCart(pkg) {
    var cart = getCart();
    var found = cart.filter(function (i) { return i.id === pkg.id; })[0];
    if (found) {
      toast(pkg.name + " já está no carrinho.");
      return;
    }
    cart.push({ id: pkg.id, name: pkg.name, price: pkg.price, qty: 1 });
    saveCart(cart);
    toast(pkg.name + " adicionado ao carrinho.");
  }

  function removeFromCart(id) {
    saveCart(getCart().filter(function (i) { return i.id !== id; }));
    toast("Item removido.");
  }

  function cartTotal() {
    return getCart().reduce(function (s, i) { return s + i.price * i.qty; }, 0);
  }

  function updateCartBadge() {
    var n = getCart().reduce(function (s, i) { return s + i.qty; }, 0);
    qsa("[data-cart-count]").forEach(function (el) { el.textContent = String(n); });
  }

  function renderCart() {
    var body = qs("[data-cart-body]");
    var total = qs("[data-cart-total]");
    if (!body) { return; }
    var cart = getCart();
    if (!cart.length) {
      body.innerHTML = "<p class='empty'>O carrinho está vazio. Explore os pacotes.</p>";
    } else {
      body.innerHTML = cart.map(function (i) {
        return "<div class='cart-item'><div><strong>" + i.name + "</strong><br><small>" + i.qty + " × " + formatMt(i.price) + "</small></div>" +
          "<button class='btn btn-danger btn-sm' data-remove-cart='" + i.id + "' type='button'>Retirar</button></div>";
      }).join("");
    }
    if (total) { total.textContent = formatMt(cartTotal()); }
  }

  var toastTimer = null;

  function toast(msg) {
    var el = qs("#toast");
    if (!el) {
      el = document.createElement("div");
      el.id = "toast";
      el.className = "toast";
      el.setAttribute("role", "status");
      el.setAttribute("aria-live", "polite");
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add("show");
    if (toastTimer) { clearTimeout(toastTimer); }
    toastTimer = setTimeout(function () {
      el.classList.remove("show");
      toastTimer = null;
    }, 2200);
  }

  function currentFile() {
    var path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    return path || "index.html";
  }

  function renderNav() {
    var nav = qs(".nav-main");
    var data = global.TMCEL_DATA;
    if (!nav || !data || !data.menu) { return; }
    var file = currentFile();
    var hash = (location.hash || "").replace("#", "");
    var html = "<a href='index.html'" + (file === "index.html" ? " aria-current='page'" : "") + ">Início</a>";
    data.menu.forEach(function (item) {
      var hrefFile = item.href.split("?")[0].split("#")[0];
      var hrefHash = item.href.split("#")[1] || "";
      var hasMega = item.columns && item.columns.length;
      var active = false;
      if (!hasMega) {
        active = file === hrefFile;
      } else if (hrefHash) {
        active = file === hrefFile && hash === hrefHash;
      }
      if (!hasMega) {
        html += "<a href='" + item.href + "'" + (active ? " aria-current='page'" : "") + ">" + item.label + "</a>";
        return;
      }
      html += "<div class='nav-item has-mega'>";
      html += "<a class='mega-parent' href='" + item.href + "'" + (active ? " aria-current='page'" : "") + ">" + item.label + "</a>";
      html += "<button class='mega-toggle' type='button' aria-expanded='false' aria-label='Abrir " + item.label + "'></button>";
      html += "<div class='mega' role='region' aria-label='" + item.label + "'>";
      item.columns.forEach(function (col) {
        html += "<div class='mega-col'><h4>" + col.title + "</h4><ul>";
        col.items.forEach(function (link) {
          html += "<li><a href='" + link.href + "'>" + link.label + "</a></li>";
        });
        html += "</ul></div>";
      });
      html += "</div></div>";
    });
    nav.innerHTML = html;

    function isCompactNav() {
      return window.matchMedia("(max-width: 760px)").matches;
    }
    function closeMegas(except) {
      qsa(".nav-item.has-mega", nav).forEach(function (el) {
        if (el === except) { return; }
        el.classList.remove("open");
        var b = el.querySelector(".mega-toggle");
        if (b) { b.setAttribute("aria-expanded", "false"); }
      });
    }
    function toggleMega(wrap) {
      var willOpen = !wrap.classList.contains("open");
      closeMegas(wrap);
      wrap.classList.toggle("open", willOpen);
      var btn = wrap.querySelector(".mega-toggle");
      if (btn) { btn.setAttribute("aria-expanded", willOpen ? "true" : "false"); }
    }
    qsa(".mega-toggle", nav).forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        toggleMega(btn.parentElement);
      });
    });
    qsa(".mega-parent", nav).forEach(function (link) {
      link.addEventListener("click", function (e) {
        if (!isCompactNav()) { return; }
        e.preventDefault();
        toggleMega(link.parentElement);
      });
    });
    qsa(".nav-item.has-mega", nav).forEach(function (item) {
      item.addEventListener("mouseenter", function () {
        if (isCompactNav()) { return; }
        closeMegas(item);
      });
    });
    document.addEventListener("click", function (e) {
      if (!nav.contains(e.target)) { closeMegas(null); }
    });
  }

  /* ---------- Busca global (filtro linear + índice por nome) ---------- */
  function searchAll(term) {
    var q = (term || "").toLowerCase().trim();
    if (!q) { return []; }
    var data = global.TMCEL_DATA;
    var hits = [];
    if (data.products) {
      data.products.forEach(function (p) {
        if ((p.name + " " + p.group + " " + (p.summary || "")).toLowerCase().indexOf(q) !== -1) {
          hits.push({ title: p.name, meta: p.group, href: "produto.html?id=" + p.id });
        }
      });
    }
    data.packages.forEach(function (p) {
      if ((p.name + " " + p.category).toLowerCase().indexOf(q) !== -1) {
        hits.push({ title: p.name, meta: p.category + " · " + formatMt(p.price), href: "pacotes.html?q=" + encodeURIComponent(q) });
      }
    });
    data.stores.forEach(function (s) {
      if ((s.name + " " + s.city + " " + s.province).toLowerCase().indexOf(q) !== -1) {
        hits.push({ title: s.name, meta: s.city + ", " + s.province, href: "lojas.html?q=" + encodeURIComponent(q) });
      }
    });
    data.news.forEach(function (n) {
      if ((n.title + " " + n.excerpt).toLowerCase().indexOf(q) !== -1) {
        hits.push({ title: n.title, meta: n.date, href: "noticia.html?id=" + n.id });
      }
    });
    return hits.slice(0, 12);
  }

  function openSearch() {
    var overlay = qs("#search-overlay");
    overlay.classList.add("open");
    qs("#global-search").focus();
  }

  function closeSearch() {
    qs("#search-overlay").classList.remove("open");
  }

  /* ---------- Contactos (formulário + localStorage) ---------- */
  function saveContact(entry) {
    var list = read(CONTACT_KEY, []);
    list.unshift(entry);
    write(CONTACT_KEY, list);
  }

  function yearNow() {
    qsa("[data-year]").forEach(function (el) { el.textContent = String(new Date().getFullYear()); });
  }

  function initChrome() {
    renderNav();
    var toggle = qs("[data-nav-toggle]");
    var nav = qs(".nav-main");
    if (toggle && nav) {
      toggle.addEventListener("click", function (e) {
        e.stopPropagation();
        var open = nav.classList.toggle("open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
        document.body.classList.toggle("nav-open", open);
      });
      document.addEventListener("click", function (e) {
        if (!nav.classList.contains("open")) { return; }
        if (nav.contains(e.target) || toggle.contains(e.target)) { return; }
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("nav-open");
      });
    }

    qsa("[data-open-cart]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        qs("#cart-drawer").classList.add("open");
        qs("#backdrop").classList.add("open");
        document.body.classList.add("cart-open");
      });
    });
    qsa("[data-close-cart], #backdrop").forEach(function (btn) {
      btn.addEventListener("click", function () {
        qs("#cart-drawer").classList.remove("open");
        if (!document.body.classList.contains("checkout-open")) {
          qs("#backdrop").classList.remove("open");
        }
        document.body.classList.remove("cart-open");
      });
    });

    document.addEventListener("click", function (e) {
      var t = e.target.closest("[data-remove-cart]");
      if (t) { removeFromCart(t.getAttribute("data-remove-cart")); }
    });

    qsa("[data-open-search]").forEach(function (b) { b.addEventListener("click", openSearch); });
    var overlay = qs("#search-overlay");
    if (overlay) {
      overlay.addEventListener("click", function (e) {
        if (e.target === overlay) { closeSearch(); }
      });
      qs("#global-search").addEventListener("input", function () {
        var hits = searchAll(this.value);
        var box = qs("#search-hits");
        if (!hits.length) {
          box.innerHTML = this.value ? "<p class='muted'>Sem resultados.</p>" : "";
          return;
        }
        box.innerHTML = hits.map(function (h) {
          return "<a href='" + h.href + "'><strong>" + h.title + "</strong><br><small>" + h.meta + "</small></a>";
        }).join("");
      });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") { closeSearch(); }
        if ((e.ctrlKey || e.metaKey) && e.key === "k") { e.preventDefault(); openSearch(); }
      });
    }

    updateCartBadge();
    renderCart();
    yearNow();
  }

  global.TMCEL = {
    qs: qs,
    qsa: qsa,
    formatMt: formatMt,
    formatMb: formatMb,
    addToCart: addToCart,
    removeFromCart: removeFromCart,
    getCart: getCart,
    saveCart: saveCart,
    updateCartBadge: updateCartBadge,
    renderCart: renderCart,
    toast: toast,
    saveContact: saveContact,
    read: read,
    write: write,
    searchAll: searchAll,
    initChrome: initChrome
  };

  document.addEventListener("DOMContentLoaded", initChrome);
})(window);
