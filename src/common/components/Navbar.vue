<template>
  <nav class="navbar">
    <section class="navbar__left">

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

  mounted() {
    this.authorize();
  },

  computed: {
    ...mapGetters({
      isLoggedIn: 'auth/getUserAuth'
    }),
  },

  methods: {
    ...mapActions({
      authorize: 'auth/authorize',
      logout: 'auth/logout',
    }),

    handleAction(actionName) {
      if(this[actionName]) {
        this[actionName]();
      }
    }
  }
}
</script>

<style lang="scss">
  @use '../../assets/styles/components/navbar';
</style>