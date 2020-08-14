<template>
  <div>
    <label for="cityInput">Desired city:</label>
    <input
      autocomplete="off"
      type="text"
      id="cityInput"
      :class="['form-control', {'is-invalid': invalidInputMessage}]"
      placeholder="Type city name here..."
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
    value: String,
  },
  data() {
    return {
      invalidInputMessage: null
    }
  },
  methods: {
    validateAndEmmitEvent(event) {
      const value = event.target.value
      this.$emit('input', value)
      if (value.length) {
        this.invalidInputMessage = null
      } else {
        this.invalidInputMessage = 'This field is required.'
      }
    }
  },
  beforeCreate() {
    EventBus.$on('emptyCityInput', () => {
      this.invalidInputMessage = 'This field is required.'
    })
  }
}
</script>