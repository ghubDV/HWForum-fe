<template>
  <div class="input__wrapper">
    <label class="input__wrapper--checkbox" v-if="label">
      <input 
        :class="'input' + (extraClass ? extraClass : '')"
        :type="type" 
        :name="name"
        :placeholder="placeholder"
        :checked="value ? true : false"
        @blur="getInput($event)"
      />
      <p class="text--bold text--deci">{{ label }}</p>
    </label>

    <input 
      v-else
      :class="'input ' + (extraClass ? extraClass : '')"
      :type="type" 
      :name="name"
      :placeholder="placeholder"
      :value="value ? value : null"
      @blur="getInput($event)"
    />
  </div>
</template>

<script>
  export default {
    props: {
      extraClass: String,
      type: String,
      name: String,
      label: String,
      placeholder: String,
      value: {
        type: [String, Boolean]
      },
    },

    methods: {
      getInput(event) {
        this.$emit('getInput', event.target);
      }
    },
  }
</script>

<style lang="scss">
  @use '@/assets/styles/components/input';
</style>