const SkeletonCard = () => {
  return (
    <article className="glass rounded-3xl overflow-hidden shadow-xl animate-fade-in-up" aria-hidden="true">
      <div className="relative w-full h-72 overflow-hidden">
        {/* Image skeleton with shimmer effect */}
        <div className="w-full h-full animate-shimmer relative" style={{ background: 'linear-gradient(135deg, #B8E6D3 0%, #F7F3E9 100%)' }}>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer-wave"></div>
          
          {/* Service badge skeleton */}
          <div className="absolute top-4 left-4">
            <div className="rounded-full w-24 h-8 animate-pulse" style={{ background: 'linear-gradient(135deg, #8B9FE8 0%, #A8C2A8 100%)' }}></div>
          </div>
          
          {/* Price badge skeleton */}
          <div className="absolute top-4 right-4">
            <div className="glass rounded-full w-20 h-8 animate-pulse"></div>
          </div>
          
          {/* Rating skeleton */}
          <div className="absolute bottom-4 right-4">
            <div className="glass rounded-full w-16 h-8 animate-pulse"></div>
          </div>
          
          {/* Floating decorations */}
          <div className="absolute top-2 left-2 w-3 h-3 bg-white/30 rounded-full animate-float"></div>
          <div className="absolute bottom-2 left-2 w-2 h-2 bg-white/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>
      
      <div className="p-6 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
        {/* Name skeleton */}
        <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-2xl mb-3 animate-shimmer"></div>
        
        <div className="flex items-center justify-between mb-4">
          {/* Service skeleton */}
          <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl w-24 animate-pulse"></div>
          {/* Rating skeleton */}
          <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl w-16 animate-pulse"></div>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          {/* Price skeleton */}
          <div className="h-10 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 rounded-2xl w-32 animate-shimmer"></div>
          {/* Availability skeleton */}
          <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl w-20 animate-pulse"></div>
        </div>
        
        {/* Tags skeleton */}
        <div className="pt-4 border-t border-gray-200/50">
          <div className="flex gap-2">
            <div className="h-6 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full w-20 animate-pulse"></div>
            <div className="h-6 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full w-16 animate-pulse"></div>
            <div className="h-6 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full w-18 animate-pulse"></div>
          </div>
        </div>
      </div>
    </article>
  )
}

const SkeletonGrid = ({ count = 8 }: { count?: number }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} style={{ animationDelay: `${i * 0.1}s` }}>
          <SkeletonCard />
        </div>
      ))}
    </div>
  )
}

export { SkeletonCard, SkeletonGrid }