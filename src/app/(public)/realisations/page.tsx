import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RealisationsGallery from '@/components/sections/RealisationsGallery';
import IntroBanner from '@/components/sections/IntroBanner';
import { COLOR_COMBINATIONS } from '@/lib/colors';

export const metadata = {
  title: 'Réalisations | Doens Production',
  description:
    'Découvrez une sélection de réalisations en 3D/VFX, Motion Design et Court Métrage par Doens Production.',
};

export default function RealisationsPage() {
  return (
    <>
      <Header />
      <main className={`min-h-screen ${COLOR_COMBINATIONS.page.background}`}>
        <IntroBanner
          title="Réalisations"
          subtitle="Des projets qui allient exigence technique et direction artistique."
        />

        <RealisationsGallery />
      </main>
      <Footer />
    </>
  );
}
