<template>
  <Transition name="fade">
    <section class="menu">
      <slot name="header"></slot>
      <slot name="list"></slot>
      <slot name="footer"></slot>
    </section>
  </Transition>
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