// General setup
(function(){
  // Year in footer
  const y = document.getElementById('year');
  if(y) y.textContent = new Date().getFullYear();

  // Theme toggle
  const themeBtn = document.getElementById('themeToggle');
  const LS_KEY = 'gm-theme';
  const setTheme = (mode) => {
    document.documentElement.dataset.theme = mode;
    themeBtn?.setAttribute('aria-pressed', String(mode==='dark'));
  };
  const saved = localStorage.getItem(LS_KEY);
  if(saved){ setTheme(saved); }
  themeBtn?.addEventListener('click', () => {
    const next = (document.documentElement.dataset.theme === 'dark') ? 'light' : 'dark';
    setTheme(next); localStorage.setItem(LS_KEY, next);
  });
})();