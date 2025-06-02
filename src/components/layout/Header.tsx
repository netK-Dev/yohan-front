// src/components/layout/Header.tsx

import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  return (
    <div className="fixed top-0 left-0 right-0 w-full px-4 py-4 z-50 bg-transparent">
      <header className="bg-gradient-to-r from-primary to-gray-50 shadow-2xl rounded-2xl max-w-7xl mx-auto">
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
              {/* Accueil */}
              <Link 
                href="/" 
                className="text-white hover:text-accent transition-all duration-300 font-medium text-lg relative group"
              >
                Accueil
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
              </Link>
              
              {/* Réalisation avec dropdown */}
              <div className="relative group">
                <button className="text-white hover:text-accent transition-all duration-300 font-medium text-lg relative flex items-center space-x-1">
                  <span>Réalisation</span>
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
                </button>
                
                {/* Dropdown menu */}
                <div className="absolute top-full left-0 mt-2 w-64 bg-gradient-to-b from-gray-100 to-gray-200 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                  <div className="py-3">
                    <Link
                      href="/realisation/3d-vfx"
                      className="block px-6 py-3 text-white hover:text-accent hover:bg-white hover:bg-opacity-10 transition-all duration-200 font-medium"
                    >
                      3D/VFX et Compositing
                    </Link>
                    <Link
                      href="/realisation/motion-design"
                      className="block px-6 py-3 text-white hover:text-accent hover:bg-white hover:bg-opacity-10 transition-all duration-200 font-medium"
                    >
                      Motion Design
                    </Link>
                    <Link
                      href="/realisation/court-metrage"
                      className="block px-6 py-3 text-white hover:text-accent hover:bg-white hover:bg-opacity-10 transition-all duration-200 font-medium"
                    >
                      Court Métrage
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Contact */}
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