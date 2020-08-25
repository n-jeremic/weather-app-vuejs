import { shallowMount, createLocalVue } from '@vue/test-utils'
import FavouritesDropdown from '../../../../../src/components/form/FavouritesDropdown.vue'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('favouritesDropdown', () => {
  describe('behavior with favourite cities in the store', () => {
    const favourites = {
      namespaced: true,
      state() {
        return {
          favouriteCities: [
            'london',
            'rome',
            'paris'
          ]
        }
      },
      getters: {
        favouriteCities(state) {
          return state.favouriteCities
        }
      }
    }
    
    const store = new Vuex.Store({
      modules: {
        favourites
      }
    })
    
    const wrapper = shallowMount(FavouritesDropdown, {
      store,
      localVue
    })

    it('favouriteCities computed prop should have proper items in the array', () => {
      expect(wrapper.vm.favouriteCities[0]).to.equal('london')
      expect(wrapper.vm.favouriteCities[1]).to.equal('rome')
      expect(wrapper.vm.favouriteCities[2]).to.equal('paris')
    })

    it('select menu should have 4 option elements', () => {
      expect(wrapper.findAll('option').length).to.equal(4)
    })

    it('first option element should have proper text', () => {
      expect(wrapper.findAll('option').at(0).element.innerText).to.equal('Not selected')
    })

    it('the rest of option elements should have proper text', () => {
      expect(wrapper.findAll('option').at(1).element.innerText).to.equal('London')
      expect(wrapper.findAll('option').at(2).element.innerText).to.equal('Rome')
      expect(wrapper.findAll('option').at(3).element.innerText).to.equal('Paris')
    })

    it('on change event on select menu with "null" component should NOT emit event to the parent', async () => {
      const select = wrapper.find('select')
      select.element.value = 'null'
      await select.trigger('change')
      expect(wrapper.emitted('favouriteCitySelected')).to.not.exist
    })

    it('on change event on select menu component should emit event to the parent', async () => {
      const select = wrapper.find('select')
      select.element.value = 'london'
      await select.trigger('change')
      expect(wrapper.emitted('favouriteCitySelected')).to.exist
    })
  })

  describe('behavior without favourite cities in the store', () => {
    const favourites = {
      namespaced: true,
      state() {
        return {
          favouriteCities: null
        }
      },
      getters: {
        favouriteCities(state) {
          return state.favouriteCities
        }
      }
    }
    
    const store = new Vuex.Store({
      modules: {
        favourites
      }
    })
    
    const wrapper = shallowMount(FavouritesDropdown, {
      store,
      localVue
    })

    it('favouriteCities computed prop should be null', () => {
      expect(wrapper.vm.favouriteCities).to.equal(null)
    })

    it('should be only one option in select menu', () => {
      expect(wrapper.findAll('option').length).to.equal(1)
    })

    it('option element should have proper text', () => {
      expect(wrapper.find('option').element.innerText).to.equal('No favourite cities yet')
    })

    it('capitalize method should work properly', () => {
      expect(wrapper.vm.capitalize('rome')).to.equal('Rome')
      expect(wrapper.vm.capitalize('')).to.equal('')
    })

    it('on change event on select menu with "null" component should NOT emit event to the parent', async () => {
      const select = wrapper.find('select')
      select.element.value = 'null'
      await select.trigger('change')
      expect(wrapper.emitted('favouriteCitySelected')).to.not.exist
    })
  })
})


