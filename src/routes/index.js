import { createWebHistory, createRouter } from 'vue-router'
import Auth from '@/modules/authenthication/Auth.vue';

const routes = [
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
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
