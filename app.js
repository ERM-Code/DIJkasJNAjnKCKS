'use strict';
(function () {
  var btn = document.getElementById('menuBtn');
  var nav = document.getElementById('mainNav');
  function setMenu(open) {
    if (!nav || !btn) return;
    nav.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.setAttribute('aria-label', open ? 'Chiudi menu' : 'Apri menu');
  }
  if (btn && nav) {
    btn.addEventListener('click', function () { setMenu(!nav.classList.contains('open')); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
    nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  }
  var y = document.getElementById('year');
  if (y) { y.textContent = new Date().getFullYear(); }
  var form = document.getElementById('contact-form');
  if (form) {
    var channel = 'email';
    form.querySelectorAll('button[type="submit"]').forEach(function (b) {
      b.addEventListener('click', function () { channel = b.getAttribute('data-channel') || 'email'; });
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var nomeEl = document.getElementById('nome');
      var telEl = document.getElementById('tel');
      var msgEl = document.getElementById('msg');
      var nome = nomeEl.value.trim();
      var tel = telEl.value.trim();
      var msg = msgEl.value.trim();
      if (!nome || !msg) {
        alert('Dicci almeno il tuo nome e cosa cerchi, così ti rispondiamo.');
        if (!nome) { nomeEl.focus(); } else { msgEl.focus(); }
        return;
      }
      if (msg.length > 1000) { alert("Il messaggio è un po' lungo per email o WhatsApp: accorcialo e riprova."); return; }
      var text = 'Ciao AutoSuMisura, sono ' + nome + (tel ? ' (' + tel + ')' : '') + '. ' + msg;
      if (channel === 'wa') {
        window.open('https://wa.me/393339952900?text=' + encodeURIComponent(text), '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = 'mailto:autosumisura@libero.it?subject=' + encodeURIComponent('Richiesta da ' + nome) + '&body=' + encodeURIComponent(text);
      }
    });
  }
})();
