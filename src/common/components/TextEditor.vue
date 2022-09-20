<template>
  <div v-if="editor" class="editor">
    <div class="editor__header">
      <div
        v-for="(command, i) in editorControls.commands"
        class="editor__control"
        :class="editorControls.activeStates[i] !== null ? { 'active': editor.isActive(...editorControls.activeStates[i]) } : ''"
        :key="i"
      >
        <Svg class="icon--normal" @click="editorCommand(command)" :icon="editorIcons[i]"></Svg>

        <Tooltip 
          v-show="showTooltip === command.hasTooltip"
          :type="command.tooltip"
          class="tooltip--mb"
        >
          <template #content>
            <Dropdown
              v-if="command.tooltip === 'input'"
              class="dropdown--row dropdown--gap"
            >
              <template #dropdown-item>
                <Input
                  v-if="command.tooltip === 'input'"
                  class="input__wrapper--auto"
                  extraClass="input--narrow"
                  type="text"
                  :name="command.hasTooltip"
                  :value="editor.getAttributes('link').href"
                  @getInput="getInput"
                />
                <Button @click="getTooltipData(command)" class="button button--link">
                  <template #text>
                    Save
                  </template>
                </Button>
              </template>
            </Dropdown>

            <Dropdown 
              v-if="command.tooltip === 'colorPicker'"
              class="dropdown--row"
            >
              <template #dropdown-item>
                <div 
                  v-for="(color, i) in command.colors" 
                  @click="getTooltipData(command, color)" 
                  class="dropdown__color-item" 
                  :key="i" 
                  :style="{ backgroundColor: color,  border: editor.isActive('textStyle', {color: color}) ? '1px solid black' : '' }" 
                />
              </template>
            </Dropdown>

            <Dropdown 
              v-if="command.tooltip === 'fontPicker'"
              class="dropdown--column dropdown--auto"
            >
              <template #dropdown-item>
                <div 
                  v-for="(size, i) in command.sizes" 
                  @click="getTooltipData(command, size)" 
                  class="dropdown__list-item" 
                  :key="i" 
                  :style="{ fontSize: size, color: editor.isActive('textStyle', {fontSize: size}) ? '#4DA167' : '' }"
                >
                  {{ size.slice(0, -2) }}
                </div>
              </template>
            </Dropdown>
          </template>
        </Tooltip>
      </div>
    </div>
    <div class="editor__content">
      <editor-content :editor="editor" />
    </div>
  </div>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-3'
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import TextStyle from '@tiptap/extension-text-style'
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Underline from '@tiptap/extension-underline';
import Strike from '@tiptap/extension-strike';
import FontSize from 'tiptap-extension-font-size';
import { Color } from '@tiptap/extension-color'
import TextAlign from '@tiptap/extension-text-align'
import OrderedList from '@tiptap/extension-ordered-list';
import BulletList from '@tiptap/extension-bullet-list';
import ListItem from '@tiptap/extension-list-item'
import Blockquote from '@tiptap/extension-blockquote';
import CodeBlock from '@tiptap/extension-code-block';
import Link from '@tiptap/extension-link';
import History from '@tiptap/extension-history';
import ReplyQuote from './editor-extensions/ReplyQuoteExtension';
import Svg from '@/common/components/Svg.vue';
import Button from './Button.vue';
import Dropdown from './Dropdown.vue';
import Input from './Input.vue';
import Tooltip from './Tooltip.vue';
import { editor } from '@/common/schemas/icon.schema';
import { controls } from '@/common/schemas/editor.schema';

export default {
  components: {
    EditorContent,
    Svg,
    Button,
    Dropdown,
    Input,
    Tooltip,
},

  data() {
    return {
      editor: null,
      editorControls: controls,
      editorIcons: editor,
      showTooltip: null,
      input: '',
    }
  },

  methods: {
    editorCommand(command) {
      if(command.name && command.args) {
        this.editor.chain().focus()[command.name](command.args).run();
        return;
      }

      if(command.hasTooltip) {
        this.showTooltip = !this.showTooltip || this.showTooltip !== command.hasTooltip ? command.hasTooltip : null;
        return;
      }

      if(command === 'clearFormat') {
        this.editor.chain().focus().clearNodes().unsetAllMarks().run();
        return;
      }

      this.editor.chain().focus()[command]().run();
    },

    getTooltipData(command, additional) {
      let args;
      if(command.hasTooltip === 'link') {
        args = { href: this.input };
      } else {
        args = additional;
      }

      this.editorCommand({ name: command.name, args: args });
      this.showTooltip = null;
    },

    getInput(input) {
      this.input = input.value;
    }
  },

  mounted() {
    this.editor = new Editor({
      extensions: [
        Document,
        Paragraph,
        Text,
        TextStyle,
        Bold,
        Italic,
        Underline,
        Strike,
        FontSize,
        Color,
        TextAlign.configure({
          alignments: ['left', 'center', 'right'],
          types: ['paragraph'],
        }),
        OrderedList,
        BulletList,
        ListItem,
        Blockquote,
        CodeBlock,
        Link.configure({
          openOnClick: false
        }),
        History.configure({
          depth: 10
        }),
        ReplyQuote
      ],

      onCreate: ({ editor }) => {
        this.$emit('getEditor', editor);
      }
    })
  },

  beforeUnmount() {
    this.editor.destroy()
  },
}
</script>

<style lang="scss">
  @use '../../assets/styles/components/text-editor';
</style>