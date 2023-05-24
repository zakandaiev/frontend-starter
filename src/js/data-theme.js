const DATA_THEME = {
	body_attribute_key: 'data-theme',
	storage_key: 'data-theme',
	value_default: 'light',
  value_dark: 'dark'
};

function getTheme() {
  return sessionStorage.getItem(DATA_THEME.storage_key);
}

function setTheme(theme = null) {
  if (theme !== DATA_THEME.value_default && theme !== DATA_THEME.value_dark) {
    theme = DATA_THEME.value_default;
  }

  document.body.setAttribute(DATA_THEME.body_attribute_key, theme);

  sessionStorage.setItem(DATA_THEME.storage_key, theme);

  return true;
}

function toggleTheme() {
  let theme = getTheme();

  if (theme === DATA_THEME.value_default) {
    theme = DATA_THEME.value_dark;
  }
  else {
    theme = DATA_THEME.value_default;
  }

  setTheme(theme);

  return true;
}

if (!getTheme()) {
  let theme = DATA_THEME.value_default;

  if (window.matchMedia) {
    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? DATA_THEME.value_dark : DATA_THEME.value_default;

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
      const t = event.matches ? DATA_THEME.value_dark : DATA_THEME.value_default;
      setColorMode(t);
    });
  }

  setTheme(theme);
}
else {
  setTheme(getTheme());
}

document.addEventListener('click', event => {
  const theme_switcher = event.target.closest('[data-theme-set]');
  const theme_toggler = event.target.closest('[data-theme-toggle]');

	if(!theme_switcher && !theme_toggler) {
		return false;
	}

	event.preventDefault();

  if (theme_switcher) {
    setTheme(theme_switcher.getAttribute('data-theme-set'));
  }
  else if (theme_toggler) {
    toggleTheme();
  }
});
