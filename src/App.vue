<template>
  <div class="main-content">
    <Navbar />
    <NotificationsBar />
    <Loader v-show="isLoading" :progress="progress" />
    <div class="content-container">
      <router-view :key="$route.path"/>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import Loader from './common/components/Loader.vue';
  import Navbar from './common/components/Navbar.vue';
  import NotificationsBar from './common/components/Notifications.vue';

  export default {
    components: {
      Loader,
      Navbar,
      NotificationsBar
    },

    data () {
      return {
        message: {
          type: 'error',
          list: ['Hey, I am a notification']
        }
      }
    },

    computed: {
      ...mapGetters({
        progress: 'common/getLoaderProgress',
        isLoading: 'common/getLoaderState',
        isAuthInit: 'auth/getAuthInit'
      })
    },
  }
</script>
