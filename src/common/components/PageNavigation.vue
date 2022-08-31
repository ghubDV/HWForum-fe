<template>
  <div class="pages">
    <div
      v-for="page in pageNumber"
      class="pages__item text--centi text--subdued"
      :key="page"
    >
      {{ page }}
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      pageNumber: Number
    }
  }
</script>

<style lang="scss">
  @use '../../assets/styles/components/pages';
</style>