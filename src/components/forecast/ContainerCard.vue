<template>
  <div class="card shadow-sm mt-4">
    <div class="card-body">
      <h3 class="card-title">
        {{ forecastDataObj.city }}
        <button class="btn btn-primary btn-fav" @click="addToFavourites" v-if="!isLiked">Add to favourites</button>
        <button class="btn btn-danger btn-fav" @click="removeFromFavourites" v-else>Remove from favourites</button>
      </h3>
      <app-current-weather-card :currentWeatherData="forecastDataObj.current"/>
      <app-forecast-table
        v-if="numberOfDays > 1"
        :numOfDays='numberOfDays'
        :forecastData='forecastDataObj.daily'
      />
    </div>
  </div>
</template>

<script>
import CurrentWeatherCard from './CurrentWeatherCard.vue'
import CompleteForecastTable from './CompleteForecastTable.vue'

export default {
  props: {
    forecastDataObj: Object
  },
  components: {
    appCurrentWeatherCard: CurrentWeatherCard,
    appForecastTable: CompleteForecastTable
  },
  computed: {
    numberOfDays() {
      return parseInt(this.$store.getters.selectedNumOfDays)
    },
    cityName() {
      return this.$store.getters.currentCity
    },
    isLiked() {
      return this.$store.getters.isCurrentCityLiked
    }
  },
  methods: {
    addToFavourites() {
      this.$store.dispatch('favourites/addToFavourites', this.cityName)
    },
    removeFromFavourites() {
      this.$store.dispatch('favourites/removeFromFavourites', this.cityName)
    }
  }
}
</script>

<style scoped>
.btn-fav {
  float: right;
}
</style>