<template>
  <div class="authenthication__wrapper">
    <div class="authenthication card">
      <Form class="authenthication__form" ref="form">
        <template #title>
          <h1 class="text text--mega text--thick">{{ formSchema.title }}</h1>
        </template>
        <template #validation>
          <ValidationList 
            :list="validation.messages"
            :type="validation.type"
          />
        </template>
        <template #inputs>
          <Input 
            v-for="(input, i) in formSchema.inputs" 
            :type="input.type"
            :name="input.name"
            :placeholder="input.placeholder"
            :key="i"
          />
        </template>
        <template #submit>
          <Button 
            class="button button--normal button--primary text text--deci text--bold" 
            type="submit"
            @click="handleSubmit($event)"
            :text="this.formSchema.submit"
          />
        </template>
      </Form>
    </div>
  </div>
</template>

<script>
import Button from '@/common/components/Button';
import Form from '@/common/components/Form';
import Input from '@/common/components/Input';
import ValidationList from '@/common/components/ValidationList';
import { authenthicate } from '@/helpers/auth.helper';

export default {
  components: {
    Button,
    Form,
    Input,
    ValidationList
  },

  data () {
    return {
      auth: '',
      formSchema: [],
      validation: {
        messages: [],
        type: ''
      },
    }
  },
  mounted() {
    this.auth = this.$route.path.substring(1);
    this.formSchema = require('@/common/schemas/FormSchemas')[this.auth];
  },

  methods: {
    async handleSubmit(event) {
      event.preventDefault();
      this.validation.messages = [];
      let user = {};

      const formData = new FormData(this.$refs.form.$el);
      for (const [inputName, value] of formData) {
        user[inputName] = value;
      }

      const { messages, type } = await authenthicate(this.auth, user);
      
      this.validation = {
          messages: [...messages],
          type: type
      }
    }
  }
}
</script>

<style lang="scss">
  @use '@/assets/styles/views/authenthication';
</style>
