<template>
  <div class="post">
    <div class="post__author">
      <slot name="author"></slot>
    </div>
    <div class="post__content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="scss">
  @use '../../assets/styles/components/post';
</style>