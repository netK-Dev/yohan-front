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
      <Suspense fallback={null}>
        <Header />
      </Suspense>
      <main className="h-full w-full">
        <VideoBanner />
        <HeroSection content={homeContent.hero} />
        <ServicesSection content={homeContent.services} />
      </main>
      <CTASection content={homeContent.cta} />
      <Footer />
    </>
  );
}
