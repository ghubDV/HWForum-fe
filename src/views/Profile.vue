<template>
  <div class="profile">
    <Form
      @submit.prevent="handleSubmit"
      ref="form"
    >
      <template #title>
        <h1 class="text text--mega text--thick">{{ profileSchema.title }}</h1>
      </template>
      <template #validation>
        <ValidationList
          class="no-margin"      
          :list="validation.messages"
          :type="validation.type"
        />
      </template>
      <template #inputs>
        <div v-for="(input, i) in profileSchema.inputs" :key="i">
          <Input
            :extraClass="input.extraClass || ''"
            :label="input.label"
            :type="input.type"
            :name="input.name"
            :value="profile.data[input.name]"
            :placeholder="input.placeholder"
          />
        </div>
      </template>
      <template #submit>
        <div class="profile__submit">
          <Button 
            class="button button--normal button--primary text text--deci text--bold" 
            type="submit"
            :text="profile.exists ? profileSchema.submit.update.name : profileSchema.submit.create.name"
          />
        </div>
      </template>
    </Form>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import Button from '@/common/components/Button.vue';
  import Form from '@/common/components/Form.vue';
  import Input from '@/common/components/Input.vue';
  import ValidationList from '@/common/components/ValidationList';
  import { profile } from '@/common/schemas/form.schema';
  import { getFormData } from '@/helpers/common.helper';

  export default {
    components: {
      Form,
      Button,
      Input,
      ValidationList
    },

    data() {
      return {
        profileSchema: profile,
        profile: {
          exists: false,
          data: {}
        },
        validation: {
          messages: [],
          type: '',
        },
      }
    },

    async mounted() {
      const profile = await this.getProfile();

      if(profile !== null) {
        this.profile.exists = true;
        this.profile.data = {...profile};
      }
    },  

    methods: {
      ...mapActions('profile', ['createProfile', 'getProfile']),

      async handleSubmit(e) {
        console.log(e.target)
        const data = getFormData(this.$refs.form.$el);
        const response = await this.createProfile(data);

        if(response) {
          this.validation = {...response};
        }
      }
    }
  }
</script>

<style lang="scss">
  @use '../assets/styles/views/profile.scss';
</style>