const DATA_THEME = {
  body_attribute_key: 'data-theme',
  storage_key: 'data-theme',
  value_default: 'light',
  value_dark: 'dark',

  getCurrentTheme: () => localStorage.getItem(DATA_THEME.storage_key) || document.documentElement.getAttribute(DATA_THEME.body_attribute_key),

  setTheme: (theme = null, storage = true) => {
    if (theme !== DATA_THEME.value_default && theme !== DATA_THEME.value_dark) {
      theme = DATA_THEME.value_default;
    }

    document.documentElement.setAttribute(DATA_THEME.body_attribute_key, theme);

    if (storage) {
      localStorage.setItem(DATA_THEME.storage_key, theme);
    }

    DATA_THEME.dataSrcDark();

    return true;
  },

  toggleTheme: () => {
    let theme = DATA_THEME.getCurrentTheme();

    if (theme === DATA_THEME.value_default) {
      theme = DATA_THEME.value_dark;
    } else {
      theme = DATA_THEME.value_default;
    }

    DATA_THEME.setTheme(theme);

    return true;
  },

  dataSrcDark: () => {
    const currentTheme = DATA_THEME.getCurrentTheme();

    document.querySelectorAll('[data-src-dark]').forEach((item) => {
      if (!item.srcLight) {
        item.srcLight = item.src;
      }

      const { srcLight } = item;
      const srcDark = item.srcDark || item.getAttribute('data-src-dark') || srcLight;

      item.src = DATA_THEME.value_dark === currentTheme ? srcDark : srcLight;
    });

    return true;
  },
};

const initialTheme = DATA_THEME.getCurrentTheme();
if (initialTheme) {
  DATA_THEME.setTheme(initialTheme);
} else {
  let theme = DATA_THEME.value_default;

  if (window.matchMedia) {
    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? DATA_THEME.value_dark : DATA_THEME.value_default;

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
      const t = event.matches ? DATA_THEME.value_dark : DATA_THEME.value_default;
      DATA_THEME.setTheme(t, false);
    });
  }

  DATA_THEME.setTheme(theme, false);
}

document.addEventListener('click', (event) => {
  const themeSwitcher = event.target.closest('[data-theme-set]');
  const themeToggler = event.target.closest('[data-theme-toggle]');

  if (!themeSwitcher && !themeToggler) {
    return false;
  }

  event.preventDefault();

  if (themeSwitcher) {
    const theme = themeSwitcher.getAttribute('data-theme-set');

    DATA_THEME.setTheme(theme);
  } else if (themeToggler) {
    DATA_THEME.toggleTheme();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  DATA_THEME.dataSrcDark();
});
