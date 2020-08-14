import Vue from 'vue'
import Vuex from 'vuex'
import forecastData from './modules/forecastData'
import backgroundJobs from './modules/backgroundJobs'
import favourites from './modules/favourites'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    forecastData,
    backgroundJobs,
    favourites
  },
  state: {
    apiKey: '22499a2db07fe90d36fd48a0729fc39a',
    currentCity: null,
    selectedNumOfDays: null
  },
  getters: {
    apiKey: state => state.apiKey,
    currentCity: state => {
      if (state.currentCity) {
        return state.currentCity.cityName
      }
      return state.currentCity
    },
    isCurrentCityLiked: state => {
      if (state.currentCity) {
        return state.currentCity.isLiked
      }
      return false
    },
    selectedNumOfDays: state => state.selectedNumOfDays
  },
  mutations: {
    setCurrentCity(state, newCurrentCity) {
      if (newCurrentCity !== null) {
        let isLiked
        const cityName = newCurrentCity.toLowerCase()
        if (state.favourites.favouriteCities) {
          isLiked = state.favourites.favouriteCities.includes(cityName)
        } else {
          isLiked = false
        }
        state.currentCity = {
          cityName,
          isLiked
        }
      } else {
        state.currentCity = null
      }
    },
    setSelectedNumOfDays(state, newNumber) {
      state.selectedNumOfDays = newNumber
    },
    setCurrentCityIsLiked(state, isLiked) {
      if (state.currentCity) {
        state.currentCity.isLiked = isLiked
      }
    }
  }
})