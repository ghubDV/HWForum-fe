<template>
  <Card 
    class="card--small-padding"
  >
    <template #content>
      <Form
        @submit.prevent="handleSubmit"
        ref="form"
      >
        <template #title>
          <h1 class="text text--mega text--thick">{{ threadSchema.title }}</h1>
        </template>
        <template #validation>
          <ValidationList
            class="no-margin"      
            :list="validation.messages"
            :type="validation.type"
          />
        </template>
        <template #inputs>
          <Select
            v-for="(select, i) in threadSchema.selects" 
            :grouped="select.grouped"
            :subGroup="select.subGroup"
            :name="select.name"
            :selected="parseInt($route.params.id)"
            :list="forumList"
            :key="i"
          />
          <div v-for="(input, i) in threadSchema.inputs" :key="i">
            <Input
              :extraClass="input.extraClass || ''"
              :label="input.label"
              :type="input.type"
              :name="input.name"
              :placeholder="input.placeholder"
            />
          </div>
          <TextEditor 
            @getEditor="getEditor"
            placeholder="Provide a description to your thread"
          />
        </template>
        <template #submit>
          <Button 
            class="button button--normal button--primary button--text-center button--center text text--deci text--bold" 
            type="submit"
          >
            <template #text>
              {{ threadSchema.submit }}
            </template>
          </Button>
        </template>
      </Form>
    </template>
  </Card>
  
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  import { getTextEditorHTML, getFormData } from '@/helpers/common.helper';
  import { createThread } from '@/common/schemas/form.schema';
  import Button from '@/common/components/Button.vue';
  import Card from '@/common/components/Card.vue';
  import Form from '@/common/components/Form.vue';
  import Input from '@/common/components/Input.vue';
  import Select from '@/common/components/Select.vue';
  import TextEditor from '@/common/components/TextEditor.vue';
  import ValidationList from '@/common/components/ValidationList.vue';

  export default {
    components: {
      Button,
      Card,
      Form,
      Input,
      Select,
      TextEditor,
      ValidationList
    },

    data () {
      return {
        threadSchema: createThread,
        editorContent:'',
        validation: {
          messages: [],
          type: ''
        }
      }
    },

    computed: {
      ...mapState('topics', ['forumList']),
    },
    
    methods: {
      ...mapActions('topics', ['fetchForumList']),
      ...mapActions('thread', ['createThread']),

      getEditor(editor) {
        this.editorContent = getTextEditorHTML(editor);
      },

      async handleSubmit() {
        let data = getFormData(this.$refs.form.$el);
        data = {
          ...data,
          content: this.editorContent
        }

        const response = await this.createThread(data);

        this.validation = {...response};
      }
    },

    async mounted() {
      if(this.forumList.length === 0) {
        await this.fetchForumList();
      }
    }
  }
</script>
