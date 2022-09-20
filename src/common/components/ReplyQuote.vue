<template>
  <node-view-wrapper class="reply-quote">
    <node-view-content contenteditable="false" class="author" />
  </node-view-wrapper>
</template>

<script>
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'

export default {
  components: {
    NodeViewWrapper,
    NodeViewContent,
  },

  props: nodeViewProps,
}
</script>

<style lang="scss">
  @use '../../assets/styles/components/reply-quote';
</style>