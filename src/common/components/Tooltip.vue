<template>
  <aside v-if="type === 'input'" class="tooltip">
    <slot name="content"></slot>
    <slot name="extra"></slot>
  </aside>
  <aside v-else-if="type === 'picker'" class="tooltip tooltip--picker">
    <slot name="content"></slot>
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