<template>
  <section class="thread-details" v-if="!pageError.state">
    <h2 v-if="posts[0]" class="thread-details__title text--hecto text--bold">
      {{ posts[0].title }}
    </h2>

    <!-- Thread main section -->

    <div class="thread-details__list" v-show="showList">
      <Card
        class="card--no-padding"
        v-for="(post, i) in posts"
        v-show="!(post.isThread && currentPage > 1)" 
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

            <template v-else #content>
              <div class="post__content">
                <TextEditor
                  @getEditor="initEditor($event, post.id, post.content)"
                />
                <div class="post__content-extra">
                  <div></div>
                  <div class="post__content-controls">
                    <Button
                      class="button button--primary button--right button--text-center"
                      @click="handlePost('updatePost', post.id, post)"
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

      <!-- Page navigation -->

      <PageNavigation 
        v-if="pageCount > 1" 
        class="pages--center" 
        :pageCount="pageCount"
        :current="currentPage"
        @toPage="toPage"
      />

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
                  @getEditor="initEditor"
                />
                <Button
                  class="button button--primary button--right button--text-center"
                  @click="handlePost('createComment', 'create')"
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
  import { mapActions, mapGetters, mapState } from 'vuex';
  import { getTextEditorContent, timeElapsed, createFriendlyURL } from '../helpers/common.helper';
  import Button from '@/common/components/Button.vue';
  import Card from '@/common/components/Card.vue';
  import PageNavigation from '@/common/components/PageNavigation.vue';
  import Post from '@/common/components/Post.vue';
  import RenderSVG from '@/common/components/Svg.vue';
  import TextEditor from '@/common/components/TextEditor.vue';

  export default {
    components: {
      Button,
      Card,
      PageNavigation,
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

        currentPage: 1,

        pageCount: 1,

        showList: false,

        editors: {},

        posts: [],

        myProfile: null
      }
    },

    computed: {
      ...mapState('auth', ['user']),
      ...mapGetters({
        pageSize: 'thread/getPageSize'
      })
    },

    methods: {
      ...mapActions('thread', ['createComment', 'getThreadAndComments', 'updatePost']),
      ...mapActions('profile', ['getProfile']),
      ...mapActions('common', ['sendNotification']),

      timeElapsed: timeElapsed,

      async getCurrentUser() {
        if(this.user.isLoggedIn) {
          const profile = await this.getProfile(this.user.username);
          this.myProfile = profile.profileName;
        }
      },

      async getPosts(threadID, page) {
        return await this.getThreadAndComments({threadID: threadID, page: page });
      },

      initEditor(editor, postID = undefined, content = null) {
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
      },

      openEditor(post) {
        this.editors = {
          ...this.editors,
          [post.id]: {
            ...post.isThread && {isThread: true}
          }
        }
      },

      closeEditor(postID) {
        delete this.editors[postID];
      },

      async handlePost(action, editorID, post = undefined) {
        const editor = this.editors[editorID].editor;

        const content = getTextEditorContent(editor);

        const affectedPost = post ? post : this.posts[0]

        const data = {
          id: affectedPost.id,
          content: content,
          ...affectedPost.isThread && { isThread: affectedPost.isThread }
        }

        const result = await this[action](data);

        this.sendNotification({
          type: 0,
          message: {
            type: result.type,
            list: result.messages
          }
        })

        if(action === 'updatePost') {
          if(result.type === 'success') {
            affectedPost.content = content.html;
          }
          this.closeEditor(affectedPost.id);
        }

        if(action === 'createComment') {
          this.updatePostsList(await this.getPosts(affectedPost.id, this.currentPage));
          editor.setText('');
        }
      },

      updatePostsList(posts) {
        this.posts = [...posts];
        this.pageCount = Math.ceil(posts[0].commentsCount / this.pageSize);
        this.showList = true;
      },

      async toPage(page) {
        this.updatePostsList(await this.getPosts(this.posts[0].id, page));

        this.currentPage = page;

        history.replaceState(
          {}, 
          null, 
          createFriendlyURL('/thread/', this.posts[0].title, this.posts[0].id, '?p=' + this.currentPage)
        );

        window.scrollTo({top: 0});
      }
    },

    watch: {
      async 'user' (updatedUser) {
        if(this.myProfile === null) {
          await this.getCurrentUser(updatedUser);
        }
      }
    },

    async mounted() {
      const response = await this.getPosts(this.$route.params.id, parseInt(this.$route.query.p) || this.currentPage);

      await this.getCurrentUser();

      if(response && response.type === 'error') {
        this.pageError.state = true;
        this.pageError.message = response.messages[0];
      } else {
        this.updatePostsList(response);
        const thread = this.posts[0];
        history.replaceState(
          {}, 
          null, 
          createFriendlyURL('/thread/', thread.title, thread.id, this.pageSize < thread.commentsCount ? '?p=' + this.currentPage : '')
        );
      }

    }
  }
</script>

<style lang="scss">
  @use '../assets/styles/views/thread-details.scss';
</style>