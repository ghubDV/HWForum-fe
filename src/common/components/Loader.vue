<template>
  <div class="loader" :style="{'width':progress + '%'}"></div>
</template>

<script>
export default {
  props: {
    progress: Number
  }
}
</script>

<style lang="scss">
  @use '@/assets/styles/components/loader';
</style>