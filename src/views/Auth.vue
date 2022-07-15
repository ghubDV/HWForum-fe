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
            :value="input.value ? $route.query.code : null"
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
import { mapActions, mapState } from 'vuex';
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
    }
  },
  computed: {
    ...mapState('auth', {
      validation: state => state.validation
    })
  },

  mounted() {
    this.handleRouteChange();
  },

  watch: {
    '$route' (to, from) {
      if(to !== from) {
        this.handleRouteChange();
      }
    }
  },

  methods: {
    ...mapActions('auth', ['register', 'login', 'activate']),

    handleRouteChange() {
      this.auth = this.$route.path.substring(1);

      this.formSchema = require('@/common/schemas/form.schema')[this.auth];
    },

    async handleSubmit(event) {
      event.preventDefault();
      this.validation.messages = [];
      const user = getFormData(this.$refs.form.$el);
      const authType = this.auth;

      await this[authType](user);
    }
  }
}
</script>

<style lang="scss">
  @use '@/assets/styles/views/authenthication';
</style>
