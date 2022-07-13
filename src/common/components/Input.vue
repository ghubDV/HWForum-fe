<template>
  <div class="input__wrapper">
    <input 
      :class="'input' + (extraClass ? extraClass : '')"
      :type="type" 
      :name="name"
      :placeholder="placeholder"
      :value="value ? value : null"
    />
  </div>
</template>

<script>
export default {
  props: {
    extraClass: String,
    type: String,
    name: String,
    placeholder: String,
    value: String
  }
}
</script>

<style lang="scss">
  @use '@/assets/styles/components/input';
</style>