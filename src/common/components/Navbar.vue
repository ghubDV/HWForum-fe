<template>
  <nav class="navbar">
    <section class="navbar__left">
      <div 
        v-show="isLoggedIn" 
        class="avatar text--deca text--bold" 
        :style="{ backgroundColor: avatar }"
      >
        {{ username ? username[0].toUpperCase() : null }}
      </div>
    </section>
    <section class="navbar__right">
      <Button
        v-for="(item, i) in navigation(isLoggedIn)"
        class="button button--simple"
        :text="item.text"
        type="button"
        @click="item.redirect ? $router.push(item.redirect) : handleAction(item.action)" 
        :key="i"
      />
    </section>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import navigationList from '../schemas/nav.schema';
import Button from './Button.vue';

export default {
  data() {
    return {
      navigation: navigationList
    }
  }, 

  components: {
    Button
  },

  computed: {
    ...mapGetters({
      isLoggedIn: 'auth/getUserAuth',
      isAuthInit: 'auth/getAuthInit',
      username: 'auth/getUsername',
      avatar: 'auth/getAvatar'
    }),
  },

  methods: {
    ...mapActions({
      logout: 'auth/logout',
    }),

    handleAction(actionName) {
      if(typeof this[actionName] !== 'undefined') {
        this[actionName]();
      }
    }
  },
}
</script>

<style lang="scss">
  @use '../../assets/styles/components/navbar';
</style>