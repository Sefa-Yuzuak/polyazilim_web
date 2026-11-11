(() => {
  'use strict';
  document.documentElement.classList.add('is-enhanced');
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('navigation');
  function closeMenu() {
    if (!toggle || !nav) return;
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Menüyü aç');
  }
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Menüyü kapat' : 'Menüyü aç');
    });
    nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && nav.classList.contains('is-open')) { closeMenu(); toggle.focus(); }
    });
    window.matchMedia('(min-width: 801px)').addEventListener('change', closeMenu);
  }
  const filters = document.querySelectorAll('[data-filter]');
  const cards = document.querySelectorAll('.filter-grid [data-category]');
  const status = document.querySelector('.filter-status');
  filters.forEach(button => button.addEventListener('click', () => {
    const selected = button.dataset.filter;
    filters.forEach(filter => { const active = filter === button; filter.classList.toggle('active', active); filter.setAttribute('aria-pressed', String(active)); });
    let visible = 0;
    cards.forEach(card => { card.hidden = selected !== 'all' && card.dataset.category !== selected; if (!card.hidden) visible++; });
    if (status) status.textContent = `${visible} proje gösteriliyor.`;
  }));
})();
