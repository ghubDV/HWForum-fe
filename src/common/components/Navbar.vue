<template>
  <nav class="navbar">
    <section class="navbar__left">
      <router-link class="link--simple" to="/">
        <h1 class="text--mega text--bold">HWForum</h1>
      </router-link>
    </section>

    <section class="navbar__right">
      <div 
        v-if="isLoggedIn" 
        class="avatar avatar--clickable text--deca text--bold" 
        @click="toggleMenu"
        :style="{ backgroundColor: avatar }"
      >
        {{ username ? username[0].toUpperCase() : null }}
      </div>
      
      <div 
        v-else
        class="button button--simple"
        @click="$router.push('/login')"
      >
        <RenderSVG icon="account" />
      </div>
      <Menu v-show="showMenu">
        <template #list>
          <div class="menu__list">
            <div 
              v-for="(item, i) in navigation(isLoggedIn)"
              class="menu__list-item"
              :key="i"
            >
              <RenderSVG 
                v-if="item.icon"
                :icon="item.icon" 
                class="icon--small"
              />
              <Button
                class="menu__item button button--simple-green button--no-padding text text--bold"
                :text="item.text"
                type="button"
                @click="handleMenuClick(item)" 
              />
            </div>
          </div>
        </template>
      </Menu>
    </section>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import navigationList from '../schemas/nav.schema';
import Menu from '../components/Menu.vue';
import RenderSVG from '../components/Svg.vue';
import Button from './Button.vue';

export default {
  data() {
    return {
      navigation: navigationList,
      showMenu: false
    }
  }, 

  components: {
    Button,
    Menu,
    RenderSVG
  },

  computed: {
    ...mapGetters({
      isLoggedIn: 'auth/getUserAuth',
      authInit: 'auth/getAuthInit',
      username: 'auth/getUsername',
      avatar: 'auth/getAvatar'
    }),
  },

  watch: {
    async $route () {
      if(!this.$route.meta.requiresAuth && !this.authInit) {
        await this.authorize();
      }
    }
  },  

  methods: {
    ...mapActions({
      authorize: 'auth/authorize',
      logout: 'auth/logout'
    }),

    toggleMenu() {
      this.showMenu = !this.showMenu;
    },

    handleMenuClick(item) {
      if(item.redirect) {
        this.$router.push(item.redirect);
      } else {
        this.handleAction(item.action);
      }

      this.showMenu = false;
    },

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