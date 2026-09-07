'use client';

import Image from 'next/image';
import { Container, Row, Col } from 'react-bootstrap';
import CATALOGUE_DATA, { CATEGORY_KEYS } from '@/data/catalogueData';
import { COMPANY, CONTACT, ADDRESS, ADDRESS_LINES, whatsappUrl } from '@/config/site';
import WhatsAppIcon from '@/components/icons/WhatsAppIcon';

const LocationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

/* Fabrics we actually manufacture in — pulled straight from the product specs. */
const MATERIALS = [
  'Lycra',
  'NS Lycra',
  'Superpoly',
  'SAP Mattie',
  'Elite / PMC Knit',
  'TPU',
];

export default function FooterSection() {
  const enquiryUrl = whatsappUrl();

  return (
    <footer className="acctive-footer py-5" id="contact">
      <Container>
        <Row className="g-4 mb-5">
          {/* Brand */}
          <Col lg={4}>
            <div className="footer-logo mb-3">{COMPANY.shortName}</div>
            <p className="footer-blurb">
              {COMPANY.name}, {ADDRESS.city} — your trusted partner for premium
              sportswear manufacturing. From sublimation T-shirts to performance tracksuits, we
              deliver quality that speaks for itself.
            </p>

            <div className="footer-social-row">
              <a
                href={CONTACT.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn instagram"
                aria-label="Follow ACCTIVE Sports on Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                href={enquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn whatsapp"
                aria-label="Chat with ACCTIVE Sports on WhatsApp"
              >
                <WhatsAppIcon size={18} />
              </a>
            </div>
          </Col>

          {/* Categories */}
          <Col sm={6} lg={2}>
            <h2 className="footer-heading mb-3">Categories</h2>
            {CATEGORY_KEYS.map((key) => (
              <a key={key} className="footer-link" href="#products">
                {CATALOGUE_DATA[key].name}
              </a>
            ))}
          </Col>

          {/* Materials — informational, not navigation */}
          <Col sm={6} lg={2}>
            <h2 className="footer-heading mb-3">Materials</h2>
            <ul className="footer-list">
              {MATERIALS.map((material) => (
                <li key={material}>{material}</li>
              ))}
            </ul>
          </Col>

          {/* Contact */}
          <Col sm={6} lg={4}>
            <h2 className="footer-heading mb-3">Contact &amp; Location</h2>

            <address className="footer-address-block">
              <LocationIcon />
              <div>
                {ADDRESS_LINES.map((line) => (
                  <span key={line} className="footer-address-line">{line}</span>
                ))}
              </div>
            </address>

            <a className="footer-link mt-2" href={`mailto:${CONTACT.email}`}>
              <MailIcon /> {CONTACT.email}
            </a>
            {CONTACT.phones.map((phone) => (
              <a key={phone} className="footer-link" href={`tel:${phone.replace(/\s/g, '')}`}>
                <PhoneIcon /> {phone}
              </a>
            ))}
            <a
              className="footer-link"
              href={CONTACT.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramIcon /> {CONTACT.instagram.handle}
            </a>

            <a
              href={enquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-whatsapp-cta"
            >
              <WhatsAppIcon size={18} />
              For Enquiry — WhatsApp
            </a>
          </Col>
        </Row>

        {/* QR Code */}
        <div className="footer-qr-section">
          <div className="footer-qr-card">
            <div className="footer-qr-image-wrap">
              <Image
                src="/qr-catalogue.png"
                alt="QR code linking to the ACCTIVE Sports online catalogue"
                width={130}
                height={130}
                className="footer-qr-img"
              />
            </div>
            <div className="footer-qr-info">
              <p className="footer-qr-title">Scan to view the catalogue</p>
              <p className="footer-qr-subtitle">
                Point your camera at the QR code to open the {COMPANY.shortName} product catalogue
                instantly — handy for cards, packaging and trade-show stands.
              </p>
              <a
                href="/qr-catalogue.png"
                download="ACCTIVE-Catalogue-QR.png"
                className="footer-qr-download"
              >
                Download QR code
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom py-3 d-flex flex-wrap justify-content-between align-items-center">
          <span>
            © {new Date().getFullYear()} {COMPANY.name}, {ADDRESS.city}. All rights reserved.
          </span>
          <span>{COMPANY.tagline}</span>
        </div>
      </Container>
    </footer>
  );
}
