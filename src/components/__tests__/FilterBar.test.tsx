import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import FilterBar from '../FilterBar'

const mockProps = {
  searchTerm: '',
  setSearchTerm: jest.fn(),
  sortBy: 'name',
  setSortBy: jest.fn(),
  filterService: '',
  setFilterService: jest.fn(),
  services: ['Plumber', 'Electrician', 'Carpenter']
}

describe('FilterBar', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders all filter controls', () => {
    render(<FilterBar {...mockProps} />)
    
    expect(screen.getByLabelText(/search workers/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/sort workers/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/filter by service/i)).toBeInTheDocument()
  })

  it('calls setSearchTerm when search input changes', async () => {
    const user = userEvent.setup()
    render(<FilterBar {...mockProps} />)
    
    const searchInput = screen.getByLabelText(/search workers/i)
    await user.type(searchInput, 'John')
    
    expect(mockProps.setSearchTerm).toHaveBeenCalledWith('J')
    expect(mockProps.setSearchTerm).toHaveBeenCalledWith('o')
    expect(mockProps.setSearchTerm).toHaveBeenCalledWith('h')
    expect(mockProps.setSearchTerm).toHaveBeenCalledWith('n')
  })

  it('calls setSortBy when sort dropdown changes', async () => {
    const user = userEvent.setup()
    render(<FilterBar {...mockProps} />)
    
    const sortSelect = screen.getByLabelText(/sort workers/i)
    await user.selectOptions(sortSelect, 'priceAsc')
    
    expect(mockProps.setSortBy).toHaveBeenCalledWith('priceAsc')
  })

  it('renders service options correctly', () => {
    render(<FilterBar {...mockProps} />)
    
    expect(screen.getByRole('option', { name: '🎯 All Services' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Plumber' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Electrician' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Carpenter' })).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    render(<FilterBar {...mockProps} />)
    
    const filterContainer = screen.getByRole('search')
    expect(filterContainer).toHaveAttribute('aria-label', 'Filter workers')
    
    const searchInput = screen.getByLabelText(/search workers/i)
    expect(searchInput).toHaveAttribute('aria-describedby', 'search-help')
  })
})