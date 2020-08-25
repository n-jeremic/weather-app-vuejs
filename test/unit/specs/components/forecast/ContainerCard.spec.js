import { mount } from '@vue/test-utils'
import ContainerCard from '../../../../../src/components/forecast/ContainerCard.vue'
import forecastMockData from '../../../../mockdata/forecastData'
import store from '../../../../../src/store/store'

const wrapper = mount(ContainerCard, {
  propsData: {
    forecastDataObj: forecastMockData
  },
  store
})

describe('ForecastContainerCard', () => {
  wrapper.vm.$store.commit('setCurrentCity', 'london')
  wrapper.vm.$store.commit('setSelectedNumOfDays', '3')

  it('should have cityName computed prop correct', () => {
    expect(wrapper.vm.cityName).to.equal('london')
  })

  it('should have isLiked computed prop set to false', () => {
    expect(wrapper.vm.isLiked).to.equal(false)
  })

  it('should have correct city name displayed', () => {
    expect(wrapper.find('.card-title').element.innerText.includes('London')).to.equal(true)
  })

  it('should have numberOfDays computed prop as integer', () => {
    expect(wrapper.vm.numberOfDays).to.equal(3)
  })

  it('should display forecast table if numberOfDays is higher than 1', () => {
    expect(wrapper.find('.forecast-table').exists()).to.equal(true)
  })

  it('should not display forecast table if numberOfDays is lower than 2', async () => {
    wrapper.vm.$store.commit('setSelectedNumOfDays', '1')
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.forecast-table').exists()).to.equal(false)
  })

  describe('btn add to favourites', () => {
    it('should be displayed if current city is not liked', async () => {
      wrapper.vm.$store.commit('setCurrentCityIsLiked', false)
      await wrapper.vm.$nextTick()
      expect(wrapper.find('.btn-primary').exists()).to.equal(true)
    })

    it('on click should dispatch addToFavourites action from store', async () => {
      const sandbox = sinon.createSandbox()
      sandbox.spy(wrapper.vm.$store._actions['favourites/addToFavourites'], 0)
      await wrapper.find('.btn-primary').trigger('click')
      expect(wrapper.vm.$store._actions['favourites/addToFavourites'][0].calledOnce).to.equal(true)
    })

    it('should be removed if current city is liked', async () => {
      wrapper.vm.$store.commit('setCurrentCityIsLiked', true)
      await wrapper.vm.$nextTick()
      expect(wrapper.find('.btn-primary').exists()).to.equal(false)
    })
  })

  describe('btn remove from favourites', () => {
    it('should be displayed if current city is liked', async () => {
      wrapper.vm.$store.commit('setCurrentCityIsLiked', true)
      await wrapper.vm.$nextTick()
      expect(wrapper.find('.btn-danger').exists()).to.equal(true)
    })

    it('on click should dispatch removeFromFavourites action from store', async () => {
      const sandbox = sinon.createSandbox()
      sandbox.spy(wrapper.vm.$store._actions['favourites/removeFromFavourites'], 0)
      await wrapper.find('.btn-danger').trigger('click')
      expect(wrapper.vm.$store._actions['favourites/removeFromFavourites'][0].calledOnce).to.equal(true)
    })

    it('should be removed if current city is not liked', async () => {
      wrapper.vm.$store.commit('setCurrentCityIsLiked', false)
      await wrapper.vm.$nextTick()
      expect(wrapper.find('.btn-danger').exists()).to.equal(false)
    })
  })
})