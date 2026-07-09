'use client';

import { useState, useEffect } from 'react';

export default function NavbarComponent() {
  const [scrolled, setScrolled]   = useState(false);
  const [theme, setTheme]         = useState('dark');
  const [menuOpen, setMenuOpen]   = useState(false);
  const [activeLink, setActiveLink] = useState('hero');

  /* ── Persist theme ── */
  useEffect(() => {
    const saved = localStorage.getItem('acctive-theme') || 'dark';
    setTheme(saved);
    document.documentElement.setAttribute('data-theme', saved);
  }, []);

  /* ── Scroll detection ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Active section via IntersectionObserver ── */
  useEffect(() => {
    const ids = ['hero', 'products', 'features', 'contact'];
    const observers = ids.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveLink(id); },
        { rootMargin: '-40% 0px -55% 0px' }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);

  /* ── Theme toggle ── */
  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('acctive-theme', next);
  };

  const navLinks = [
    { id: 'hero',     label: 'Home' },
    { id: 'products', label: 'Catalogue' },
    { id: 'features', label: 'Why Us' },
    { id: 'contact',  label: 'Contact' },
  ];

  return (
    <header className={`acctive-navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">

      {/* ── Gradient accent line on top ── */}
      <div className="navbar-accent-line" />

      <div className="navbar-container">

        {/* ══ LEFT: Nav links ══ */}
        <nav className="navbar-nav-left" aria-label="Primary navigation">
          {navLinks.map(link => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`nav-item ${activeLink === link.id ? 'active' : ''}`}
              onClick={() => { setMenuOpen(false); }}
            >
              {link.label}
              <span className="nav-item-underline" />
            </a>
          ))}
        </nav>

        {/* ══ CENTRE: Logo ══ */}
        <a href="#hero" className="navbar-logo" aria-label="ACCTIVE Sports — Home">
          <span className="logo-shimmer-wrap">
            <span className="logo-text">ACCTIVE</span>
          </span>
          <span className="logo-badge">Sports</span>
        </a>

        {/* ══ RIGHT: Controls ══ */}
        <div className="navbar-controls">
          {/* Theme toggle */}
          <button
            id="theme-toggle"
            className="theme-btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            <span className="theme-btn-track">
              <span className="theme-btn-thumb">
                {theme === 'dark' ? '🌙' : '☀️'}
              </span>
            </span>
            <span className="theme-btn-label">{theme === 'dark' ? 'Light' : 'Dark'}</span>
          </button>

          {/* WhatsApp CTA */}
          <a
            href="https://wa.me/919997100375"
            target="_blank"
            rel="noopener noreferrer"
            className="navbar-cta-btn"
            id="navbar-whatsapp-cta"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
            </svg>
            <span>Get Quote</span>
          </a>

          {/* Mobile hamburger */}
          <button
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            id="hamburger-btn"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* ══ MOBILE MENU OVERLAY ══ */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
        <nav>
          {navLinks.map((link, i) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`mobile-nav-item ${activeLink === link.id ? 'active' : ''}`}
              style={{ animationDelay: `${i * 0.07}s` }}
              onClick={() => setMenuOpen(false)}
            >
              <span className="mobile-nav-index">0{i + 1}</span>
              {link.label}
            </a>
          ))}

          <a
            href="https://wa.me/919997100375"
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-cta"
            onClick={() => setMenuOpen(false)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
            </svg>
            WhatsApp Enquiry
          </a>
        </nav>
      </div>

    </header>
  );
}
