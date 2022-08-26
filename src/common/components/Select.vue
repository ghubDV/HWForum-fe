<template>
  <select v-if="grouped" class="select" :name="name">
    <optgroup 
      v-for="(item, i) in list"
      class="select__optgroup"
      :label="item.name"
      :key="i"
    >
      <option 
        v-for="(subitem, i) in item[subGroup]"
        class="select__option"
        :selected="selected === subitem.id"
        :value="subitem.id"
        :key="i"
      >
        {{ subitem.name }}
      </option>
    </optgroup>
  </select>
  <select v-else class="select" :name="name"> 
    <option 
      v-for="(item, i) in list"
      class="select__option"
      :value="item.id"
      :selected="selected === item.id"
      :key="i"
    >
      {{ item.name }}
    </option>
  </select>
</template>

<script>
  export default {
    props: {
      grouped: Boolean,
      subGroup: String,
      selected: Number,
      name: String,
      list: Array
    }
  }
</script>

<style lang="scss">
  @use '../../assets/styles/components/select';
</style>