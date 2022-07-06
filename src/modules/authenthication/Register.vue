<template>
  <div class="authenthication__wrapper">
    <div class="authenthication card">
      <form class="authenthication__form form">
        <h1 class="text text--mega text--thick">Create an account</h1>
        <ErrorList 
          :list="list.messages"
          :type="list.type"
        />
        <input 
          class="form__input"
          type="text"
          name="username"
          placeholder="username" 
          v-model="username"           
        />
        <input 
          class="form__input"
          type="email"
          name="email"
          placeholder="email" 
          v-model="email"           
        />
        <input 
          class="form__input"
          type="password"
          name="password"
          placeholder="password"
          v-model="password"       
        />
        <input 
          class="form__input"
          type="password"
          name="confirm_password"
          placeholder="confirm password"
          v-model="confirm_password"       
        />
        <Button 
          class="button button--normal button--primary text text--deci text--bold" 
          type="submit"
          @click="register($event)"
          text="Register"
        />
      </form>
    </div>
  </div>
</template>

<script>
import Auth from '@/services/Auth';
import ErrorList from '@/modules/error/ErrorList';
import Button from '@/common/components/Button';

export default {
  components: {
    Button,
    ErrorList
  },

  data () {
    return {
      username: '',
      email: '',
      password: '',
      confirm_password: '',
      list: {
        messages: [],
        type: ''
      },
    }
  },
  methods: {
    async register(event) {
      event.preventDefault();
      this.list.messages = [];
      try {
        const response = await Auth.register({
          username: this.username,
          email: this.email,
          password: this.password,
          confirm_password: this.confirm_password
        });

        this.list.messages.push(response.data.message);
        this.list.type = 'success';
      } catch (error) {
        this.list.messages.push(`${error.response.statusText}: ${error.response.data.message}`);
        this.list.type = 'error';
      }
    }
  }
}
</script>

<style lang="scss">
  @use '@/assets/styles/views/authenthication';
</style>
