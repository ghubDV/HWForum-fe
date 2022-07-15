<template>
  <Transition name="fade">
    <div v-if="list.length" :class="type">
      <div v-for="(item, i) in list" :class="type + '__item'" :key="i">
        <pre>{{ item }}</pre>
      </div>
    </div>
  </Transition>
</template>

<script>
export default {
  props: ['list', 'type']
}
</script>

<style lang="scss">
  @use '@/assets/styles/components/error';
</style>