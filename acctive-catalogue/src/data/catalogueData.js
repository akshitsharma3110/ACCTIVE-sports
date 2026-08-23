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
          fabric: "Superpoly / Polyester",
          printType: "Front & Back Sublimation",
          moq: "50 pieces",
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
          fabric: "Superpoly / Polyester",
          printType: "Full Body Sublimation",
          moq: "50 pieces",
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
          moq: "25 pieces",
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
          fabric: "Superpoly / Polyester",
          printType: "Front & Back Sublimation",
          moq: "50 pieces",
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
          fabric: "Superpoly / Polyester",
          printType: "Front Sublimation",
          moq: "50 pieces",
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
          fabric: "Superpoly / Polyester",
          printType: "Full Body Sublimation",
          moq: "50 pieces",
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
          moq: "25 pieces",
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
          moq: "50 pieces",
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
          moq: "50 pieces",
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
          moq: "50 pieces",
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
          moq: "50 pieces",
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
          moq: "50 pieces",
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
          moq: "50 pieces",
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
          moq: "25 sets",
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
          moq: "25 sets",
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
          moq: "25 sets",
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

export default CATALOGUE_DATA;
