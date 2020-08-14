<template>
  <div class="mt-4">
    <h4 class="text-center text-muted">{{ errorMsg }}</h4>
  </div>
</template>

<script>
export default {
  props: {
    errorMsg: String
  }
}
</script>