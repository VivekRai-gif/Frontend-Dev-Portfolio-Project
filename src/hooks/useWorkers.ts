'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { WorkerType } from '@/types/workers'

export const useWorkers = () => {
  const [workersData, setWorkersData] = useState<WorkerType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    const loadData = async () => {
      if (!isMounted) return
      
      setLoading(true)
      setError(null)
      
      try {
        // Simulate realistic network delay
        await new Promise(resolve => setTimeout(resolve, 1200))
        
        const response = await import('../../workers.json')
        
        if (isMounted) {
          const validWorkers = response.default.filter((worker: WorkerType) => 
            worker.pricePerDay > 0 && worker.id !== null && worker.name && worker.service
          )
          setWorkersData(validWorkers)
        }
      } catch (error) {
        console.error('Failed to load workers:', error)
        if (isMounted) {
          setError('Failed to load workers. Please try again.')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadData()

    return () => {
      isMounted = false
    }
  }, [])

  // Memoized unique services
  const services = useMemo(() => {
    if (!workersData.length) return []
    const uniqueServices = [...new Set(workersData.map(worker => worker.service))]
    return uniqueServices.sort()
  }, [workersData])

  // Optimized filter and sort function
  const getFilteredWorkers = useCallback((
    searchTerm: string,
    filterService: string,
    sortBy: string
  ) => {
    let filtered = workersData

    // Apply search filter
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase()
      filtered = filtered.filter(worker =>
        worker.name.toLowerCase().includes(search) ||
        worker.service.toLowerCase().includes(search)
      )
    }

    // Apply service filter
    if (filterService) {
      filtered = filtered.filter(worker => worker.service === filterService)
    }

    // Apply sorting
    return [...filtered].sort((a, b) => {
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
  }, [workersData])

  return {
    workersData,
    loading,
    error,
    services,
    getFilteredWorkers
  }
}

// Custom hook for managing pagination
export const usePagination = (totalItems: number, itemsPerPage: number = 12) => {
  const [displayedItems, setDisplayedItems] = useState(itemsPerPage)

  const loadMore = useCallback(() => {
    setDisplayedItems(prev => prev + itemsPerPage)
  }, [itemsPerPage])

  const reset = useCallback(() => {
    setDisplayedItems(itemsPerPage)
  }, [itemsPerPage])

  const hasMore = displayedItems < totalItems

  return {
    displayedItems,
    hasMore,
    loadMore,
    reset
  }
}

// Custom hook for debounced search
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}