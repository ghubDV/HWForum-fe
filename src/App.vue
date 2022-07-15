<template>
  <div class="main-content">
    <Loader v-show="isLoading" :progress="progress" />
    <div class="content-container">
      <router-view :key="$route.path"/>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import Loader from './common/components/Loader.vue';

  export default {
    components: {
      Loader
    },

    computed: {
      ...mapGetters({
        progress: 'main/getLoaderProgress',
        isLoading: 'main/getLoaderState'
      })
    }
  }
</script>
