import Header from '@/components/layout/Header'
import { COLOR_COMBINATIONS } from '@/lib/colors'

export default function TestPage() {
  return (
    <div className={`min-h-screen ${COLOR_COMBINATIONS.page.background}`}>
      {/* Affichage du Header */}
      <Header />
      
      {/* Contenu de test pour voir le rendu */}
      <main className="max-w-7xl mx-auto py-8 px-4">
        <div className={`${COLOR_COMBINATIONS.card.background} rounded-lg ${COLOR_COMBINATIONS.card.shadow} p-6 ${COLOR_COMBINATIONS.card.border} border`}>
          <h1 className={`text-3xl font-bold ${COLOR_COMBINATIONS.card.text} mb-4`}>
            🚀 Page de Test - Doens Production Header
          </h1>
          
          <div className="space-y-6">
            <p className={`${COLOR_COMBINATIONS.card.text} opacity-80`}>
              Cette page teste le nouveau Header avec logo Doens Production et design moderne.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`${COLOR_COMBINATIONS.section.background} p-4 rounded border-l-4 border-accent`}>
                <h2 className={`font-semibold ${COLOR_COMBINATIONS.section.text}`}>🎨 Logo & Branding</h2>
                <p className={`${COLOR_COMBINATIONS.section.text} opacity-80 text-sm`}>
                  Logo Yohan + &quot;Doens&quot; (rouge) &quot;Production&quot; (blanc)
                </p>
              </div>
              
              <div className={`${COLOR_COMBINATIONS.section.background} p-4 rounded border-l-4 border-white`}>
                <h2 className={`font-semibold ${COLOR_COMBINATIONS.section.text}`}>✨ Design moderne</h2>
                <p className={`${COLOR_COMBINATIONS.section.text} opacity-80 text-sm`}>
                  Dégradé, logo responsive et animations fluides
                </p>
              </div>
            </div>
            
            {/* Caractéristiques du nouveau header avec logo */}
            <div className="space-y-4">
              <h3 className={`text-xl font-semibold ${COLOR_COMBINATIONS.card.text}`}>🎯 Nouvelles fonctionnalités :</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`${COLOR_COMBINATIONS.section.background} p-4 rounded`}>
                  <h4 className={`font-semibold ${COLOR_COMBINATIONS.section.text} mb-2`}>🖼️ Logo & Image</h4>
                  <ul className={`${COLOR_COMBINATIONS.section.text} opacity-80 text-sm space-y-1`}>
                    <li>• Logo Yohan intégré (48x48px)</li>
                    <li>• Image Next.js optimisée</li>
                    <li>• Effet hover scale sur le logo</li>
                    <li>• Responsive design adaptatif</li>
                  </ul>
                </div>
                
                <div className={`${COLOR_COMBINATIONS.section.background} p-4 rounded`}>
                  <h4 className={`font-semibold ${COLOR_COMBINATIONS.section.text} mb-2`}>✨ Typographie stylée</h4>
                  <ul className={`${COLOR_COMBINATIONS.section.text} opacity-80 text-sm space-y-1`}>
                    <li>• &quot;Doens&quot; en rouge vibrant (text-accent)</li>
                    <li>• &quot;Production&quot; en blanc élégant</li>
                    <li>• Effet hover sur les couleurs</li>
                    <li>• Layout flexible mobile/desktop</li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Palette de couleurs avec focus sur le branding */}
            <div className="space-y-4">
              <h3 className={`text-xl font-semibold ${COLOR_COMBINATIONS.card.text}`}>🎨 Palette Doens Production :</h3>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="bg-primary h-20 rounded mb-2 flex items-center justify-center border border-gray-600">
                    <span className="text-white font-medium">Header Base</span>
                  </div>
                  <p className={`text-sm ${COLOR_COMBINATIONS.card.text}`}>#100000</p>
                  <p className={`text-xs ${COLOR_COMBINATIONS.card.text} opacity-60`}>Début du dégradé</p>
                </div>
                <div className="text-center">
                  <div className="bg-accent h-20 rounded mb-2 flex items-center justify-center">
                    <span className="text-white font-medium text-center">&quot;Doens&quot;<br/>Rouge</span>
                  </div>
                  <p className={`text-sm ${COLOR_COMBINATIONS.card.text}`}>#e60b18</p>
                  <p className={`text-xs ${COLOR_COMBINATIONS.card.text} opacity-60`}>Nom de marque</p>
                </div>
                <div className="text-center">
                  <div className="bg-white h-20 rounded mb-2 flex items-center justify-center">
                    <span className="text-gray-900 font-medium text-center">&quot;Production&quot;<br/>Blanc</span>
                  </div>
                  <p className={`text-sm ${COLOR_COMBINATIONS.card.text}`}>#ffffff</p>
                  <p className={`text-xs ${COLOR_COMBINATIONS.card.text} opacity-60`}>Complément</p>
                </div>
              </div>
            </div>
            
            {/* Test des boutons thème sombre */}
            <div className="space-y-4">
              <h3 className={`text-xl font-semibold ${COLOR_COMBINATIONS.card.text}`}>Test des interactions :</h3>
              <div className="flex flex-wrap gap-4">
                <button className={`${COLOR_COMBINATIONS.primaryButton.background} ${COLOR_COMBINATIONS.primaryButton.text} px-6 py-3 rounded-lg ${COLOR_COMBINATIONS.primaryButton.hover} transition-all duration-200 font-medium`}>
                  Style &quot;Doens&quot; (Rouge)
                </button>
                <button className={`${COLOR_COMBINATIONS.secondaryButton.background} ${COLOR_COMBINATIONS.secondaryButton.text} ${COLOR_COMBINATIONS.secondaryButton.border} border px-6 py-3 rounded-lg ${COLOR_COMBINATIONS.secondaryButton.hover} transition-all duration-200 font-medium`}>
                  Style &quot;Production&quot; (Blanc)
                </button>
                <button className={`${COLOR_COMBINATIONS.section.background} ${COLOR_COMBINATIONS.section.text} ${COLOR_COMBINATIONS.section.border} border px-6 py-3 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-all duration-200 font-medium`}>
                  Bouton Neutre
                </button>
              </div>
            </div>
            
            <div className={`mt-6 p-4 ${COLOR_COMBINATIONS.section.background} rounded border-l-4 border-accent`}>
              <h3 className={`font-semibold ${COLOR_COMBINATIONS.section.text}`}>🚀 Header Doens Production :</h3>
              <ul className={`${COLOR_COMBINATIONS.section.text} opacity-80 text-sm mt-2 space-y-1`}>
                <li>• Logo : <code className="text-accent">/img/logo_yohan.png</code> (48x48px responsive)</li>
                <li>• Texte : <code className="text-accent">&quot;Doens&quot;</code> (rouge) + <code className="text-white">&quot;Production&quot;</code> (blanc)</li>
                <li>• Layout : Flexible colonnes/lignes selon l&apos;écran</li>
                <li>• Animations : Hover effects sur logo et texte</li>
                <li>• Next.js Image : Optimisation automatique</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
