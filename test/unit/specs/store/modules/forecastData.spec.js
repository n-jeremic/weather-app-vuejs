import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import forecastDataModule from '../../../../../src/store/modules/forecastData'

describe('forecast data module mutations', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  const store = new Vuex.Store({
    modules: {
      forecastData: forecastDataModule
    }
  })

  it('it should set forecast data correctly', () => {
    store.commit('forecastData/setForecastData', {
      city: 'London'
    })
    expect(store.getters['forecastData/data'].city).to.equal('London')
  })

  it('should set fetching error correctly', () => {
    store.commit('forecastData/setFetchingError', 'this city is not found')
    expect(store.getters['forecastData/fetchingError'].error).to.equal(true)
    expect(store.getters['forecastData/fetchingError'].message).to.equal('this city is not found')
  })

  it('should remove fetching error correctly', () => {
    store.commit('forecastData/removeFetchingError')
    expect(store.getters['forecastData/fetchingError'].error).to.equal(false)
    expect(store.getters['forecastData/fetchingError'].message).to.equal(null)
  })
})

describe('forecast data module fetchForecastData actions', () => {
  const sandbox = sinon.createSandbox()

  it('should dispatch handleSuccess fn if both promises resolved', async () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)

    const forecastData = { ...forecastDataModule }

    forecastData.actions.fetchCurrentWeatherData = () => Promise.resolve({
      data: {
        coord: {
          lat: 123,
          lon: 123
        },
        name: 'london'
      }
    })
    forecastData.actions.fetchCompleteWeatherData = () => Promise.resolve({ data: {} })
    forecastData.actions.handleFetchingSuccess = () => ''
    forecastData.actions.handleFetchingError = () => ''
  
    sandbox.spy(forecastData.actions)
  
    const store = new Vuex.Store({
      modules: {
        forecastData
      }
    })

    await store.dispatch('forecastData/fetchForecastData', {
      cityNameInput: 'london',
      numOfDays: '4'
    })

    expect(forecastData.actions.handleFetchingSuccess.calledOnce).to.equal(true)
    expect(forecastData.actions.handleFetchingError.calledOnce).to.equal(false)
    sandbox.restore()
  })

  it('should dispatch handleError fn if one promise rejected', async () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)

    const forecastData = { ...forecastDataModule }

    forecastData.actions.fetchCurrentWeatherData = () => Promise.reject()
    forecastData.actions.fetchCompleteWeatherData = () => Promise.resolve({ data: {} })
    forecastData.actions.handleFetchingSuccess = () => ''
    forecastData.actions.handleFetchingError = () => ''

    sandbox.spy(forecastData.actions)
  
    const store = new Vuex.Store({
      modules: {
        forecastData
      }
    })

    await store.dispatch('forecastData/fetchForecastData', {
      cityNameInput: 'london',
      numOfDays: '4'
    })

    expect(forecastData.actions.handleFetchingSuccess.calledOnce).to.equal(false)
    expect(forecastData.actions.handleFetchingError.calledOnce).to.equal(true)
    sandbox.restore()
  })
})