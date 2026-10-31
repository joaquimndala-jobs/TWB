/**
 * Conta visitante (OTP) e pagamento M-Cash.
 * Simulação académica: o OTP é mostrado no ecrã (não há SMS real).
 * PIN de demonstração: 1234. Saldo e histórico ficam no localStorage.
 */
(function (global) {
  "use strict";

  var T = global.TMCEL;
  var SESSION_KEY = "tmcel_session_v1";
  var USERS_KEY = "tmcel_users_v1";
  var OTP_KEY = "tmcel_otp_v1";
  var FAV_KEY = "tmcel_favorites_v1";
  var DEMO_PIN = "1234";
  var DEMO_BALANCE = 2500;

  function users() { return T.read(USERS_KEY, {}); }
  function saveUsers(map) { T.write(USERS_KEY, map); }

  function digits(n) {
    return String(n || "").replace(/\D/g, "");
  }

  function normalizeMsisdn(raw) {
    var d = digits(raw);
    if (d.indexOf("258") === 0) { d = d.slice(3); }
    if (d.length === 9 && (d.indexOf("82") === 0 || d.indexOf("83") === 0 || d.indexOf("84") === 0 || d.indexOf("85") === 0 || d.indexOf("86") === 0 || d.indexOf("87") === 0)) {
      return d;
    }
    return "";
  }

  function formatMsisdn(d) {
    d = digits(d);
    if (d.length !== 9) { return d; }
    return d.slice(0, 2) + " " + d.slice(2, 5) + " " + d.slice(5);
  }

  function seedDemo() {
    var map = users();
    if (map["821234567"]) { return; }
    map["821234567"] = {
      msisdn: "821234567",
      name: "Ana Muthemba",
      city: "Maputo",
      status: "Activo",
      plan: "Pré-pago",
      pin: DEMO_PIN,
      balance: DEMO_BALANCE,
      dataMb: 2150,
      voiceMin: 40,
      created: "2024-03-12",
      payments: [
        { id: "p-demo-1", at: "2026-10-20 14:12", items: "Netgiro Diário 2.1 GB", total: 50, to: "821234567", method: "M-Cash" }
      ]
    };
    saveUsers(map);
  }

  function ensureUser(msisdn) {
    var map = users();
    if (!map[msisdn]) {
      map[msisdn] = {
        msisdn: msisdn,
        name: "Cliente Tmcel",
        city: "Moçambique",
        status: "Activo",
        plan: "Pré-pago",
        pin: DEMO_PIN,
        balance: 1500,
        dataMb: 0,
        voiceMin: 0,
        created: new Date().toISOString().slice(0, 10),
        payments: []
      };
      saveUsers(map);
    }
    return map[msisdn];
  }

  function getSession() {
    return T.read(SESSION_KEY, null);
  }

  function currentUser() {
    var s = getSession();
    if (!s || !s.msisdn) { return null; }
    return users()[s.msisdn] || null;
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY);
    T.toast("Sessão encerrada.");
    renderAccountChrome();
    if (T.qs("#account-app")) { drawAccountPage(); }
  }

  function requestOtp(raw) {
    var msisdn = normalizeMsisdn(raw);
    if (!msisdn) {
      return { ok: false, error: "Indique um número Tmcel válido (82/83/84… 9 dígitos)." };
    }
    var code = String(100000 + Math.floor(Math.random() * 900000));
    T.write(OTP_KEY, { msisdn: msisdn, code: code, exp: Date.now() + 5 * 60 * 1000 });
    return { ok: true, msisdn: msisdn, code: code };
  }

  function verifyOtp(raw, code) {
    var msisdn = normalizeMsisdn(raw);
    var pending = T.read(OTP_KEY, null);
    if (!pending || pending.msisdn !== msisdn) {
      return { ok: false, error: "Peça primeiro um código OTP." };
    }
    if (Date.now() > pending.exp) {
      return { ok: false, error: "O código expirou. Peça um novo." };
    }
    if (String(code).trim() !== String(pending.code)) {
      return { ok: false, error: "Código incorrecto." };
    }
    ensureUser(msisdn);
    T.write(SESSION_KEY, { msisdn: msisdn, at: Date.now() });
    localStorage.removeItem(OTP_KEY);
    return { ok: true, user: currentUser() };
  }

  function getFavorites() {
    var u = currentUser();
    if (!u) { return T.read(FAV_KEY + "_guest", []); }
    var all = T.read(FAV_KEY, {});
    return all[u.msisdn] || [];
  }

  function toggleFavorite(id) {
    var u = currentUser();
    var keyUser = u ? u.msisdn : "guest";
    var all = u ? T.read(FAV_KEY, {}) : null;
    var list = u ? (all[keyUser] || []) : T.read(FAV_KEY + "_guest", []);
    var i = list.indexOf(id);
    if (i >= 0) { list.splice(i, 1); } else { list.push(id); }
    if (u) {
      all[keyUser] = list;
      T.write(FAV_KEY, all);
    } else {
      T.write(FAV_KEY + "_guest", list);
    }
    return list.indexOf(id) !== -1;
  }

  function isFavorite(id) {
    return getFavorites().indexOf(id) !== -1;
  }

  function payMcash(opts) {
    var user = currentUser();
    if (!user) { return { ok: false, error: "Inicie sessão na Conta para pagar com M-Cash." }; }
    var pin = String(opts.pin || "").trim();
    if (pin !== String(user.pin)) { return { ok: false, error: "PIN M-Cash incorrecto." }; }
    var items = opts.items || T.getCart();
    if (!items.length) { return { ok: false, error: "O carrinho está vazio." }; }
    var total = items.reduce(function (s, i) { return s + Number(i.price) * (i.qty || 1); }, 0);
    if (user.balance < total) {
      return { ok: false, error: "Saldo M-Cash insuficiente (" + T.formatMt(user.balance) + ")." };
    }
    var dest = user.msisdn;
    if (opts.gift) {
      dest = normalizeMsisdn(opts.giftNumber);
      if (!dest) { return { ok: false, error: "Número de destino inválido." }; }
    }
    user.balance = Math.round((user.balance - total) * 100) / 100;
    user.payments = user.payments || [];
    user.payments.unshift({
      id: "p-" + Date.now(),
      at: new Date().toLocaleString("pt-MZ"),
      items: items.map(function (i) { return i.name + " ×" + (i.qty || 1); }).join(", "),
      total: total,
      to: dest,
      method: "M-Cash"
    });
    var extraData = items.reduce(function (s, i) { return s + (i.volumeMb || 0) * (i.qty || 1); }, 0);
    if (!opts.gift) { user.dataMb = (user.dataMb || 0) + extraData; }
    var map = users();
    map[user.msisdn] = user;
    saveUsers(map);
    if (opts.fromCart) {
      T.write("tmcel_cart_v1", []);
    } else {
      var bought = {};
      items.forEach(function (i) { bought[i.id] = true; });
      T.write("tmcel_cart_v1", T.getCart().filter(function (i) { return !bought[i.id]; }));
    }
    T.updateCartBadge();
    T.renderCart();
    return { ok: true, user: user, total: total, to: dest };
  }

  function renderAccountChrome() {
    var tools = T.qs(".header-tools");
    if (!tools) { return; }
    var existing = T.qs("[data-account-link]");
    var user = currentUser();
    var label = user ? formatMsisdn(user.msisdn) : "Conta";
    if (existing) {
      existing.textContent = label;
      existing.setAttribute("href", "conta.html");
      return;
    }
    var a = document.createElement("a");
    a.className = "icon-btn account-chip";
    a.href = "conta.html";
    a.setAttribute("data-account-link", "1");
    a.setAttribute("aria-label", "Conta Tmcel");
    a.textContent = label;
    tools.appendChild(a);
  }

  function injectWhatsApp() {
    if (T.qs(".wa-float")) { return; }
    var a = document.createElement("a");
    a.className = "wa-float";
    a.href = "https://wa.me/258821001000";
    a.target = "_blank";
    a.rel = "noopener";
    a.setAttribute("aria-label", "WhatsApp Tmcel 82 100 1000");
    a.innerHTML = "<span class='wa-icon' aria-hidden='true'></span><span>WhatsApp</span>";
    document.body.appendChild(a);
  }

  function injectIcons() {
    var search = T.qs("[data-open-search]");
    if (search && !search.querySelector("svg")) {
      search.innerHTML = "<svg viewBox='0 0 24 24' width='18' height='18' aria-hidden='true'><circle cx='11' cy='11' r='7' fill='none' stroke='currentColor' stroke-width='2'/><path d='M20 20l-3.5-3.5' stroke='currentColor' stroke-width='2' fill='none' stroke-linecap='round'/></svg>";
    }
    T.qsa("[data-open-cart]").forEach(function (btn) {
      if (btn.getAttribute("data-iconed")) { return; }
      btn.setAttribute("data-iconed", "1");
      var badge = btn.querySelector("[data-cart-count]");
      var n = badge ? badge.textContent : "0";
      btn.innerHTML = "<svg viewBox='0 0 24 24' width='18' height='18' aria-hidden='true'><path d='M6 6h15l-1.5 9h-12z' fill='none' stroke='currentColor' stroke-width='2' stroke-linejoin='round'/><circle cx='9' cy='20' r='1.6' fill='currentColor'/><circle cx='18' cy='20' r='1.6' fill='currentColor'/><path d='M6 6L5 3H2' stroke='currentColor' stroke-width='2' fill='none' stroke-linecap='round'/></svg><span class='badge' data-cart-count>" + n + "</span>";
    });
  }

  function injectCheckout() {
    if (T.qs("#checkout-modal")) { return; }
    var wrap = document.createElement("div");
    wrap.id = "checkout-modal";
    wrap.className = "modal";
    wrap.setAttribute("role", "dialog");
    wrap.setAttribute("aria-labelledby", "checkout-title");
    wrap.innerHTML =
      "<div class='modal-card'>" +
        "<div class='modal-head'>" +
          "<img src='assets/img/mcash.svg' alt='M-Cash' class='mcash-logo'>" +
          "<button class='icon-btn' type='button' data-close-checkout aria-label='Fechar'>×</button>" +
        "</div>" +
        "<h2 id='checkout-title'>Pagar com M-Cash</h2>" +
        "<p class='muted' id='checkout-intro'>Carteira móvel Tmcel. PIN de demonstração: 1234.</p>" +
        "<div id='checkout-auth'></div>" +
        "<form id='checkout-form' hidden>" +
          "<div class='checkout-scroll'>" +
            "<div class='mcash-box'>" +
              "<label>Número M-Cash <input id='mc-msisdn' readonly></label>" +
              "<label>PIN (4 dígitos) <input id='mc-pin' type='password' inputmode='numeric' maxlength='4' required autocomplete='off'></label>" +
              "<label class='check-row'><input type='checkbox' id='mc-gift'> Comprar para outro número Tmcel</label>" +
              "<label id='mc-gift-wrap' hidden>Número de destino <input id='mc-gift-number' placeholder='82 XXX XXXX' inputmode='tel'></label>" +
            "</div>" +
            "<div id='checkout-items' class='checkout-items'></div>" +
            "<p class='price' id='checkout-total'></p>" +
          "</div>" +
          "<div class='form-actions'>" +
            "<button class='btn btn-primary' type='submit'>Confirmar pagamento</button>" +
            "<button class='btn btn-outline' type='button' data-close-checkout>Cancelar</button>" +
          "</div>" +
        "</form>" +
      "</div>";
    document.body.appendChild(wrap);

    var foot = T.qs(".drawer-foot");
    if (foot && !T.qs("[data-open-checkout]")) {
      var pay = document.createElement("button");
      pay.className = "btn btn-primary btn-sm";
      pay.type = "button";
      pay.setAttribute("data-open-checkout", "1");
      pay.textContent = "Pagar M-Cash";
      foot.appendChild(pay);
    }

    document.addEventListener("click", function (e) {
      if (e.target.closest("[data-open-checkout]")) {
        openCheckout(null);
      }
      if (e.target.closest("[data-close-checkout]") || e.target === wrap) {
        closeCheckout();
      }
    });

    var gift = T.qs("#mc-gift");
    if (gift) {
      gift.addEventListener("change", function () {
        T.qs("#mc-gift-wrap").hidden = !gift.checked;
      });
    }
    var form = T.qs("#checkout-form");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var fromCart = !wrap._items;
      var pending = wrap._items || T.getCart();
      var res = payMcash({
        pin: T.qs("#mc-pin").value,
        gift: T.qs("#mc-gift").checked,
        giftNumber: T.qs("#mc-gift-number").value,
        items: pending,
        fromCart: fromCart
      });
      if (!res.ok) { T.toast(res.error); return; }
      T.toast("Pagamento M-Cash de " + T.formatMt(res.total) + " para " + formatMsisdn(res.to) + ".");
      closeCheckout();
      T.qs("#cart-drawer").classList.remove("open");
      T.qs("#backdrop").classList.remove("open");
      document.body.classList.remove("cart-open");
      wrap._items = null;
      if (T.qs("#account-app")) { drawAccountPage(); }
    });
  }

  function openCheckout(items) {
    var list = items || T.getCart();
    if (!list.length) {
      T.toast("O carrinho está vazio. Adicione um pacote primeiro.");
      return;
    }
    var modal = T.qs("#checkout-modal");
    modal._items = items || null;
    var drawer = T.qs("#cart-drawer");
    if (drawer) { drawer.classList.remove("open"); }
    modal.classList.add("open");
    document.body.classList.add("checkout-open");
    T.qs("#backdrop").classList.add("open");
    var user = currentUser();
    var auth = T.qs("#checkout-auth");
    var form = T.qs("#checkout-form");
    if (!user) {
      form.hidden = true;
      auth.innerHTML = "<p>Inicie sessão com o número do cartão e o código OTP para pagar.</p>" +
        "<a class='btn btn-primary' href='conta.html'>Entrar na Conta</a>";
      return;
    }
    auth.innerHTML = "";
    form.hidden = false;
    T.qs("#mc-msisdn").value = formatMsisdn(user.msisdn);
    T.qs("#mc-pin").value = "";
    T.qs("#mc-gift").checked = false;
    T.qs("#mc-gift-wrap").hidden = true;
    T.qs("#checkout-items").innerHTML = list.map(function (i) {
      return "<div class='cart-item'><span>" + i.name + " ×" + (i.qty || 1) + "</span><strong>" + T.formatMt(i.price * (i.qty || 1)) + "</strong></div>";
    }).join("") || "<p class='muted'>Nenhum item.</p>";
    var total = list.reduce(function (s, i) { return s + Number(i.price) * (i.qty || 1); }, 0);
    T.qs("#checkout-total").textContent = T.formatMt(total);
    T.qs("#checkout-intro").textContent = "Saldo M-Cash: " + T.formatMt(user.balance) + " · PIN de demonstração: 1234.";
  }

  function closeCheckout() {
    var modal = T.qs("#checkout-modal");
    if (modal) { modal.classList.remove("open"); }
    document.body.classList.remove("checkout-open");
    var drawerOpen = T.qs("#cart-drawer") && T.qs("#cart-drawer").classList.contains("open");
    if (!drawerOpen) { T.qs("#backdrop").classList.remove("open"); }
  }

  function drawAccountPage() {
    var root = T.qs("#account-app");
    if (!root) { return; }
    var user = currentUser();
    if (!user) {
      root.innerHTML =
        "<section class='card account-login'>" +
          "<img src='assets/img/mcash.svg' alt='M-Cash' class='mcash-logo'>" +
          "<h2>Entrar na conta</h2>" +
          "<p>Introduza o número do cartão Tmcel. Enviamos um código OTP (simulado neste trabalho — o código aparece no ecrã).</p>" +
          "<form id='otp-request'>" +
            "<label>Número do cartão / MSISDN <input id='acc-msisdn' inputmode='tel' placeholder='82 123 4567' required></label>" +
            "<button class='btn btn-primary' type='submit'>Pedir código OTP</button>" +
          "</form>" +
          "<form id='otp-verify' hidden>" +
            "<p class='otp-banner' id='otp-banner'></p>" +
            "<label>Código OTP <input id='acc-otp' inputmode='numeric' maxlength='6' required></label>" +
            "<button class='btn btn-primary' type='submit'>Validar e entrar</button>" +
          "</form>" +
          "<p class='muted'>Demonstração: 82 123 4567 · PIN M-Cash 1234 · saldo 2 500 MT.</p>" +
        "</section>";
      T.qs("#otp-request").addEventListener("submit", function (e) {
        e.preventDefault();
        var res = requestOtp(T.qs("#acc-msisdn").value);
        if (!res.ok) { T.toast(res.error); return; }
        T.qs("#otp-verify").hidden = false;
        T.qs("#otp-banner").textContent = "Código OTP (simulação): " + res.code + " — válido 5 minutos.";
        T.toast("OTP gerado para " + formatMsisdn(res.msisdn) + ".");
      });
      T.qs("#otp-verify").addEventListener("submit", function (e) {
        e.preventDefault();
        var res = verifyOtp(T.qs("#acc-msisdn").value, T.qs("#acc-otp").value);
        if (!res.ok) { T.toast(res.error); return; }
        T.toast("Bem-vindo, " + res.user.name + ".");
        renderAccountChrome();
        drawAccountPage();
      });
      return;
    }

    var payments = user.payments || [];
    var favs = getFavorites();
    var pkgs = (global.TMCEL_DATA.packages || []).filter(function (p) { return favs.indexOf(p.id) !== -1; });
    root.innerHTML =
      "<div class='account-head'>" +
        "<div>" +
          "<p class='kicker'>Área do cliente</p>" +
          "<h2>" + user.name + "</h2>" +
          "<p class='muted'>Cartão " + formatMsisdn(user.msisdn) + " · " + user.status + " · " + user.plan + "</p>" +
        "</div>" +
        "<button class='btn btn-outline' type='button' id='acc-logout'>Sair</button>" +
      "</div>" +
      "<div class='stats account-stats'>" +
        "<div class='stat'><strong>" + T.formatMt(user.balance) + "</strong><span class='muted'>Saldo M-Cash</span></div>" +
        "<div class='stat'><strong>" + T.formatMb(user.dataMb) + "</strong><span class='muted'>Dados no cartão</span></div>" +
        "<div class='stat'><strong>" + (user.voiceMin || 0) + " min</strong><span class='muted'>Voz residual</span></div>" +
        "<div class='stat'><strong>" + user.status + "</strong><span class='muted'>Estado do cartão</span></div>" +
      "</div>" +
      "<div class='grid-2' style='margin-top:24px'>" +
        "<article class='card'>" +
          "<h3>Dados pessoais</h3>" +
          "<p>Nome: <strong>" + user.name + "</strong><br>Número: <strong>" + formatMsisdn(user.msisdn) + "</strong><br>Cidade: " + user.city + "<br>Cliente desde: " + user.created + "<br>Plano: " + user.plan + "</p>" +
        "</article>" +
        "<article class='card'>" +
          "<h3>Favoritos</h3>" +
          (pkgs.length
            ? "<ul class='plain-list'>" + pkgs.map(function (p) {
                return "<li>" + p.name + " · " + T.formatMt(p.price) + " <button class='btn btn-outline btn-sm' type='button' data-unfav='" + p.id + "'>Retirar</button></li>";
              }).join("") + "</ul>"
            : "<p class='muted'>Ainda não marcou pacotes. No catálogo use «Favorito» — isso é só seu, o catálogo oficial não muda.</p>") +
        "</article>" +
      "</div>" +
      "<article class='card' style='margin-top:24px'>" +
        "<h3>Histórico de pagamentos M-Cash</h3>" +
        (payments.length
          ? "<div class='table-wrap'><table class='data'><thead><tr><th>Data</th><th>Itens</th><th>Destino</th><th>Total</th></tr></thead><tbody>" +
            payments.map(function (p) {
              return "<tr><td>" + p.at + "</td><td>" + p.items + "</td><td>" + formatMsisdn(p.to) + "</td><td>" + T.formatMt(p.total) + "</td></tr>";
            }).join("") + "</tbody></table></div>"
          : "<p class='muted'>Ainda não há pagamentos neste dispositivo.</p>") +
      "</article>";

    T.qs("#acc-logout").addEventListener("click", logout);
    root.addEventListener("click", function (e) {
      var b = e.target.closest("[data-unfav]");
      if (!b) { return; }
      toggleFavorite(b.getAttribute("data-unfav"));
      drawAccountPage();
    });
  }

  function buyPackage(pkg) {
    openCheckout([{ id: pkg.id, name: pkg.name, price: pkg.price, qty: 1, volumeMb: pkg.volumeMb || 0 }]);
  }

  document.addEventListener("DOMContentLoaded", function () {
    if (!T) { return; }
    seedDemo();
    injectIcons();
    injectWhatsApp();
    injectCheckout();
    renderAccountChrome();
    drawAccountPage();
  });

  global.TMCEL_ACCOUNT = {
    currentUser: currentUser,
    formatMsisdn: formatMsisdn,
    toggleFavorite: toggleFavorite,
    isFavorite: isFavorite,
    buyPackage: buyPackage,
    openCheckout: openCheckout,
    requestOtp: requestOtp,
    verifyOtp: verifyOtp,
    logout: logout
  };
})(window);
