'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import CATALOGUE_DATA from '@/data/catalogueData';
import SearchBar from '@/components/SearchBar';
import ProductDetailModal from '@/components/ProductDetailModal';

const WA_NUMBER = '919997100375';

/* ============================================================
   ANIMATED COUNTER HOOK
   ============================================================ */
function useCountUp(target, duration = 1200) {
  const [count, setCount] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    let start = null;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);

  return count;
}

/* ============================================================
   PRODUCT CARD WITH 3D TILT
   ============================================================ */
function ProductCard({ image, categoryName, subName, categoryKey, subKey, index, onClick }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -10, y: x * 10 });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  /* WhatsApp quick enquiry */
  const waText = encodeURIComponent(
    `Hi ACCTIVE Sports! I'm interested in:\n*${image.title}*\n(${categoryName} — ${subName})\n\nPlease share price & availability.`
  );
  const waUrl = `https://wa.me/${WA_NUMBER}?text=${waText}`;

  const handleShareCard = async (e) => {
    e.stopPropagation();
    const shareUrl = `${window.location.href.split('?')[0]}?product=${image.slug || ''}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      // show mini toast via DOM (no state hoisting needed for cards)
      const el = document.getElementById('card-toast');
      if (el) { el.classList.add('visible'); setTimeout(() => el.classList.remove('visible'), 1800); }
    } catch {}
  };

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
      transition={{ duration: 0.5, delay: Math.min(index * 0.04, 0.5), ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="card-image-wrapper">
        <img
          src={image.path}
          alt={image.title}
          loading="lazy"
          onError={(e) => { e.target.style.objectFit = 'contain'; }}
        />
        <div className="card-overlay">
          {/* View button */}
          <button className="view-btn" aria-label="View full size">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            View Details
          </button>

          {/* Action row: WhatsApp + Share */}
          <div className="card-action-row" onClick={e => e.stopPropagation()}>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="card-action-btn card-wa-btn"
              aria-label="Enquire on WhatsApp"
              title="Enquire on WhatsApp"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
              </svg>
            </a>
            <button
              className="card-action-btn card-share-btn"
              onClick={handleShareCard}
              aria-label="Copy link"
              title="Copy link"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="card-info">
        <div className="card-category-tag">{categoryName} · {subName}</div>
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
  const [activeSub, setActiveSub]           = useState(null);
  const [modalOpen, setModalOpen]           = useState(false);
  const [modalIndex, setModalIndex]         = useState(0);
  const [searchResult, setSearchResult]     = useState(null); // { image, categoryKey, subKey }

  const category = CATALOGUE_DATA[activeCategory];
  const subKeys  = Object.keys(category.subcategories);
  const currentSub = activeSub || subKeys[0];
  const subData    = category.subcategories[currentSub];
  const images     = subData ? subData.images : [];

  /* Animated total per current category */
  const totalInCategory = Object.values(category.subcategories)
    .reduce((sum, sub) => sum + sub.images.length, 0);
  const animatedCount = useCountUp(images.length, 800);

  /* Count per category pill */
  const getCategoryCount = (catKey) => {
    const cat = CATALOGUE_DATA[catKey];
    return Object.values(cat.subcategories).reduce((sum, sub) => sum + sub.images.length, 0);
  };

  const handleCategoryChange = (key) => {
    setActiveCategory(key);
    setActiveSub(null);
    setSearchResult(null);
  };

  const handleSubChange = (key) => {
    setActiveSub(key);
    setSearchResult(null);
  };

  /* Modal nav */
  const handleModalNav = useCallback((dir) => {
    setModalIndex(prev => (prev + dir + images.length) % images.length);
  }, [images.length]);

  const closeModal = useCallback(() => setModalOpen(false), []);

  const openModal = (idx) => {
    setModalIndex(idx);
    setModalOpen(true);
  };

  /* Handle search result click — jump to that category/sub */
  const handleSearchResult = (item) => {
    setActiveCategory(item.categoryKey);
    setActiveSub(item.subKey);
    setSearchResult(item);
    // Find index in images
    const cat = CATALOGUE_DATA[item.categoryKey];
    const sub = cat.subcategories[item.subKey];
    const idx = sub.images.findIndex(img => img.slug === item.slug);
    if (idx >= 0) {
      setModalIndex(idx);
      setModalOpen(true);
    }
    // Scroll to products
    setTimeout(() => {
      document.getElementById('products')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <>
      {/* Mini card share toast */}
      <div id="card-toast" className="card-share-toast">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6 9 17l-5-5"/></svg>
        Link copied!
      </div>

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

          {/* Search Bar */}
          <div className="mt-3 d-flex justify-content-center">
            <SearchBar onResultClick={handleSearchResult} />
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
                onClick={() => handleSubChange(key)}
              >
                {category.subcategories[key].name}
              </button>
            ))}
          </div>

          {/* Animated Product Count */}
          <div className="product-count-badge text-center mb-4">
            Showing{' '}
            <strong>
              <motion.span
                key={images.length}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {animatedCount}
              </motion.span>
            </strong>{' '}
            products in <strong>{subData?.name}</strong>
            <span className="count-badge-total"> · {totalInCategory} total in {category.name}</span>
          </div>

          {/* Product Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeCategory}-${currentSub}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <Row className="g-3 g-md-4">
                {images.map((img, idx) => (
                  <Col key={`${img.file}-${idx}`} xs={6} sm={6} md={4} lg={3}>
                    <ProductCard
                      image={img}
                      categoryName={category.name}
                      subName={subData?.name}
                      categoryKey={activeCategory}
                      subKey={currentSub}
                      index={idx}
                      onClick={() => openModal(idx)}
                    />
                  </Col>
                ))}
              </Row>
            </motion.div>
          </AnimatePresence>
        </Container>
      </section>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {modalOpen && (
          <ProductDetailModal
            image={images[modalIndex]}
            subData={subData}
            categoryName={category.name}
            images={images}
            index={modalIndex}
            onClose={closeModal}
            onNavigate={handleModalNav}
          />
        )}
      </AnimatePresence>
    </>
  );
}
