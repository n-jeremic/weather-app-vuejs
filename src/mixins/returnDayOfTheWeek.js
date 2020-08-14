export default {
  methods: {
    getDayOfTheWeek(dayInteger) {
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      const numOfDays = days.length
    
      if (dayInteger > numOfDays - 1) {
        return days[dayInteger - numOfDays]
      } else {
        return days[dayInteger]
      }
    }
  }
}