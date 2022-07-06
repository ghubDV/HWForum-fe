import { createWebHistory, createRouter } from 'vue-router'
import Auth from '@/modules/authenthication/Register.vue';

const routes = [
  {
    path: '/register',
    name: 'Auth',
    component: Auth,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
