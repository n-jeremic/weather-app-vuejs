import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import favouritesModule from '../../../../../src/store/modules/favourites'

describe('favourites module', () => {
  describe('mutations', () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)

    const store = new Vuex.Store({
      modules: {
        favourites: favouritesModule
      }
    })

    it('addFavouriteCity should add city to the array', () => {
      store.commit('favourites/addFavouriteCity', 'rome')
      expect(store.getters['favourites/favouriteCities'].includes('rome')).to.equal(true)
    })

    it('removeFavouriteCity should set prop to null if last element was removed', () => {
      store.commit('favourites/removeFavouriteCity', 'rome')
      expect(store.getters['favourites/favouriteCities']).to.equal(null)
    })

    it('removeFavouriteCity should remove city from the array if there are more cities left', () => {
      store.commit('favourites/addFavouriteCity', 'rome')
      store.commit('favourites/addFavouriteCity', 'london')
      store.commit('favourites/removeFavouriteCity', 'rome')
      expect(store.getters['favourites/favouriteCities'].includes('rome')).to.equal(false)
    })

    it('setFavouriteCities should set an array of favourite cities', () => {
      store.commit('favourites/setFavouriteCities', [
        'london',
        'rome'
      ])

      expect(store.getters['favourites/favouriteCities'][0]).to.equal('london')
      expect(store.getters['favourites/favouriteCities'][1]).to.equal('rome')
    })
  })

  describe('actions', () => {
    const sandbox = sinon.createSandbox()
    let store;
    let mutations;
    beforeEach(() => {
      const localVue = createLocalVue()
      localVue.use(Vuex)

      mutations = {
        setCurrentCityIsLiked: function() {
          return ''
        }
      }
  
      sandbox.spy(favouritesModule.mutations)
      sandbox.spy(favouritesModule.actions)
      sandbox.spy(mutations, 'setCurrentCityIsLiked')
      
      store = new Vuex.Store({
        modules: {
          favourites: favouritesModule
        },
        mutations
      })
    })
  
    afterEach(() => sandbox.restore())

    it('addToFavourites should call proper methods', () => {
      store.dispatch('favourites/addToFavourites', 'london')
      expect(favouritesModule.actions.addToFavouritesInLocalStorage.calledOnce).to.equal(true)
      expect(favouritesModule.mutations.addFavouriteCity.calledOnce).to.equal(true)
      expect(mutations.setCurrentCityIsLiked.calledOnce).to.equal(true)
    })

    it('addToFavourites should call proper methods with correct argument', () => {
      store.dispatch('favourites/addToFavourites', 'london')
      expect(favouritesModule.actions.addToFavouritesInLocalStorage.args[0][1]).to.equal('london')
      expect(favouritesModule.mutations.addFavouriteCity.args[0][1]).to.equal('london')
      expect(mutations.setCurrentCityIsLiked.args[0][1]).to.equal(true) 
    })

    it('removeFromFavourites should call proper methods', () => {
      store.dispatch('favourites/removeFromFavourites', 'london')
      expect(favouritesModule.actions.removeFromFavouritesInLocalStorage.calledOnce).to.equal(true)
      expect(favouritesModule.mutations.removeFavouriteCity.calledOnce).to.equal(true)
      expect(mutations.setCurrentCityIsLiked.calledOnce).to.equal(true)
    })

    it('removeFromFavourites should call proper methods with correct argument', () => {
      store.dispatch('favourites/removeFromFavourites', 'london')
      expect(favouritesModule.actions.removeFromFavouritesInLocalStorage.args[0][1]).to.equal('london')
      expect(favouritesModule.mutations.removeFavouriteCity.args[0][1]).to.equal('london')
      expect(mutations.setCurrentCityIsLiked.args[0][1]).to.equal(false) 
    })
  })
})