// Simple in-page nav: highlights current section and supports a mobile toggle
(function(){
  const navToggle = document.getElementById('navToggle');
  const siteNav = document.getElementById('siteNav');
  const links = [...document.querySelectorAll('.nav-link')];

  // Toggle mobile nav
  navToggle?.addEventListener('click', () => {
    const open = document.body.classList.toggle('nav-open');
    navToggle.setAttribute('aria-expanded', String(open));
  });

  // Close nav when navigating
  links.forEach(link => link.addEventListener('click', () => {
    document.body.classList.remove('nav-open');
    navToggle?.setAttribute('aria-expanded', 'false');
  }));

  // Observe sections for aria-current
  const sections = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const id = '#'+entry.target.id;
        links.forEach(a => a.setAttribute('aria-current', a.getAttribute('href')===id ? 'page' : null));
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px', threshold: 0.01 });
  sections.forEach(s => io.observe(s));

})();