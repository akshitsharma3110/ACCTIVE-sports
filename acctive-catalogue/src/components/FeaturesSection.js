'use client';

import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>,
    title: 'Vibrant Sublimation',
    desc: 'Advanced sublimation printing that delivers bold, fade-resistant colours. Full, front, and front & back options for every design vision.',
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22V2"/><path d="M4 12c3-4 6-4 8 0s5 4 8 0"/><path d="M4 6c3-4 6-4 8 0s5 4 8 0"/><path d="M4 18c3-4 6-4 8 0s5 4 8 0"/></svg>,
    title: 'Premium Fabrics',
    desc: 'From Lycra and Superpoly to SAP Mattie and TPU — we source and craft with materials built for performance and durability.',
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 2l20 20"/><path d="M5.5 5.5L2 2"/><path d="M18.5 18.5L22 22"/><path d="M12 2v4"/><path d="M2 12h4"/><path d="M18 12h4"/><path d="M12 18v4"/></svg>,
    title: 'Custom Designs',
    desc: 'Fully customizable designs tailored to your team, club, or brand. Unlimited design possibilities with our in-house design studio.',
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20h20"/><rect x="4" y="10" width="4" height="10" rx="1"/><rect x="10" y="6" width="4" height="14" rx="1"/><rect x="16" y="2" width="4" height="18" rx="1"/></svg>,
    title: 'Made in Meerut',
    desc: "Proudly manufactured in Meerut — India's sportswear capital. Quality craftsmanship backed by decades of industry expertise.",
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>,
    title: 'Bulk Orders',
    desc: 'Equipped for large-scale production with quick turnaround. From 50 to 50,000 pieces — we deliver on time, every time.',
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
    title: 'Pan-India Delivery',
    desc: 'We deliver across India and export globally. Trusted by teams, retailers, and sports brands nationwide.',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] },
  }),
};

export default function FeaturesSection() {
  return (
    <section className="py-5" id="features" style={{ position: 'relative', zIndex: 1 }}>
      <Container>
        <div className="text-center mb-5">
          <div className="section-tag mb-2">Why Choose Us</div>
          <h2 className="section-title mb-3">
            Built for <span className="gradient-text">Champions</span>
          </h2>
          <p className="section-desc">
            Every stitch, every print, every fabric is chosen to deliver excellence on and off the field.
          </p>
        </div>

        <Row className="g-4">
          {features.map((feat, i) => (
            <Col key={i} md={6} lg={4}>
              <motion.div
                className="feature-card"
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                variants={cardVariants}
              >
                <div className="feature-icon mb-3">{feat.icon}</div>
                <h3 className="feature-title mb-2">{feat.title}</h3>
                <p className="feature-desc mb-0">{feat.desc}</p>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
