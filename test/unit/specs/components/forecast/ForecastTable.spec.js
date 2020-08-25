import { shallowMount } from '@vue/test-utils'
import CompleteForecastTable from '../../../../../src/components/forecast/CompleteForecastTable.vue'
import forecastMockData from '../../../../mockdata/forecastData'

const wrapper = shallowMount(CompleteForecastTable, {
  propsData: {
    forecastData: forecastMockData.daily
  }
})

const currentDay = new Date().getDay()

describe('forecastTable', () => {
  it('table title should be correct for numOfDays lower than 2', async () => {
    await wrapper.setProps({
      numOfDays: 1
    })
    expect(wrapper.vm.tableTitle).to.equal('Forecast for tomorrow')
  })
  it('table title should be correct for numOfDays higher than 2', async () => {
    await wrapper.setProps({
      numOfDays: 4
    })
    expect(wrapper.vm.tableTitle).to.equal('Next 3 days forecast')
  })

  it('dataToRender array should have correct number of objects', () => {
    expect(wrapper.vm.dataToRender.length).to.equal(3)
  })

  it('currentDayInteger should be correct', () => {
    expect(wrapper.vm.currentDayInteger).to.equal(currentDay)
  })

  it('table should have 3 rows in table body', () => {
    expect(wrapper.findAll('tbody tr').length).to.equal(3)
  })

  it('table should have 1 row in table body', async () => {
    await wrapper.setProps({
      numOfDays: 2
    })

    expect(wrapper.findAll('tbody tr').length).to.equal(1)
  })
})