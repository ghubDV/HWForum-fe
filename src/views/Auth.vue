<template>
  <div class="authenthication__wrapper">
    <div class="authenthication">
      <ValidationList 
        class="authenthication__validation"
        :list="validation.messages"
        :type="validation.type"
      />
      <Form class="authenthication__form card" ref="form">
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
            class="button button--normal button--primary text text--deci text--bold" 
            type="submit"
            @click="handleSubmit($event)"
            :text="formSchema.submit"
          />
        </template>
        <template #additional>
          <Button 
            v-for="(button, i) in formSchema.additional"
            type="button"
            class="button button--link text text--deci" 
            @click="$router.push(button.redirect)"
            :text="button.text"
            :key="i"
          />
        </template>
      </Form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
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
      validCode: false,
    }
  },
  computed: {
    ...mapGetters({
      validation: 'auth/getValidation',
      isLoggedIn: 'auth/getUserAuth'
    })
  },

  mounted() {
    this.handleRouteChange();
  },

  watch: {
    $route (to, from) {
      if(to !== from) {
        this.handleRouteChange();
      }
    },
    isLoggedIn (newValue) {
      if(newValue) {
        this.$router.push('/');
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
        } else if(this.$route.query.code) {
          this.formSchema = this.formSchema.code;
        } else {
          this.formSchema = this.formSchema.send;
        }
      }
    },

    async handleSubmit(event) {
      event.preventDefault();
      const data = getFormData(this.$refs.form.$el);
      const authType = this.formSchema.action || this.auth;
      
      await this[authType](data);

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
