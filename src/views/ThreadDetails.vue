<template>
  <section class="thread-details" v-if="!pageError.state">
    <h2 class="thread-details__title text--hecto text--bold">
      {{ thread.title }}
    </h2>

    <!-- Thread main section -->

    <div class="thread-details__list" v-show="showList">
      <Card
        class="card--no-padding"
        v-for="(post, i) in posts" 
        :key="i"
      >
        <template #content>
          <Post v-if="post.profile">
            <template #author>
              <div class="post__author">
                <div 
                  class="avatar avatar--large avatar--clickable text--deca text--bold" 
                  :style="{ backgroundColor: post.profile.avatar }"
                >
                  {{ post.profile.name[0].toUpperCase()}}
                </div>
                <p class="text text--centi text--bold text--primary">
                  {{ post.profile.name }}
                </p>
              </div>
            </template>

            <!-- Post editor closed -->

            <template v-if="!editors[post.id] || editors[post.id].isThread !== post.isThread" #content>
              <div class="post__content">

                <!-- Post content -->
                <pre>
                  <div class="post__content-main text" v-html="post.content"></div>
                </pre>

                <div class="post__content-extra">
                  <div class="post__content-controls">
                    <Button
                      v-if="myProfile === post.profile.name"
                      @click="openEditor(post)"
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
                  <p class="text text--centi text--subdued">{{ timeElapsed(post.updatedAt) }}</p>
                </div>
              </div>
            </template>

            <!-- Post editor open -->

            <template v-else-if="editors[post.id] && editors[post.id].isThread === post.isThread" #content>
              <div class="post__content">
                <TextEditor
                  @getEditor="getEditor($event, post.id, post.content)"
                />
                <div class="post__content-extra">
                  <div></div>
                  <div class="post__content-controls">
                    <Button
                      class="button button--primary button--right button--text-center"
                      @click="saveEdit(post)"
                    >
                      <template #text>
                        Save
                      </template>
                    </Button>

                    <Button
                      class="button button--link button--right button--text-center"
                      @click="closeEditor(post.id)"
                    >
                      <template #text>
                        Cancel
                      </template>
                    </Button>
                  </div>
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
              <div class="post__content">
                <TextEditor
                  placeholder="Write your reply..."
                  @getEditor="getEditor"
                />
                <Button
                  class="button button--primary button--right button--text-center"
                  @click="postComment"
                >
                  <template #text>
                    Post reply
                  </template>
                </Button>
              </div>
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
  import { mapActions, mapState } from 'vuex';
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

        showList: false,

        editors: {},

        posts: [],

        myProfile: null
      }
    },

    computed: {
      ...mapState('thread', ['thread', 'comments']),
      ...mapState('auth', ['user'])
    },

    methods: {
      ...mapActions('thread', ['createComment', 'getThreadById', 'getCommentsInThread', 'updatePost']),
      ...mapActions('profile', ['getProfile']),
      ...mapActions('common', ['sendNotification']),

      timeElapsed: timeElapsed,

      async getCurrentUser(user) {
        if(user.isLoggedIn) {
          const profile = await this.getProfile(user.username);
          this.myProfile = profile.profileName;
        }
      },

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

        console.log(this.editors);
      },

      openEditor(post) {
        this.editors = {
          ...this.editors,
          [post.id]: {
            ...post.isThread && {isThread: true}
          }
        }
        console.log(this.editors)
      },

      async saveEdit(post) {
        const editor = this.editors[post.id] ? this.editors[post.id].editor : this.editors.create.editor;

        const content = getTextEditorContent(editor);

        const data = {
          postID: post.id || null,
          content: content,
          isThread: post.isThread || false
        }

        const result = await this.updatePost(data);

        if(result.type === 'success') {
          post.content = content.html;
        }

        this.sendNotification({
          type: 0,
          message: {
            type: result.type,
            list: result.messages
          }
        })

        if(post.id !== 'create') {
          delete this.editors[post.id];
        }
      },

      async postComment() {
        const editor = this.editors.create.editor;

        const content = getTextEditorContent(editor);

        const newComment = {
          thread: this.thread.id,
          content: content
        };

        const result = await this.createComment(newComment);

        this.sendNotification({
          type: 0,
          message: {
            type: result.type,
            list: result.messages
          }
        })

        if(result.type === 'success') {
          await this.getCommentsInThread(this.thread.id);
          this.updatePostsList();
          editor.setText('');
        }
      },

      updatePostsList() {
        this.posts = [this.thread, ...this.comments];
        this.showList = true;
      },

      closeEditor(postID) {
        delete this.editors[postID];
      },
    },

    watch: {
      async 'user' (updatedUser) {
        if(this.myProfile !== null) {
          await this.getCurrentUser(updatedUser);
        }
      }
    },

    async mounted() {
      const thread = await this.getThreadById(this.$route.params.id);
      if(thread && thread.type === 'error') {
        this.pageError.state = true;
        this.pageError.message = thread.messages[0];
      }

      await this.getCommentsInThread(this.$route.params.id);
      await this.getCurrentUser(this.user);
      this.updatePostsList();
    }
  }
</script>

<style lang="scss">
  @use '../assets/styles/views/thread-details.scss';
</style>