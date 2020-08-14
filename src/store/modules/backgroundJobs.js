export default {
  namespaced: true,
  state: () => ({
    timeoutId: null,
    timeoutPeriod: 60000
  }),
  getters: {
    timeoutId(state) {
      return state.timeoutId
    },
    timeoutPeriod(state) {
      return state.timeoutPeriod
    }
  },
  mutations: {
    setTimeoutId(state, newId) {
      state.timeoutId = newId
    }
  },
  actions: {
    setForecastRefreshTimeout({ dispatch, commit, getters, rootGetters }) {
      if (getters.timeoutId) {
        dispatch('clearTimeout')
      }

      const newTimeoutId = window.setTimeout(async () => {
        const result = await dispatch(
          'forecastData/fetchForecastData',
          {
            cityNameInput: rootGetters.currentCity,
            numOfDays: rootGetters.selectedNumOfDays
          },
          { root: true }
        )
        if (result === 'success') {
          dispatch('setForecastRefreshTimeout')
        }
      }, getters.timeoutPeriod)

      commit('setTimeoutId', newTimeoutId)
    },
    clearTimeout({ commit, getters }) {
      window.clearTimeout(getters.timeoutId)
      commit('setTimeoutId', null)
    }
  }
}