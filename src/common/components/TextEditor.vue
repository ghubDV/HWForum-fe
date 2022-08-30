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
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

export default {
  props: {
    placeholder: String
  },

  components: {
    QuillEditor
  },

  data () {
    return {
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
          ]
        },
      },
      editorContent: ''
    }
  },
}
</script>

<style lang="scss">
  @use '../../assets/styles/components/ql-editor';
</style>