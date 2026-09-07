// ============================================================
// ACCTIVE SPORTS INDUSTRIES — SINGLE SOURCE OF TRUTH
// Company details, contact info, and site URLs.
// Change a value here and it updates everywhere on the site.
// ============================================================

/**
 * Public origin of the live site (no trailing slash).
 * Set NEXT_PUBLIC_SITE_URL in Vercel → Project → Settings → Environment Variables
 * to your registered domain. The fallback is only used for local development.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.activesportsindustries.in'
).replace(/\/$/, '');

export const COMPANY = {
  name: 'ACCTIVE Sports Industries',
  shortName: 'ACCTIVE',
  tagline: 'Premium Sportswear Manufacturer',
  foundedYear: 2003,
  founder: 'Shivinder Sharma',
  website: 'https://www.activesportsindustries.in',
};

export const CONTACT = {
  // Primary WhatsApp number in international format, digits only (used to build wa.me links)
  whatsapp: '919997100375',
  phones: ['+91 9997100375', '+91 8006277622'],
  email: 'activesportswears@gmail.com',
  instagram: {
    handle: '@acctivesports.76',
    url: 'https://www.instagram.com/acctivesports.76',
  },
};

export const ADDRESS = {
  street: '41/31A Mokhampur, Plot No. 36',
  locality: 'Sports Complex Enclave, Delhi Road',
  city: 'Meerut',
  region: 'Uttar Pradesh',
  postalCode: '250002',
  country: 'IN',
};

export const ADDRESS_LINES = [
  ADDRESS.street,
  ADDRESS.locality,
  `${ADDRESS.city}, ${ADDRESS.region} – ${ADDRESS.postalCode}`,
];

/** Build a wa.me link with a pre-filled enquiry message. */
export function whatsappUrl(message) {
  const base = `https://wa.me/${CONTACT.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Standard product enquiry message used by every "Enquire" button. */
export function productEnquiry({ title, categoryName, subName }) {
  return [
    `Hi ${COMPANY.shortName} Sports! I'm interested in:`,
    `*${title}*`,
    `(${categoryName} — ${subName})`,
    '',
    'Please share price & availability.',
  ].join('\n');
}
