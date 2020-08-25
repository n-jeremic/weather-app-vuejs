import { mount } from '@vue/test-utils'
import CurrentWeatherCard from '../../../../../../src/components/forecast/CurrentWeatherCard.vue'
import forecastDataMock from '../../../../../mockdata/forecastData'
import daysOfTheWeek from '../../../../../mockdata/daysOfTheWeek'

const wrapper = mount(CurrentWeatherCard, {
  propsData: {
    currentWeatherData: forecastDataMock.current
  }
})

const currentDay = daysOfTheWeek[new Date().getDay()]

describe('card header should be displayed correctly', () => {
  it('icon url should be correct', () => {
    expect(wrapper.find('#currWeatherIcon').element.src)
      .to.equal(`http://openweathermap.org/img/wn/${wrapper.vm.currentWeatherData.weather[0].icon}@2x.png`)
  })

  it('weather description shoul be correct', () => {
    expect(wrapper.find('#currWeatherDescription').element.innerText)
      .to.equal(wrapper.vm.currentWeatherData.weather[0].main)
  })

  describe('current day should be correct', () => {
    it('currentDay computed prop should be correct', () => {
      expect(wrapper.vm.currentDay).to.equal(currentDay)
    })

    it('current day should be correctly displayed in dom', () => {
      expect(wrapper.find('#currentDayOutput').element.innerText).to.equal(currentDay)
    })
  })
})