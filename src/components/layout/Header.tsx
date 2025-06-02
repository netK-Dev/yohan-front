// src/components/layout/Header.tsx

import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  return (
    <div className="w-full px-4 py-4">
      <header className="bg-gradient-to-r from-primary to-gray-200 shadow-2xl rounded-2xl max-w-7xl mx-auto">
        <div className="px-6 sm:px-8 lg:px-12">
          <div className="flex justify-between items-center h-20">
            {/* Logo/Titre avec image et texte stylé */}
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-4 group">
                {/* Logo image */}
                <div className="relative w-12 h-12 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                  <Image
                    src="/img/logo_yohan.png"
                    alt="Doens Production Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                
                {/* Texte stylé "Doens Production" */}
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:space-x-2">
                  <h1 className="text-2xl sm:text-3xl font-bold text-accent transition-all duration-300 group-hover:text-accent-400">
                    Doens
                  </h1>
                  <span className="text-lg sm:text-xl font-light text-white opacity-90 transition-all duration-300 group-hover:opacity-100">
                    Production
                  </span>
                </div>
              </Link>
            </div>
            
            {/* Navigation principale */}
            <nav className="hidden md:flex space-x-10">
              <Link 
                href="/" 
                className="text-white hover:text-accent transition-all duration-300 font-medium text-lg relative group"
              >
                Accueil
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link 
                href="/about" 
                className="text-white hover:text-accent transition-all duration-300 font-medium text-lg relative group"
              >
                À propos
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link 
                href="/projects" 
                className="text-white hover:text-accent transition-all duration-300 font-medium text-lg relative group"
              >
                Projets
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link 
                href="/contact" 
                className="text-white hover:text-accent transition-all duration-300 font-medium text-lg relative group"
              >
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </nav>
            
            {/* Menu mobile (hamburger) - Version moderne */}
            <div className="md:hidden">
              <button 
                className="text-white hover:text-accent transition-all duration-300 p-2 hover:bg-white hover:bg-opacity-10 rounded-lg"
                aria-label="Menu mobile"
              >
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}