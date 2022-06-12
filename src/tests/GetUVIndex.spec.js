import getUVIndex from '../utils/getUVIndex'

describe('getUVIndex', () => {
  it('No data', () => {
    expect(getUVIndex()).toBeUndefined()
  })

  it('Wrong data', () => {
    expect(getUVIndex('definitelyWrongValue')).toBeUndefined()
  })

  it('UV Index of 4', () => {
    expect(getUVIndex(4)).toEqual('Medium')
  })

  it('UV Index of 12', () => {
    expect(getUVIndex(12)).toEqual('Extreme')
  })

  it('UV Index of 10', () => {
    expect(getUVIndex(10)).toEqual('Very High')
  })

  it('UV Index of 6', () => {
    expect(getUVIndex(6)).toEqual('High')
  })

  it('UV Index of 2', () => {
    expect(getUVIndex(2)).toEqual('Low')
  })
})