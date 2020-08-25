import iconUrl from '../../../../src/mixins/generateIconUrl'

describe('generating weather icon url', () => {
  it('', () => {
    expect(iconUrl.methods.generateIconUrl('10d')).to.equal('http://openweathermap.org/img/wn/10d@2x.png')
    expect(iconUrl.methods.generateIconUrl('15d')).to.equal('http://openweathermap.org/img/wn/15d@2x.png')
  })
})