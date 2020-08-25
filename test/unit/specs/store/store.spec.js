import store from '../../../../src/store/store'

describe('main store', () => {
  it('should have correct values on initial loading', () => {
    expect(store.getters.currentCity).to.equal(null)
    expect(store.getters.selectedNumOfDays).to.equal(null)
    expect(store.getters['forecastData/data']).to.equal(null)
    expect(store.getters['forecastData/fetchingError'].error).to.equal(false)
    expect(store.getters['forecastData/fetchingError'].message).to.equal(null)
    expect(store.getters['backgroundJobs/timeoutId']).to.equal(null)
    expect(store.getters['favourites/favouriteCities']).to.equal(null)
  })

  it('should set currentCity prop as expected', () => {
    store.commit('setCurrentCity', 'london')
    expect(store.getters.currentCity).to.equal('london')
    expect(store.getters.isCurrentCityLiked).to.equal(false)
  })
})