<template>
  <div class="pages">
    <Button
      v-for="(button, i) in backButtons"
      :disabled="currentPage === 1"
      @click="button.pageAction === 'prev' ? toPage(currentPage - 1) : toPage(1)"
      :class="defaultClass + ' ' + button.class + ' ' + (currentPage === 1 ? 'pages__item--hidden' : '')"
      :key="i"
    >
      <template #icon>
        <RenderSVG class="icon--micro" :icon="button.icon"/>
      </template>
    </Button>

    <div
      class="pages__item text text--deci text--thick"
    >
      {{ currentPage }}
    </div>

    <Button
      v-for="(button, i) in forwardButtons"
      :disabled="currentPage === pageCount"
      @click="button.pageAction === 'next' ? toPage(currentPage + 1) : toPage(pageCount)"
      :class="defaultClass + ' ' + button.class + ' ' + (currentPage === pageCount ? 'pages__item--hidden' : '')"
      :key="i"
    >
      <template #icon>
        <RenderSVG class="icon--micro" :icon="button.icon"/>
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
        currentPage: this.current || 1,
        defaultClass: 'pages__item button button--simple button--no-padding',
        backButtons: [
          {
            class: 'pages__item--first',
            pageAction: 1,
            icon: 'first-page'
          },
          {
            class: 'pages__item--previous',
            pageAction: 'prev',
            icon: 'arrow-prev'
          }
        ],

        forwardButtons: [
        {
            class: 'pages__item--next',
            pageAction: 'next',
            icon: 'arrow-prev'
          },
          {
            class: 'pages__item--previous',
            pageAction: this.pageCount,
            icon: 'last-page'
          }
        ]
      }
    },

    watch: {
      current (newValue) {
        this.currentPage = newValue;
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