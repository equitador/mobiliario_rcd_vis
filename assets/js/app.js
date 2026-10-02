// Interacciones de la landing: header al hacer scroll, menú móvil y reveal on-scroll.
(function () {
  var header = document.getElementById('site-header');
  var brandIcon = document.getElementById('brand-icon');
  var brandText = document.getElementById('brand-text');
  var menuOpen = document.getElementById('menu-open');
  var menuClose = document.getElementById('menu-close');
  var mobileMenu = document.getElementById('mobile-menu');
  var navLinks = document.querySelectorAll('.nav-link');

  var HEADER_TOP = 'fixed top-0 left-0 w-full z-40 transition-all duration-300 bg-transparent py-5';
  var HEADER_SCROLLED = 'fixed top-0 left-0 w-full z-40 transition-all duration-300 bg-background-50/95 backdrop-blur-sm border-b border-background-200 py-3';
  var NAV_TOP = 'text-background-100 hover:text-background-50 hover:bg-white/10';
  var NAV_SCROLLED = 'text-foreground-700 hover:text-primary-600 hover:bg-background-100';

  function swapClasses(el, removeList, addList) {
    removeList.forEach(function (c) { el.classList.remove(c); });
    addList.forEach(function (c) { el.classList.add(c); });
  }

  function onScroll() {
    var scrolled = window.scrollY > 60;
    header.className = scrolled ? HEADER_SCROLLED : HEADER_TOP;
    swapClasses(
      brandIcon,
      scrolled ? ['bg-background-50/90', 'text-primary-600'] : ['bg-primary-500', 'text-background-50'],
      scrolled ? ['bg-primary-500', 'text-background-50'] : ['bg-background-50/90', 'text-primary-600']
    );
    swapClasses(
      brandText,
      scrolled ? ['text-background-50'] : ['text-foreground-950'],
      scrolled ? ['text-foreground-950'] : ['text-background-50']
    );
    swapClasses(
      menuOpen,
      scrolled ? ['text-background-50'] : ['text-foreground-950'],
      scrolled ? ['text-foreground-950'] : ['text-background-50']
    );
    navLinks.forEach(function (link) {
      swapClasses(
        link,
        (scrolled ? NAV_TOP : NAV_SCROLLED).split(' '),
        (scrolled ? NAV_SCROLLED : NAV_TOP).split(' ')
      );
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Menú móvil a pantalla completa
  function openMenu() { mobileMenu.classList.remove('hidden'); }
  function closeMenu() { mobileMenu.classList.add('hidden'); }
  menuOpen.addEventListener('click', openMenu);
  menuClose.addEventListener('click', closeMenu);
  document.querySelectorAll('.mobile-link').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // Reveal on-scroll: aparece al entrar en viewport (una sola vez)
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.remove('opacity-0', 'translate-y-8');
      entry.target.classList.add('opacity-100', 'translate-y-0');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal').forEach(function (el) {
    revealObserver.observe(el);
  });
})();
