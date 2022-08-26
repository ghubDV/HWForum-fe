<template>
  <section class="thread-details">
    <h2 class="thread-details__title text--hecto text--bold">
      {{ thread.title }}
    </h2>
    <Card
      class="card--no-padding"
    >
      <template #content>
        <Post>
          <template v-if="thread.profile" #author>
            <div 
              class="avatar avatar--large avatar--clickable text--deca text--bold" 
              :style="{ backgroundColor: thread.profile.avatar }"
            >
              {{ thread.profile.name[0].toUpperCase()}}
            </div>
            <p class="text text--deci text--bold text--primary">
              {{ thread.profile.name }}
            </p>
          </template>
          <template #content>
            <div class="post__content-main text" v-html="thread.content"></div>
            <div class="post__content-extra text text--centi text--subdued">{{ timeElapsed(thread.createdAt) }}</div>
          </template>
        </Post>
      </template>
    </Card>
  </section>
</template>

<script>
  import { mapActions, mapState } from 'vuex';
    import { timeElapsed } from '../helpers/common.helper';
  import Card from '@/common/components/Card.vue';
  import Post from '@/common/components/Post.vue';

  export default {
    components: {
      Card,
      Post
    },

    data () {
      return {
        pageError: {
          state: false,
          message: ''
        }
      }
    },

    computed: {
      ...mapState('thread', ['thread']),
    },

    methods: {
      ...mapActions('thread', ['getThreadById']),

      timeElapsed: timeElapsed
    },

    async mounted() {
      const response = await this.getThreadById(this.$route.params.id);
      console.log(this.thread)
      if(response && response.type === 'error') {
        this.pageError.state = true;
        this.pageError.message = response.message;
      }
    }
  }
</script>

<style lang="scss">
  @use '../assets/styles/views/thread-details.scss';
</style>