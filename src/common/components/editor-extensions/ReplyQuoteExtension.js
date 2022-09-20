import { mergeAttributes, Node } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'

import ReplyQuote from '../ReplyQuote.vue'

export default Node.create({
  name: 'reply-quote',

  group: 'block',

  content: 'inline*',

  parseHTML() {
    return [
      {
        tag: 'reply-quote',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['reply-quote', mergeAttributes(HTMLAttributes), 0]
  },

  addNodeView() {
    return VueNodeViewRenderer(ReplyQuote)
  },
})