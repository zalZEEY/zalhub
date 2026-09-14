/* LinkHub — main.js */
(function () {
  'use strict';

  /* ── 1. Terapkan warna glow per tombol dari data-color ── */
  document.querySelectorAll('.btn[data-color]').forEach(function (btn) {
    var hex = btn.dataset.color;
    var r = parseInt(hex.slice(1,3), 16);
    var g = parseInt(hex.slice(3,5), 16);
    var b = parseInt(hex.slice(5,7), 16);
    btn.style.setProperty('--glow', 'rgba(' + r + ',' + g + ',' + b + ',0.30)');
  });

  /* ── 2. Dropdown TikTok ── */
  document.querySelectorAll('.btn-dropdown').forEach(function (wrapper) {
    var trigger = wrapper.querySelector('.btn--trigger');
    var menu    = wrapper.querySelector('.dropdown-menu');
    if (!trigger || !menu) return;

    // Bungkus isi menu dalam div untuk animasi grid
    var inner = document.createElement('div');
    while (menu.firstChild) inner.appendChild(menu.firstChild);
    menu.appendChild(inner);

    function open() {
      menu.classList.add('open');
      trigger.setAttribute('aria-expanded', 'true');
    }

    function close() {
      menu.classList.remove('open');
      trigger.setAttribute('aria-expanded', 'false');
    }

    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      // Ripple
      var rect = trigger.getBoundingClientRect();
      var size = Math.max(rect.width, rect.height);
      var x    = e.clientX - rect.left - size / 2;
      var y    = e.clientY - rect.top  - size / 2;
      var rEl  = document.createElement('span');
      rEl.className = 'ripple';
      rEl.style.cssText = 'width:' + size + 'px;height:' + size + 'px;left:' + x + 'px;top:' + y + 'px;';
      trigger.querySelectorAll('.ripple').forEach(function (old) { old.remove(); });
      trigger.appendChild(rEl);
      rEl.addEventListener('animationend', function () { rEl.remove(); });
      menu.classList.contains('open') ? close() : open();
    });

    // Tutup saat klik di luar
    document.addEventListener('click', function () { close(); });
    wrapper.addEventListener('click', function (e) { e.stopPropagation(); });

    // Tutup saat item dipilih
    menu.querySelectorAll('.dropdown-item').forEach(function (item) {
      item.addEventListener('click', function () { close(); });
    });

    // Keyboard: Escape menutup
    wrapper.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { close(); trigger.focus(); }
    });
  });

  /* ── 3. Ripple effect untuk tombol link biasa ── */
  document.querySelectorAll('.btn:not(.btn--trigger)').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      var rect = btn.getBoundingClientRect();
      var size = Math.max(rect.width, rect.height);
      var x    = e.clientX - rect.left - size / 2;
      var y    = e.clientY - rect.top  - size / 2;
      var r    = document.createElement('span');
      r.className = 'ripple';
      r.style.cssText = 'width:' + size + 'px;height:' + size + 'px;left:' + x + 'px;top:' + y + 'px;';
      btn.querySelectorAll('.ripple').forEach(function (old) { old.remove(); });
      btn.appendChild(r);
      r.addEventListener('animationend', function () { r.remove(); });
    });
  });

  /* ── 4. Stagger masuk tiap item (.btn dan .btn-dropdown) ── */
  var allItems = document.querySelectorAll('.links > .btn, .links > .btn-dropdown');
  allItems.forEach(function (el, i) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(14px)';
    setTimeout(function () {
      el.style.transition = 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.22,1,0.36,1)';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 150 + i * 80);
  });

  /* ── 5. Modal Donasi ── */
  var donateBtn   = document.getElementById('donateBtn');
  var donateModal = document.getElementById('donateModal');
  var modalClose  = document.getElementById('modalClose');

  function openModal() {
    donateModal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    // reset zoom setiap kali modal dibuka
    setZoom(1);
  }

  function closeModal() {
    donateModal.setAttribute('hidden', '');
    document.body.style.overflow = '';
    donateBtn.focus();
  }

  if (donateBtn && donateModal && modalClose) {
    donateBtn.addEventListener('click', function (e) {
      var rect = donateBtn.getBoundingClientRect();
      var size = Math.max(rect.width, rect.height);
      var x    = e.clientX - rect.left - size / 2;
      var y    = e.clientY - rect.top  - size / 2;
      var r    = document.createElement('span');
      r.className = 'ripple';
      r.style.cssText = 'width:' + size + 'px;height:' + size + 'px;left:' + x + 'px;top:' + y + 'px;';
      donateBtn.querySelectorAll('.ripple').forEach(function (old) { old.remove(); });
      donateBtn.appendChild(r);
      r.addEventListener('animationend', function () { r.remove(); });
      openModal();
    });

    modalClose.addEventListener('click', closeModal);
    donateModal.addEventListener('click', function (e) {
      if (e.target === donateModal) closeModal();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !donateModal.hasAttribute('hidden')) closeModal();
    });
  }

  /* ── 6. Zoom QR Code ── */
  var qrImg      = document.getElementById('qrImg');
  var qrContainer = document.getElementById('qrContainer');
  var zoomInBtn  = document.getElementById('zoomIn');
  var zoomOutBtn = document.getElementById('zoomOut');
  var zoomLabel  = document.getElementById('zoomLabel');

  var ZOOM_STEP = 0.25;
  var ZOOM_MIN  = 1;
  var ZOOM_MAX  = 4;
  var currentZoom = 1;

  function setZoom(val) {
    currentZoom = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, val));
    // bulatkan ke 2 desimal
    currentZoom = Math.round(currentZoom * 100) / 100;

    qrImg.style.transform = 'scale(' + currentZoom + ')';
    // atur ukuran kontainer agar scrollable saat zoom > 1
    qrImg.style.transformOrigin = 'top left';

    var pct = Math.round(currentZoom * 100);
    zoomLabel.textContent = pct + '%';
    zoomInBtn.disabled  = currentZoom >= ZOOM_MAX;
    zoomOutBtn.disabled = currentZoom <= ZOOM_MIN;

    // sesuaikan tinggi wrapper agar gambar tidak terpotong
    var base = qrContainer.offsetWidth - 20; // dikurangi padding
    qrContainer.style.height = Math.round(base * currentZoom + 20) + 'px';
  }

  if (zoomInBtn && zoomOutBtn && qrImg) {
    zoomInBtn.addEventListener('click',  function () { setZoom(currentZoom + ZOOM_STEP); });
    zoomOutBtn.addEventListener('click', function () { setZoom(currentZoom - ZOOM_STEP); });

    /* Scroll wheel zoom */
    qrContainer.addEventListener('wheel', function (e) {
      if (!donateModal || donateModal.hasAttribute('hidden')) return;
      e.preventDefault();
      var delta = e.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP;
      setZoom(currentZoom + delta);
    }, { passive: false });

    /* Pinch-to-zoom (mobile) */
    var lastDist = null;
    var zoomAtPinchStart = 1;

    qrContainer.addEventListener('touchstart', function (e) {
      if (e.touches.length === 2) {
        lastDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        zoomAtPinchStart = currentZoom;
      }
    }, { passive: true });

    qrContainer.addEventListener('touchmove', function (e) {
      if (e.touches.length === 2 && lastDist !== null) {
        e.preventDefault();
        var dist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        var ratio = dist / lastDist;
        setZoom(zoomAtPinchStart * ratio);
      }
    }, { passive: false });

    qrContainer.addEventListener('touchend', function () {
      lastDist = null;
    });
  }

})();
