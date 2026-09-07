import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = defineConfig([
  ...nextVitals,

  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),

  {
    rules: {
      /*
       * The catalogue photos are pre-sized JPEGs served straight from /public
       * with `images.unoptimized` set in next.config.mjs, so next/image would
       * add a wrapper without doing any optimisation. Plain <img> with explicit
       * width/height and loading="lazy" is the honest choice here.
       * See the "Images" section of README.md before changing this.
       */
      "@next/next/no-img-element": "off",
    },
  },
]);

export default eslintConfig;
