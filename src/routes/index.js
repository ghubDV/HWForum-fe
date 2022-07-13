import { createWebHistory, createRouter } from 'vue-router'
import { 
  Auth,
  Protected,
  Home
} from '@/views';
import store from '@/stores';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/register',
    name: 'Register',
    component: Auth,
  },
  {
    path: '/login',
    name: 'Login',
    component: Auth,
  },
  {
    path: '/activate',
    name: 'Activate',
    component: Auth,
  },
  {
    path: '/protected',
    name: 'Protected',
    component: Protected
  }
]

const protectedRoutes = [
  '/protected',
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  if(protectedRoutes.includes(to.path)) {
    await store.dispatch('auth/authorize');

    if(store.getters['auth/getUserAuth']) {
      next();
    } else {
      next('login')
    }
  } else if((to.path === '/login' || to.path === '/register')) {
    if(to.redirectedFrom && protectedRoutes.includes(to.redirectedFrom.path)) {
      next();
    } else {
      await store.dispatch('auth/authorize');

      if(store.getters['auth/getUserAuth']) {
        next('/');
      } else {
        next();
      }
    }
  } else {
    next();
  }
})

export default router
