<template>
  <img class="icon" :src="asset" />
</template>

<script>
  export default {
    data() {
      return {
        asset: null
      }
    },

    props: {
      icon: String
    },

    mounted() {
      this.asset = require(`@/assets/icons/${this.icon}.svg`);
    }
  }
</script>

<style lang="scss">
  @use '../../assets/styles/components/icon';
</style>