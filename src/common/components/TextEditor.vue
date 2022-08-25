<template>
  <QuillEditor 
    theme="snow" 
    toolbar="essential"
  />
</template>

<script>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

export default {
  components: {
    QuillEditor
  }
}
</script>

<style lang="scss">
  @use '../../assets/styles/components/ql-editor';
</style>