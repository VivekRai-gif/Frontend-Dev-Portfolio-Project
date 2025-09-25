'use client'

import { WorkerType } from '@/types/workers'
import { useState, useEffect, useMemo, useCallback } from 'react'
import Navbar from '@/components/Navbar'
import FilterBar from '@/components/FilterBar'
import WorkerCard from '@/components/WorkerCard'
import { SkeletonGrid } from '@/components/SkeletonLoader'
import Footer from '@/components/Footer'

const ITEMS_PER_PAGE = 12

export default function WorkersPage() {
  const [workersData, setWorkersData] = useState<WorkerType[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [filterService, setFilterService] = useState('')
  const [displayedItems, setDisplayedItems] = useState(ITEMS_PER_PAGE)

  // Load worker data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        // Simulate network delay for better UX demonstration
        await new Promise(resolve => setTimeout(resolve, 1500))
        const response = await import('../../workers.json')
        setWorkersData(response.default.filter((worker: WorkerType) => 
          worker.pricePerDay > 0 && worker.id !== null
        ))
      } catch (error) {
        console.error('Failed to load workers:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  // Get unique services for filter dropdown
  const services = useMemo(() => {
    const uniqueServices = [...new Set(workersData.map(worker => worker.service))]
    return uniqueServices.sort()
  }, [workersData])

  // Filter and sort workers
  const filteredAndSortedWorkers = useMemo(() => {
    let filtered = workersData

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(worker =>
        worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        worker.service.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Apply service filter
    if (filterService) {
      filtered = filtered.filter(worker => worker.service === filterService)
    }

    // Apply sorting
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'priceAsc':
          return a.pricePerDay - b.pricePerDay
        case 'priceDesc':
          return b.pricePerDay - a.pricePerDay
        case 'service':
          return a.service.localeCompare(b.service)
        default:
          return 0
      }
    })

    return filtered
  }, [workersData, searchTerm, filterService, sortBy])

  // Get current page items
  const currentItems = useMemo(() => {
    return filteredAndSortedWorkers.slice(0, displayedItems)
  }, [filteredAndSortedWorkers, displayedItems])

  // Load more function
  const loadMore = useCallback(() => {
    setDisplayedItems(prev => prev + ITEMS_PER_PAGE)
  }, [])

  // Reset pagination when filters change
  useEffect(() => {
    setDisplayedItems(ITEMS_PER_PAGE)
  }, [searchTerm, filterService, sortBy])

  const hasMore = displayedItems < filteredAndSortedWorkers.length

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Navbar />
        <main className="pt-24 pb-12">
          <div className="container mx-auto px-4">
            {/* Hero Section Skeleton */}
            <div className="text-center mb-12">
              <div className="h-12 bg-gray-200 rounded-lg w-1/2 mx-auto mb-4 animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded-lg w-2/3 mx-auto animate-pulse"></div>
            </div>
            
            {/* Filter Bar Skeleton */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8 animate-pulse">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="h-12 bg-gray-200 rounded-lg"></div>
                <div className="h-12 bg-gray-200 rounded-lg"></div>
                <div className="h-12 bg-gray-200 rounded-lg"></div>
              </div>
            </div>

            {/* Cards Grid Skeleton */}
            <SkeletonGrid count={8} />
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="floating-element top-20 left-10 w-32 h-32 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-xl animate-float"></div>
      <div className="floating-element top-40 right-20 w-24 h-24 bg-gradient-to-br from-pink-400/20 to-rose-400/20 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="floating-element bottom-20 left-1/3 w-40 h-40 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
      
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 animate-gradient relative overflow-hidden">
        {/* Hero background effects */}
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="floating-element top-20 left-20 w-2 h-2 bg-white/40 rounded-full animate-float"></div>
        <div className="floating-element top-32 right-32 w-1 h-1 bg-white/60 rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
        <div className="floating-element bottom-32 left-1/4 w-3 h-3 bg-white/30 rounded-full animate-float" style={{ animationDelay: '1.5s' }}></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 font-display animate-fade-in-up">
              Find the
              <br />
              <span className="text-gradient-rainbow animate-gradient">Perfect Worker</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto font-body leading-relaxed animate-fade-in-up animate-delay-200">
              Connect with <span className="text-indigo-300 font-semibold">skilled professionals</span> ready to bring your projects to life. 
              Browse through hundreds of <span className="text-purple-300 font-semibold">verified workers</span> across various services.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6 animate-fade-in-up animate-delay-400">
              <button className="btn-enhanced px-10 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 animate-gradient text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl font-body transform hover:scale-105">
                <span className="relative z-10">🚀 Get Started</span>
              </button>
              <button className="btn-enhanced px-10 py-4 glass border-2 border-white/30 text-white rounded-2xl font-bold text-lg hover:bg-white/10 font-body transform hover:scale-105">
                <span className="relative z-10">📖 Learn More</span>
              </button>
            </div>
            
            {/* Stats */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in-up animate-delay-500">
              {[
                { number: '10,000+', label: 'Skilled Workers', icon: '👷' },
                { number: '50+', label: 'Service Types', icon: '🔧' },
                { number: '98%', label: 'Success Rate', icon: '⭐' }
              ].map((stat, index) => (
                <div key={index} className="glass rounded-2xl p-6 hover:scale-105 transition-transform duration-300 animate-fade-in-up" style={{ animationDelay: `${0.6 + index * 0.1}s` }}>
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold text-white font-display">{stat.number}</div>
                  <div className="text-gray-300 font-body">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Wave transition */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-16 fill-slate-50">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
          </svg>
        </div>
      </section>

      <main className="py-12" id="workers">
        <div className="container mx-auto px-4">
          {/* Filter Bar */}
          <FilterBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            sortBy={sortBy}
            setSortBy={setSortBy}
            filterService={filterService}
            setFilterService={setFilterService}
            services={services}
          />

          {/* Results Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Available Workers
              </h2>
              <p className="text-gray-600 mt-1">
                {filteredAndSortedWorkers.length} workers found
                {searchTerm && ` for "${searchTerm}"`}
                {filterService && ` in ${filterService}`}
              </p>
            </div>
            
            {/* View Toggle - Future Feature */}
            <div className="hidden md:flex space-x-2">
              <button className="p-2 bg-blue-600 text-white rounded-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Workers Grid */}
          {filteredAndSortedWorkers.length === 0 ? (
            <div className="text-center py-16">
              <svg className="w-24 h-24 text-gray-300 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">No workers found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search terms or filters to find what you&apos;re looking for.
              </p>
              <button 
                onClick={() => {
                  setSearchTerm('')
                  setFilterService('')
                  setSortBy('name')
                }}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                {currentItems.map((worker) => (
                  <WorkerCard key={worker.id} worker={worker} />
                ))}
              </div>

              {/* Load More Button */}
              {hasMore && (
                <div className="text-center">
                  <button
                    onClick={loadMore}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    Load More Workers ({filteredAndSortedWorkers.length - displayedItems} remaining)
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
