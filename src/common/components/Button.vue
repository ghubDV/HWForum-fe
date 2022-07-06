<template>
  <button>{{ text }}</button>
</template>

<script>
export default {
  props: {
    text: String
  }
}
</script>

<style lang="scss">
  @use '@/assets/styles/components/button';
</style>