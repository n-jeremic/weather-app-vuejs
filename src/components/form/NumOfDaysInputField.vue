<template>
  <div>
    <label for="numOfDaysInput">Number of days:</label>
    <input
      type="number"
      id="numOfDaysInput"
      :class="['form-control', {'is-invalid': invalidInputMessage}]"
      step="1"
      :value="value"
      @input="validateAndEmmitEvent"
    >
    <div class="invalid-feedback" v-if="invalidInputMessage">
      {{ invalidInputMessage }}
    </div>
  </div>
</template>

<script>
import { EventBus } from './../../eventBus'

export default {
  props: {
    value: String
  },
  data() {
    return {
      invalidInputMessage: null
    }
  },
  methods: {
    validateAndEmmitEvent(event) {
      const inputValue = event.target.value
      this.$emit('input', inputValue)

      const integerValue = parseInt(inputValue)
      if (integerValue < 1) {
        this.invalidInputMessage = 'Minimum value is 1.'
      } else if (integerValue > 7) {
        this.invalidInputMessage = 'Maximum value is 7.'
      } else {
        this.invalidInputMessage = null
      }
    }
  },
  beforeCreate() {
    EventBus.$on('emptyNumOfDaysInput', () => {
      this.invalidInputMessage = 'This field is required.'
    })
  }
}
</script>