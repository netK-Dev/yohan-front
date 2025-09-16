// Page d'accueil
import Header from '@/components/layout/Header';
import { Suspense } from 'react';
import VideoBanner from '@/components/sections/VideoBanner';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <>
      <Suspense fallback={null}>
        <Header />
      </Suspense>
      <main className="h-full w-full">
        <VideoBanner />
        <HeroSection />
        <ServicesSection />
      </main>
      <Footer />
    </>
  );
}
