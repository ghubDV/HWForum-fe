<template>
  <div v-if="list.length" :class="type">
    <div v-for="(item, i) in list" :key="i">
      {{ item }}
    </div>
  </div>
</template>

<script>
export default {
  props: ['list', 'type']
}
</script>

<style lang="scss">
  @use '@/assets/styles/components/error';
</style>