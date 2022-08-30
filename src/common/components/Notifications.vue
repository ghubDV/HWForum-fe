<!-- 
  Notification types: 
  0 - validation
  1 - info 
-->

<template>
  <Transition name="fade">
    <aside v-if="notification.visible" class="notification-bar">
      <ValidationList
        v-if="notification.type === 0"
        class="notification-bar__content no-margin"
        :type="notification.message.type"
        :list="notification.message.list"
      />
      <RenderSVG 
        class="notification-bar__close icon--small button button--simple button--no-padding"
        icon="close"
        @click="hideNotification"
      />
    </aside>
  </Transition>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import ValidationList from './ValidationList.vue';
  import RenderSVG from './Svg.vue';

  export default {
    components: {
      RenderSVG,
      ValidationList
    },

    computed: {
      ...mapState('common', ['notification'])
    },

    methods: {
      ...mapActions('common', ['hideNotification'])
    },
  }
</script>

<style lang="scss">
  @use '../../assets/styles/components/notification-bar';
</style>