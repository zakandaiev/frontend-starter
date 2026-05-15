import { getStorage, setStorage } from '@/js/util/storage';

const BODY_ATTRIBUTE_KEY = 'data-theme';
const BODY_ATTRIBUTE_MODIFIER_KEY = 'data-theme-modifier';

const STORAGE_KEY = 'data-theme';
const STORAGE_TYPE = 'local';

const THEME = {
  system: { isEnabled: true },
  light: { isEnabled: true },
  dark: { isEnabled: true },
};

const MODIFIER = {
  winter: {
    isEnabled: false,
    from: { month: 12 },
    to: { month: 2 },
  },
  spring: {
    isEnabled: false,
    from: { month: 3 },
    to: { month: 5 },
  },
  summer: {
    isEnabled: false,
    from: { month: 6 },
    to: { month: 8 },
  },
  halloween: {
    isEnabled: false,
    from: { month: 10, day: 30 },
    to: { month: 11, day: 1 },
  },
  autumn: {
    isEnabled: false,
    from: { month: 9 },
    to: { month: 11 },
  },
};

function getLastDayOfMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

function normalizeDatePart(part, isEnd = false) {
  if (!part?.month) {
    return null;
  }

  const now = new Date();
  const year = now.getFullYear();

  const { month } = part;
  let { day } = part;

  if (!day) {
    if (isEnd) {
      day = getLastDayOfMonth(year, month);
    } else {
      day = 1;
    }
  }

  return {
    month,
    day,
  };
}

function isDateInRange(from, to) {
  const now = new Date();

  const fromNorm = normalizeDatePart(from, false);
  const toNorm = normalizeDatePart(to, true);

  if (!fromNorm || !toNorm) {
    return false;
  }

  const current = now.getMonth() * 100 + now.getDate();
  const start = (fromNorm.month - 1) * 100 + fromNorm.day;
  const end = (toNorm.month - 1) * 100 + toNorm.day;

  // перехід через рік (зима)
  if (start > end) {
    return current >= start || current <= end;
  }

  return current >= start && current <= end;
}

const themeStore = (() => {
  const themes = structuredClone(THEME);
  const modifiers = structuredClone(MODIFIER);

  let theme = null;
  let modifier = null;

  const themeList = () => Object.entries(themes).map(([name, config]) => ({
    name,
    isEnabled: config.isEnabled,
    isActive: isThemeActive(name),
  }));

  const modifierList = () => Object.entries(modifiers).map(([name, config]) => ({
    name,
    isEnabled: config.isEnabled,
    isActive: isModifierActive(name),
    isAvailable: isDateInRange(config.from, config.to),
  }));

  const resolvedTheme = () => (theme === 'system' ? getSystemTheme() : theme);

  const listeners = {};
  let mediaQuery;

  function on(event, callback) {
    (listeners[event] ||= []).push(callback);
  }

  function emit(event, payload) {
    (listeners[event] || []).forEach((callback) => callback(payload));
  }

  function init() {
    const themeFromStorage = getStorage(STORAGE_KEY, STORAGE_TYPE);
    const isValid = themes[themeFromStorage]?.isEnabled;

    theme = isValid ? themeFromStorage : 'system';

    modifier = Object.entries(modifiers)
      .filter(([, m]) => m.isEnabled && isDateInRange(m.from, m.to))
      ?.at(-1)?.[0] || null;

    startSystemThemeListener();
    updateBodyAttributes();

    return true;
  }

  function getSystemTheme() {
    if (typeof window === 'undefined') {
      return 'light';
    }

    return window.matchMedia?.('(prefers-color-scheme: dark)')?.matches
      ? 'dark'
      : 'light';
  }

  function startSystemThemeListener() {
    if (typeof window === 'undefined') {
      return false;
    }

    mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    mediaQuery.addEventListener('change', () => {
      if (theme === 'system') {
        updateBodyAttributes();
        emit('change:theme', theme);
      }
    });

    return true;
  }

  function updateBodyAttributes() {
    const rootNode = document.documentElement;

    rootNode.setAttribute(BODY_ATTRIBUTE_KEY, resolvedTheme());

    if (modifier) {
      rootNode.setAttribute(BODY_ATTRIBUTE_MODIFIER_KEY, modifier);
    } else {
      rootNode.removeAttribute(BODY_ATTRIBUTE_MODIFIER_KEY);
    }

    return true;
  }

  function setTheme(newTheme, { saveToStorage = true } = {}) {
    if (!themes[newTheme]?.isEnabled) {
      return false;
    }

    theme = newTheme;

    if (saveToStorage) {
      setStorage(STORAGE_KEY, newTheme, STORAGE_TYPE);
    }

    updateBodyAttributes();
    emit('change:theme', theme);

    return true;
  }

  function toggleTheme() {
    const available = Object.keys(themes)
      .filter((t) => themes[t].isEnabled);

    if (!available.length) {
      return false;
    }

    const index = available.indexOf(theme);
    const next = available[(index + 1 + available.length) % available.length];

    return setTheme(next);
  }

  function setModifier(name) {
    const m = modifiers[name];
    if (!m?.isEnabled || !isDateInRange(m.from, m.to)) {
      return false;
    }

    modifier = name;
    updateBodyAttributes();
    emit('change:theme-modifier', modifier);

    return true;
  }

  function clearModifiers() {
    modifier = null;
    updateBodyAttributes();
    emit('change:theme-modifier', modifier);
    return true;
  }

  function isThemeActive(name) {
    return name === 'system'
      ? theme === name
      : resolvedTheme() === name;
  }

  function isModifierActive(name) {
    return modifier === name;
  }

  return {
    theme,
    modifier,
    themeList,
    modifierList,
    on,
    emit,
    init,
    getSystemTheme,
    setTheme,
    toggleTheme,
    setModifier,
    clearModifiers,
    isThemeActive,
    isModifierActive,
  };
})();

export default themeStore;
