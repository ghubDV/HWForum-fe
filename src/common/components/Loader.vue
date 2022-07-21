<template>
  <div :class="'loader loader--' + progress"></div>
</template>

<script>
export default {
  props: {
    progress: Number
  }
}
</script>

<style lang="scss">
  @use '@/assets/styles/components/loader';
</style>