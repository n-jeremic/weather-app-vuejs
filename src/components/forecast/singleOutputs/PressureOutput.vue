<template>
  <div class="input-group flex-nowrap">
    <div class="input-group-prepend">
      <span class="input-group-text">Pressure</span>
    </div>
    <input type="text" class="form-control text-center" :value="output" readonly>
  </div>
</template>

<script>
export default {
  props: ['pressure'],
  computed: {
    output() {
      return `${this.pressure} mbar`
    }
  }
}
</script>