import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import { SITE_URL, COMPANY, CONTACT, ADDRESS } from '@/config/site';
import { TOTAL_PRODUCTS, TOTAL_CATEGORIES } from '@/data/catalogueData';

const description =
  `Complete product catalogue of ${COMPANY.name}, Meerut — a premium sportswear ` +
  `manufacturer. ${TOTAL_PRODUCTS}+ designs across ${TOTAL_CATEGORIES} categories: collar & round neck ` +
  'T-shirts, shorts, lowers and tracksuits in sublimation prints and performance fabrics.';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${COMPANY.name} — Premium Sportswear Catalogue | Meerut`,
    template: `%s | ${COMPANY.name}`,
  },
  description,
  applicationName: COMPANY.name,
  authors: [{ name: COMPANY.name, url: SITE_URL }],
  creator: COMPANY.name,
  publisher: COMPANY.name,
  keywords: [
    'ACCTIVE Sports Industries',
    'sportswear manufacturer Meerut',
    'sublimation t-shirts',
    'custom team jerseys India',
    'lycra shorts manufacturer',
    'tracksuit manufacturer',
    'polo t-shirt wholesale',
    'sports lowers Meerut',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    siteName: COMPANY.name,
    title: `${COMPANY.name} — Premium Sportswear Catalogue`,
    description,
    url: SITE_URL,
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${COMPANY.name} — Premium Sportswear Catalogue`,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'business',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#07070d' },
    { media: '(prefers-color-scheme: light)', color: '#f4f6fb' },
  ],
};

/**
 * Applies the saved theme before first paint so a light-mode visitor never sees
 * a flash of the dark theme while React hydrates.
 */
const THEME_INIT = `
(function () {
  try {
    var t = localStorage.getItem('acctive-theme');
    if (t !== 'light' && t !== 'dark') t = 'dark';
    document.documentElement.setAttribute('data-theme', t);
  } catch (e) {}
})();
`;

/* Structured data — helps Google show the business correctly in search results. */
const ORGANIZATION_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: COMPANY.name,
  alternateName: 'Acctive Sports',
  url: SITE_URL,
  description,
  foundingDate: String(COMPANY.foundedYear),
  founder: { '@type': 'Person', name: COMPANY.founder },
  email: CONTACT.email,
  telephone: CONTACT.phones,
  sameAs: [CONTACT.instagram.url, COMPANY.website],
  address: {
    '@type': 'PostalAddress',
    streetAddress: `${ADDRESS.street}, ${ADDRESS.locality}`,
    addressLocality: ADDRESS.city,
    addressRegion: ADDRESS.region,
    postalCode: ADDRESS.postalCode,
    addressCountry: ADDRESS.country,
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    telephone: CONTACT.phones[0],
    email: CONTACT.email,
    areaServed: 'IN',
    availableLanguage: ['en', 'hi'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSONLD) }}
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
