'use client'

import { useState, useEffect } from 'react'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out animate-fade-in-down ${
        isScrolled
          ? 'glass backdrop-blur-xl shadow-2xl border-b border-white/20'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3 animate-fade-in-left">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center animate-gradient shadow-lg animate-pulse-glow">
                <span className="text-white font-bold text-xl font-display">W</span>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-float"></div>
            </div>
            <div>
              <h1 className={`text-2xl font-bold transition-colors duration-300 font-display ${
                isScrolled ? 'text-gray-900' : 'text-white'
              }`}>
                Workers
                <span className="text-gradient-rainbow">Hub</span>
              </h1>
              <p className={`text-xs font-body ${
                isScrolled ? 'text-gray-500' : 'text-gray-200'
              }`}>
                Find. Connect. Hire.
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center space-x-8 animate-fade-in-up animate-delay-200">
            {['Home', 'Browse Workers', 'Services', 'About', 'Contact'].map((item, index) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className={`relative font-medium transition-all duration-300 hover:scale-110 font-body group animate-fade-in-up`}
                style={{ animationDelay: `${index * 0.1 + 0.3}s` }}
              >
                <span className={`transition-colors duration-300 ${
                  isScrolled 
                    ? 'text-gray-700 hover:text-indigo-600' 
                    : 'text-white hover:text-indigo-300'
                }`}>
                  {item}
                </span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4 animate-fade-in-right animate-delay-400">
            <button className="px-4 py-2 text-sm font-medium transition-colors duration-300 font-body hover:scale-105 transform">
              <span className={isScrolled ? 'text-gray-700' : 'text-white'}>
                Sign In
              </span>
            </button>
            <button className="btn-enhanced px-6 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 animate-gradient text-white rounded-xl font-semibold shadow-lg hover:shadow-2xl font-body">
              <span className="relative z-10">Hire Now</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden animate-fade-in-right">
            <button 
              className={`p-3 rounded-xl transition-all duration-300 hover:scale-110 ${
                isScrolled 
                  ? 'text-gray-900 hover:bg-gray-100' 
                  : 'text-white hover:bg-white/10'
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 animate-slide-up">
            <div className="glass rounded-2xl p-6 space-y-4">
              {['Home', 'Browse Workers', 'Services', 'About', 'Contact'].map((item, index) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="block py-3 px-4 rounded-xl font-medium transition-all duration-300 hover:bg-white/10 font-body animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className={isScrolled ? 'text-gray-700' : 'text-white'}>
                    {item}
                  </span>
                </a>
              ))}
              <div className="pt-4 border-t border-white/20 space-y-3">
                <button className="w-full py-3 px-4 rounded-xl font-medium transition-all duration-300 hover:bg-white/10 font-body">
                  <span className={isScrolled ? 'text-gray-700' : 'text-white'}>
                    Sign In
                  </span>
                </button>
                <button className="w-full btn-enhanced py-3 px-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 animate-gradient text-white rounded-xl font-semibold shadow-lg font-body">
                  Hire Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating decoration elements */}
      <div className="floating-element top-4 right-20 w-2 h-2 bg-pink-400 rounded-full animate-float"></div>
      <div className="floating-element top-8 right-32 w-1 h-1 bg-indigo-400 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
    </nav>
  )
}

export default Navbar