'use client'

import { useState } from 'react'

const Footer = () => {
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null)

  const socialLinks = [
    { name: 'Twitter', icon: '🐦', href: '#', color: 'hover:text-blue-400' },
    { name: 'Facebook', icon: '📘', href: '#', color: 'hover:text-blue-600' },
    { name: 'Instagram', icon: '📷', href: '#', color: 'hover:text-pink-500' },
    { name: 'LinkedIn', icon: '💼', href: '#', color: 'hover:text-blue-700' },
    { name: 'YouTube', icon: '🎬', href: '#', color: 'hover:text-red-500' },
  ]

  const quickLinks = [
    { name: 'About Us', href: '#' },
    { name: 'How It Works', href: '#' },
    { name: 'Find Workers', href: '#' },
    { name: 'Become a Worker', href: '#' },
    { name: 'Help Center', href: '#' },
    { name: 'Contact', href: '#' },
  ]

  const serviceCategories = [
    'Plumber', 'Electrician', 'Carpenter', 'Painter', 
    'Driver', 'Welder', 'Roofer', 'Cleaner'
  ]

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-20 right-20 w-24 h-24 bg-blue-500/10 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-10 left-1/3 w-40 h-40 bg-indigo-500/10 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Main footer content */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            
            {/* Brand Section */}
            <div className="lg:col-span-1 animate-fade-in-up">
              <div className="mb-6">
                <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient font-display">
                  WorkersHub
                  <span className="inline-block w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full ml-2 animate-pulse"></span>
                </h3>
                <p className="text-gray-300 mt-4 leading-relaxed font-body">
                  Connecting skilled professionals with those who need their expertise. 
                  Building communities, one project at a time.
                </p>
              </div>
              
              {/* Newsletter Signup */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold mb-3 font-body">Stay Updated</h4>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent backdrop-blur-sm transition-all duration-300 font-body"
                  />
                  <button className="btn-enhanced bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl font-body">
                    Subscribe ✨
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <h4 className="text-xl font-bold mb-6 font-display">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-all duration-300 flex items-center group font-body animate-fade-in-left"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <span className="w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300 group-hover:w-4 mr-0 group-hover:mr-2"></span>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <h4 className="text-xl font-bold mb-6 font-display">Popular Services</h4>
              <div className="grid grid-cols-2 gap-3">
                {serviceCategories.map((service, index) => (
                  <a
                    key={service}
                    href="#"
                    className="text-sm text-gray-300 hover:text-white transition-all duration-300 px-3 py-2 rounded-lg hover:bg-white/10 backdrop-blur-sm border border-transparent hover:border-white/20 font-body animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    {service}
                  </a>
                ))}
              </div>
            </div>

            {/* Contact & Social */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <h4 className="text-xl font-bold mb-6 font-display">Connect With Us</h4>
              
              {/* Contact Info */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-gray-300 animate-fade-in-left">
                  <span className="text-lg">📧</span>
                  <span className="font-body">contact@workershub.com</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300 animate-fade-in-left" style={{ animationDelay: '0.1s' }}>
                  <span className="text-lg">📞</span>
                  <span className="font-body">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300 animate-fade-in-left" style={{ animationDelay: '0.2s' }}>
                  <span className="text-lg">📍</span>
                  <span className="font-body">New York, NY 10001</span>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h5 className="text-lg font-semibold mb-4 font-body">Follow Us</h5>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={social.name}
                      href={social.href}
                      className={`w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center transition-all duration-500 hover:scale-110 hover:-translate-y-1 backdrop-blur-sm border border-white/20 hover:border-white/40 ${social.color} animate-fade-in-up`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                      onMouseEnter={() => setHoveredSocial(social.name)}
                      onMouseLeave={() => setHoveredSocial(null)}
                      aria-label={social.name}
                    >
                      <span className={`text-xl transition-all duration-300 ${hoveredSocial === social.name ? 'animate-bounce' : ''}`}>
                        {social.icon}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <p className="text-gray-300 text-sm font-body animate-fade-in-up">
                  © 2024 WorkersHub. All rights reserved.
                </p>
                <div className="flex gap-6 text-sm">
                  <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 font-body animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    Privacy Policy
                  </a>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 font-body animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    Terms of Service
                  </a>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 font-body animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                    Cookie Policy
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-300 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <span>Made with</span>
                <span className="text-red-400 animate-pulse">❤️</span>
                <span>for the community</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll to top button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-full flex items-center justify-center text-white shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-110 animate-bounce-subtle z-50"
          aria-label="Scroll to top"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </div>
    </footer>
  )
}

export default Footer