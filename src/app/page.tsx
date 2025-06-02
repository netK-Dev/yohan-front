import { COLOR_COMBINATIONS } from '@/lib/colors'

export default function Home() {
  return (
    <div className={`min-h-screen pt-32 flex flex-col items-center justify-center ${COLOR_COMBINATIONS.page.background}`}>
      <main className="text-center space-y-8 p-8">
        <h1 className={`text-4xl font-bold ${COLOR_COMBINATIONS.page.text}`}>
          Bienvenue sur Yohan Front
        </h1>
        <p className={`text-xl ${COLOR_COMBINATIONS.page.text} opacity-80 max-w-2xl`}>
          Site portfolio moderne avec design dark mode élégant et palette cohérente
        </p>
        <div className="space-y-6">
          <div className={`${COLOR_COMBINATIONS.card.background} p-6 rounded-lg ${COLOR_COMBINATIONS.card.shadow} ${COLOR_COMBINATIONS.card.border} border`}>
            <h2 className={`text-2xl font-semibold ${COLOR_COMBINATIONS.card.text} mb-4`}>
              Technologies utilisées
            </h2>
            <ul className={`space-y-2 ${COLOR_COMBINATIONS.card.text} opacity-90`}>
              <li>✅ Next.js 15.3.3 avec App Router</li>
              <li>✅ TypeScript</li>
              <li>✅ Tailwind CSS v4</li>
              <li>✅ Design System Dark Mode</li>
              <li>✅ ESLint & Prettier</li>
            </ul>
          </div>
          
          {/* Démonstration de la palette de couleurs thème sombre */}
          <div className={`${COLOR_COMBINATIONS.card.background} p-6 rounded-lg ${COLOR_COMBINATIONS.card.shadow} ${COLOR_COMBINATIONS.card.border} border`}>
            <h2 className={`text-2xl font-semibold ${COLOR_COMBINATIONS.card.text} mb-4`}>
              🌙 Palette Dark Mode
            </h2>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className="bg-primary h-16 rounded mb-2 border border-gray-600"></div>
                <p className={`text-sm font-medium ${COLOR_COMBINATIONS.card.text}`}>Primary</p>
                <p className={`text-xs ${COLOR_COMBINATIONS.card.text} opacity-60`}>#100000</p>
                <p className={`text-xs ${COLOR_COMBINATIONS.card.text} opacity-60`}>Arrière-plans</p>
              </div>
              <div className="text-center">
                <div className="bg-accent h-16 rounded mb-2"></div>
                <p className={`text-sm font-medium ${COLOR_COMBINATIONS.card.text}`}>Accent</p>
                <p className={`text-xs ${COLOR_COMBINATIONS.card.text} opacity-60`}>#e60b18</p>
                <p className={`text-xs ${COLOR_COMBINATIONS.card.text} opacity-60`}>Actions & liens</p>
              </div>
              <div className="text-center">
                <div className="bg-white h-16 rounded mb-2"></div>
                <p className={`text-sm font-medium ${COLOR_COMBINATIONS.card.text}`}>White</p>
                <p className={`text-xs ${COLOR_COMBINATIONS.card.text} opacity-60`}>#ffffff</p>
                <p className={`text-xs ${COLOR_COMBINATIONS.card.text} opacity-60`}>Texte principal</p>
              </div>
            </div>
            
            {/* Exemples de boutons thème sombre */}
            <div className="flex gap-4 justify-center flex-wrap">
              <button className={`${COLOR_COMBINATIONS.primaryButton.background} ${COLOR_COMBINATIONS.primaryButton.text} px-6 py-3 rounded-lg ${COLOR_COMBINATIONS.primaryButton.hover} transition-colors font-medium`}>
                Bouton Principal
              </button>
              <button className={`${COLOR_COMBINATIONS.secondaryButton.background} ${COLOR_COMBINATIONS.secondaryButton.text} ${COLOR_COMBINATIONS.secondaryButton.border} border px-6 py-3 rounded-lg ${COLOR_COMBINATIONS.secondaryButton.hover} transition-colors font-medium`}>
                Bouton Secondaire
              </button>
            </div>
          </div>
          
          <p className={`text-sm ${COLOR_COMBINATIONS.page.text} opacity-60`}>
            Modifiez <code className="bg-gray-100 text-gray-900 px-2 py-1 rounded text-sm">src/app/page.tsx</code> pour commencer le développement
          </p>
        </div>
      </main>
    </div>
  );
}
