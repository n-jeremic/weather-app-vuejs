import formatTemperature from '../../../../src/mixins/formatTemperature'

describe('formating temperature', () => {
  it('', () => {
    expect(formatTemperature.methods.generateTemperatureString(301.49)).to.equal('30 ℃')
    expect(formatTemperature.methods.generateTemperatureString(283.57)).to.equal('28 ℃')
    expect(formatTemperature.methods.generateTemperatureString(113.41)).to.equal('11 ℃')
  })
})