<template>
  <div class="mt-4">
    <h4 class="text-center text-muted error-message">{{ errorMsg }}</h4>
  </div>
</template>

<script>
export default {
  props: {
    errorMsg: String
  }
}
</script>