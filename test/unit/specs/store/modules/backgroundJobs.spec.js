import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import forecastDataModule from '../../../../../src/store/modules/forecastData'
import backgroundJobsModule from '../../../../../src/store/modules/backgroundJobs'
import flushPromises from 'flush-promises'

describe('background jobs module', () => {
  describe('setting timeout id', () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)

    const store = new Vuex.Store({
      modules: {
        forecastData: forecastDataModule,
        backgroundJobs: backgroundJobsModule
      }
    })

    it('mutation should set timeout id properly', () => {
      store.commit('backgroundJobs/setTimeoutId', 12345)
      expect(store.getters['backgroundJobs/timeoutId']).to.equal(12345)
    })
  })

  describe('actions', () => {
    const forecastData = { ...forecastDataModule }
    const backgroundJobs = { ...backgroundJobsModule }
    forecastData.actions.fetchForecastData = () => 'success'

    const sandbox = sinon.createSandbox()
    sandbox.spy(forecastData.actions, 'fetchForecastData')
    sandbox.spy(backgroundJobs.actions)

    const localVue = createLocalVue()
    localVue.use(Vuex)

    const store = new Vuex.Store({
      modules: {
        forecastData,
        backgroundJobs
      }
    })

    it('should not call clearTimeout fn when there is no timeout id', () => {
      store.dispatch('backgroundJobs/setForecastRefreshTimeout')
      expect(backgroundJobs.actions.clearTimeout.calledOnce).to.equal(false)
    })

    it('timeout id should be set', () => {
      expect(store.getters['backgroundJobs/timeoutId']).to.exist
    })

    it('should call clearTimeout fn when there is timeout id', () => {
      store.dispatch('backgroundJobs/setForecastRefreshTimeout')
      expect(backgroundJobs.actions.clearTimeout.calledOnce).to.equal(true)
    })

    it('setForecastRefreshTimeout method should dispatch action from forecastData module after specified period', async () => {
      await flushPromises()
      const clock = sinon.useFakeTimers()
      store.dispatch('backgroundJobs/setForecastRefreshTimeout')
      clock.tick(store.getters['backgroundJobs/timeoutPeriod'])

      expect(forecastData.actions.fetchForecastData.calledOnce).to.equal(true)
    })

    it('setForecastRefreshTimeout method should call itself when fetchForecastData is successfull', async () => {
      await flushPromises()
      expect(backgroundJobs.actions.setForecastRefreshTimeout.callCount).to.equal(4)
    })
  })
})