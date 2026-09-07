'use client';

import { useCallback, useSyncExternalStore } from 'react';

/**
 * Subscribes to a CSS media query.
 *
 * useSyncExternalStore is used rather than useState + useEffect so the value is
 * correct on the very first client render (no flash, no cascading re-render)
 * while still returning `false` during server rendering.
 */
export function useMediaQuery(query) {
  const subscribe = useCallback(
    (onChange) => {
      const list = window.matchMedia(query);
      list.addEventListener('change', onChange);
      return () => list.removeEventListener('change', onChange);
    },
    [query]
  );

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);
  const getServerSnapshot = useCallback(() => false, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function usePrefersReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}

/* Device capability doesn't change during a visit, so there is nothing to subscribe to. */
const noopSubscribe = () => () => {};

/** True on phones and low-core machines, where the WebGL background isn't worth the cost. */
export function useIsLowPoweredDevice() {
  return useSyncExternalStore(
    noopSubscribe,
    () => (navigator.hardwareConcurrency || 8) <= 4,
    () => false
  );
}
