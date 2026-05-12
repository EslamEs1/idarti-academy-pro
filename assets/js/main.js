(function () {
  'use strict';

  /* ── Sidebar drawer ─────────────────────────────────────────────── */
  var sidebar  = document.getElementById('app-sidebar');
  var backdrop = document.getElementById('app-backdrop') || document.querySelector('[data-sidebar-backdrop]');
  var burgers  = document.querySelectorAll('[data-sidebar-open]');
  var closes   = document.querySelectorAll('[data-sidebar-close]');

  function setSidebar(open) {
    if (!sidebar) return;
    sidebar.classList.toggle('is-open', open);
    if (backdrop) backdrop.classList.toggle('hidden', !open);
    document.body.classList.toggle('overflow-hidden', open);
    burgers.forEach(function (b) { b.setAttribute('aria-expanded', String(open)); });
  }

  burgers.forEach(function (b) { b.addEventListener('click', function () { setSidebar(true); }); });
  closes.forEach(function (c)  { c.addEventListener('click', function () { setSidebar(false); }); });
  if (backdrop) backdrop.addEventListener('click', function () { setSidebar(false); });
  window.addEventListener('resize', function () { if (window.innerWidth >= 1024) setSidebar(false); });

  /* ── Dropdowns ──────────────────────────────────────────────────── */
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-dropdown-toggle]');
    if (btn) {
      var menu = document.getElementById(btn.getAttribute('data-dropdown-toggle'));
      if (menu) menu.classList.toggle('hidden');
      return;
    }
    document.querySelectorAll('[data-dropdown]').forEach(function (m) { m.classList.add('hidden'); });
  });

  /* ── Modals ─────────────────────────────────────────────────────── */
  document.addEventListener('click', function (e) {
    var open  = e.target.closest('[data-modal-open]');
    var close = e.target.closest('[data-modal-close]');
    if (open) {
      var m = document.getElementById(open.getAttribute('data-modal-open'));
      if (m) m.classList.remove('hidden');
    } else if (close) {
      var d = close.closest('[role="dialog"]');
      if (d) d.classList.add('hidden');
    }
  });

  /* ── Tabs ───────────────────────────────────────────────────────── */
  document.querySelectorAll('[role="tablist"]').forEach(function (list) {
    list.addEventListener('click', function (e) {
      var tab = e.target.closest('[role="tab"]');
      if (!tab) return;
      list.querySelectorAll('[role="tab"]').forEach(function (t) {
        t.setAttribute('aria-selected', 'false');
        t.classList.remove('is-active');
      });
      tab.setAttribute('aria-selected', 'true');
      tab.classList.add('is-active');
      var panelId = tab.getAttribute('aria-controls');
      if (!panelId) return;
      var panel = document.getElementById(panelId);
      if (!panel) return;
      var wrap = panel.closest('[data-tabpanels]');
      if (wrap) wrap.querySelectorAll('[role="tabpanel"]').forEach(function (p) { p.classList.add('hidden'); });
      panel.classList.remove('hidden');
    });
  });

})();
