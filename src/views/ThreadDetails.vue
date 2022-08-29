<template>
  <section class="thread-details" v-if="!pageError.state">
    <h2 class="thread-details__title text--hecto text--bold">
      {{ thread.title }}
    </h2>

    <!-- Thread main section -->

    <div class="thread-details__list">
      <Card
        class="card--no-padding"
      >
        <template v-if="thread.profile" #content>
          <Post>
            <template #author>
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

            <!-- Post editor closed -->

            <template v-if="!editors[thread.id] || !editors[thread.id].open" #content>
              <div class="post__content-main text" v-html="thread.content"></div>
              <div class="post__content-extra">
                <div class="post__content-controls">
                  <Button
                    v-if="myProfile === thread.profile.name"
                    @click="openEditor(thread.id)"
                    class="button button--link button--text-center text text--deci"
                  >
                    <template #icon>
                      <RenderSVG class="icon--tiny" icon="edit" />
                    </template>

                    <template #text>
                      Edit
                    </template>
                  </Button>
                </div>
                <p class="text text--centi text--subdued">{{ timeElapsed(thread.createdAt) }}</p>
              </div>
            </template>

            <!-- Post editor open -->

            <template v-else #content>
              <TextEditor
                @getEditor="getEditor($event, thread.id, thread.content)"
              />
              <div class="post__content-extra">
                <div></div>
                <div class="post__content-controls">
                  <Button
                    class="button button--primary button--right button--text-center"
                    @click="saveEdit(thread.id)"
                  >
                    <template #text>
                      Save
                    </template>
                  </Button>

                  <Button
                    class="button button--link button--right button--text-center"
                    @click="closeEditor(thread.id)"
                  >
                    <template #text>
                      Cancel
                    </template>
                  </Button>
                </div>
              </div>
            </template>
          </Post>
        </template>
      </Card>

      <!-- Reply to thread section -->

      <Card
        class="card--no-padding"
        ref="editSection"
      >
        <template #content>
          <Post>
            <template #content>
              <TextEditor
                placeholder="Write your reply..."
                @getEditor="getEditor"
              />
              <Button
                class="button button--primary button--right button--text-center"
                @click="saveEdit('create')"
              >
                <template #text>
                  Post reply
                </template>
              </Button>
            </template>
          </Post>
        </template>
      </Card>

    </div>
  </section>

    <!-- Case when thread is not found -->
  <section class="thread-details" v-else>
    <Card 
      class="card--small-padding"
    >
      <template #header>
        <h2 class="text--deca text--bold">
          {{ pageError.message }}
        </h2>
      </template>
    </Card>
  </section>
</template>

<script>
  import { mapActions, mapGetters, mapState } from 'vuex';
  import { getTextEditorContent, timeElapsed } from '../helpers/common.helper';
  import Button from '@/common/components/Button.vue';
  import Card from '@/common/components/Card.vue';
  import Post from '@/common/components/Post.vue';
  import RenderSVG from '@/common/components/Svg.vue';
  import TextEditor from '@/common/components/TextEditor.vue';

  export default {
    components: {
      Button,
      Card,
      Post,
      RenderSVG,
      TextEditor
    },

    data () {
      return {
        pageError: {
          state: false,
          message: ''
        },

        editors: {},

        myProfile: null
      }
    },

    computed: {
      ...mapState('thread', ['thread']),
      ...mapGetters({
        isLoggedIn: 'auth/getUserAuth',
        username: 'auth/getUsername'
      })
    },

    methods: {
      ...mapActions('thread', ['getThreadById']),
      ...mapActions('profile', ['getProfile']),

      timeElapsed: timeElapsed,

      getEditor(editor, postID = undefined, content = null) {
        if(postID) {
          editor.setHTML(content);
          this.editors[postID] = {
            ...this.editors[postID],
            editor: editor
          };
        } else {
          this.editors.create = {
            editor: editor
          };
        }
        console.log(this.editors)
      },

      openEditor(postID) {
        if(this.editors[postID]) {
          this.editors[postID].open = true;
        } else {
          this.editors = {
            ...this.editors,
            [postID]: {
              open: true
            }
          }
        }
      },

      saveEdit(postID) {
        const editor = this.editors[postID].editor;

        console.log(getTextEditorContent(editor));

        if(postID !== 'create') {
          delete this.editors[postID];
          console.log(this.editors);
        }
      },

      closeEditor(postID) {
        this.editors[postID].open = false;
      }
    },

    async mounted() {
      const thread = await this.getThreadById(this.$route.params.id);
      if(thread && thread.type === 'error') {
        this.pageError.state = true;
        this.pageError.message = thread.messages[0];
      }

      if(this.isLoggedIn) {
        const profile = await this.getProfile(this.username);
        this.myProfile = profile.profileName;
      }
    }
  }
</script>

<style lang="scss">
  @use '../assets/styles/views/thread-details.scss';
</style>