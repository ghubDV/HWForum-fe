<template>
  <section v-show="show" class="menu">
    <slot name="header"></slot>
    <slot name="list"></slot>
    <slot name="footer"></slot>
  </section>
</template>

<script>
  export default {
    props: {
      show: Boolean
    }
  }
</script>

<style lang="scss">
  @use '../../assets/styles/components/menu';
</style>