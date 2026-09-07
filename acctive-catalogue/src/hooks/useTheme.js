'use client';

import { useSyncExternalStore } from 'react';

const STORAGE_KEY = 'acctive-theme';

/*
 * The <html data-theme> attribute is the single source of truth. A tiny script
 * in layout.js sets it from localStorage before first paint, and this hook
 * simply reads it — so the toggle button can never disagree with the page.
 */

function subscribe(onChange) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  });
  return () => observer.disconnect();
}

const getSnapshot = () => document.documentElement.getAttribute('data-theme') || 'dark';
const getServerSnapshot = () => 'dark';

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* private browsing — the choice just won't persist */
    }
  };

  return { theme, toggleTheme };
}
