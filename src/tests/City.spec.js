import City from '../views/City.vue'
import { render, screen, waitForElementToBeRemoved } from '@testing-library/vue'
import "@testing-library/jest-dom"

jest.mock('vue-router')
beforeEach(() => {
  localStorage.setItem('cities', null)
  require('vue-router').useRoute.mockReturnValueOnce({ params: { city: 'Sydney' } })
});

describe('City Page', () => {
  it('Check if Not Included 1', () => {
    render(City)
    const heading = screen.queryByRole('heading', { level: 2, name: 'Sorry, this city (Sydney) is not included.' })
    expect(heading).toBeInTheDocument()
  })

  it('Check if Not Included 2', () => {
    localStorage.setItem('cities', 'test')
    render(City)
    const heading = screen.queryByRole('heading', { level: 2, name: 'Sorry, this city (Sydney) is not included.' })
    expect(heading).toBeInTheDocument()
  })

  it('Check if Not Included 3', () => {
    localStorage.setItem('cities', '["Astrakhan","Podgorica"]')
    render(City)
    const heading = screen.queryByRole('heading', { level: 2, name: 'Sorry, this city (Sydney) is not included.' })
    expect(heading).toBeInTheDocument()
  })

  it('Check if Included', () => {
    localStorage.setItem('cities', '["Astrakhan","Sydney","Podgorica"]')
    render(City)
    const heading = screen.queryByRole('heading', { level: 2, name: /sydney/i })
    const headingLoading = screen.queryByRole('heading', { level: 3, name: /loading/i })
    expect(heading).toBeInTheDocument()
    expect(headingLoading).toBeInTheDocument()
  })

  it('After Loading', async () => {
    localStorage.setItem('cities', '["Astrakhan","Sydney","Podgorica"]')
    const { container } = render(City)
    const headingLoading = screen.queryByRole('heading', { level: 3, name: /loading/i })
    expect(headingLoading).toBeInTheDocument()
    await waitForElementToBeRemoved(headingLoading, { timeout: 10000 })
      .then(() => {
        const heading = screen.queryByRole('heading', { level: 1, name: /sydney/i })
        expect(heading).toBeInTheDocument()
        const country = screen.getByText(/Australia/i)
        expect(country).toBeInTheDocument()
        expect(container.querySelector('.detailed-card.weather-report')).toBeInTheDocument()
        expect(container.querySelectorAll('.weather-report__hour').length).toBe(15 * 24)
      })
  })
})
