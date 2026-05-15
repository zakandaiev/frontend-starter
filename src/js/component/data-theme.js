import themeStore from '@/js/util/theme';

themeStore.init();

document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', (event) => {
    const themeSwitcher = event.target.closest('[data-theme-set]');
    const themeToggler = event.target.closest('[data-theme-toggle]');

    if (!themeSwitcher && !themeToggler) {
      return false;
    }

    event.preventDefault();

    if (themeSwitcher) {
      const theme = themeSwitcher.getAttribute('data-theme-set');
      themeStore.setTheme(theme);
    } else if (themeToggler) {
      themeStore.toggleTheme();
    }
  });
});
