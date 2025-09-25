'use client'

import { WorkerType } from '@/types/workers'
import Image from 'next/image'
import { useState, memo } from 'react'

interface WorkerCardProps {
  worker: WorkerType
}

const WorkerCard = memo(({ worker }: WorkerCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const finalPrice = Math.round(worker.pricePerDay * 1.18)

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      console.log('Worker selected:', worker.name)
    }
  }

  const getServiceEmoji = (service: string) => {
    const emojiMap: { [key: string]: string } = {
      'Plumber': '🔧',
      'Electrician': '⚡',
      'Carpenter': '🪚',
      'Painter': '🎨',
      'Driver': '🚗',
      'Welder': '🔥',
      'Roofer': '🏠',
      'Cleaner': '🧹',
      'Gardner': '🌱',
      'Mason': '🧱',
    }
    return emojiMap[service] || '👷'
  }

  return (
    <article 
      className="group glass rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-indigo-500/50 focus:ring-opacity-50 card-hover animate-fade-in-up" 
      tabIndex={0}
      role="button"
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={`${worker.name} - ${worker.service} - ₹${finalPrice} per day`}
    >
      {/* Image Container */}
      <div className="relative w-full h-72 overflow-hidden">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-purple-100 animate-pulse flex items-center justify-center" aria-hidden="true">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        )}
        
        {imageError ? (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-blue-50 to-purple-100 flex flex-col items-center justify-center" aria-hidden="true">
            <div className="text-6xl mb-4">{getServiceEmoji(worker.service)}</div>
            <p className="text-gray-500 font-body">Image not available</p>
          </div>
        ) : (
          <Image
            src={worker.image}
            alt={`Portrait of ${worker.name}, professional ${worker.service}`}
            fill
            className={`object-cover transition-all duration-700 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            } ${isHovered ? 'scale-110 rotate-1' : 'scale-100'}`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        )}

        {/* Service Badge */}
        <div className="absolute top-4 left-4 animate-fade-in-left animate-delay-100">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 animate-gradient text-white rounded-full text-sm font-semibold shadow-lg backdrop-blur font-body">
            <span className="text-lg">{getServiceEmoji(worker.service)}</span>
            {worker.service}
          </span>
        </div>

        {/* Price Badge */}
        <div className="absolute top-4 right-4 animate-fade-in-right animate-delay-200">
          <span className="inline-flex items-center gap-1 glass text-gray-800 px-4 py-2 rounded-full text-sm font-bold shadow-lg backdrop-blur font-body">
            <span className="text-lg">💰</span>
            ₹{finalPrice}/day
          </span>
        </div>

        {/* Rating Badge */}
        <div className="absolute bottom-4 right-4 animate-fade-in-up animate-delay-300">
          <div className="glass rounded-full px-3 py-2 backdrop-blur">
            <div className="flex items-center space-x-1" aria-label="Rating: 4 out of 5 stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`w-4 h-4 transition-all duration-300 ${
                    star <= 4 
                      ? 'text-yellow-400 scale-100' 
                      : 'text-gray-300 scale-90'
                  } ${isHovered ? 'animate-pulse' : ''}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="sr-only">Rated 4 out of 5 stars</span>
            </div>
          </div>
        </div>

        {/* Overlay on Hover */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-all duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="absolute bottom-6 left-6 right-6">
            <button 
              className={`w-full btn-enhanced bg-white text-gray-900 py-3 px-6 rounded-2xl font-bold transition-all duration-500 shadow-xl hover:shadow-2xl font-body ${
                isHovered 
                  ? 'opacity-100 transform translate-y-0' 
                  : 'opacity-0 transform translate-y-4'
              }`}
              aria-label={`View details for ${worker.name}`}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                👀 View Details
              </span>
            </button>
          </div>
        </div>

        {/* Floating decoration */}
        <div className="absolute top-2 left-2 w-3 h-3 bg-white/30 rounded-full animate-float"></div>
        <div className="absolute bottom-2 left-2 w-2 h-2 bg-white/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Card Content */}
      <div className="p-6 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors duration-300 font-display">
          {worker.name}
        </h3>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">{getServiceEmoji(worker.service)}</span>
            <p className="text-gray-600 font-semibold font-body">{worker.service}</p>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-sm text-gray-500 font-body">4.0</span>
            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-display">
              ₹{finalPrice}
            </span>
            <span className="text-sm text-gray-500 font-body ml-2">per day</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 font-body">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Available now
          </div>
        </div>
        
        {/* Skills or additional info */}
        <div className="mt-4 pt-4 border-t border-gray-200/50">
          <div className="flex flex-wrap gap-2">
            {['Experienced', 'Reliable', 'Verified'].map((badge, index) => (
              <span 
                key={badge}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 font-semibold font-body animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
})

WorkerCard.displayName = 'WorkerCard'

export default WorkerCard