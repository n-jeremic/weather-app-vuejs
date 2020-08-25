import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import App from '../../../src/App.vue'
import { EventBus } from '../../../src/eventBus'
import store from '../../../src/store/store'
import Vuex from 'vuex'

describe('App container', () => {
  describe('spinner', () => {
    const wrapper = shallowMount(App, {
      store
    })
    
    it('should set data prop to true if event bus emitted "loadingData"', () => {
      EventBus.$emit('loadingData')
      expect(wrapper.vm.loadingForecastData).to.equal(true)
    })
    it('should display spinner in the dom if data is loading', async () => {
      await wrapper.vm.$nextTick()
      expect(wrapper.find('.spinner-border').exists()).to.equal(true)
    })
    it('data container should not exist in the dom', () => {
      expect(wrapper.find('.data-container').exists()).to.equal(false)
    })

    it('should set data prop to false if event bus emitted "loadingDataFinished"', () => {
      EventBus.$emit('loadingDataFinished')
      expect(wrapper.vm.loadingForecastData).to.equal(false)
    })
    it('should not display spinner in the dom if data is not loading', async () => {
      await wrapper.vm.$nextTick()
      expect(wrapper.find('.spinner-border').exists()).to.equal(false)
    })
    it('data container should exist in the dom', () => {
      expect(wrapper.find('.data-container').exists()).to.equal(true)
    })
  })

  it('should dispatch action from store before creating component', () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)

    const favourites = {
      namespaced: true,
      actions: {
        getFavouritesFromLocalStorage: sinon.spy()
      }
    }

    const forecastData = {
      namespaced: true,
      getters: {
        data() {
          return null
        },
        fetchingError() {
          return {
            error: false
          }
        }
      }
    }

    const store = new Vuex.Store({
      modules: {
        forecastData,
        favourites
      }
    })

    shallowMount(App, {
      store,
      localVue
    })

    expect(favourites.actions.getFavouritesFromLocalStorage.calledOnce).to.equal(true)
  })

  describe('fetching error occured', () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)

    const favourites = {
      namespaced: true,
      actions: {
        getFavouritesFromLocalStorage() {
          return null
        }
      }
    }

    const forecastData = {
      namespaced: true,
      getters: {
        data() {
          return null
        },
        fetchingError() {
          return {
            error: true,
            message: 'testing fetch error'
          }
        }
      }
    }

    const store = new Vuex.Store({
      modules: {
        forecastData,
        favourites
      }
    })

    const wrapper = mount(App, {
      store,
      localVue
    })

    it('should set computed prop correctly', () => {
      expect(wrapper.vm.errorMessage).to.equal('TESTING FETCH ERROR.')
    })

    it('forecast data container should not exits', () => {
      expect(wrapper.find('.forecast-card').exists()).to.equal(false)
    })

    it('should display error message in the dom', () => {
      expect(wrapper.find('.error-message').element.innerText).to.equal('TESTING FETCH ERROR.')
    })
  })
})
