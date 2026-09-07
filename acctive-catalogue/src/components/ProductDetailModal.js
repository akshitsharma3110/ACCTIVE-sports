'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { whatsappUrl, productEnquiry } from '@/config/site';
import WhatsAppIcon from '@/components/icons/WhatsAppIcon';

/* ============================================================
   TOAST NOTIFICATION
   ============================================================ */
function Toast({ message, visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="toast-notification"
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: 20, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.92 }}
          transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ============================================================
   SPEC ROW
   ============================================================ */
function SpecRow({ label, value, icon }) {
  return (
    <div className="spec-row">
      <span className="spec-icon" aria-hidden="true">{icon}</span>
      <div className="spec-content">
        <span className="spec-label">{label}</span>
        <span className="spec-value">{value}</span>
      </div>
    </div>
  );
}

/* ============================================================
   PRODUCT DETAIL MODAL
   ============================================================ */
export default function ProductDetailModal({
  image,
  subData,
  categoryName,
  images,
  index,
  onClose,
  onNavigate,
}) {
  const [toast, setToast] = useState({ visible: false, message: '' });
  /* Track which image finished loading rather than resetting a flag in an
     effect — moving to another product derives the skeleton state for free. */
  const [loadedSlug, setLoadedSlug] = useState(null);
  const imgLoaded = loadedSlug === image?.slug;
  const overlayRef = useRef(null);
  const panelRef = useRef(null);
  const toastTimer = useRef(null);

  const showToast = (message) => {
    setToast({ visible: true, message });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast({ visible: false, message: '' }), 2200);
  };

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  /* Lock body scroll, move focus into the dialog, wire keyboard navigation */
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement;
    document.body.style.overflow = 'hidden';
    panelRef.current?.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate(-1);
      if (e.key === 'ArrowRight') onNavigate(1);
    };
    document.addEventListener('keydown', onKey);

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, [onClose, onNavigate]);

  if (!image) return null;
  const specs = subData?.specs;

  const waUrl = whatsappUrl(
    productEnquiry({ title: image.title, categoryName, subName: subData?.name })
  );

  const handleShare = async () => {
    const url = new URL(window.location.href);
    url.search = '';
    url.searchParams.set('product', image.slug);
    const shareUrl = url.toString();

    /* Native share sheet on mobile, clipboard everywhere else. */
    if (navigator.share) {
      try {
        await navigator.share({ title: image.title, url: shareUrl });
        return;
      } catch {
        /* user dismissed the sheet — fall through to copying */
      }
    }
    try {
      await navigator.clipboard.writeText(shareUrl);
      showToast('Link copied to clipboard!');
    } catch {
      showToast(shareUrl);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  const thumbStart = Math.max(0, Math.min(index - 2, images.length - 5));
  const thumbs = images.slice(thumbStart, thumbStart + 5);

  return (
    <motion.div
      ref={overlayRef}
      className="pdm-overlay"
      onClick={handleBackdropClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <Toast visible={toast.visible} message={toast.message} />

      {images.length > 1 && (
        <button type="button" className="pdm-nav pdm-prev" onClick={() => onNavigate(-1)} aria-label="Previous product">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      )}

      <motion.div
        ref={panelRef}
        className="pdm-panel"
        role="dialog"
        aria-modal="true"
        aria-label={`${image.title} — product details`}
        tabIndex={-1}
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="pdm-close" onClick={onClose} aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Image side */}
        <div className="pdm-image-side">
          <div className="pdm-image-wrapper">
            {!imgLoaded && <div className="pdm-img-skeleton" />}
            <img
              key={image.slug}
              src={image.path}
              alt={image.title}
              className={`pdm-img ${imgLoaded ? 'loaded' : ''}`}
              onLoad={() => setLoadedSlug(image.slug)}
              onError={() => setLoadedSlug(image.slug)}
            />
          </div>

          {images.length > 1 && (
            <div className="pdm-thumb-strip">
              {thumbs.map((img, i) => {
                const actualIdx = thumbStart + i;
                return (
                  <button
                    key={img.slug}
                    type="button"
                    className={`pdm-thumb ${actualIdx === index ? 'active' : ''}`}
                    onClick={() => onNavigate(actualIdx - index)}
                    aria-label={img.title}
                    aria-current={actualIdx === index ? 'true' : undefined}
                  >
                    <img src={img.path} alt="" loading="lazy" decoding="async" />
                  </button>
                );
              })}
            </div>
          )}

          <div className="pdm-counter">{index + 1} / {images.length}</div>
        </div>

        {/* Info side */}
        <div className="pdm-info-side">
          <div className="pdm-breadcrumb">
            <span>{categoryName}</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
            <span>{subData?.name}</span>
          </div>

          <h2 className="pdm-title">{image.title}</h2>

          {specs && (
            <div className="pdm-specs">
              <h3 className="pdm-specs-heading">Product Specifications</h3>
              <div className="pdm-specs-grid">
                <SpecRow icon="🧵" label="Fabric" value={specs.fabric} />
                <SpecRow icon="🎨" label="Print Type" value={specs.printType} />
                <SpecRow icon="📦" label="Min. Order" value={specs.moq} />
                <SpecRow icon="📏" label="Sizes" value={specs.sizes} />
                {specs.weight && <SpecRow icon="⚖️" label="GSM Weight" value={specs.weight} />}
              </div>
            </div>
          )}

          <div className="pdm-actions">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pdm-btn pdm-btn-whatsapp"
            >
              <WhatsAppIcon size={18} />
              Enquire on WhatsApp
            </a>

            <button type="button" className="pdm-btn pdm-btn-share" onClick={handleShare}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
              Share Link
            </button>

            <button type="button" className="pdm-btn pdm-btn-print" onClick={() => window.print()}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 6 2 18 2 18 9" /><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                <rect x="6" y="14" width="12" height="8" />
              </svg>
              Download / Print
            </button>
          </div>

          <p className="pdm-note">
            Custom designs, colours &amp; sizes available on request — WhatsApp us for a quick quote.
          </p>
        </div>
      </motion.div>

      {images.length > 1 && (
        <button type="button" className="pdm-nav pdm-next" onClick={() => onNavigate(1)} aria-label="Next product">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      )}
    </motion.div>
  );
}
