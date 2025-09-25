import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { WorkerType } from '@/types/workers'
import WorkerCard from '../WorkerCard'

const mockWorker: WorkerType = {
  id: 1,
  name: 'John Doe',
  service: 'Plumber',
  pricePerDay: 100,
  image: 'https://example.com/image.jpg'
}

describe('WorkerCard', () => {
  it('renders worker information correctly', () => {
    render(<WorkerCard worker={mockWorker} />)
    
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getAllByText('Plumber')).toHaveLength(2) // One in badge, one in main content
    expect(screen.getByText('₹118')).toBeInTheDocument() // 100 * 1.18
  })

  it('has proper accessibility attributes', () => {
    render(<WorkerCard worker={mockWorker} />)
    
    const card = screen.getByRole('button', { name: /John Doe - Plumber - ₹118 per day/ })
    expect(card).toHaveAttribute('tabIndex', '0')
    expect(card).toHaveAttribute('aria-label', 'John Doe - Plumber - ₹118 per day')
  })

  it('displays service badge', () => {
    render(<WorkerCard worker={mockWorker} />)
    
    const badges = screen.getAllByText('Plumber')
    expect(badges.length).toBeGreaterThan(0)
  })

  it('displays rating stars', () => {
    render(<WorkerCard worker={mockWorker} />)
    
    expect(screen.getByText('Rated 4 out of 5 stars')).toBeInTheDocument()
  })
})