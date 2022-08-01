<template>
  <img :src="asset" />
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

<style>

</style>