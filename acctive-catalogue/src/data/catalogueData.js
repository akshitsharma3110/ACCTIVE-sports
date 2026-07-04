// ============================================================
// ACCTIVE SPORTS INDUSTRIES — COMPLETE PRODUCT DATA
// ============================================================

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
          path: `/images/COLLAR TSHIRTS/FRONT & BACK SUBLIMATION/CFB${i + 1}.jpeg`,
          title: `Collar F&B Sublimation Design ${i + 1}`,
        })),
      },
      "full-sublimation": {
        name: "Full Sublimation",
        images: Array.from({ length: 16 }, (_, i) => {
          const num = i + 1;
          if (num === 12) return null;
          return {
            file: `CFULL${num}.jpeg`,
            path: `/images/COLLAR TSHIRTS/FULL SUBLIMATION/CFULL${num}.jpeg`,
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
          path: `/images/COLLAR TSHIRTS/SAP MATTIE/${color} SAP MATTIE.jpeg`,
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
          path: `/images/ROUND NECK TSHIRTS/FRONT & BACK SUBLIMATION/FB${i + 1}.jpeg`,
          title: `Round Neck F&B Design ${i + 1}`,
        })),
      },
      "front-sublimation": {
        name: "Front Sublimation",
        images: Array.from({ length: 15 }, (_, i) => ({
          file: `F${i + 1}.jpeg`,
          path: `/images/ROUND NECK TSHIRTS/FRONT SUBLIMATION/F${i + 1}.jpeg`,
          title: `Round Neck Front Design ${i + 1}`,
        })),
      },
      "full-sublimation": {
        name: "Full Sublimation",
        images: Array.from({ length: 15 }, (_, i) => ({
          file: `FULL${i + 1}.jpeg`,
          path: `/images/ROUND NECK TSHIRTS/FULL SUBLIMATION/FULL${i + 1}.jpeg`,
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
          path: `/images/ROUND NECK TSHIRTS/PLAIN T SHIRTS/${color}.jpeg`,
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
          path: `/images/SHORTS/ELITE, DOT KNIT, PMC, HEAVY KNIT, DIAGONAL SHORTS/190_${i + 1}.jpeg`,
          title: `Elite Knit Shorts Design ${i + 1}`,
        })),
      },
      "lycra-spandex": {
        name: "Lycra / Knitted Lycra (Spandex)",
        images: Array.from({ length: 4 }, (_, i) => ({
          file: `KL${i + 1}.jpeg`,
          path: `/images/SHORTS/LYCRA, KNITTED LYCRA (SPANDEX) SHORTS/KL${i + 1}.jpeg`,
          title: `Lycra Spandex Shorts Design ${i + 1}`,
        })),
      },
      "ns-lycra": {
        name: "NS Lycra",
        images: Array.from({ length: 4 }, (_, i) => ({
          file: `NS${i + 1}.jpeg`,
          path: `/images/SHORTS/NS LYCRA SHORTS/NS${i + 1}.jpeg`,
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
          path: `/images/LOWERS/DIAGONAL, HEAVY KNIT, ADIDAS KNIT LOWERS/L${i + 1}.jpeg`,
          title: `Diagonal Knit Lower Design ${i + 1}`,
        })),
      },
      "elite-pmc": {
        name: "Elite / Heavy PMC",
        images: Array.from({ length: 5 }, (_, i) => ({
          file: `EHPMC${i + 1}.jpeg`,
          path: `/images/LOWERS/ELITE, HEAVY PMC LOWERS/EHPMC${i + 1}.jpeg`,
          title: `Elite PMC Lower Design ${i + 1}`,
        })),
      },
      "lycra-ns": {
        name: "Lycra / NS Lycra",
        images: Array.from({ length: 5 }, (_, i) => ({
          file: `LNS${i + 1}.jpeg`,
          path: `/images/LOWERS/LYCRA, NS LYCRA LOWERS/LNS${i + 1}.jpeg`,
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
          path: `/images/TRACKSUITS/LYCRA TRACKSUIT/LY${i + 1}.jpeg`,
          title: `Lycra Tracksuit Design ${i + 1}`,
        })),
      },
      "ns-lycra": {
        name: "NS Lycra Tracksuit",
        images: Array.from({ length: 5 }, (_, i) => ({
          file: `NSL${i + 1}.jpeg`,
          path: `/images/TRACKSUITS/NS LYCRA TRACKSUIT/NSL${i + 1}.jpeg`,
          title: `NS Lycra Tracksuit Design ${i + 1}`,
        })),
      },
      tpu: {
        name: "TPU Tracksuit",
        images: Array.from({ length: 5 }, (_, i) => ({
          file: `TPU${i + 1}.jpeg`,
          path: `/images/TRACKSUITS/TPU TRACKSUIT/TPU${i + 1}.jpeg`,
          title: `TPU Tracksuit Design ${i + 1}`,
        })),
      },
    },
  },
};

export default CATALOGUE_DATA;
