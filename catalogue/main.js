// ============================================================
// ACCTIVE SPORTS INDUSTRIES — CATALOGUE ENGINE
// Product Data, Rendering, Filtering, Lightbox, Animations
// ============================================================

// --- Product Data ---
const CATALOGUE_DATA = {
  "collar-tshirts": {
    name: "Collar T-Shirts",
    icon: "👔",
    description: "Premium polo & collar tees with vivid sublimation prints and classic sap mattie finishes.",
    subcategories: {
      "front-back-sublimation": {
        name: "Front & Back Sublimation",
        images: Array.from({ length: 16 }, (_, i) => ({
          file: `CFB${i + 1}.jpeg`,
          path: `/INDIAMART CATALOUGE/COLLAR TSHIRTS/FRONT & BACK SUBLIMATION/CFB${i + 1}.jpeg`,
          title: `Collar F&B Sublimation Design ${i + 1}`,
        })),
      },
      "full-sublimation": {
        name: "Full Sublimation",
        images: Array.from({ length: 16 }, (_, i) => {
          const num = i + 1;
          if (num === 12) return null; // CFULL12 missing from listing
          return {
            file: `CFULL${num}.jpeg`,
            path: `/INDIAMART CATALOUGE/COLLAR TSHIRTS/FULL SUBLIMATION/CFULL${num}.jpeg`,
            title: `Collar Full Sublimation Design ${num}`,
          };
        }).filter(Boolean),
      },
      "sap-mattie": {
        name: "SAP Mattie",
        images: [
          "AIR FORCE", "BLACK", "MAROON", "MINT", "NAVY",
          "OCEAN BLUE", "OLIVE", "ONION", "PEACH", "RED",
          "ROYAL BLUE", "SKY", "T BLUE", "WHITE", "YELLOW"
        ].map(color => ({
          file: `${color} SAP MATTIE.jpeg`,
          path: `/INDIAMART CATALOUGE/COLLAR TSHIRTS/SAP MATTIE/${color} SAP MATTIE.jpeg`,
          title: `${color.charAt(0) + color.slice(1).toLowerCase()} Sap Mattie`,
        })),
      },
    },
  },
  "round-neck-tshirts": {
    name: "Round Neck T-Shirts",
    icon: "👕",
    description: "Versatile round neck tees — from bold full sublimation to clean plain styles.",
    subcategories: {
      "front-back-sublimation": {
        name: "Front & Back Sublimation",
        images: Array.from({ length: 15 }, (_, i) => ({
          file: `FB${i + 1}.jpeg`,
          path: `/INDIAMART CATALOUGE/ROUND NECK TSHIRTS/FRONT & BACK SUBLIMATION/FB${i + 1}.jpeg`,
          title: `Round Neck F&B Design ${i + 1}`,
        })),
      },
      "front-sublimation": {
        name: "Front Sublimation",
        images: Array.from({ length: 15 }, (_, i) => ({
          file: `F${i + 1}.jpeg`,
          path: `/INDIAMART CATALOUGE/ROUND NECK TSHIRTS/FRONT SUBLIMATION/F${i + 1}.jpeg`,
          title: `Round Neck Front Design ${i + 1}`,
        })),
      },
      "full-sublimation": {
        name: "Full Sublimation",
        images: Array.from({ length: 15 }, (_, i) => ({
          file: `FULL${i + 1}.jpeg`,
          path: `/INDIAMART CATALOUGE/ROUND NECK TSHIRTS/FULL SUBLIMATION/FULL${i + 1}.jpeg`,
          title: `Round Neck Full Sublimation ${i + 1}`,
        })),
      },
      "plain": {
        name: "Plain T-Shirts",
        images: [
          "AIR FORCE", "BISLERI GREEN", "BLACK", "DARK GREY",
          "LIGHT GREY", "NAVY", "NEON ORANGE", "RED",
          "ROYAL BLUE", "T BLUE", "WHITE", "YELLOW"
        ].map(color => ({
          file: `${color}.jpeg`,
          path: `/INDIAMART CATALOUGE/ROUND NECK TSHIRTS/PLAIN T SHIRTS/${color}.jpeg`,
          title: `${color.charAt(0) + color.slice(1).toLowerCase()} Plain Tee`,
        })),
      },
    },
  },
  shorts: {
    name: "Shorts",
    icon: "🩳",
    description: "Performance shorts in elite knit, lycra, and spandex blends for maximum comfort.",
    subcategories: {
      "elite-knit": {
        name: "Elite / Dot Knit / PMC / Heavy Knit / Diagonal",
        images: Array.from({ length: 4 }, (_, i) => ({
          file: `190_${i + 1}.jpeg`,
          path: `/INDIAMART CATALOUGE/SHORTS/ELITE, DOT KNIT, PMC, HEAVY KNIT, DIAGONAL SHORTS/190_${i + 1}.jpeg`,
          title: `Elite Knit Shorts Design ${i + 1}`,
        })),
      },
      "lycra-spandex": {
        name: "Lycra / Knitted Lycra (Spandex)",
        images: Array.from({ length: 4 }, (_, i) => ({
          file: `KL${i + 1}.jpeg`,
          path: `/INDIAMART CATALOUGE/SHORTS/LYCRA, KNITTED LYCRA (SPANDEX) SHORTS/KL${i + 1}.jpeg`,
          title: `Lycra Spandex Shorts Design ${i + 1}`,
        })),
      },
      "ns-lycra": {
        name: "NS Lycra",
        images: Array.from({ length: 4 }, (_, i) => ({
          file: `NS${i + 1}.jpeg`,
          path: `/INDIAMART CATALOUGE/SHORTS/NS LYCRA SHORTS/NS${i + 1}.jpeg`,
          title: `NS Lycra Shorts Design ${i + 1}`,
        })),
      },
    },
  },
  lowers: {
    name: "Lowers",
    icon: "👖",
    description: "Track pants and lowers in diagonal knit, elite PMC, and premium lycra fabrics.",
    subcategories: {
      "diagonal-knit": {
        name: "Diagonal / Heavy Knit / Adidas Knit",
        images: Array.from({ length: 5 }, (_, i) => ({
          file: `L${i + 1}.jpeg`,
          path: `/INDIAMART CATALOUGE/LOWERS/DIAGONAL, HEAVY KNIT, ADIDAS KNIT LOWERS/L${i + 1}.jpeg`,
          title: `Diagonal Knit Lower Design ${i + 1}`,
        })),
      },
      "elite-pmc": {
        name: "Elite / Heavy PMC",
        images: Array.from({ length: 5 }, (_, i) => ({
          file: `EHPMC${i + 1}.jpeg`,
          path: `/INDIAMART CATALOUGE/LOWERS/ELITE, HEAVY PMC LOWERS/EHPMC${i + 1}.jpeg`,
          title: `Elite PMC Lower Design ${i + 1}`,
        })),
      },
      "lycra-ns": {
        name: "Lycra / NS Lycra",
        images: Array.from({ length: 5 }, (_, i) => ({
          file: `LNS${i + 1}.jpeg`,
          path: `/INDIAMART CATALOUGE/LOWERS/LYCRA, NS LYCRA LOWERS/LNS${i + 1}.jpeg`,
          title: `Lycra NS Lower Design ${i + 1}`,
        })),
      },
    },
  },
  tracksuits: {
    name: "Tracksuits",
    icon: "🏃",
    description: "Complete tracksuit sets in lycra, superpoly, and TPU materials for athletes.",
    subcategories: {
      lycra: {
        name: "Lycra Tracksuit",
        images: Array.from({ length: 5 }, (_, i) => ({
          file: `LY${i + 1}.jpeg`,
          path: `/INDIAMART CATALOUGE/TRACKSUITS/LYCRA TRACKSUIT/LY${i + 1}.jpeg`,
          title: `Lycra Tracksuit Design ${i + 1}`,
        })),
      },
      "ns-lycra": {
        name: "NS Lycra Tracksuit",
        images: Array.from({ length: 5 }, (_, i) => ({
          file: `NSL${i + 1}.jpeg`,
          path: `/INDIAMART CATALOUGE/TRACKSUITS/NS LYCRA TRACKSUIT/NSL${i + 1}.jpeg`,
          title: `NS Lycra Tracksuit Design ${i + 1}`,
        })),
      },
      tpu: {
        name: "TPU Tracksuit",
        images: Array.from({ length: 5 }, (_, i) => ({
          file: `TPU${i + 1}.jpeg`,
          path: `/INDIAMART CATALOUGE/TRACKSUITS/TPU TRACKSUIT/TPU${i + 1}.jpeg`,
          title: `TPU Tracksuit Design ${i + 1}`,
        })),
      },
    },
  },
};

// --- State ---
let currentCategory = "collar-tshirts";
let currentSubcategory = null;
let lightboxImages = [];
let lightboxIndex = 0;

// --- DOM References ---
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// --- Initialization ---
document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initCategoryNav();
  renderCategory(currentCategory);
  initLightbox();
  initScrollReveal();
  initSmoothScroll();
});

// --- Navbar scroll effect ---
function initNavbar() {
  const navbar = $(".navbar");
  const toggle = $(".nav-toggle");
  const links = $(".nav-links");

  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  });

  if (toggle) {
    toggle.addEventListener("click", () => {
      links.classList.toggle("open");
      toggle.classList.toggle("active");
    });

    // Close mobile menu on link click
    $$(".nav-links a").forEach((a) => {
      a.addEventListener("click", () => {
        links.classList.remove("open");
        toggle.classList.remove("active");
      });
    });
  }
}

// --- Category Navigation ---
function initCategoryNav() {
  const pills = $$(".category-pill");
  pills.forEach((pill) => {
    pill.addEventListener("click", () => {
      const cat = pill.dataset.category;
      if (cat === currentCategory) return;

      pills.forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");

      currentCategory = cat;
      currentSubcategory = null;
      renderCategory(cat);

      // Smooth scroll to products section
      const productsSection = $("#products");
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

// --- Render Category ---
function renderCategory(categoryKey) {
  const category = CATALOGUE_DATA[categoryKey];
  if (!category) return;

  const container = $(".products-container");

  // Update section header
  const sectionTitle = $("#products .section-title");
  const sectionDesc = $("#products .section-desc");
  if (sectionTitle) sectionTitle.textContent = category.name;
  if (sectionDesc) sectionDesc.textContent = category.description;

  // Build subcategory tabs
  const subKeys = Object.keys(category.subcategories);
  if (!currentSubcategory) currentSubcategory = subKeys[0];

  let tabsHTML = '<div class="subcategory-tabs">';
  subKeys.forEach((key) => {
    const sub = category.subcategories[key];
    const isActive = key === currentSubcategory ? "active" : "";
    tabsHTML += `<button class="sub-tab ${isActive}" data-sub="${key}">${sub.name}</button>`;
  });
  tabsHTML += "</div>";

  // Get images for current subcategory
  const subData = category.subcategories[currentSubcategory];
  const images = subData ? subData.images : [];

  // Count badge
  let countHTML = `<div class="product-count-badge">Showing <strong>${images.length}</strong> products in <strong>${subData.name}</strong></div>`;

  // Build product grid
  let gridHTML = '<div class="product-grid">';
  images.forEach((img, idx) => {
    gridHTML += `
      <div class="product-card" data-index="${idx}" style="animation-delay: ${idx * 0.06}s">
        <div class="card-image-wrapper">
          <img data-src="${img.path}" alt="${img.title}" loading="lazy" />
          <div class="card-overlay">
            <button class="view-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              View Full Size
            </button>
          </div>
        </div>
        <div class="card-info">
          <div class="card-category-tag">${category.name} — ${subData.name}</div>
          <h3 class="card-title">${img.title}</h3>
        </div>
      </div>
    `;
  });
  gridHTML += "</div>";

  container.innerHTML = tabsHTML + countHTML + gridHTML;

  // Bind sub-tab clicks
  container.querySelectorAll(".sub-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      currentSubcategory = tab.dataset.sub;
      renderCategory(currentCategory);
    });
  });

  // Bind card clicks for lightbox
  lightboxImages = images;
  container.querySelectorAll(".product-card").forEach((card) => {
    card.addEventListener("click", () => {
      const idx = parseInt(card.dataset.index);
      openLightbox(idx);
    });
  });

  // Lazy-load images with IntersectionObserver
  lazyLoadImages();
}

// --- Lazy Loading ---
function lazyLoadImages() {
  const images = $$(".card-image-wrapper img[data-src]");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.onload = () => img.classList.add("loaded");
            img.onerror = () => {
              img.classList.add("loaded");
              img.style.objectFit = "contain";
              img.alt = "Image not available";
            };
            observer.unobserve(img);
          }
        });
      },
      { rootMargin: "200px" }
    );

    images.forEach((img) => observer.observe(img));
  } else {
    // Fallback
    images.forEach((img) => {
      img.src = img.dataset.src;
      img.onload = () => img.classList.add("loaded");
    });
  }
}

// --- Lightbox ---
function initLightbox() {
  const lightbox = $(".lightbox");
  const backdrop = $(".lightbox-backdrop");
  const closeBtn = $(".lightbox-close");
  const prevBtn = $(".lightbox-prev");
  const nextBtn = $(".lightbox-next");

  backdrop.addEventListener("click", closeLightbox);
  closeBtn.addEventListener("click", closeLightbox);
  prevBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    navigateLightbox(-1);
  });
  nextBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    navigateLightbox(1);
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") navigateLightbox(-1);
    if (e.key === "ArrowRight") navigateLightbox(1);
  });
}

function openLightbox(index) {
  lightboxIndex = index;
  const lightbox = $(".lightbox");
  lightbox.classList.add("active");
  document.body.style.overflow = "hidden";
  updateLightboxContent();
}

function closeLightbox() {
  const lightbox = $(".lightbox");
  lightbox.classList.remove("active");
  document.body.style.overflow = "";
}

function navigateLightbox(dir) {
  lightboxIndex =
    (lightboxIndex + dir + lightboxImages.length) % lightboxImages.length;
  updateLightboxContent();
}

function updateLightboxContent() {
  const img = lightboxImages[lightboxIndex];
  if (!img) return;
  const lightboxImg = $(".lightbox-content img");
  const lightboxTitle = $(".lightbox-info h3");
  const lightboxDesc = $(".lightbox-info p");

  lightboxImg.src = img.path;
  lightboxImg.alt = img.title;
  if (lightboxTitle) lightboxTitle.textContent = img.title;
  if (lightboxDesc)
    lightboxDesc.textContent = `${lightboxIndex + 1} of ${lightboxImages.length}`;
}

// --- Scroll Reveal ---
function initScrollReveal() {
  const reveals = $$(".reveal");
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );

  reveals.forEach((el) => observer.observe(el));
}

// --- Smooth Scroll for anchor links ---
function initSmoothScroll() {
  $$('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}
