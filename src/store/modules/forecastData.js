import axios from 'axios'

export default {
  namespaced: true,
  state: () => ({
    data: null,
    fetchingError: {
      error: false,
      message: null
    }
  }),
  getters: {
    data(state) {
      return state.data
    },
    fetchingError(state) {
      return state.fetchingError
    }
  },
  mutations: {
    setForecastData(state, data) {
      state.data = data
    },
    setFetchingError(state, errorMsg) {
      state.fetchingError.error = true
      state.fetchingError.message = errorMsg
    },
    removeFetchingError(state) {
      state.fetchingError.error = false
      state.fetchingError.message = null
    }
  },
  actions: {
    async fetchForecastData({ dispatch }, inputPayload) {
      try {
        const currentWeatherResponse = await dispatch('fetchCurrentWeatherData', inputPayload.cityNameInput)
        const coordinatesObj = currentWeatherResponse.data.coord

        const forecastResponse = await dispatch('fetchCompleteWeatherData', coordinatesObj)
        const forecastData = forecastResponse.data
        forecastData.city = currentWeatherResponse.data.name

        dispatch('handleFetchingSuccess',
          { forecastData,
            numOfDays: inputPayload.numOfDays
          }
        )
        return 'success'
      } catch(error) {
        dispatch('handleFetchingError', error)
        return 'failed'
      }
    },
    async fetchCurrentWeatherData({ rootGetters }, cityNameInput) {
      const response = await axios({
        method: 'GET',
        url: `/weather?q=${cityNameInput}&appid=${rootGetters.apiKey}`
      })
      
      return response
    },
    async fetchCompleteWeatherData({ rootGetters }, { lat, lon }) {
      const response = await axios({
        method: 'GET',
        url: `/onecall?lat=${lat}&lon=${lon}&
        exclude=minutely,hourly&appid=${rootGetters.apiKey}`
      })

      return response
    },
    handleFetchingSuccess({ commit, getters }, payload) {
      if (getters.fetchingError.error) commit('removeFetchingError')
      commit('setForecastData', payload.forecastData)
      commit('setCurrentCity', payload.forecastData.city, { root: true })
      commit('setSelectedNumOfDays', payload.numOfDays, { root: true })
    },
    handleFetchingError({ commit, dispatch, rootGetters }, error) {
      console.log(error, "ERRRRROR")
      let errorMessage;
      if (error.response) errorMessage = error.response.data.message
      else errorMessage = error.message
      commit('setFetchingError', errorMessage)
      commit('setForecastData', null)
      commit('setCurrentCity', null, { root: true })
      commit('setSelectedNumOfDays', null, { root: true })
      if (rootGetters['backgroundJobs/timeoutId']) {
        dispatch('backgroundJobs/clearTimeout', null, { root: true })
      }
    }
  }
}