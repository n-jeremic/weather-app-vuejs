<template>
  <div class="card mt-4 weather-info-card forecast-table">
    <h5 class="card-header weather-info-card-header">{{ tableTitle }}</h5>
    <div class="card-body">
      <table class="table table-bordered table-hover">
        <thead>
          <tr>
            <th scope="col">Day</th>
            <th scope="col">Description</th>
            <th scope="col">Temperature</th>
            <th scope="col">Humidity</th>
            <th scope="col">Pressure</th>
            <th scope="col">Wind speed</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(day, index) in dataToRender" :key="index">
            <th scope="row">{{ getDayOfTheWeek(currentDayInteger + index + 1) }}</th>
            <td><img :src="generateIconUrl(day.weather[0].icon)">{{ day.weather[0].description }}</td>
            <td>{{ generateTemperatureString(day.temp.day) }}</td>
            <td>{{ day.humidity }} %</td>
            <td>{{ day.pressure }} mbar</td>
            <td>{{ day.wind_speed }} km/h</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import returnDayOfTheWeekMixin from './../../mixins/returnDayOfTheWeek'
import generateIconUrlMixin from './../../mixins/generateIconUrl'
import formatTemperatureMixin from './../../mixins/formatTemperature'

export default {
  mixins: [
    returnDayOfTheWeekMixin,
    generateIconUrlMixin,
    formatTemperatureMixin
  ],
  props: {
    numOfDays: Number,
    forecastData: Array
  },
  computed: {
    tableTitle() {
      if (this.numOfDays > 2) {
        return `Next ${this.numOfDays - 1} days forecast`
      } else {
        return `Forecast for tomorrow`
      }
    },
    dataToRender() {
      const data = []
      for (let i = 0; i < this.numOfDays - 1; i++) {
        data.push(this.forecastData[i])
      }

      return data
    },
    currentDayInteger() {
      return new Date().getDay()
    }
  }
}
</script>

<style scoped>
img {
  width: 30px;
}

th, td {
  text-align: center;
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
  padding-bottom: 0;
}
</style>