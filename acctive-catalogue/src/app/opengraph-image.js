import { ImageResponse } from 'next/og';
import { COMPANY, ADDRESS } from '@/config/site';
import { TOTAL_PRODUCTS, TOTAL_CATEGORIES, TOTAL_SUBCATEGORIES } from '@/data/catalogueData';

/*
 * Link preview card. This is what people see when the catalogue link is pasted
 * into WhatsApp, Instagram DMs, LinkedIn or Google — so it doubles as the
 * company's business card.
 */

export const alt = `${COMPANY.name} — Premium Sportswear Catalogue`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const stats = [
  { value: `${TOTAL_PRODUCTS}+`, label: 'Designs' },
  { value: String(TOTAL_CATEGORIES), label: 'Categories' },
  { value: String(TOTAL_SUBCATEGORIES), label: 'Collections' },
];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#07070d',
          backgroundImage:
            'radial-gradient(ellipse 70% 60% at 15% 0%, rgba(0,212,255,0.28), transparent 70%),' +
            'radial-gradient(ellipse 70% 60% at 90% 100%, rgba(124,58,237,0.30), transparent 70%)',
          padding: '68px 76px',
          color: '#f0f0f5',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              fontSize: 26,
              letterSpacing: 6,
              color: '#00d4ff',
              textTransform: 'uppercase',
            }}
          >
            <div style={{ width: 46, height: 3, background: '#00d4ff' }} />
            Since {COMPANY.foundedYear}
          </div>

          <div
            style={{
              display: 'flex',
              fontSize: 116,
              fontWeight: 900,
              letterSpacing: -3,
              marginTop: 22,
              lineHeight: 1,
              color: '#ffffff',
            }}
          >
            ACCTIVE
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 46,
              fontWeight: 600,
              color: 'rgba(240,240,245,0.72)',
              marginTop: 6,
            }}
          >
            Sports Industries
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 30,
              color: 'rgba(240,240,245,0.55)',
              marginTop: 24,
            }}
          >
            Premium Sportswear Manufacturer · {ADDRESS.city}, India
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 60 }}>
            {stats.map((s) => (
              <div key={s.label} style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', fontSize: 60, fontWeight: 800, color: '#00d4ff' }}>
                  {s.value}
                </div>
                <div
                  style={{
                    display: 'flex',
                    fontSize: 24,
                    letterSpacing: 3,
                    color: 'rgba(240,240,245,0.5)',
                    textTransform: 'uppercase',
                    marginTop: 4,
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              display: 'flex',
              fontSize: 26,
              padding: '16px 30px',
              borderRadius: 999,
              border: '2px solid rgba(0,212,255,0.45)',
              color: '#00d4ff',
            }}
          >
            View the Catalogue
          </div>
        </div>
      </div>
    ),
    size
  );
}
