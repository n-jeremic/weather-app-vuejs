<template>
  <div>
    <label for="favouriteCities">My favourite cities:</label>
    <select
      id="favouriteCities"
      class="custom-select"
      @change="emitChangeEvent"
    >
      <option value="null" v-if="!favouriteCities">No favourite cities yet</option>
      <template v-else>
        <option value="null">Not selected</option>
        <option
          v-for="(favCity, index) in favouriteCities"
          :key="index"
          :value="capitalize(favCity)"
        >{{ capitalize(favCity) }}</option>
      </template>
    </select>
  </div>
</template>

<script>
export default {
  computed: {
    favouriteCities() {
      return this.$store.getters['favourites/favouriteCities']
    }
  },
  methods: {
    capitalize(string) {
      if (string) {
        return string[0].toUpperCase() + string.slice(1)
      } else {
        return string
      }
    },
    emitChangeEvent(event) {
      const value = event.target.value
      if (value !== 'null') {
        this.$emit('favouriteCitySelected', value)
      }
    }
  }
}
</script>