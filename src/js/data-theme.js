const DATA_THEME = {
	body_attribute_key: 'data-theme',
	storage_key: 'data-theme',
	value_default: 'light',
  value_dark: 'dark',

  getTheme: () => localStorage.getItem(DATA_THEME.storage_key) || document.documentElement.getAttribute(DATA_THEME.body_attribute_key),

  setTheme: (theme = null, storage = true) => {
    if (theme !== DATA_THEME.value_default && theme !== DATA_THEME.value_dark) {
      theme = DATA_THEME.value_default;
    }

    document.documentElement.setAttribute(DATA_THEME.body_attribute_key, theme);

    if (storage) {
      localStorage.setItem(DATA_THEME.storage_key, theme);
    }

    return true;
  },

  toggleTheme: () => {
    let theme = DATA_THEME.getTheme();

    if (theme === DATA_THEME.value_default) {
      theme = DATA_THEME.value_dark;
    }
    else {
      theme = DATA_THEME.value_default;
    }

    DATA_THEME.setTheme(theme);

    return true;
  }
};

const initial_theme = DATA_THEME.getTheme();
if (initial_theme) {
  DATA_THEME.setTheme(initial_theme);
}
else {
  let theme = DATA_THEME.value_default;

  if (window.matchMedia) {
    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? DATA_THEME.value_dark : DATA_THEME.value_default;

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
      const t = event.matches ? DATA_THEME.value_dark : DATA_THEME.value_default;
      DATA_THEME.setTheme(t, false);
    });
  }

  DATA_THEME.setTheme(theme, false);
}

document.addEventListener('click', event => {
  const theme_switcher = event.target.closest('[data-theme-set]');
  const theme_toggler = event.target.closest('[data-theme-toggle]');

	if(!theme_switcher && !theme_toggler) {
		return false;
	}

	event.preventDefault();

  const theme = theme_switcher.getAttribute('data-theme-set');

  if (theme_switcher) {
    DATA_THEME.setTheme(theme);
  }
  else if (theme_toggler) {
    DATA_THEME.toggleTheme();
  }
});
