import Header from '@/components/layout/Header';
import { COLOR_COMBINATIONS } from '@/lib/colors';

export default function TestPage() {
  return (
    <div className={`min-h-screen ${COLOR_COMBINATIONS.page.background}`}>
      {/* Affichage du Header */}
      <Header />
      {/* Contenu de test pour voir le rendu - avec padding-top pour header fixé */}
      <main className="mx-auto max-w-7xl px-4 py-8 pt-36">
        <div
          className={`flex min-h-screen flex-col items-center justify-center pt-32 ${COLOR_COMBINATIONS.page.background}`}
        >
          <main className="space-y-8 p-8 text-center">
            <h1
              className={`text-4xl font-bold ${COLOR_COMBINATIONS.page.text}`}
            >
              Bienvenue sur Yohan Front
            </h1>
            <p
              className={`text-xl ${COLOR_COMBINATIONS.page.text} max-w-2xl opacity-80`}
            >
              Site portfolio moderne avec design dark mode élégant et palette
              cohérente
            </p>
            <div className="space-y-6">
              <div
                className={`${COLOR_COMBINATIONS.card.background} rounded-lg p-6 ${COLOR_COMBINATIONS.card.shadow} ${COLOR_COMBINATIONS.card.border} border`}
              >
                <h2
                  className={`text-2xl font-semibold ${COLOR_COMBINATIONS.card.text} mb-4`}
                >
                  Technologies utilisées
                </h2>
                <ul
                  className={`space-y-2 ${COLOR_COMBINATIONS.card.text} opacity-90`}
                >
                  <li>✅ Next.js 15.3.3 avec App Router</li>
                  <li>✅ TypeScript</li>
                  <li>✅ Tailwind CSS v4</li>
                  <li>✅ Design System Dark Mode</li>
                  <li>✅ ESLint & Prettier</li>
                </ul>
              </div>

              {/* Démonstration de la palette de couleurs thème sombre */}
              <div
                className={`${COLOR_COMBINATIONS.card.background} rounded-lg p-6 ${COLOR_COMBINATIONS.card.shadow} ${COLOR_COMBINATIONS.card.border} border`}
              >
                <h2
                  className={`text-2xl font-semibold ${COLOR_COMBINATIONS.card.text} mb-4`}
                >
                  🌙 Palette Dark Mode
                </h2>
                <div className="mb-6 grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="bg-primary mb-2 h-16 rounded border border-gray-600"></div>
                    <p
                      className={`text-sm font-medium ${COLOR_COMBINATIONS.card.text}`}
                    >
                      Primary
                    </p>
                    <p
                      className={`text-xs ${COLOR_COMBINATIONS.card.text} opacity-60`}
                    >
                      #100000
                    </p>
                    <p
                      className={`text-xs ${COLOR_COMBINATIONS.card.text} opacity-60`}
                    >
                      Arrière-plans
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="bg-accent mb-2 h-16 rounded"></div>
                    <p
                      className={`text-sm font-medium ${COLOR_COMBINATIONS.card.text}`}
                    >
                      Accent
                    </p>
                    <p
                      className={`text-xs ${COLOR_COMBINATIONS.card.text} opacity-60`}
                    >
                      #e60b18
                    </p>
                    <p
                      className={`text-xs ${COLOR_COMBINATIONS.card.text} opacity-60`}
                    >
                      Actions & liens
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="mb-2 h-16 rounded bg-white"></div>
                    <p
                      className={`text-sm font-medium ${COLOR_COMBINATIONS.card.text}`}
                    >
                      White
                    </p>
                    <p
                      className={`text-xs ${COLOR_COMBINATIONS.card.text} opacity-60`}
                    >
                      #ffffff
                    </p>
                    <p
                      className={`text-xs ${COLOR_COMBINATIONS.card.text} opacity-60`}
                    >
                      Texte principal
                    </p>
                  </div>
                </div>

                {/* Exemples de boutons thème sombre */}
                <div className="flex flex-wrap justify-center gap-4">
                  <button
                    className={`${COLOR_COMBINATIONS.primaryButton.background} ${COLOR_COMBINATIONS.primaryButton.text} rounded-lg px-6 py-3 ${COLOR_COMBINATIONS.primaryButton.hover} font-medium transition-colors`}
                  >
                    Bouton Principal
                  </button>
                  <button
                    className={`${COLOR_COMBINATIONS.secondaryButton.background} ${COLOR_COMBINATIONS.secondaryButton.text} ${COLOR_COMBINATIONS.secondaryButton.border} rounded-lg border px-6 py-3 ${COLOR_COMBINATIONS.secondaryButton.hover} font-medium transition-colors`}
                  >
                    Bouton Secondaire
                  </button>
                </div>
              </div>

              <p
                className={`text-sm ${COLOR_COMBINATIONS.page.text} opacity-60`}
              >
                Modifiez{' '}
                <code className="rounded bg-gray-100 px-2 py-1 text-sm text-gray-900">
                  src/app/page.tsx
                </code>{' '}
                pour commencer le développement
              </p>
            </div>
          </main>
        </div>

        <div
          className={`${COLOR_COMBINATIONS.card.background} rounded-lg ${COLOR_COMBINATIONS.card.shadow} p-6 ${COLOR_COMBINATIONS.card.border} border`}
        >
          <h1
            className={`text-3xl font-bold ${COLOR_COMBINATIONS.card.text} mb-4`}
          >
            📌 Page de Test - Header Fixé
          </h1>

          <div className="space-y-6">
            <p className={`${COLOR_COMBINATIONS.card.text} opacity-80`}>
              Cette page teste le header fixé qui reste en haut de la page lors
              du défilement.
            </p>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div
                className={`${COLOR_COMBINATIONS.section.background} border-accent rounded border-l-4 p-4`}
              >
                <h2
                  className={`font-semibold ${COLOR_COMBINATIONS.section.text}`}
                >
                  📌 Header Fixé
                </h2>
                <p
                  className={`${COLOR_COMBINATIONS.section.text} text-sm opacity-80`}
                >
                  Position fixed avec z-index élevé
                </p>
              </div>

              <div
                className={`${COLOR_COMBINATIONS.section.background} rounded border-l-4 border-white p-4`}
              >
                <h2
                  className={`font-semibold ${COLOR_COMBINATIONS.section.text}`}
                >
                  🎬 Navigation Toujours Visible
                </h2>
                <p
                  className={`${COLOR_COMBINATIONS.section.text} text-sm opacity-80`}
                >
                  Menu accessible en permanence
                </p>
              </div>
            </div>

            {/* Fonctionnalités du header fixé */}
            <div className="space-y-4">
              <h3
                className={`text-xl font-semibold ${COLOR_COMBINATIONS.card.text}`}
              >
                📌 Fonctionnalités Header Fixé :
              </h3>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div
                  className={`${COLOR_COMBINATIONS.section.background} rounded p-4`}
                >
                  <h4
                    className={`font-semibold ${COLOR_COMBINATIONS.section.text} mb-2`}
                  >
                    🎯 Position
                  </h4>
                  <ul
                    className={`${COLOR_COMBINATIONS.section.text} space-y-1 text-sm opacity-80`}
                  >
                    <li>
                      • <code className="text-accent">fixed top-0</code> -
                      Toujours en haut
                    </li>
                    <li>
                      • <code className="text-accent">z-50</code> - Au-dessus du
                      contenu
                    </li>
                    <li>
                      • <code className="text-accent">left-0 right-0</code> -
                      Largeur complète
                    </li>
                    <li>• Padding-top 128px sur le contenu</li>
                  </ul>
                </div>

                <div
                  className={`${COLOR_COMBINATIONS.section.background} rounded p-4`}
                >
                  <h4
                    className={`font-semibold ${COLOR_COMBINATIONS.section.text} mb-2`}
                  >
                    ✨ Avantages
                  </h4>
                  <ul
                    className={`${COLOR_COMBINATIONS.section.text} space-y-1 text-sm opacity-80`}
                  >
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
              <h3
                className={`text-xl font-semibold ${COLOR_COMBINATIONS.card.text}`}
              >
                📋 Structure de Navigation :
              </h3>

              <div className="grid grid-cols-1 gap-4">
                <div
                  className={`${COLOR_COMBINATIONS.section.background} rounded p-4`}
                >
                  <h4
                    className={`font-semibold ${COLOR_COMBINATIONS.section.text} mb-3`}
                  >
                    🏠 Accueil
                  </h4>
                  <p
                    className={`${COLOR_COMBINATIONS.section.text} text-sm opacity-80`}
                  >
                    Page d&apos;accueil principale du site
                  </p>
                </div>

                <div
                  className={`${COLOR_COMBINATIONS.section.background} rounded p-4`}
                >
                  <h4
                    className={`font-semibold ${COLOR_COMBINATIONS.section.text} mb-3`}
                  >
                    🎬 Réalisation (Menu Déroulant)
                  </h4>
                  <ul
                    className={`${COLOR_COMBINATIONS.section.text} ml-4 space-y-2 text-sm opacity-80`}
                  >
                    <li>
                      • <strong>3D/VFX et Compositing</strong> - Effets visuels
                      et composition
                    </li>
                    <li>
                      • <strong>Motion Design</strong> - Animation graphique et
                      motion
                    </li>
                    <li>
                      • <strong>Court Métrage</strong> - Productions
                      cinématographiques
                    </li>
                  </ul>
                </div>

                <div
                  className={`${COLOR_COMBINATIONS.section.background} rounded p-4`}
                >
                  <h4
                    className={`font-semibold ${COLOR_COMBINATIONS.section.text} mb-3`}
                  >
                    📞 Contact
                  </h4>
                  <p
                    className={`${COLOR_COMBINATIONS.section.text} text-sm opacity-80`}
                  >
                    Formulaire de contact et informations
                  </p>
                </div>
              </div>
            </div>

            {/* Section pour tester le défilement */}
            <div className="space-y-4">
              <h3
                className={`text-xl font-semibold ${COLOR_COMBINATIONS.card.text}`}
              >
                📜 Test de Défilement :
              </h3>

              {/* Contenu répétitif pour forcer le scroll */}
              {[1, 2, 3, 4, 5].map(num => (
                <div
                  key={num}
                  className={`${COLOR_COMBINATIONS.section.background} rounded p-6`}
                >
                  <h4
                    className={`font-semibold ${COLOR_COMBINATIONS.section.text} mb-2`}
                  >
                    🎬 Section de Test #{num}
                  </h4>
                  <p
                    className={`${COLOR_COMBINATIONS.section.text} opacity-80`}
                  >
                    Cette section permet de tester que le header reste bien fixé
                    en haut de la page même quand vous faites défiler le
                    contenu. Le menu déroulant &quot;Réalisation&quot; doit
                    rester fonctionnel à tout moment. Faites défiler vers le bas
                    pour voir l&apos;effet et testez la navigation.
                  </p>
                  <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
                    <div className="bg-accent h-8 rounded"></div>
                    <div className="bg-primary h-8 rounded"></div>
                    <div className="h-8 rounded bg-white"></div>
                  </div>
                </div>
              ))}
            </div>

            <div
              className={`mt-6 p-4 ${COLOR_COMBINATIONS.section.background} border-accent rounded border-l-4`}
            >
              <h3
                className={`font-semibold ${COLOR_COMBINATIONS.section.text}`}
              >
                📌 Header Fixé Configuré :
              </h3>
              <ul
                className={`${COLOR_COMBINATIONS.section.text} mt-2 space-y-1 text-sm opacity-80`}
              >
                <li>
                  • Position :{' '}
                  <code className="text-accent">
                    fixed top-0 left-0 right-0
                  </code>
                </li>
                <li>
                  • Z-index : <code className="text-accent">z-50</code>{' '}
                  (au-dessus de tout)
                </li>
                <li>• Fond transparent sur le conteneur parent</li>
                <li>
                  • Padding-top : <code className="text-accent">pt-36</code> sur
                  le contenu
                </li>
                <li>• Navigation toujours accessible au scroll</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
