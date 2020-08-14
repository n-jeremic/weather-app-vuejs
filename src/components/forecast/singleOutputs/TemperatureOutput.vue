<template>
  <div class="input-group flex-nowrap">
    <div class="input-group-prepend">
      <span class="input-group-text">Temperature</span>
    </div>
    <input type="text" class="form-control text-center" :value="output" readonly>
  </div>
</template>


<script>
import formatTempMixin from './../../../mixins/formatTemperature'

export default {
  mixins: [formatTempMixin],
  props: ['temperature'],
  computed: {
    output() {
      return this.generateTemperatureString(this.temperature)
    }
  }
}
</script>