<template>
  <div class="authenthication__wrapper">
    <div class="authenthication">
      <ValidationList 
        class="authenthication__validation"
        :list="validation.messages"
        :type="validation.type"
      />
      <Form 
        class="authenthication__form card" 
        ref="form"
        @submit.prevent="handleSubmit($event)"
      >
        <template #title>
          <h1 class="text text--mega text--thick">{{ formSchema.title }}</h1>
        </template>
        <template #inputs>
          <Input 
            v-for="(input, i) in formSchema.inputs" 
            :type="input.type"
            :name="input.name"
            :placeholder="input.placeholder"
            :value="input.value === true ? $route.query.code : input.value"
            :key="i"
          />
        </template>
        <template #submit>
          <Button 
            class="button button--normal button--primary button--text-center text text--deci text--bold" 
            type="submit"
          >
            <template #text>
              {{ formSchema.submit }}
            </template>
          </Button>
        </template>
        <template #additional>
          <Button 
            v-for="(button, i) in formSchema.additional"
            type="button"
            class="button button--link button--text-center text text--deci" 
            @click="$router.push(button.redirect)"
            :key="i"
          >
            <template #text>
              {{ button.text }}
            </template>
          </Button>
        </template>
      </Form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Button from '@/common/components/Button';
import Form from '@/common/components/Form';
import Input from '@/common/components/Input';
import ValidationList from '@/common/components/ValidationList';
import { getFormData } from '@/helpers/common.helper';

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
      formSchema: {},
      validation: {
        messages: [],
        type: '',
      },
      validCode: false,
    }
  },

  mounted() {
    this.handleRouteChange();

    switch (this.$route.query.success) {
      case 'activate':
        this.validation = {
          messages: ['Account activated successfully!'],
          type: 'success'
        };
        break;
      case 'reset':
        this.validation = {
          messages: ['Password reset was successful!'],
          type: 'success'
        };
        break;
    }
  },

  watch: {
    $route (to, from) {
      if(to !== from) {
        this.handleRouteChange();
      }
    }
  },

  methods: {
    ...mapActions('auth', ['register', 'login', 'activate', 'sendCode', 'checkReset', 'reset']),

    handleRouteChange() {
      this.auth = this.$route.path.substring(1).split('/')[0];

      this.formSchema = require('@/common/schemas/form.schema')[this.auth];

      if(this.auth === 'reset') {
        if(this.validCode) {
         this.formSchema = this.formSchema.change;
        } else if(this.$route.query.code !== undefined) {
          this.formSchema = this.formSchema.code;
        } else {
          this.formSchema = this.formSchema.send;
        }
      }
    },

    async handleSubmit() {
      const data = getFormData(this.$refs.form.$el);
      const authType = this.formSchema.action || this.auth;
      
      const response = await this[authType](data);

      if(response) {
        this.validation = {...response};
      }

      if(authType === 'checkReset') {
        this.validCode = this.validation.type === 'success';

        this.validCode ? this.$router.push('/reset') : null;
      }
    }
  }
}
</script>

<style lang="scss">
  @use '@/assets/styles/views/authenthication';
</style>
