<template>
  <Card 
    v-for="(category, i) in forumList"
    class="forum-list card--small-padding"
    :key="i"
  >

    <template #header>
      <div class="card__header text--hecto text--bold">
        {{ category.name }}
      </div>
    </template>

    <template #content>
      <CardItem  
        v-for="(topic, i) in category.topics"
        class="button button--simple button--no-padding"
        @click="$router.push('/topic/' + topic.id)"
        :key="i"
      >
        <template #icon>
          <RenderSVG 
            class="icon--medium"       
            :icon="topicIcons[i]"
          />
        </template>

        <template #title>
          <h3 class="text text--primary text--bold text--deca">
            {{ topic.name }}
          </h3>
        </template>
      </CardItem>
    </template>
    
  </Card>
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  import { topics } from '@/common/schemas/icon.schema';
  import Card from '@/common/components/Card.vue';
  import CardItem from '@/common/components/CardItem.vue';
  import RenderSVG from '@/common/components/Svg.vue';

  export default {
    components: {
      Card,
      CardItem,
      RenderSVG
    },

    computed: {
      ...mapState('topics', ['forumList']),

      topicIcons () {
        return topics;
      }
    },

    methods: {
      ...mapActions('topics', ['fetchForumList'])
    },

    async mounted() {
      await this.fetchForumList();
    }
  }
</script>