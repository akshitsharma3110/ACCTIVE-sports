'use client';

import dynamic from 'next/dynamic';
import NavbarComponent from '@/components/NavbarComponent';
import HeroSection from '@/components/HeroSection';
import CatalogueSection from '@/components/CatalogueSection';
import FeaturesSection from '@/components/FeaturesSection';
import FooterSection from '@/components/FooterSection';
import BackToTop from '@/components/BackToTop';

const HeroScene = dynamic(() => import('@/components/HeroScene'), { ssr: false });

export default function Home() {
  return (
    <>
      {/* Full-page 3D animated background */}
      <HeroScene />
      <NavbarComponent />
      <HeroSection />
      <CatalogueSection />
      <FeaturesSection />
      <FooterSection />
      <BackToTop />
    </>
  );
}
