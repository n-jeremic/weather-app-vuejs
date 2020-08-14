export default {
  methods: {
    generateTemperatureString(temp) {
      const formatedTemperature = Math.round(temp / 10)
      return `${formatedTemperature} ℃`
    }
  }
}