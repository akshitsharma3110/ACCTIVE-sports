'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import CATALOGUE_DATA from '@/data/catalogueData';

/* Build flat search index once */
function buildSearchIndex() {
  const index = [];
  Object.entries(CATALOGUE_DATA).forEach(([catKey, cat]) => {
    Object.entries(cat.subcategories).forEach(([subKey, sub]) => {
      sub.images.forEach((img) => {
        index.push({
          ...img,
          categoryKey: catKey,
          categoryName: cat.name,
          categoryIcon: cat.icon,
          subKey,
          subName: sub.name,
          specs: sub.specs,
          searchText: [
            img.title,
            cat.name,
            sub.name,
            ...(sub.tags || []),
          ].join(' ').toLowerCase(),
        });
      });
    });
  });
  return index;
}

const SEARCH_INDEX = buildSearchIndex();

export default function SearchBar({ onResultClick }) {
  const [query, setQuery]     = useState('');
  const [results, setResults] = useState([]);
  const [focused, setFocused] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  /* Ctrl+K / Cmd+K focus shortcut */
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  /* Click outside to close */
  useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setFocused(false);
        setActiveIdx(-1);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  /* Debounced search */
  useEffect(() => {
    if (!query.trim()) { setResults([]); return; }
    const q = query.toLowerCase().trim();
    const matches = SEARCH_INDEX.filter(item =>
      item.searchText.includes(q)
    ).slice(0, 8);
    setResults(matches);
    setActiveIdx(-1);
  }, [query]);

  const handleKeyDown = useCallback((e) => {
    if (!results.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIdx(i => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIdx(i => Math.max(i - 1, -1));
    } else if (e.key === 'Enter' && activeIdx >= 0) {
      handleSelect(results[activeIdx]);
    } else if (e.key === 'Escape') {
      setFocused(false);
      setQuery('');
    }
  }, [results, activeIdx]);

  const handleSelect = (item) => {
    setQuery('');
    setResults([]);
    setFocused(false);
    onResultClick?.(item);
  };

  const showDropdown = focused && results.length > 0;

  return (
    <div className="search-bar-container" ref={containerRef}>
      <div className={`search-input-wrapper ${focused ? 'focused' : ''}`}>
        {/* Search Icon */}
        <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>

        <input
          ref={inputRef}
          type="text"
          className="search-input"
          placeholder="Search products… (Ctrl+K)"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onKeyDown={handleKeyDown}
          aria-label="Search products"
          id="catalogue-search"
          autoComplete="off"
        />

        {/* Clear button */}
        {query && (
          <button className="search-clear-btn" onClick={() => { setQuery(''); inputRef.current?.focus(); }} aria-label="Clear search">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        )}

        {/* Kbd shortcut badge */}
        {!query && !focused && (
          <span className="search-kbd" aria-hidden="true">
            <kbd>Ctrl</kbd><kbd>K</kbd>
          </span>
        )}
      </div>

      {/* Results Dropdown */}
      <AnimatePresence>
        {showDropdown && (
          <motion.div
            className="search-dropdown"
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="search-dropdown-header">
              {results.length} result{results.length !== 1 ? 's' : ''} for &ldquo;<strong>{query}</strong>&rdquo;
            </div>
            {results.map((item, i) => (
              <button
                key={`${item.slug}-${i}`}
                className={`search-result-item ${i === activeIdx ? 'active' : ''}`}
                onClick={() => handleSelect(item)}
                onMouseEnter={() => setActiveIdx(i)}
              >
                <span className="search-result-icon">{item.categoryIcon}</span>
                <div className="search-result-text">
                  <div className="search-result-title">{item.title}</div>
                  <div className="search-result-meta">{item.categoryName} · {item.subName}</div>
                </div>
                <svg className="search-result-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
