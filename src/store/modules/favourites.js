export default {
  namespaced: true,
  state: () => ({
    favouriteCities: null
  }),
  mutations: {
    addFavouriteCity(state, favouriteCity) {
      if (state.favouriteCities) {
        state.favouriteCities.push(favouriteCity)
      } else {
        state.favouriteCities = [favouriteCity]
      }
    },
    removeFavouriteCity(state, cityName) {
      if (state.favouriteCities) {
        const index = state.favouriteCities.findIndex(city => city === cityName)
        state.favouriteCities.splice(index, 1)
        if (!state.favouriteCities.length) state.favouriteCities = null
      }
    },
    setFavouriteCities(state, favouritesArr) {
      state.favouriteCities = favouritesArr
    }
  },
  getters: {
    favouriteCities(state) {
      return state.favouriteCities
    }
  },
  actions: {
    addToFavourites({ commit, dispatch }, favCity) {
      dispatch('addToFavouritesInLocalStorage', favCity)
      commit('addFavouriteCity', favCity)
      commit('setCurrentCityIsLiked', true, { root: true })
    },
    addToFavouritesInLocalStorage(context, favCity) {
      const ls = localStorage.getItem('favouriteCities')
      if (ls) {
        const parsed = JSON.parse(ls)
        parsed.push(favCity)
        localStorage.setItem('favouriteCities', JSON.stringify(parsed))
      } else {
        localStorage.setItem('favouriteCities', JSON.stringify([favCity]))
      }
    },
    removeFromFavourites({ commit, dispatch }, cityName) {
      dispatch('removeFromFavouritesInLocalStorage', cityName)
      commit('removeFavouriteCity', cityName)
      commit('setCurrentCityIsLiked', false, { root: true })
    },
    removeFromFavouritesInLocalStorage(context, cityName) {
      const ls = localStorage.getItem('favouriteCities')
      if (ls) {
        const parsed = JSON.parse(ls)
        const index = parsed.findIndex(city => city === cityName)
        parsed.splice(index, 1)
        if (parsed.length) {
          localStorage.setItem('favouriteCities', JSON.stringify(parsed))
        } else {
          localStorage.removeItem('favouriteCities')
        }
      }
    },
    getFavouritesFromLocalStorage({ commit }) {
      const ls = localStorage.getItem('favouriteCities')
      if (ls) {
        const parsed = JSON.parse(ls)
        commit('setFavouriteCities', parsed)
      } else {
        return null
      }
    }
  }
}