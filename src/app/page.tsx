// Page d'accueil
import Header from '@/components/layout/Header';
import VideoBanner from '@/components/sections/VideoBanner';
import HeroSection from '@/components/sections/HeroSection';

export default function Home() {
  return (
    <>
      <Header />
      <main className="h-full w-full">
        <VideoBanner />
        <HeroSection />
      </main>
    </>
  );
}
