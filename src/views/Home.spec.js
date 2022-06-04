import Home from './Home.vue'
import { render, screen } from '@testing-library/vue'
import "@testing-library/jest-dom"
import "@testing-library/user-event"

describe('Main Page', () => {
  describe('Layout', () => {
    it('Has Main Heading', () => {
      render(Home)
      const heading = screen.queryByRole('heading', { level: 1, name: 'Add Cities' })
      expect(heading).toBeInTheDocument()
    })

    it('Has New City Input', () => {
      render(Home)
      const input = screen.queryByPlaceholderText('Add a city…')
      expect(input.type).toBe('text')
    })
  })
})
