import City from './City.vue'
import { render, screen, waitForElementToBeRemoved } from '@testing-library/vue'
import "@testing-library/jest-dom"

jest.mock('vue-router')
beforeEach(() => {
  localStorage.setItem('cities', null)
  require('vue-router').useRoute.mockReturnValueOnce({ params: { city: 'novi_sad' } })
});

describe('City Page', () => {
  it('Check Formatted Name', () => {
    render(City)
    const heading = screen.queryByRole('heading', { level: 1, name: 'Novi Sad' })
    expect(heading).toBeInTheDocument()
  })

  it('Not Included 1', () => {
    const { container } = render(City)
    expect(container.querySelector('.main-info__status').innerHTML).toEqual('Sorry, this city is not included.')
  })

  it('Not Included 2', () => {
    localStorage.setItem('cities', '["astrakhan","sydney","podgorica"]')
    const { container } = render(City)
    expect(container.querySelector('.main-info__status').innerHTML).toEqual('Sorry, this city is not included.')
  })

  it('Wrong Localstorage', () => {
    localStorage.setItem('cities', 'test')
    const { container } = render(City)
    expect(container.querySelector('.main-info__status').innerHTML).toEqual('Sorry, this city is not included.')
  })

  it('Included', () => {
    localStorage.setItem('cities', '["astrakhan","sydney","novi_sad","podgorica"]')
    const { container } = render(City)
    expect(container.querySelector('.main-info__status').innerHTML).toEqual('Loading...')
  })

  it('After Loading', async () => {
    localStorage.setItem('cities', '["astrakhan","sydney","novi_sad","podgorica"]')
    const { container } = render(City)
    await waitForElementToBeRemoved(screen.getByText('Loading...'))
      .then(() => {
        const contInnerHTML = container.innerHTML
        expect(contInnerHTML).toMatch(/Serbia/i)
        expect(container.querySelectorAll('img').length).toBe(1)
        expect(contInnerHTML).toMatch(/°C/i)
        expect(contInnerHTML).toMatch(/UV index/i)
      })
  })
})
