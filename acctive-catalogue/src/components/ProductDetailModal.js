'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WA_NUMBER = '919997100375';

/* ============================================================
   TOAST NOTIFICATION
   ============================================================ */
function Toast({ message, visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="toast-notification"
          initial={{ opacity: 0, y: 20, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.92 }}
          transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5"/>
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
      <span className="spec-icon">{icon}</span>
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
export default function ProductDetailModal({ image, subData, categoryName, images, index, onClose, onNavigate }) {
  const [toast, setToast]   = useState({ visible: false, message: '' });
  const [imgLoaded, setImgLoaded] = useState(false);
  const overlayRef = useRef(null);

  const showToast = (message) => {
    setToast({ visible: true, message });
    setTimeout(() => setToast({ visible: false, message: '' }), 2200);
  };

  /* Lock body scroll & keyboard nav */
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') { setImgLoaded(false); onNavigate(-1); }
      if (e.key === 'ArrowRight') { setImgLoaded(false); onNavigate(1); }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onNavigate]);

  /* Reset image load state on navigation */
  useEffect(() => { setImgLoaded(false); }, [image]);

  if (!image) return null;
  const specs = subData?.specs;

  /* WhatsApp enquiry URL */
  const waText = encodeURIComponent(
    `Hi ACCTIVE Sports! I'm interested in:\n*${image.title}*\n(${categoryName} — ${subData?.name})\n\nPlease share price & availability.`
  );
  const waUrl = `https://wa.me/${WA_NUMBER}?text=${waText}`;

  /* Share / copy URL */
  const handleShare = async () => {
    const shareUrl = `${window.location.href.split('?')[0]}?product=${image.slug || ''}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      showToast('Link copied to clipboard!');
    } catch {
      showToast('Copy this URL: ' + shareUrl);
    }
  };

  /* PDF / Print */
  const handlePrint = () => {
    window.print();
  };

  /* Backdrop click */
  const handleBackdropClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

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
      {/* Toast */}
      <Toast visible={toast.visible} message={toast.message} />

      {/* Prev Button */}
      <button className="pdm-nav pdm-prev" onClick={() => { setImgLoaded(false); onNavigate(-1); }} aria-label="Previous">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
      </button>

      {/* Modal Panel */}
      <motion.div
        className="pdm-panel"
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button className="pdm-close" onClick={onClose} aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6 6 18M6 6l12 12"/>
          </svg>
        </button>

        {/* Image Side */}
        <div className="pdm-image-side">
          <div className="pdm-image-wrapper">
            {!imgLoaded && <div className="pdm-img-skeleton" />}
            <img
              src={image.path}
              alt={image.title}
              className={`pdm-img ${imgLoaded ? 'loaded' : ''}`}
              onLoad={() => setImgLoaded(true)}
              onError={(e) => { e.target.style.objectFit = 'contain'; setImgLoaded(true); }}
            />
          </div>

          {/* Thumbnail strip (up to 5 adjacent) */}
          {images && images.length > 1 && (
            <div className="pdm-thumb-strip">
              {images.slice(Math.max(0, index - 2), Math.min(images.length, index + 3)).map((img, i) => {
                const actualIdx = Math.max(0, index - 2) + i;
                return (
                  <button
                    key={img.slug || i}
                    className={`pdm-thumb ${actualIdx === index ? 'active' : ''}`}
                    onClick={() => { setImgLoaded(false); onNavigate(actualIdx - index); }}
                    aria-label={img.title}
                  >
                    <img src={img.path} alt={img.title} loading="lazy" onError={(e) => { e.target.style.objectFit = 'contain'; }} />
                  </button>
                );
              })}
            </div>
          )}

          {/* Counter */}
          {images && (
            <div className="pdm-counter">{index + 1} / {images.length}</div>
          )}
        </div>

        {/* Info Side */}
        <div className="pdm-info-side">
          {/* Breadcrumb */}
          <div className="pdm-breadcrumb">
            <span>{categoryName}</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m9 18 6-6-6-6"/></svg>
            <span>{subData?.name}</span>
          </div>

          {/* Title */}
          <h2 className="pdm-title">{image.title}</h2>

          {/* Specs */}
          {specs && (
            <div className="pdm-specs">
              <h4 className="pdm-specs-heading">Product Specifications</h4>
              <div className="pdm-specs-grid">
                <SpecRow icon="🧵" label="Fabric" value={specs.fabric} />
                <SpecRow icon="🎨" label="Print Type" value={specs.printType} />
                <SpecRow icon="📦" label="Min. Order" value={specs.moq} />
                <SpecRow icon="📏" label="Sizes" value={specs.sizes} />
                {specs.weight && <SpecRow icon="⚖️" label="GSM Weight" value={specs.weight} />}
              </div>
            </div>
          )}

          {/* CTA Buttons */}
          <div className="pdm-actions">
            {/* WhatsApp Enquiry */}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pdm-btn pdm-btn-whatsapp"
              id={`pdm-whatsapp-${image.slug}`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
              </svg>
              Enquire on WhatsApp
            </a>

            {/* Share Link */}
            <button className="pdm-btn pdm-btn-share" onClick={handleShare} id={`pdm-share-${image.slug}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
              </svg>
              Share Link
            </button>

            {/* Download / Print */}
            <button className="pdm-btn pdm-btn-print" onClick={handlePrint} id={`pdm-print-${image.slug}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
                <rect x="6" y="14" width="12" height="8"/>
              </svg>
              Download / Print
            </button>
          </div>

          {/* Enquiry note */}
          <p className="pdm-note">
            💡 Custom designs, colours &amp; sizes available on request. WhatsApp us for a quick quote!
          </p>
        </div>
      </motion.div>

      {/* Next Button */}
      <button className="pdm-nav pdm-next" onClick={() => { setImgLoaded(false); onNavigate(1); }} aria-label="Next">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </button>
    </motion.div>
  );
}
