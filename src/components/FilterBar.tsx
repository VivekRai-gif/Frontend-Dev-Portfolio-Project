'use client'

interface FilterBarProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  sortBy: string
  setSortBy: (sort: string) => void
  filterService: string
  setFilterService: (service: string) => void
  services: string[]
}

const FilterBar = ({
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  filterService,
  setFilterService,
  services
}: FilterBarProps) => {
  return (
    <div className="glass rounded-3xl shadow-2xl p-8 mb-12 card-hover animate-fade-in-up animate-delay-200" role="search" aria-label="Filter workers">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Search Bar */}
        <div className="relative group animate-fade-in-left">
          <label htmlFor="search-workers" className="sr-only">
            Search workers by name
          </label>
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
            <svg className="h-6 w-6 text-indigo-400 group-focus-within:text-indigo-600 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            id="search-workers"
            type="text"
            placeholder="Search workers by name or service..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-6 py-4 bg-white/70 backdrop-blur border-2 border-indigo-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 text-gray-800 placeholder-gray-500 font-body hover:bg-white/90 hover:shadow-lg"
            aria-describedby="search-help"
          />
          <div className="absolute inset-0 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(139, 159, 232, 0.1) 0%, rgba(168, 194, 168, 0.1) 100%)' }}></div>
          <div id="search-help" className="sr-only">
            Search workers by name or service type
          </div>
        </div>

        {/* Sort Dropdown */}
        <div className="relative group animate-fade-in-up animate-delay-100">
          <label htmlFor="sort-workers" className="sr-only">
            Sort workers
          </label>
          <select
            id="sort-workers"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-6 py-4 bg-white/70 backdrop-blur border-2 border-purple-200 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 text-gray-800 font-body appearance-none cursor-pointer hover:bg-white/90 hover:shadow-lg"
            aria-describedby="sort-help"
          >
            <option value="name">📝 Sort by Name</option>
            <option value="priceAsc">💰 Price: Low to High</option>
            <option value="priceDesc">💎 Price: High to Low</option>
            <option value="service">🔧 Sort by Service</option>
          </select>
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-purple-400 group-focus-within:text-purple-600 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div className="absolute inset-0 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(168, 194, 168, 0.1) 0%, rgba(184, 230, 211, 0.1) 100%)' }}></div>
          <div id="sort-help" className="sr-only">
            Sort workers by different criteria
          </div>
        </div>

        {/* Service Filter */}
        <div className="relative group animate-fade-in-right animate-delay-200">
          <label htmlFor="filter-service" className="sr-only">
            Filter by service
          </label>
          <select
            id="filter-service"
            value={filterService}
            onChange={(e) => setFilterService(e.target.value)}
            className="w-full px-6 py-4 bg-white/70 backdrop-blur border-2 border-pink-200 rounded-2xl focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all duration-300 text-gray-800 font-body appearance-none cursor-pointer hover:bg-white/90 hover:shadow-lg"
            aria-describedby="filter-help"
          >
            <option value="">🎯 All Services</option>
            {services.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-pink-400 group-focus-within:text-pink-600 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div className="absolute inset-0 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(184, 230, 211, 0.1) 0%, rgba(247, 243, 233, 0.1) 100%)' }}></div>
          <div id="filter-help" className="sr-only">
            Filter workers by service type
          </div>
        </div>
      </div>
      
      {/* Filter summary */}
      <div className="mt-6 pt-6 border-t border-white/20">
        <div className="flex flex-wrap gap-2 justify-center">
          {searchTerm && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-100 text-indigo-800 animate-fade-in-up font-body">
              🔍 "{searchTerm}"
            </span>
          )}
          {filterService && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800 animate-fade-in-up font-body">
              🎯 {filterService}
            </span>
          )}
          {sortBy !== 'name' && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-pink-100 text-pink-800 animate-fade-in-up font-body">
              📊 {sortBy === 'priceAsc' ? 'Price ↑' : sortBy === 'priceDesc' ? 'Price ↓' : 'Service'}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default FilterBar