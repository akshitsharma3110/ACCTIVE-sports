'use client';

import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { COMPANY } from '@/config/site';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.8, delay, ease: [0.4, 0, 0.2, 1] },
});

const pillars = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    label: 'Premium Quality',
    sub: 'Highest standards in every stitch',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 6v6l4 2"/>
      </svg>
    ),
    label: `Since ${COMPANY.foundedYear}`,
    sub: 'Two decades of excellence',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    label: 'Expert Team',
    sub: 'Skilled textile engineers',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    label: 'Made in Meerut',
    sub: "India's sportswear capital",
  },
];

export default function AboutSection() {
  return (
    <section className="about-section" id="about">
      {/* Decorative blobs */}
      <div className="about-blob about-blob-1" aria-hidden="true" />
      <div className="about-blob about-blob-2" aria-hidden="true" />

      <Container className="about-container">
        {/* Section tag */}
        <motion.div {...fadeUp(0)} className="text-center mb-2">
          <div className="section-tag">Our Story</div>
        </motion.div>

        <motion.h2 {...fadeUp(0.05)} className="section-title text-center mb-5">
          About <span className="gradient-text">ACCTIVE Sports</span>
        </motion.h2>

        <Row className="g-5 align-items-center">
          {/* LEFT — Story text */}
          <Col lg={7}>
            <motion.div {...fadeUp(0.1)} className="about-text-block">
              <p className="about-headline">
                Discover <strong>Acctive Sports Industries</strong> — your go-to destination for
                premium sportswear!
              </p>

              <p className="about-body">
                The Acctive sports industry in Meerut, founded by{' '}
                <strong>{COMPANY.founder}</strong>, has a rich history dating back several decades.
                Meerut has been a hub for sports goods manufacturing and has played a significant
                role in the growth of the sports industry in India. As a former venture of{' '}
                <em>Pt. Sohan Lal and Sons Hockey makers</em>, Acctive took a vibrant turn in{' '}
                <strong>{COMPANY.foundedYear}</strong>, as a brand to help you elevate your performance and style.
              </p>

              <p className="about-body">
                We offer a wide range of high-quality garments, including men’s Polo T-shirts,
                Round Neck T-shirts, Printed Hooded Jackets, and Polyester Lycra Cycling Dresses.
              </p>

              <p className="about-body">
                Our commitment to product excellence and customer satisfaction ensures comfort and
                functionality. Our team of skilled professionals, including textile engineers,
                ensures excellence in operations. With advanced manufacturing and extensive sales
                offices, we provide unmatched quality and reliability.
              </p>

              <p className="about-body">
                At Acctive Sports Industries, quality reigns supreme. We adhere to the highest
                standards throughout our manufacturing process, meticulously crafting each garment
                to perfection. Our commitment to excellence is unwavering, as we strive to exceed
                the expectations of our valued customers.
              </p>

              <p className="about-tagline">
                Experience the difference that quality makes with{' '}
                <strong>Acctive Sports Industries.</strong>
                <br />
                <a
                  href={COMPANY.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-website-link"
                >
                  {COMPANY.website.replace(/^https?:\/\//, '')}
                </a>
              </p>
            </motion.div>
          </Col>

          {/* RIGHT — Pillar cards */}
          <Col lg={5}>
            <div className="about-pillars">
              {pillars.map((p, i) => (
                <motion.div key={i} {...fadeUp(0.15 + i * 0.08)} className="about-pillar-card">
                  <div className="about-pillar-icon">{p.icon}</div>
                  <div>
                    <div className="about-pillar-label">{p.label}</div>
                    <div className="about-pillar-sub">{p.sub}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
