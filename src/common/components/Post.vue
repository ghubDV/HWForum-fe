<template>
  <div class="post">
    <slot name="author"></slot>
    <slot name="content"></slot>
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="scss">
  @use '../../assets/styles/components/post';
</style>