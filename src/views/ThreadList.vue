<template>
  <section class="thread-list">
    <Button 
      class="button button--normal button--primary button--right button--text-center text--bold"
      @click="$router.push('/thread/create')"
    >
      <template #text>
        Create Thread
      </template>
    </Button>

    <Card 
      v-show="progress === 100"
      class="card--small-padding"
    >

      <template #header>
        <div class="card__header text--hecto text--bold">
          {{ threadList.topic }}
        </div>
      </template>

      <template #content>
        <CardItem  
          v-for="(thread, i) in threadList.threads"
          class="button button--simple button--no-padding"
          :key="i"
        >
          <template #icon>
            <div 
              class="avatar avatar--large avatar--clickable text--deca text--bold" 
              :style="{ backgroundColor: thread.profile.avatar }"
            >
              {{ thread.profile.name[0].toUpperCase()}}
            </div>
          </template>

          <template #title>
            <h3 class="text text--primary text--bold text--deca">
              {{ thread.title }}
            </h3>
          </template>

          <template #info>
            <p class="text text--deci">
              By {{ thread.profile.name }} - {{ timeElapsed(thread.createdAt) }}
            </p>
          </template>
        </CardItem>
      </template>
    </Card>
  </section>
</template>

<script>
  import { mapActions, mapGetters, mapState } from 'vuex';
  import { timeElapsed } from '../helpers/common.helper';
  import Button from '@/common/components/Button.vue';
  import Card from '@/common/components/Card.vue';
  import CardItem from '@/common/components/CardItem.vue';

  export default {
    components: {
    Button,
    Card,
    CardItem
},

    computed: {
      ...mapState('topics', ['threadList']),
      ...mapGetters({
        progress: 'common/getLoaderProgress',
      })
    },

    methods: {
      ...mapActions('topics', ['fetchThreadList']),

      timeElapsed: timeElapsed
    },

    async mounted() {
      await this.fetchThreadList(this.$route.params.id);
      this.$router.replace({ 
        params: {
          ...this.$route.params, 
          name: this.threadList.topic.toLowerCase().replace(/\s/g, '-') + '.'
        }
      })
    }
  }
</script>

<style lang="scss">
  @use '../assets/styles/views/thread-list.scss';
</style>