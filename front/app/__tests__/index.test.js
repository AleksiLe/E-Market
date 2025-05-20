import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from '../src/app/page'

describe('Page', () => {
  it('renders a landing page', () => {
    render(<Page />)
 
    expect(screen.getByText('Shopping made simple for everyone')).toBeInTheDocument()
  })
})