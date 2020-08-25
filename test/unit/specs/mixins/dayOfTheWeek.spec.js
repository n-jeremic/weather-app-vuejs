import dayOfTheWeek from '../../../../src/mixins/returnDayOfTheWeek'

describe('getDayOfTheWeek method', () => {
  it('should return correct day', () => {
    expect(dayOfTheWeek.methods.getDayOfTheWeek(0)).to.equal('Sunday')
    expect(dayOfTheWeek.methods.getDayOfTheWeek(3)).to.equal('Wednesday')
    expect(dayOfTheWeek.methods.getDayOfTheWeek(7)).to.equal('Sunday')
    expect(dayOfTheWeek.methods.getDayOfTheWeek(10)).to.equal('Wednesday')
  })
})