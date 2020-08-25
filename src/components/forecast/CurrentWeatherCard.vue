<template>
  <div class="card weather-info-card mt-4">
    <h5 class="card-header weather-info-card-header">
      <img :src="generateIconUrl(currentWeatherData.weather[0].icon)" id="currWeatherIcon">
      <span class="align-middle" id="currWeatherDescription">{{ currentWeatherData.weather[0].main }}</span>
      <span class="ml-2 text-muted align-middle">( Weather Today )</span>
      <button class="btn btn-secondary btn-sm" id="currentDayOutput" disabled>{{ currentDay }}</button>
    </h5>
    <div class="card-body">
      <div class="row">
        <div class="col-xl-3 col-lg-6 col-sm-12">
          <app-temperature-output :temperature="currentWeatherData.temp"/>
        </div>
        <div class="col-xl-3 col-lg-6 col-sm-12">
          <app-humidity-output :humidity="currentWeatherData.humidity"/>
        </div>
        <div class="col-xl-3 col-lg-6 col-sm-12">
          <app-pressure-output :pressure="currentWeatherData.pressure"/>
        </div>
        <div class="col-xl-3 col-lg-6 col-sm-12">
          <app-wind-output :windSpeed="currentWeatherData.wind_speed"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HumidityOutput from './singleOutputs/HumidityOutput.vue'
import PressureOutput from './singleOutputs/PressureOutput.vue'
import TemperatureOutput from './singleOutputs/TemperatureOutput.vue'
import WindOutput from './singleOutputs/WindOutput.vue'
import returnDayOfTheWeekMixin from './../../mixins/returnDayOfTheWeek'
import generateIconUrlMixin from './../../mixins/generateIconUrl'

export default {
  mixins: [returnDayOfTheWeekMixin, generateIconUrlMixin],
  props: {
    currentWeatherData: Object
  },
  components: {
    appHumidityOutput: HumidityOutput,
    appPressureOutput: PressureOutput,
    appTemperatureOutput: TemperatureOutput,
    appWindOutput: WindOutput
  },
  computed: {
    currentDay() {
      const dayInteger = new Date().getDay()
      return this.getDayOfTheWeek(dayInteger)
    }
  }
}
</script>

<style scoped>
button {
  float: right;
}

img {
  width: 32px;
}

.weather-info-card-header {
  background-color: #cce6ff;
  border-bottom: unset;
}

.weather-info-card {
  border: unset;
}

.weather-info-card .card-body {
  border: 1px solid rgba(0,0,0,.125);
  border-radius: 0 0 .25rem .25rem;
}
</style>