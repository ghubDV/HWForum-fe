<template>
  <div class="profile card">
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
            class="button button--normal button--primary button--text-center text text--deci text--bold" 
            type="submit"
          >
            <template #text>
              {{ profile.exists ? profileSchema.submit.update.name : profileSchema.submit.create.name }}
            </template>
          </Button>
        </div>
      </template>
    </Form>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import Button from '@/common/components/Button.vue';
  import Form from '@/common/components/Form.vue';
  import Input from '@/common/components/Input.vue';
  import ValidationList from '@/common/components/ValidationList';
  import { profile } from '@/common/schemas/form.schema';
  import { getFormData, getAvatarColor } from '@/helpers/common.helper';

  export default {
    components: {
        Form,
        Button,
        Input,
        ValidationList
    },

    computed: {
      ...mapGetters({
        username: 'auth/getUsername'
      })
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
      const profile = await this.getProfile(this.username);

      if(profile !== null) {
        this.profile.exists = true;
        this.profile.data = {...profile};
      }
    },  

    methods: {
      ...mapActions('profile', ['createProfile', 'getProfile', 'updateProfile']),

      async handleSubmit() {
        let data = getFormData(this.$refs.form.$el);
        let response;

        if(!this.profile.exists) {
          data.avatar = getAvatarColor();
          response = await this.createProfile(data);
          if(response.type === 'success') {
            this.profile.exists = true,
            this.profile.data = {...data};
          }
        } else {
          response = await this.updateProfile(data);
        }

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