<template>
  <button>
    <slot name="icon"></slot>
    <slot name="text"></slot>
  </button>
</template>

<script>
export default {
}
</script>

<style lang="scss">
  @use '@/assets/styles/components/button';
</style>