<template>
  <div id="app" class="container-fluid">
    <div class="row">
      <div class="col-lg-8 offset-lg-2 col-sm-12">
        <div class="card shadow">
          <h3 class="card-header">
            Weather App
            <div class="spinner-border text-info" role="status" v-if="loadingForecastData"/>
          </h3>
          <div class="card-body">
            <app-form/>
            <div class="data-container" v-if="!loadingForecastData">
              <app-forecast-card v-if="forecastData" :forecastDataObj="forecastData"/>
              <app-fetch-error-message v-if="errorMessage" :errorMsg="errorMessage"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Form from './components/form/Form.vue'
import ForecastCard from './components/forecast/ContainerCard.vue'
import FetchErrorMessage from './components/error/FetchErrorMessage.vue'
import { EventBus } from './eventBus'

export default {
  components: {
    appForm: Form,
    appForecastCard: ForecastCard,
    appFetchErrorMessage: FetchErrorMessage
  },
  data() { 
    return {
      loadingForecastData: false
    }
  },
  computed: {
    forecastData() {
      return this.$store.getters['forecastData/data']
    },
    errorMessage() {
      const errorObj = this.$store.getters['forecastData/fetchingError']
      if (errorObj.error) {
        return errorObj.message.toUpperCase() + '.'
      } else {
        return null
      }
    }
  },
  beforeCreate() {
    EventBus.$on('loadingData', () => this.loadingForecastData = true)
    EventBus.$on('loadingDataFinished', () => this.loadingForecastData = false)
    this.$store.dispatch('favourites/getFavouritesFromLocalStorage')
  }
}
</script>

<style scoped>
#app {
  padding-top: 3rem;
}

.spinner-border {
  float: right;
  height: 2rem;
  width: 2rem;
}
</style>
