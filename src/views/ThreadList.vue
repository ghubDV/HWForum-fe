<template>
  <section class="thread-list" v-if="!pageError">
    <Button 
      class="button button--normal button--primary button--right button--text-center text--bold"
      @click="$router.push($route.path + '/create-thread')"
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
        <h2 class="card__header text--hecto text--bold">
          {{ threadList.topic }}
        </h2>
      </template>

      <template #content>
        <CardItem  
          v-for="(thread, i) in threadList.threads"
          class="button button--simple button--no-padding"
          @click="$router.push('/thread.' + thread.id)"
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
            <p class="text text--centi text--subdued">
              By {{ thread.profile.name }} - {{ timeElapsed(thread.updatedAt) }}
            </p>
          </template>

          <template #extra>
            <div>
              <RenderSVG class="icon--tiny" icon="comment" />
              <p class="text text--primary text--centi text--center">
                {{ thread.replies }}
              </p>
            </div>
          </template>
        </CardItem>
      </template>
    </Card>
  </section>

  <!-- Case when topic is not found -->
  <section class="thread-list" v-else>
    <Card 
      v-show="progress === 100"
      class="card--small-padding"
    >
      <template #header>
        <h2 class="text--deca text--bold">
          Ouch :(! This topic could not be found.
        </h2>
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
  import RenderSVG from '@/common/components/Svg.vue';

  export default {
    components: {
      Button,
      Card,
      CardItem,
      RenderSVG
    },

    data() {
      return {
        pageError: false
      }
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
      const response = await this.fetchThreadList(this.$route.params.id);
      if(response && response.type === 'error') {
        this.pageError = true;
      }
    }
  }
</script>

<style lang="scss">
  @use '../assets/styles/views/thread-list.scss';
</style>