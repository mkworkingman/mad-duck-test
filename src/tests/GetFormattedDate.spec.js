import getFormattedDate from '../utils/getFormattedDate'

describe('getFormattedDate', () => {
  it('No data', () => {
    expect(getFormattedDate()).toBeUndefined()
  })

  it('Wrong data', () => {
    expect(getFormattedDate('definitelyWrongValue')).toBeUndefined()
  })

  it('Right data 1', () => {
    expect(getFormattedDate('2022-06-13')).toEqual('Monday, Jun 13.')
  })

  it('Right data 2', () => {
    expect(getFormattedDate('2022-10-20')).toEqual('Thursday, Oct 20.')
  })

  it('Right data 3', () => {
    expect(getFormattedDate('2022-12-31')).toEqual('Saturday, Dec 31.')
  })
})
