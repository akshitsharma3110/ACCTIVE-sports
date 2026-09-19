// ============================================================
// ACCTIVE SPORTS INDUSTRIES — COMPLETE PRODUCT DATA
// Includes specs + tags for search and product detail modal
// ============================================================

const CATALOGUE_DATA = {
  "collar-tshirts": {
    name: "Collar T-Shirts",
    icon: "👔",
    description: "Premium polo & collar tees with vivid sublimation prints and classic sap mattie finishes.",
    subcategories: {
      "front-back-sublimation": {
        name: "Front & Back Sublimation",
        specs: {
          fabric: "Polyester",
          printType: "Front & Back Sublimation",
          moq: "10 pieces",
          sizes: "S, M, L, XL, XXL",
          weight: "160–180 GSM",
        },
        tags: ["collar", "sublimation", "front back", "polo", "superpoly"],
        images: Array.from({ length: 16 }, (_, i) => ({
          file: `CFB${i + 1}.jpeg`,
          path: `/images/COLLAR TSHIRTS/FRONT & BACK SUBLIMATION/CFB${i + 1}.jpeg`,
          title: `Collar F&B Sublimation Design ${i + 1}`,
          slug: `collar-fb-${i + 1}`,
        })),
      },
      "full-sublimation": {
        name: "Full Sublimation",
        specs: {
          fabric: "Polyester",
          printType: "Full Body Sublimation",
          moq: "10 pieces",
          sizes: "S, M, L, XL, XXL",
          weight: "160–180 GSM",
        },
        tags: ["collar", "full sublimation", "polo", "allover print"],
        images: Array.from({ length: 16 }, (_, i) => {
          const num = i + 1;
          if (num === 12) return null;
          return {
            file: `CFULL${num}.jpeg`,
            path: `/images/COLLAR TSHIRTS/FULL SUBLIMATION/CFULL${num}.jpeg`,
            title: `Collar Full Sublimation Design ${num}`,
            slug: `collar-full-${num}`,
          };
        }).filter(Boolean),
      },
      "sap-mattie": {
        name: "SAP Mattie",
        specs: {
          fabric: "SAP Mattie",
          printType: "Solid / Plain",
          moq: "10 pieces",
          sizes: "S, M, L, XL, XXL",
          weight: "180–200 GSM",
        },
        tags: ["collar", "sap mattie", "plain", "solid colour", "polo"],
        images: [
          "AIR FORCE", "BLACK", "MAROON", "MINT", "NAVY",
          "OCEAN BLUE", "OLIVE", "ONION", "PEACH", "RED",
          "ROYAL BLUE", "SKY", "T BLUE", "WHITE", "YELLOW"
        ].map(color => ({
          file: `${color} SAP MATTIE.jpeg`,
          path: `/images/COLLAR TSHIRTS/SAP MATTIE/${color} SAP MATTIE.jpeg`,
          title: `${color.charAt(0) + color.slice(1).toLowerCase()} Sap Mattie`,
          slug: `collar-sap-${color.toLowerCase().replace(/ /g, '-')}`,
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
        specs: {
          fabric: "Polyester",
          printType: "Front & Back Sublimation",
          moq: "10 pieces",
          sizes: "S, M, L, XL, XXL",
          weight: "155–175 GSM",
        },
        tags: ["round neck", "sublimation", "front back", "tshirt"],
        images: Array.from({ length: 15 }, (_, i) => ({
          file: `FB${i + 1}.jpeg`,
          path: `/images/ROUND NECK TSHIRTS/FRONT & BACK SUBLIMATION/FB${i + 1}.jpeg`,
          title: `Round Neck F&B Design ${i + 1}`,
          slug: `rn-fb-${i + 1}`,
        })),
      },
      "front-sublimation": {
        name: "Front Sublimation",
        specs: {
          fabric: "Polyester",
          printType: "Front Sublimation",
          moq: "10 pieces",
          sizes: "S, M, L, XL, XXL",
          weight: "155–175 GSM",
        },
        tags: ["round neck", "front sublimation", "tshirt", "chest print"],
        images: Array.from({ length: 15 }, (_, i) => ({
          file: `F${i + 1}.jpeg`,
          path: `/images/ROUND NECK TSHIRTS/FRONT SUBLIMATION/F${i + 1}.jpeg`,
          title: `Round Neck Front Design ${i + 1}`,
          slug: `rn-front-${i + 1}`,
        })),
      },
      "full-sublimation": {
        name: "Full Sublimation",
        specs: {
          fabric: "Polyester",
          printType: "Full Body Sublimation",
          moq: "10 pieces",
          sizes: "S, M, L, XL, XXL",
          weight: "155–175 GSM",
        },
        tags: ["round neck", "full sublimation", "allover print", "tshirt"],
        images: Array.from({ length: 15 }, (_, i) => ({
          file: `FULL${i + 1}.jpeg`,
          path: `/images/ROUND NECK TSHIRTS/FULL SUBLIMATION/FULL${i + 1}.jpeg`,
          title: `Round Neck Full Sublimation ${i + 1}`,
          slug: `rn-full-${i + 1}`,
        })),
      },
      "plain": {
        name: "Plain T-Shirts",
        specs: {
          fabric: "Polyester / Microfibre",
          printType: "Plain / Solid",
          moq: "10 pieces",
          sizes: "S, M, L, XL, XXL",
          weight: "160 GSM",
        },
        tags: ["round neck", "plain", "solid", "tshirt", "blank"],
        images: [
          "AIR FORCE", "BISLERI GREEN", "BLACK", "DARK GREY",
          "LIGHT GREY", "NAVY", "NEON ORANGE", "RED",
          "ROYAL BLUE", "T BLUE", "WHITE", "YELLOW"
        ].map(color => ({
          file: `${color}.jpeg`,
          path: `/images/ROUND NECK TSHIRTS/PLAIN T SHIRTS/${color}.jpeg`,
          title: `${color.charAt(0) + color.slice(1).toLowerCase()} Plain Tee`,
          slug: `rn-plain-${color.toLowerCase().replace(/ /g, '-')}`,
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
        specs: {
          fabric: "Elite Knit / PMC / Diagonal Knit",
          printType: "Sublimation / Solid",
          moq: "10 pieces",
          sizes: "S, M, L, XL, XXL",
          weight: "200–230 GSM",
        },
        tags: ["shorts", "elite knit", "pmc", "diagonal", "heavy knit"],
        images: Array.from({ length: 4 }, (_, i) => ({
          file: `190_${i + 1}.jpeg`,
          path: `/images/SHORTS/ELITE, DOT KNIT, PMC, HEAVY KNIT, DIAGONAL SHORTS/190_${i + 1}.jpeg`,
          title: `Elite Knit Shorts Design ${i + 1}`,
          slug: `shorts-elite-${i + 1}`,
        })),
      },
      "lycra-spandex": {
        name: "Lycra / Knitted Lycra (Spandex)",
        specs: {
          fabric: "Lycra / Knitted Lycra (Spandex)",
          printType: "Sublimation / Solid",
          moq: "10 pieces",
          sizes: "S, M, L, XL, XXL",
          weight: "180–210 GSM",
        },
        tags: ["shorts", "lycra", "spandex", "stretch", "athletic"],
        images: Array.from({ length: 4 }, (_, i) => ({
          file: `KL${i + 1}.jpeg`,
          path: `/images/SHORTS/LYCRA, KNITTED LYCRA (SPANDEX) SHORTS/KL${i + 1}.jpeg`,
          title: `Lycra Spandex Shorts Design ${i + 1}`,
          slug: `shorts-lycra-${i + 1}`,
        })),
      },
      "ns-lycra": {
        name: "NS Lycra",
        specs: {
          fabric: "NS Lycra",
          printType: "Sublimation / Solid",
          moq: "10 pieces",
          sizes: "S, M, L, XL, XXL",
          weight: "180–200 GSM",
        },
        tags: ["shorts", "ns lycra", "nylon", "stretch", "performance"],
        images: Array.from({ length: 4 }, (_, i) => ({
          file: `NS${i + 1}.jpeg`,
          path: `/images/SHORTS/NS LYCRA SHORTS/NS${i + 1}.jpeg`,
          title: `NS Lycra Shorts Design ${i + 1}`,
          slug: `shorts-ns-${i + 1}`,
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
        specs: {
          fabric: "Diagonal / Heavy Knit / Adidas Knit",
          printType: "Sublimation / Solid",
          moq: "10 pieces",
          sizes: "S, M, L, XL, XXL",
          weight: "220–250 GSM",
        },
        tags: ["lowers", "track pants", "diagonal knit", "heavy knit", "adidas"],
        images: Array.from({ length: 5 }, (_, i) => ({
          file: `L${i + 1}.jpeg`,
          path: `/images/LOWERS/DIAGONAL, HEAVY KNIT, ADIDAS KNIT LOWERS/L${i + 1}.jpeg`,
          title: `Diagonal Knit Lower Design ${i + 1}`,
          slug: `lowers-diagonal-${i + 1}`,
        })),
      },
      "elite-pmc": {
        name: "Elite / Heavy PMC",
        specs: {
          fabric: "Elite / Heavy PMC",
          printType: "Sublimation / Solid",
          moq: "10 pieces",
          sizes: "S, M, L, XL, XXL",
          weight: "200–230 GSM",
        },
        tags: ["lowers", "track pants", "elite", "pmc", "heavy"],
        images: Array.from({ length: 5 }, (_, i) => ({
          file: `EHPMC${i + 1}.jpeg`,
          path: `/images/LOWERS/ELITE, HEAVY PMC LOWERS/EHPMC${i + 1}.jpeg`,
          title: `Elite PMC Lower Design ${i + 1}`,
          slug: `lowers-elite-${i + 1}`,
        })),
      },
      "lycra-ns": {
        name: "Lycra / NS Lycra",
        specs: {
          fabric: "Lycra / NS Lycra",
          printType: "Sublimation / Solid",
          moq: "10 pieces",
          sizes: "S, M, L, XL, XXL",
          weight: "180–210 GSM",
        },
        tags: ["lowers", "track pants", "lycra", "ns lycra", "stretch"],
        images: Array.from({ length: 5 }, (_, i) => ({
          file: `LNS${i + 1}.jpeg`,
          path: `/images/LOWERS/LYCRA, NS LYCRA LOWERS/LNS${i + 1}.jpeg`,
          title: `Lycra NS Lower Design ${i + 1}`,
          slug: `lowers-lycra-${i + 1}`,
        })),
      },
    },
  },

  jackets: {
    name: "Jackets",
    icon: "🧥",
    description: "Premium Track Jackets in Butter NS fabric — soft touch, breathable, windproof & lightweight for all-day performance.",
    subcategories: {
      "butter-ns": {
        name: "Track Jacket — Butter NS",
        specs: {
          fabric: "Polyester",
          printType: "Full Body Sublimation",
          moq: "10 pieces",
          sizes: "S, M, L, XL, XXL",
          weight: "200–230 GSM",
        },
        tags: ["jacket", "track jacket", "butter ns", "sublimation", "windproof", "breathable", "lightweight", "sports jacket"],
        images: [
          { file: "JBN1.png", path: "/images/JACKETS/BUTTER NS/JBN1.png", title: "Track Jacket Butter NS — Navy Red", slug: "jacket-bn-1" },
          { file: "JBN2.png", path: "/images/JACKETS/BUTTER NS/JBN2.png", title: "Track Jacket Butter NS — Blue Yellow", slug: "jacket-bn-2" },
          { file: "JBN3.png", path: "/images/JACKETS/BUTTER NS/JBN3.png", title: "Track Jacket Butter NS — Teal White", slug: "jacket-bn-3" },
          { file: "JBN4.png", path: "/images/JACKETS/BUTTER NS/JBN4.png", title: "Track Jacket Butter NS — Sky Blue", slug: "jacket-bn-4" },
          { file: "JBN5.png", path: "/images/JACKETS/BUTTER NS/JBN5.png", title: "Track Jacket Butter NS — Teal Neon", slug: "jacket-bn-5" },
          { file: "JBN6.png", path: "/images/JACKETS/BUTTER NS/JBN6.png", title: "Track Jacket Butter NS — White Lime", slug: "jacket-bn-6" },
          { file: "JBN7.png", path: "/images/JACKETS/BUTTER NS/JBN7.png", title: "Track Jacket Butter NS — Yellow Red Black", slug: "jacket-bn-7" },
          { file: "JBN8.png", path: "/images/JACKETS/BUTTER NS/JBN8.png", title: "Track Jacket Butter NS — Peach Blue", slug: "jacket-bn-8" },
        ],
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
        specs: {
          fabric: "Lycra",
          printType: "Sublimation / Solid",
          moq: "10 sets",
          sizes: "S, M, L, XL, XXL",
          weight: "180–200 GSM",
        },
        tags: ["tracksuit", "lycra", "set", "jacket", "pants", "full set"],
        images: Array.from({ length: 5 }, (_, i) => ({
          file: `LY${i + 1}.jpeg`,
          path: `/images/TRACKSUITS/LYCRA TRACKSUIT/LY${i + 1}.jpeg`,
          title: `Lycra Tracksuit Design ${i + 1}`,
          slug: `ts-lycra-${i + 1}`,
        })),
      },
      "ns-lycra": {
        name: "NS Lycra Tracksuit",
        specs: {
          fabric: "NS Lycra",
          printType: "Sublimation / Solid",
          moq: "10 sets",
          sizes: "S, M, L, XL, XXL",
          weight: "190–215 GSM",
        },
        tags: ["tracksuit", "ns lycra", "set", "jacket", "full set", "nylon"],
        images: Array.from({ length: 5 }, (_, i) => ({
          file: `NSL${i + 1}.jpeg`,
          path: `/images/TRACKSUITS/NS LYCRA TRACKSUIT/NSL${i + 1}.jpeg`,
          title: `NS Lycra Tracksuit Design ${i + 1}`,
          slug: `ts-ns-${i + 1}`,
        })),
      },
      tpu: {
        name: "TPU Tracksuit",
        specs: {
          fabric: "TPU (Thermoplastic Polyurethane)",
          printType: "Sublimation / Solid",
          moq: "10 sets",
          sizes: "S, M, L, XL, XXL",
          weight: "210–240 GSM",
        },
        tags: ["tracksuit", "tpu", "set", "premium", "jacket", "full set"],
        images: Array.from({ length: 5 }, (_, i) => ({
          file: `TPU${i + 1}.jpeg`,
          path: `/images/TRACKSUITS/TPU TRACKSUIT/TPU${i + 1}.jpeg`,
          title: `TPU Tracksuit Design ${i + 1}`,
          slug: `ts-tpu-${i + 1}`,
        })),
      },
    },
  },
};

// ============================================================
// URL NORMALISATION
//
// The image folders contain spaces and characters like "&", "," and "()".
// A browser only percent-encodes the spaces when it requests <img src="…">,
// and the static file server will not match "&" or "," unencoded — which
// silently 404s every "FRONT & BACK SUBLIMATION", "ELITE, HEAVY PMC" and
// "LYCRA (SPANDEX)" image. Encoding each path segment here fixes all of them
// in one place and keeps the on-disk folder names untouched.
// ============================================================

function toUrlPath(diskPath) {
  return diskPath
    .split('/')
    .map((segment) => (segment ? encodeURIComponent(segment) : segment))
    .join('/');
}

for (const category of Object.values(CATALOGUE_DATA)) {
  for (const sub of Object.values(category.subcategories)) {
    for (const image of sub.images) {
      image.diskPath = image.path;
      image.path = toUrlPath(image.path);
    }
  }
}

// ============================================================
// DERIVED HELPERS
// Everything below is computed from CATALOGUE_DATA, so the
// numbers shown on the site can never drift from the data.
// ============================================================

export const CATEGORY_KEYS = Object.keys(CATALOGUE_DATA);

/** Flat list of every product, enriched with its category/subcategory context. */
export const ALL_PRODUCTS = CATEGORY_KEYS.flatMap((categoryKey) => {
  const category = CATALOGUE_DATA[categoryKey];
  return Object.entries(category.subcategories).flatMap(([subKey, sub]) =>
    sub.images.map((image) => ({
      ...image,
      categoryKey,
      categoryName: category.name,
      categoryIcon: category.icon,
      subKey,
      subName: sub.name,
      specs: sub.specs,
      tags: sub.tags || [],
    }))
  );
});

/** slug -> product, for resolving ?product=<slug> deep links. */
export const PRODUCTS_BY_SLUG = new Map(ALL_PRODUCTS.map((p) => [p.slug, p]));

/** Total number of products in a single category. */
export function countInCategory(categoryKey) {
  const category = CATALOGUE_DATA[categoryKey];
  if (!category) return 0;
  return Object.values(category.subcategories).reduce(
    (sum, sub) => sum + sub.images.length,
    0
  );
}

export const TOTAL_PRODUCTS = ALL_PRODUCTS.length;
export const TOTAL_CATEGORIES = CATEGORY_KEYS.length;
export const TOTAL_SUBCATEGORIES = CATEGORY_KEYS.reduce(
  (sum, key) => sum + Object.keys(CATALOGUE_DATA[key].subcategories).length,
  0
);

export default CATALOGUE_DATA;
