<template>
  <div class="editor editor--standard">
    <QuillEditor
      theme="snow" 
      :options="options"
      ref="editor"
      @ready="$emit('getEditor', $refs.editor)"
      :placeholder="placeholder"
    />
  </div>
</template>

<script>
  import { QuillEditor, Quill } from '@vueup/vue-quill'
  import { ReplyQuoteContainer, SingleQuote } from './EditorComponents/ReplyQuote';
  import '@vueup/vue-quill/dist/vue-quill.snow.css';

  Quill.register({
    'formats/reply-quote': ReplyQuoteContainer,
    'formats/single-quote': SingleQuote
  });

  export default {
    props: {
      placeholder: String
    },

    components: {
      QuillEditor
    },

    data () {
      return {
        editor: null,
        options: {
          modules: {
            toolbar: [
              [{ 'size': ['small', false, 'large', 'huge'] }],
              ['bold', 'italic', 'underline', 'strike'],
              [{ 'align': [] }],
              [{ 'list': 'ordered'}, { 'list': 'bullet' }],
              ['blockquote', 'link'],
              [{ 'color': [] }],
              ['clean']
            ],
          },
        },
        editorContent: ''
      }
    },
    mounted() {
    }
  }
</script>

<style lang="scss">
  @use '../../assets/styles/components/ql-editor';
</style>