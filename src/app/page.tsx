// Page d'accueil
import Header from '@/components/layout/Header';
import { Suspense } from 'react';
import VideoBanner from '@/components/sections/VideoBanner';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import CTASection from '@/components/sections/CTASection';
import Footer from '@/components/layout/Footer';
import { getHomeContent } from '@/lib/data/home-content';

export default async function Home() {
  const homeContent = await getHomeContent();

  return (
    <>
      <Suspense fallback={<div className="h-20" />}>
        <Header />
      </Suspense>
      <main id="main-content" tabIndex={-1} className="h-full w-full">
        <HeroSection content={homeContent.hero} />
        <VideoBanner content={homeContent.showreel} />
        <ServicesSection content={homeContent.services} />
        <CTASection content={homeContent.cta} />
      </main>
      <Footer />
    </>
  );
}
