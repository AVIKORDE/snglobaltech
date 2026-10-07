import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

/**
 * Light / dark theme.
 *
 * - The chosen theme is written to <html data-theme="light|dark">; all dark
 *   styles live in src/styles/dark.css and are scoped to that attribute.
 * - A user choice is persisted in localStorage (STORAGE_KEY). Without one we
 *   follow the OS preference and keep following it if it changes.
 * - index.html contains a tiny inline script that applies the same logic
 *   before first paint so there is no flash of the wrong theme.
 */
export const STORAGE_KEY = 'sn-theme';
const THEMES = ['light', 'dark'];
const META_THEME_COLOR = { light: '#1f4d2e', dark: '#101511' };

const isTheme = (v) => THEMES.includes(v);

function readStored() {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    return isTheme(v) ? v : null;
  } catch {
    return null;
  }
}

function systemTheme() {
  if (typeof window === 'undefined' || !window.matchMedia) return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function initialTheme() {
  if (typeof document !== 'undefined') {
    const attr = document.documentElement.getAttribute('data-theme');
    if (isTheme(attr)) return attr; // set by the pre-paint script in index.html
  }
  return readStored() || systemTheme();
}

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(initialTheme);

  // Reflect the theme on <html> and keep the browser UI colour in sync.
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    root.style.colorScheme = theme;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', META_THEME_COLOR[theme]);
  }, [theme]);

  // Follow OS changes only while the visitor has not picked a theme themselves.
  useEffect(() => {
    if (!window.matchMedia) return undefined;
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e) => {
      if (!readStored()) setThemeState(e.matches ? 'dark' : 'light');
    };
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  // Keep multiple open tabs in sync.
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY && isTheme(e.newValue)) setThemeState(e.newValue);
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const setTheme = useCallback((next) => {
    if (!isTheme(next)) return;
    setThemeState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage unavailable (private mode etc.) – theme still applies for this visit */
    }
  }, []);

  const toggleTheme = useCallback(() => setTheme(theme === 'dark' ? 'light' : 'dark'), [theme, setTheme]);

  const value = useMemo(
    () => ({ theme, isDark: theme === 'dark', setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>');
  return ctx;
}
