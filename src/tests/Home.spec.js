import Home from '../views/Home.vue'
import { render, screen, waitForElementToBeRemoved } from '@testing-library/vue'
import "@testing-library/jest-dom"
import "@testing-library/user-event"

beforeEach(() => {
  localStorage.setItem('cities', null)
  jest.spyOn(console, 'warn').mockImplementation(() => {});
});

describe('Main Page', () => {
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

  it('Empty Localstorage', () => {
    const { container } = render(Home)
    expect(container.querySelectorAll('.card').length).toBe(0)
  })

  it('Wrong Localstorage', () => {
    localStorage.setItem('cities', 'test')
    const { container } = render(Home)
    expect(container.querySelectorAll('.card').length).toBe(0)
  })

  it('Full Localstorage', async () => {
    localStorage.setItem('cities', '["Sydney","Belgrade","Podgorica"]')
    
    const { container } = render(Home)

    expect(container.querySelectorAll('.card').length).toBe(3)
    const firstCard = container.querySelectorAll('.card')[0]
    await waitForElementToBeRemoved(firstCard.querySelector('.card__loading'))
      .then(() => {
        const firstCardInnerHTML = firstCard.innerHTML
        expect(firstCardInnerHTML).toMatch(/Sydney/i)
        expect(firstCardInnerHTML).toMatch(/°C/i)
        expect(firstCardInnerHTML).toMatch(/View City/i)
      })
  })
})
