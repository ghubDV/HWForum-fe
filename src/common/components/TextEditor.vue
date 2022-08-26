<template>
  <div class="editor editor--standard">
    <QuillEditor
      theme="snow" 
      toolbar="essential"
      ref="editor"
      @textChange="$emit('getEditor', $refs.editor)"
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
      editorContent: ''
    }
  },
}
</script>

<style lang="scss">
  @use '../../assets/styles/components/ql-editor';
</style>