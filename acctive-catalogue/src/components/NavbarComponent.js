'use client';

import { useState, useEffect } from 'react';
import { whatsappUrl } from '@/config/site';
import { useTheme } from '@/hooks/useTheme';
import WhatsAppIcon from '@/components/icons/WhatsAppIcon';

const NAV_LINKS = [
  { id: 'hero', label: 'Home' },
  { id: 'products', label: 'Catalogue' },
  { id: 'features', label: 'Why Us' },
  { id: 'about', label: 'About Us' },
  { id: 'contact', label: 'Contact' },
];

export default function NavbarComponent() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(NAV_LINKS[0].id);
  const { theme, toggleTheme } = useTheme();

  /* Scroll detection */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Highlight whichever section is currently in view */
  useEffect(() => {
    const observers = NAV_LINKS.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveLink(id);
        },
        { rootMargin: '-40% 0px -55% 0px' }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  /* Lock page scroll and allow Escape to close while the mobile menu is open */
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  const enquiryUrl = whatsappUrl();

  return (
    <header className={`acctive-navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
      <div className="navbar-accent-line" />

      <div className="navbar-container">
        {/* LEFT: Nav links */}
        <nav className="navbar-nav-left" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`nav-item ${activeLink === link.id ? 'active' : ''}`}
              aria-current={activeLink === link.id ? 'true' : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
              <span className="nav-item-underline" />
            </a>
          ))}
        </nav>

        {/* CENTRE: Logo */}
        <a href="#hero" className="navbar-logo" aria-label="ACCTIVE Sports — Home">
          <span className="logo-shimmer-wrap">
            <span className="logo-text">ACCTIVE</span>
          </span>
          <span className="logo-badge">Sports</span>
        </a>

        {/* RIGHT: Controls */}
        <div className="navbar-controls">
          <button
            id="theme-toggle"
            type="button"
            className="theme-btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            <span className="theme-btn-track">
              <span className="theme-btn-thumb" aria-hidden="true">
                {theme === 'dark' ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                  </svg>
                )}
              </span>
            </span>
            <span className="theme-btn-label">{theme === 'dark' ? 'Light' : 'Dark'}</span>
          </button>

          <a
            href={enquiryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="navbar-cta-btn"
            id="navbar-whatsapp-cta"
          >
            <WhatsAppIcon size={15} />
            <span>Get Quote</span>
          </a>

          <button
            type="button"
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            id="hamburger-btn"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <div
        id="mobile-menu"
        className={`mobile-menu ${menuOpen ? 'open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <nav aria-label="Mobile">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`mobile-nav-item ${activeLink === link.id ? 'active' : ''}`}
              style={{ animationDelay: `${i * 0.07}s` }}
              tabIndex={menuOpen ? undefined : -1}
              onClick={() => setMenuOpen(false)}
            >
              <span className="mobile-nav-index">0{i + 1}</span>
              {link.label}
            </a>
          ))}

          <a
            href={enquiryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-cta"
            tabIndex={menuOpen ? undefined : -1}
            onClick={() => setMenuOpen(false)}
          >
            <WhatsAppIcon size={18} />
            WhatsApp Enquiry
          </a>
        </nav>
      </div>
    </header>
  );
}
