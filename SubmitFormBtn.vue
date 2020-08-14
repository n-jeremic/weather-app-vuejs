<template>
  <button
  class="btn btn-outline-info btn-block shadow-sm"
  @click="processRequest"
  :disabled='loadingData'
  >Submit</button>
</template>

<script>
import { EventBus } from './../../eventBus'

export default {
  data() {
    return {
      loadingData: false
    }
  },
  props: {
    cityNameInput: String,
    numOfDays: String
  },
  methods: {
    async processRequest() {
      if (this.validateForm()) {
        EventBus.$emit('loadingData')

        const result = await this.$store.dispatch(
          'forecastData/fetchForecastData',
          { cityNameInput: this.cityNameInput, numOfDays: this.numOfDays }
        )
        if (result === 'success') {
          this.$store.dispatch('backgroundJobs/setForecastRefreshTimeout')
        }

        EventBus.$emit('loadingDataFinished')
      }  
    },
    validateForm() {
      const numOfDaysInt = parseInt(this.numOfDays)
      if (this.cityNameInput.length && numOfDaysInt > 0 && numOfDaysInt < 8) return true
      if (!this.cityNameInput.length) EventBus.$emit('emptyCityInput')
      if (!this.numOfDays.length) EventBus.$emit('emptyNumOfDaysInput')
      return false
    }
  },
  beforeCreate() {
    EventBus.$on('loadingData', () => this.loadingData = true)
    EventBus.$on('loadingDataFinished', () => this.loadingData = false)
  }
}
</script>