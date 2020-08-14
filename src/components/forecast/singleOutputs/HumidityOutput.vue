<template>
  <div class="input-group flex-nowrap">
    <div class="input-group-prepend">
      <span class="input-group-text">Humidity</span>
    </div>
    <input type="text" class="form-control text-center" :value="output" readonly>
  </div>
</template>

<script>
export default {
  props: ['humidity'],
  computed: {
    output() {
      return `${this.humidity} %`
    }
  }
}
</script>