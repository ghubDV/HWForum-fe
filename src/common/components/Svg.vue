<template>
  <component :is="svg"></component>
</template>

<script>
  import { defineAsyncComponent } from 'vue'
  export default {
    props: {
      icon: String
    },

    computed: {
      svg() {
        return defineAsyncComponent(() => import(`@/assets/icons/${this.icon}.svg?inline`));
      }
    },

    data() {
      return {
        asset: null
      }
    },
  }
</script>

<style lang="scss">
  @use '../../assets/styles/components/icon';
</style>