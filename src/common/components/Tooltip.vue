<template>
  <aside class="tooltip">
    <slot name="content"></slot>
    <slot name="extra"></slot>
  </aside>
</template>

<script>
  export default {
    props: {
      type: String
    }
  }
</script>

<style lang="scss">
  @use '../../assets/styles/components/tooltip';
</style>