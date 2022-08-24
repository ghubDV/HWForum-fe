<template>
  <div>Thread List</div>
</template>

<script>
  import { mapActions, mapState } from 'vuex';

  export default {
    computed: {
      ...mapState('topics', ['threadList'])
    },

    methods: {
      ...mapActions('topics', ['fetchThreadList'])
    },

    async mounted() {
      await this.fetchThreadList(this.$route.params.id);
      this.$router.replace({ 
        params: {
          ...this.$route.params, 
          name: this.threadList.topic.name.toLowerCase().replace(/\s/g, '-') + '.'
        }
      })
    }
  }
</script>

<style>

</style>