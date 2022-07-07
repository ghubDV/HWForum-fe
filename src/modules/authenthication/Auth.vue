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
            @click="submit($event)"
            :text="this.formSchema.submit"
          />
        </template>
      </Form>
    </div>
  </div>
</template>

<script>
import Auth from '@/services/Auth';
import Button from '@/common/components/Button';
import Form from '@/common/components/Form';
import Input from '@/common/components/Input';
import ValidationList from '@/modules/validation/ValidationList';

export default {
  components: {
    Button,
    Form,
    Input,
    ValidationList
  },

  data () {
    return {
      auth: String,
      formSchema: Array,
      validation: {
        messages: Array,
        type: String
      },
    }
  },
  mounted() {
    this.auth = this.$route.path.substring(1);
    this.formSchema = require('@/common/schemas/FormSchemas')[this.auth];
  },

  methods: {
    async submit(event) {
      event.preventDefault();
      this.validation.messages = [];
      let user = {};

      const formData = new FormData(this.$refs.form.$el);
      for (const [inputName, value] of formData) {
        user[inputName] = value;
      }

      await this.authenthicate(user);
    },

    async authenthicate(user) {
       try {
        const response = await Auth[this.auth](user);
        this.validation.messages.push(response.data.message);
        this.validation.type = 'success';
      } catch (error) {
        this.validation.messages.push(`${error.response.statusText}: ${error.response.data.message}`);
        this.validation.type = 'error';
      }
    }
  }
}
</script>

<style lang="scss">
  @use '@/assets/styles/views/authenthication';
</style>
