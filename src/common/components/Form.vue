<template>
  <form class="form">
    <slot name="title"></slot>
    <slot name="validation"></slot>
    <slot name="inputs"></slot>
    <slot name="submit"></slot>
  </form>
</template>

<script>
export default {

}
</script>

<style lang="scss">
  @use '@/assets/styles/components/form';
</style>