'use client';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ALL_PRODUCTS } from '@/data/catalogueData';

const MAX_RESULTS = 8;

/* Flat, pre-lowercased search index — built once at module load. */
const SEARCH_INDEX = ALL_PRODUCTS.map((product) => ({
  ...product,
  searchText: [product.title, product.categoryName, product.subName, ...product.tags]
    .join(' ')
    .toLowerCase(),
}));

/** Every whitespace-separated term must appear somewhere in the entry. */
function search(query) {
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (!terms.length) return [];

  const matches = [];
  for (const item of SEARCH_INDEX) {
    if (terms.every((term) => item.searchText.includes(term))) {
      matches.push(item);
      if (matches.length === MAX_RESULTS) break;
    }
  }
  return matches;
}

export default function SearchBar({ onResultClick }) {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  /* Results are derived from the query — no effect, no stale state. */
  const results = useMemo(() => search(query), [query]);

  /* Ctrl+K / Cmd+K focuses the search box */
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  /* Click outside closes the dropdown */
  useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setFocused(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSelect = useCallback(
    (item) => {
      setQuery('');
      setFocused(false);
      setActiveIdx(-1);
      inputRef.current?.blur();
      onResultClick?.(item);
    },
    [onResultClick]
  );

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
    setActiveIdx(-1);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setQuery('');
      setFocused(false);
      setActiveIdx(-1);
      return;
    }
    if (!results.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, -1));
    } else if (e.key === 'Enter' && activeIdx >= 0) {
      e.preventDefault();
      handleSelect(results[activeIdx]);
    }
  };

  const showDropdown = focused && query.trim().length > 0;
  const listboxId = 'catalogue-search-results';

  return (
    <div className="search-bar-container" ref={containerRef}>
      <div className={`search-input-wrapper ${focused ? 'focused' : ''}`}>
        <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
        </svg>

        <input
          ref={inputRef}
          type="search"
          className="search-input"
          placeholder="Search products… (Ctrl+K)"
          value={query}
          onChange={handleQueryChange}
          onFocus={() => setFocused(true)}
          onKeyDown={handleKeyDown}
          aria-label="Search products"
          role="combobox"
          aria-expanded={showDropdown}
          aria-controls={listboxId}
          aria-autocomplete="list"
          aria-activedescendant={activeIdx >= 0 ? `search-result-${activeIdx}` : undefined}
          id="catalogue-search"
          autoComplete="off"
        />

        {query && (
          <button
            type="button"
            className="search-clear-btn"
            onClick={() => {
              setQuery('');
              setActiveIdx(-1);
              inputRef.current?.focus();
            }}
            aria-label="Clear search"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        )}

        {!query && !focused && (
          <span className="search-kbd" aria-hidden="true">
            <kbd>Ctrl</kbd><kbd>K</kbd>
          </span>
        )}
      </div>

      <AnimatePresence>
        {showDropdown && (
          <motion.div
            className="search-dropdown"
            id={listboxId}
            role="listbox"
            aria-label="Search results"
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="search-dropdown-header">
              {results.length === 0
                ? 'No matching products'
                : `${results.length}${results.length === MAX_RESULTS ? '+' : ''} result${results.length !== 1 ? 's' : ''} for `}
              {results.length > 0 && (
                <>&ldquo;<strong>{query}</strong>&rdquo;</>
              )}
            </div>

            {results.map((item, i) => (
              <button
                key={item.slug}
                type="button"
                id={`search-result-${i}`}
                role="option"
                aria-selected={i === activeIdx}
                className={`search-result-item ${i === activeIdx ? 'active' : ''}`}
                onClick={() => handleSelect(item)}
                onMouseEnter={() => setActiveIdx(i)}
              >
                <span className="search-result-icon" aria-hidden="true">{item.categoryIcon}</span>
                <div className="search-result-text">
                  <div className="search-result-title">{item.title}</div>
                  <div className="search-result-meta">{item.categoryName} · {item.subName}</div>
                </div>
                <svg className="search-result-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
