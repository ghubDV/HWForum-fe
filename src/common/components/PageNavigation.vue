<template>
  <div class="pages">
    <Button :disabled="currentPage === 1" @click="toPage(1)" class="pages__item pages__item--first button button--simple button--no-padding">
      <template #icon>
        <RenderSVG class="icon--micro" icon="first-page"/>
      </template>
    </Button>

    <Button :disabled="currentPage === 1" @click="toPage(currentPage - 1)" class="pages__item pages__item--previous button button--simple button--no-padding">
      <template #icon>
        <RenderSVG class="icon--micro" icon="arrow-prev"/>
      </template>
    </Button>
    <div
      class="pages__item text text--deci text--thick"
    >
      {{ currentPage }}
    </div>
    <Button :disabled="currentPage === pageCount" @click="toPage(currentPage + 1)" class="pages__item pages__item--next button button--simple button--no-padding">
      <template #icon>
        <RenderSVG class="icon--micro" icon="arrow-prev"/>
      </template>
    </Button>
    <Button :disabled="currentPage === pageCount" @click="toPage(pageCount)" class="pages__item pages__item--last button button--simple button--no-padding">
      <template #icon>
        <RenderSVG class="icon--micro" icon="last-page"/>
      </template>
    </Button>
  </div>
</template>

<script>
  import Button from './Button.vue'
  import RenderSVG from './Svg.vue';

  export default {
    props: {
      pageCount: Number,
      current: Number
    },

    components: {
      Button,
      RenderSVG
    },  

    data () {
      return {
        currentPage: this.current || 1
      }
    },

    methods: {
      toPage(pageNumber) {
        this.currentPage = pageNumber;

        this.$emit('toPage', this.currentPage);
      }
    }
  }
</script>

<style lang="scss">
  @use '../../assets/styles/components/pages';
</style>