'use client';

import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { COMPANY, ADDRESS } from '@/config/site';
import {
  TOTAL_PRODUCTS,
  TOTAL_CATEGORIES,
  TOTAL_SUBCATEGORIES,
} from '@/data/catalogueData';

/* Counts come from the catalogue data, so they can never go stale. */
const HERO_STATS = [
  { value: `${TOTAL_PRODUCTS}`, label: 'Products' },
  { value: `${TOTAL_CATEGORIES}`, label: 'Categories' },
  { value: `${TOTAL_SUBCATEGORIES}`, label: 'Sub-Collections' },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.4, 0, 0.2, 1] },
});

/* Sports equipment icons for the marquee */
const sportsItems = [
  { name: 'Cricket', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l7-7"/><path d="M10.5 13.5l3-3"/><circle cx="18" cy="6" r="3"/><path d="M14 10l-1.5-1.5"/></svg> },
  { name: 'Football', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z"/></svg> },
  { name: 'Basketball', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10"/><path d="M12 2a15.3 15.3 0 0 0-4 10 15.3 15.3 0 0 0 4 10"/></svg> },
  { name: 'Badminton', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12.5 3l5 8.5-8.5 5L4 11.5z"/><path d="M4 11.5L2 22l10.5-5.5"/><circle cx="12.5" cy="3" r="1"/></svg> },
  { name: 'Hockey', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20l8-16"/><path d="M12 4c4 0 8 2 8 5s-3.5 4-8 4"/></svg> },
  { name: 'Tennis', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M18.5 5.5c-3 3-8 3-11 0"/><path d="M5.5 18.5c3-3 8-3 11 0"/></svg> },
  { name: 'Boxing', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 10c0-3 2-6 5-6h4c3 0 5 3 5 6v4c0 3-2 6-5 6H10c-3 0-5-3-5-6z"/><path d="M9 12h6"/><path d="M9 15h6"/></svg> },
  { name: 'Athletics', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="2"/><path d="M7 21l3-7 2 2 4-5"/><path d="M15 21l-2-5"/><path d="M10 14l-3 1"/></svg> },
  { name: 'T-Shirt', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15.5 2H8.5L4 6.5V10l3-1v12h10V9l3 1V6.5L15.5 2z"/></svg> },
  { name: 'Tracksuit', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2h8l3 5-3 1v14H8V8L5 7z"/><path d="M12 8v6"/><path d="M10 14h4"/></svg> },
];

function SportsMarquee() {
  /* Duplicate items for seamless infinite scroll */
  const doubled = [...sportsItems, ...sportsItems];
  return (
    <div className="sports-marquee-wrapper" aria-hidden="true">
      <div className="sports-marquee-track">
        {doubled.map((item, i) => (
          <div key={i} className="marquee-item">
            {item.icon}
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="hero-section" id="hero">

      <Container className="hero-content-wrapper">
        <Row className="justify-content-center text-center">
          <Col lg={10} xl={9}>
            <motion.div {...fadeUp(0)}>
              <div className="hero-badge mb-4">
                <span className="pulse-dot" aria-hidden="true"></span>
                {ADDRESS.city}, India — Since {COMPANY.foundedYear}
              </div>
            </motion.div>

            <motion.h1 {...fadeUp(0.1)} className="hero-title mb-4">
              <span className="gradient-text">ACCTIVE</span>
              <br />
              Sports Industries
            </motion.h1>

            {/* Sports Equipment Marquee */}
            <motion.div {...fadeUp(0.15)}>
              <SportsMarquee />
            </motion.div>

            <motion.p {...fadeUp(0.2)} className="hero-subtitle mx-auto mb-5">
              Crafting premium sportswear with passion. From vibrant sublimation T-Shirts to
              performance-grade tracksuits — discover our complete collection engineered for champions.
            </motion.p>

            <motion.div {...fadeUp(0.3)} className="d-flex gap-3 justify-content-center flex-wrap mb-5">
              <a href="#products" className="btn btn-accent d-flex align-items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
                Explore Catalogue
              </a>
              <a href="#contact" className="btn btn-glass d-flex align-items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                Contact Us
              </a>
            </motion.div>

            <motion.div {...fadeUp(0.4)}>
              <Row className="justify-content-center g-5">
                {HERO_STATS.map((stat) => (
                  <Col key={stat.label} xs={4} md={3}>
                    <div className="stat-number">{stat.value}</div>
                    <div className="stat-label">{stat.label}</div>
                  </Col>
                ))}
              </Row>
            </motion.div>
          </Col>
        </Row>
      </Container>

      <div className="scroll-indicator">
        <span>Scroll to explore</span>
        <div className="scroll-line"></div>
      </div>
    </section>
  );
}
