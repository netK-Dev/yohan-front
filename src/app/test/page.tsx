import Header from '@/components/layout/Header'
import { COLOR_COMBINATIONS } from '@/lib/colors'

export default function TestPage() {
  return (
    <div className={`min-h-screen ${COLOR_COMBINATIONS.page.background}`}>
      {/* Affichage du Header */}
      <Header />
      
      {/* Contenu de test pour voir le rendu - avec padding-top pour header fixé */}
      <main className="max-w-7xl mx-auto pt-36 py-8 px-4">
        <div className={`${COLOR_COMBINATIONS.card.background} rounded-lg ${COLOR_COMBINATIONS.card.shadow} p-6 ${COLOR_COMBINATIONS.card.border} border`}>
          <h1 className={`text-3xl font-bold ${COLOR_COMBINATIONS.card.text} mb-4`}>
            📌 Page de Test - Header Fixé
          </h1>
          
          <div className="space-y-6">
            <p className={`${COLOR_COMBINATIONS.card.text} opacity-80`}>
              Cette page teste le header fixé qui reste en haut de la page lors du défilement.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`${COLOR_COMBINATIONS.section.background} p-4 rounded border-l-4 border-accent`}>
                <h2 className={`font-semibold ${COLOR_COMBINATIONS.section.text}`}>📌 Header Fixé</h2>
                <p className={`${COLOR_COMBINATIONS.section.text} opacity-80 text-sm`}>
                  Position fixed avec z-index élevé
                </p>
              </div>
              
              <div className={`${COLOR_COMBINATIONS.section.background} p-4 rounded border-l-4 border-white`}>
                <h2 className={`font-semibold ${COLOR_COMBINATIONS.section.text}`}>🎬 Navigation Toujours Visible</h2>
                <p className={`${COLOR_COMBINATIONS.section.text} opacity-80 text-sm`}>
                  Menu accessible en permanence
                </p>
              </div>
            </div>
            
            {/* Fonctionnalités du header fixé */}
            <div className="space-y-4">
              <h3 className={`text-xl font-semibold ${COLOR_COMBINATIONS.card.text}`}>📌 Fonctionnalités Header Fixé :</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`${COLOR_COMBINATIONS.section.background} p-4 rounded`}>
                  <h4 className={`font-semibold ${COLOR_COMBINATIONS.section.text} mb-2`}>🎯 Position</h4>
                  <ul className={`${COLOR_COMBINATIONS.section.text} opacity-80 text-sm space-y-1`}>
                    <li>• <code className="text-accent">fixed top-0</code> - Toujours en haut</li>
                    <li>• <code className="text-accent">z-50</code> - Au-dessus du contenu</li>
                    <li>• <code className="text-accent">left-0 right-0</code> - Largeur complète</li>
                    <li>• Padding-top 128px sur le contenu</li>
                  </ul>
                </div>
                
                <div className={`${COLOR_COMBINATIONS.section.background} p-4 rounded`}>
                  <h4 className={`font-semibold ${COLOR_COMBINATIONS.section.text} mb-2`}>✨ Avantages</h4>
                  <ul className={`${COLOR_COMBINATIONS.section.text} opacity-80 text-sm space-y-1`}>
                    <li>• Navigation toujours accessible</li>
                    <li>• UX améliorée pour les longues pages</li>
                    <li>• Branding constamment visible</li>
                    <li>• Menu déroulant fonctionnel partout</li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Structure de navigation */}
            <div className="space-y-4">
              <h3 className={`text-xl font-semibold ${COLOR_COMBINATIONS.card.text}`}>📋 Structure de Navigation :</h3>
              
              <div className="grid grid-cols-1 gap-4">
                <div className={`${COLOR_COMBINATIONS.section.background} p-4 rounded`}>
                  <h4 className={`font-semibold ${COLOR_COMBINATIONS.section.text} mb-3`}>🏠 Accueil</h4>
                  <p className={`${COLOR_COMBINATIONS.section.text} opacity-80 text-sm`}>
                    Page d&apos;accueil principale du site
                  </p>
                </div>
                
                <div className={`${COLOR_COMBINATIONS.section.background} p-4 rounded`}>
                  <h4 className={`font-semibold ${COLOR_COMBINATIONS.section.text} mb-3`}>🎬 Réalisation (Menu Déroulant)</h4>
                  <ul className={`${COLOR_COMBINATIONS.section.text} opacity-80 text-sm space-y-2 ml-4`}>
                    <li>• <strong>3D/VFX et Compositing</strong> - Effets visuels et composition</li>
                    <li>• <strong>Motion Design</strong> - Animation graphique et motion</li>
                    <li>• <strong>Court Métrage</strong> - Productions cinématographiques</li>
                  </ul>
                </div>
                
                <div className={`${COLOR_COMBINATIONS.section.background} p-4 rounded`}>
                  <h4 className={`font-semibold ${COLOR_COMBINATIONS.section.text} mb-3`}>📞 Contact</h4>
                  <p className={`${COLOR_COMBINATIONS.section.text} opacity-80 text-sm`}>
                    Formulaire de contact et informations
                  </p>
                </div>
              </div>
            </div>
            
            {/* Section pour tester le défilement */}
            <div className="space-y-4">
              <h3 className={`text-xl font-semibold ${COLOR_COMBINATIONS.card.text}`}>📜 Test de Défilement :</h3>
              
              {/* Contenu répétitif pour forcer le scroll */}
              {[1, 2, 3, 4, 5].map((num) => (
                <div key={num} className={`${COLOR_COMBINATIONS.section.background} p-6 rounded`}>
                  <h4 className={`font-semibold ${COLOR_COMBINATIONS.section.text} mb-2`}>
                    🎬 Section de Test #{num}
                  </h4>
                  <p className={`${COLOR_COMBINATIONS.section.text} opacity-80`}>
                    Cette section permet de tester que le header reste bien fixé en haut de la page 
                    même quand vous faites défiler le contenu. Le menu déroulant &quot;Réalisation&quot; 
                    doit rester fonctionnel à tout moment. Faites défiler vers le bas pour voir 
                    l&apos;effet et testez la navigation.
                  </p>
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div className="bg-accent h-8 rounded"></div>
                    <div className="bg-primary h-8 rounded"></div>
                    <div className="bg-white h-8 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className={`mt-6 p-4 ${COLOR_COMBINATIONS.section.background} rounded border-l-4 border-accent`}>
              <h3 className={`font-semibold ${COLOR_COMBINATIONS.section.text}`}>📌 Header Fixé Configuré :</h3>
              <ul className={`${COLOR_COMBINATIONS.section.text} opacity-80 text-sm mt-2 space-y-1`}>
                <li>• Position : <code className="text-accent">fixed top-0 left-0 right-0</code></li>
                <li>• Z-index : <code className="text-accent">z-50</code> (au-dessus de tout)</li>
                <li>• Fond transparent sur le conteneur parent</li>
                <li>• Padding-top : <code className="text-accent">pt-36</code> sur le contenu</li>
                <li>• Navigation toujours accessible au scroll</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
