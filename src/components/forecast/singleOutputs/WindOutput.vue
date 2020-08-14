<template>
  <div class="input-group flex-nowrap">
    <div class="input-group-prepend">
      <span class="input-group-text">Wind</span>
    </div>
    <input type="text" class="form-control text-center" :value="output" readonly>
  </div>
</template>

<script>
export default {
  props: ['windSpeed'],
  computed: {
    output() {
      return `${this.windSpeed} km/h`
    }
  }
}
</script>