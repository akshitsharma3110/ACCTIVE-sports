import { SITE_URL } from '@/config/site';
import { ALL_PRODUCTS } from '@/data/catalogueData';

/*
 * The catalogue is a single page, but every product is addressable via
 * ?product=<slug>. Listing those lets search engines index individual designs.
 */
export default function sitemap() {
  const lastModified = new Date();

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...ALL_PRODUCTS.map((product) => ({
      url: `${SITE_URL}/?product=${product.slug}`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.6,
    })),
  ];
}
