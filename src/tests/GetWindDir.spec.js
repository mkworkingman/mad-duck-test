import getWindDir from '../utils/getWindDir'

describe('getWindDir', () => {
  it('No data', () => {
    expect(getWindDir()).toBeUndefined()
  })

  it('Wrong data', () => {
    expect(getWindDir('definitelyNotANumber')).toBeUndefined()
  })

  it('0 deg', () => {
    expect(getWindDir(0)).toEqual('N')
  })

  it('45 deg', () => {
    expect(getWindDir(45)).toEqual('NE')
  })

  it('90 deg', () => {
    expect(getWindDir(90)).toEqual('E')
  })

  it('135 deg', () => {
    expect(getWindDir(135)).toEqual('SE')
  })

  it('180 deg', () => {
    expect(getWindDir(180)).toEqual('S')
  })

  it('225 deg', () => {
    expect(getWindDir(225)).toEqual('SW')
  })

  it('270 deg', () => {
    expect(getWindDir(270)).toEqual('W')
  })

  it('315 deg', () => {
    expect(getWindDir(315)).toEqual('NW')
  })

  it('359 deg', () => {
    expect(getWindDir(359)).toEqual('N')
  })

  it('360 deg', () => {
    expect(getWindDir(360)).toEqual('N')
  })
})
