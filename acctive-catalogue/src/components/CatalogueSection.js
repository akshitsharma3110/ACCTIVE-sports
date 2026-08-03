'use client';

import { useState, useCallback, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import CATALOGUE_DATA from '@/data/catalogueData';

/* ============================================================
   LIGHTBOX COMPONENT
   ============================================================ */
function Lightbox({ images, index, onClose, onNavigate }) {
  const img = images[index];

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate(-1);
      if (e.key === 'ArrowRight') onNavigate(1);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onNavigate]);

  if (!img) return null;

  return (
    <motion.div
      className="lightbox-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="lightbox-backdrop" onClick={onClose} />

      <button className="lightbox-nav-btn lightbox-prev" onClick={() => onNavigate(-1)}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
      </button>

      <motion.div
        className="lightbox-body"
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <button className="lightbox-close-btn" onClick={onClose}>✕</button>
        <img src={img.path} alt={img.title} />
        <div className="lightbox-info mt-3">
          <h4>{img.title}</h4>
          <p>{index + 1} of {images.length}</p>
        </div>
      </motion.div>

      <button className="lightbox-nav-btn lightbox-next" onClick={() => onNavigate(1)}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
    </motion.div>
  );
}

/* ============================================================
   PRODUCT CARD WITH 3D TILT
   ============================================================ */
function ProductCard({ image, categoryName, subName, index, onClick }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -12, y: x * 12 });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <motion.div
      className="product-card-3d"
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.15s ease-out',
      }}
      initial={{ opacity: 0, y: 50, scale: 0.93 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="card-image-wrapper">
        <img
          src={image.path}
          alt={image.title}
          loading="lazy"
          onError={(e) => { e.target.style.objectFit = 'contain'; }}
        />
        <div className="card-overlay">
          <button className="view-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            View Full Size
          </button>
        </div>
      </div>
      <div className="card-info">
        <div className="card-category-tag">{categoryName} — {subName}</div>
        <h3 className="card-title">{image.title}</h3>
      </div>
    </motion.div>
  );
}

/* ============================================================
   MAIN CATALOGUE SECTION
   ============================================================ */
export default function CatalogueSection() {
  const categoryKeys = Object.keys(CATALOGUE_DATA);
  const [activeCategory, setActiveCategory] = useState(categoryKeys[0]);
  const [activeSub, setActiveSub] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const category = CATALOGUE_DATA[activeCategory];
  const subKeys = Object.keys(category.subcategories);
  const currentSub = activeSub || subKeys[0];
  const subData = category.subcategories[currentSub];
  const images = subData ? subData.images : [];

  // Count total images per category
  const getCategoryCount = (catKey) => {
    const cat = CATALOGUE_DATA[catKey];
    return Object.values(cat.subcategories).reduce((sum, sub) => sum + sub.images.length, 0);
  };

  const handleCategoryChange = (key) => {
    setActiveCategory(key);
    setActiveSub(null);
  };

  const handleLightboxNav = useCallback((dir) => {
    setLightboxIndex((prev) => (prev + dir + images.length) % images.length);
  }, [images.length]);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  return (
    <>
      {/* Category Nav */}
      <div className="category-nav-bar" id="category-nav">
        <Container>
          <div className="d-flex justify-content-center gap-2 flex-wrap category-pills-scroll">
            {categoryKeys.map((key) => {
              const cat = CATALOGUE_DATA[key];
              return (
                <button
                  key={key}
                  className={`category-pill ${key === activeCategory ? 'active' : ''}`}
                  onClick={() => handleCategoryChange(key)}
                >
                  {cat.icon} {cat.name}
                  <span className="pill-count">{getCategoryCount(key)}</span>
                </button>
              );
            })}
          </div>
        </Container>
      </div>

      {/* Products Section */}
      <section className="py-5" id="products" style={{ position: 'relative', zIndex: 1 }}>
        <Container>
          {/* Section Header */}
          <div className="text-center mb-5">
            <div className="section-tag mb-2">Our Collection</div>
            <h2 className="section-title mb-3">{category.name}</h2>
            <p className="section-desc">{category.description}</p>
          </div>

          {/* Subcategory Tabs */}
          <div className="d-flex justify-content-center gap-2 flex-wrap mb-4 sub-tab-scroll-row">
            {subKeys.map((key) => (
              <button
                key={key}
                className={`sub-tab ${key === currentSub ? 'active' : ''}`}
                onClick={() => setActiveSub(key)}
              >
                {category.subcategories[key].name}
              </button>
            ))}
          </div>

          {/* Product Count */}
          <div className="product-count-badge text-center mb-4">
            Showing <strong>{images.length}</strong> products in <strong>{subData.name}</strong>
          </div>

          {/* Product Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeCategory}-${currentSub}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Row className="g-4">
                {images.map((img, idx) => (
                  <Col key={`${img.file}-${idx}`} xs={6} sm={6} md={4} lg={3}>
                    <ProductCard
                      image={img}
                      categoryName={category.name}
                      subName={subData.name}
                      index={idx}
                      onClick={() => { setLightboxIndex(idx); setLightboxOpen(true); }}
                    />
                  </Col>
                ))}
              </Row>
            </motion.div>
          </AnimatePresence>
        </Container>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <Lightbox
            images={images}
            index={lightboxIndex}
            onClose={closeLightbox}
            onNavigate={handleLightboxNav}
          />
        )}
      </AnimatePresence>
    </>
  );
}
