'use client';

import dynamic from 'next/dynamic';
import {
  useMediaQuery,
  usePrefersReducedMotion,
  useIsLowPoweredDevice,
} from '@/hooks/useMediaQuery';
import NavbarComponent from '@/components/NavbarComponent';
import HeroSection from '@/components/HeroSection';
import CatalogueSection from '@/components/CatalogueSection';
import FeaturesSection from '@/components/FeaturesSection';
import AboutSection from '@/components/AboutSection';
import FooterSection from '@/components/FooterSection';
import BackToTop from '@/components/BackToTop';
import SceneErrorBoundary from '@/components/SceneErrorBoundary';

/* The WebGL background is decorative — load it only in the browser, and only
   when the device can afford it. Roughly 1 MB of three.js never reaches
   low-end phones or visitors who asked for reduced motion. */
const HeroScene = dynamic(() => import('@/components/HeroScene'), { ssr: false });

export default function Home() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const isSmallScreen = useMediaQuery('(max-width: 768px)');
  const isLowPowered = useIsLowPoweredDevice();

  const showScene = !prefersReducedMotion && !isSmallScreen && !isLowPowered;

  return (
    <>
      {showScene && (
        <SceneErrorBoundary>
          <HeroScene />
        </SceneErrorBoundary>
      )}
      <NavbarComponent />
      <main>
        <HeroSection />
        <CatalogueSection />
        <FeaturesSection />
        <AboutSection />
      </main>
      <FooterSection />
      <BackToTop />
    </>
  );
}
