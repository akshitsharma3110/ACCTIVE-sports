'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import CATALOGUE_DATA, {
  CATEGORY_KEYS,
  PRODUCTS_BY_SLUG,
  countInCategory,
} from '@/data/catalogueData';
import { whatsappUrl, productEnquiry } from '@/config/site';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';
import SearchBar from '@/components/SearchBar';
import ProductDetailModal from '@/components/ProductDetailModal';
import WhatsAppIcon from '@/components/icons/WhatsAppIcon';

/* ============================================================
   ANIMATED COUNTER HOOK
   ============================================================ */
function useCountUp(target, duration = 1200) {
  const reduceMotion = usePrefersReducedMotion();
  const [count, setCount] = useState(target);
  const rafRef = useRef(null);

  useEffect(() => {
    /* Visitors who asked for reduced motion just get the final number. */
    if (reduceMotion) return;

    let start = null;
    const step = (timestamp) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.round(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration, reduceMotion]);

  return reduceMotion ? target : count;
}

/* ============================================================
   PRODUCT CARD WITH 3D TILT
   ============================================================ */
function ProductCard({ image, categoryName, subName, index, onClick, onCopyLink }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -10, y: x * 10 });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  const waUrl = whatsappUrl(
    productEnquiry({ title: image.title, categoryName, subName })
  );

  return (
    <motion.div
      className="product-card-3d"
      role="button"
      tabIndex={0}
      aria-label={`View details for ${image.title}`}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
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
          width={600}
          height={600}
          loading={index < 8 ? 'eager' : 'lazy'}
          fetchPriority={index < 4 ? 'high' : 'auto'}
          decoding="async"
        />
        <div className="card-overlay">
          <span className="view-btn">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            View Details
          </span>

          {/* Action row: WhatsApp + copy link */}
          <div className="card-action-row" onClick={(e) => e.stopPropagation()}>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="card-action-btn card-wa-btn"
              aria-label={`Enquire about ${image.title} on WhatsApp`}
              title="Enquire on WhatsApp"
            >
              <WhatsAppIcon size={14} />
            </a>
            <button
              type="button"
              className="card-action-btn card-share-btn"
              onClick={(e) => {
                e.stopPropagation();
                onCopyLink(image.slug);
              }}
              aria-label={`Copy link to ${image.title}`}
              title="Copy link"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
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
  const [activeCategory, setActiveCategory] = useState(CATEGORY_KEYS[0]);
  const [activeSub, setActiveSub] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimer = useRef(null);

  const category = CATALOGUE_DATA[activeCategory];
  const subKeys = Object.keys(category.subcategories);
  const currentSub = subKeys.includes(activeSub) ? activeSub : subKeys[0];
  const subData = category.subcategories[currentSub];
  const images = subData.images;

  const totalInCategory = countInCategory(activeCategory);
  const animatedCount = useCountUp(images.length, 800);

  /* ── Deep link: open ?product=<slug> on first load ──
     A shared link has to land on the actual product. The URL can only be read
     in the browser, so this is a deliberate one-time sync on mount — it runs
     once and never re-runs, so there is no cascading-render risk. */
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get('product');
    if (!slug) return;

    const product = PRODUCTS_BY_SLUG.get(slug);
    if (!product) return;

    const idx = CATALOGUE_DATA[product.categoryKey].subcategories[
      product.subKey
    ].images.findIndex((img) => img.slug === slug);
    if (idx < 0) return;

    /* eslint-disable react-hooks/set-state-in-effect -- one-time mount sync, see above */
    setActiveCategory(product.categoryKey);
    setActiveSub(product.subKey);
    setModalIndex(idx);
    setModalOpen(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  /* ── Keep the address bar in sync so "Share Link" and Back both work ── */
  const syncUrl = useCallback((slug) => {
    const url = new URL(window.location.href);
    if (slug) url.searchParams.set('product', slug);
    else url.searchParams.delete('product');
    window.history.replaceState(null, '', url);
  }, []);

  useEffect(() => {
    if (modalOpen) syncUrl(images[modalIndex]?.slug);
    else syncUrl(null);
  }, [modalOpen, modalIndex, images, syncUrl]);

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  const showToast = useCallback(() => {
    setToastVisible(true);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastVisible(false), 1800);
  }, []);

  const copyProductLink = useCallback(
    async (slug) => {
      const url = new URL(window.location.href);
      url.search = '';
      if (slug) url.searchParams.set('product', slug);
      try {
        await navigator.clipboard.writeText(url.toString());
        showToast();
      } catch {
        /* clipboard blocked (http / permissions) — silently ignore */
      }
    },
    [showToast]
  );

  const handleCategoryChange = (key) => {
    setActiveCategory(key);
    setActiveSub(null);
  };

  const handleModalNav = useCallback(
    (dir) => {
      setModalIndex((prev) => (prev + dir + images.length) % images.length);
    },
    [images.length]
  );

  const closeModal = useCallback(() => setModalOpen(false), []);

  const openModal = (idx) => {
    setModalIndex(idx);
    setModalOpen(true);
  };

  /* Jump to a search result and open it */
  const handleSearchResult = (item) => {
    const idx = CATALOGUE_DATA[item.categoryKey].subcategories[
      item.subKey
    ].images.findIndex((img) => img.slug === item.slug);

    setActiveCategory(item.categoryKey);
    setActiveSub(item.subKey);
    if (idx >= 0) {
      setModalIndex(idx);
      setModalOpen(true);
    }
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      {/* Mini "link copied" toast */}
      <div className={`card-share-toast ${toastVisible ? 'visible' : ''}`} role="status" aria-live="polite">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6 9 17l-5-5" /></svg>
        Link copied!
      </div>

      {/* Category Nav */}
      <div className="category-nav-bar" id="category-nav">
        <Container>
          <div className="d-flex justify-content-center gap-2 flex-wrap category-pills-scroll">
            {CATEGORY_KEYS.map((key) => {
              const cat = CATALOGUE_DATA[key];
              const isActive = key === activeCategory;
              return (
                <button
                  key={key}
                  type="button"
                  className={`category-pill ${isActive ? 'active' : ''}`}
                  aria-pressed={isActive}
                  onClick={() => handleCategoryChange(key)}
                >
                  <span aria-hidden="true">{cat.icon}</span> {cat.name}
                  <span className="pill-count">{countInCategory(key)}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-3 d-flex justify-content-center">
            <SearchBar onResultClick={handleSearchResult} />
          </div>
        </Container>
      </div>

      {/* Products */}
      <section className="py-5" id="products" style={{ position: 'relative', zIndex: 1 }}>
        <Container>
          <div className="text-center mb-5">
            <div className="section-tag mb-2">Our Collection</div>
            <h2 className="section-title mb-3">{category.name}</h2>
            <p className="section-desc">{category.description}</p>
          </div>

          {/* Subcategory Tabs */}
          <div className="d-flex justify-content-center gap-2 flex-wrap mb-4 sub-tab-scroll-row">
            {subKeys.map((key) => {
              const isActive = key === currentSub;
              return (
                <button
                  key={key}
                  type="button"
                  className={`sub-tab ${isActive ? 'active' : ''}`}
                  aria-pressed={isActive}
                  onClick={() => setActiveSub(key)}
                >
                  {category.subcategories[key].name}
                </button>
              );
            })}
          </div>

          {/* Count */}
          <div className="product-count-badge text-center mb-4" aria-live="polite">
            Showing <strong>{animatedCount}</strong> products in <strong>{subData.name}</strong>
            <span className="count-badge-total"> · {totalInCategory} total in {category.name}</span>
          </div>

          {/* Grid */}
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
                  <Col key={img.slug} xs={6} sm={6} md={4} lg={3}>
                    <ProductCard
                      image={img}
                      categoryName={category.name}
                      subName={subData.name}
                      index={idx}
                      onClick={() => openModal(idx)}
                      onCopyLink={copyProductLink}
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
