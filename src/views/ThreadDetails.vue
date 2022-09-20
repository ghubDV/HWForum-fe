<template>
  <section v-if="!pageError.state">
    <Transition name="fade">
      <div v-if="showList" class="thread-details">
        <h2 v-if="thread" class="thread-details__title text--hecto text--bold">
          {{ thread.title }}
        </h2>

        <!-- Thread main section -->


        <div class="thread-details__list">
          <div class="thread-details__list">
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
                            v-if="user.profileName"
                            @click="triggerReply(post)"
                            class="button button--link button--text-center text text--centi"
                          >
                            <template #icon>
                              <RenderSVG class="icon--micro" icon="reply" />
                            </template>

                            <template #text>
                              Reply
                            </template>
                          </Button>

                          <Button
                            v-if="user.profileName === post.profile.name"
                            @click="openEditor(post)"
                            class="button button--link button--text-center text text--centi"
                          >
                            <template #icon>
                              <RenderSVG class="icon--micro" icon="edit" />
                            </template>

                            <template #text>
                              Edit
                            </template>
                          </Button>

                          <Button
                            v-if="user.profileName === post.profile.name && !post.isThread"
                            @click="handlePost('deletePost', post)"
                            class="button button--link button--text-center text text--centi"
                            >
                            <template #icon>
                              <RenderSVG class="icon--micro" icon="delete" />
                            </template>

                            <template #text>
                              Delete
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
                            @click="handlePost('updatePost', post)"
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
          </div>

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
      </div>
    </Transition>
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
  import { getTextEditorContent, timeElapsed, createFriendlyURL, setCurrentPage } from '../helpers/common.helper';
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

        currentPage: null,

        showList: false,

        editors: {},

        posts: []
      }
    },

    computed: {
      ...mapState('auth', ['user']),
      ...mapState('thread', ['pageCount', 'thread', 'comments']),
      ...mapGetters({
        pageSize: 'thread/getPageSize'
      })
    },

    methods: {
      ...mapActions('thread', ['createComment', 'deletePost', 'updatePost', 'getThreadAndComments']),
      ...mapActions('profile', ['getProfile']),
      ...mapActions('common', ['sendNotification']),

      timeElapsed: timeElapsed,

      initEditor(editor, postID = undefined, content = null) {
        if(postID) {
          editor.commands.setContent(content);
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

      triggerReply(post) {
        const editor = this.editors.create.editor;
        editor.chain().focus().insertContent(`<blockquote><reply-quote>${post.profile.name} said:</reply-quote>${post.content}</blockquote><p></p>`).run();
      },  

      closeEditor(postID) {
        delete this.editors[postID];
      },

      async handlePost(action, post) {
        let editor = null;

        let content = null;

        if(action !== 'deletePost') {
          if(this.editors[post.id]) {
            editor = this.editors[post.id].editor || null;
          } else {
            editor = this.editors[post].editor || null;
          }

          content = getTextEditorContent(editor);
        }

        const data = {
          ...post.id && { id: post.id },
          ...(action !== 'updatePost' && { threadID: this.thread.id }),
          ...(action !== 'deletePost' && { content }),
          ...post.isThread && { isThread: post.isThread }
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
            post.content = content.html;
          }
          this.closeEditor(post.id);
        }

        if(action === 'createComment' || action === 'deletePost') {
          await this.updatePostsList(this.thread.id, this.currentPage);
          if(editor !== null) {
            editor.commands.setContent('');
          }
        }
      },

      async updatePostsList(threadID, page) {
        const response = await this.getThreadAndComments({threadID: threadID, page: page });

        if(response && response.type === 'error') {
          this.pageError.state = true;
          this.pageError.message = response.messages[0];
        } else {
          this.posts = [this.thread, ...this.comments];
          this.showList = true;
        }
      },

      async toPage(page) {

        this.showList = false;

        this.currentPage = page <= this.pageCount ? page : 1;

        await this.updatePostsList(this.thread.id, page);

        history.replaceState(
          {}, 
          null, 
          createFriendlyURL('/thread/', this.thread.title, this.thread.id, '?p=' + this.currentPage)
        );

        window.scrollTo({top: 0});
      }
    },

    async mounted() {
      await this.updatePostsList(this.$route.params.id, this.$route.query.p || 1);

      if(!this.pageError.state) {
        this.currentPage = setCurrentPage(this.$route.query.p, this.pageCount)

        history.replaceState(
          {}, 
          null, 
          createFriendlyURL('/thread/', this.thread.title, this.thread.id, this.pageCount > 1 ? '?p=' + this.currentPage : '')
        );
      }
    }
  }
</script>

<style lang="scss">
  @use '../assets/styles/views/thread-details.scss';
</style>