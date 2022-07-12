import { createWebHistory, createRouter } from 'vue-router'
import { 
  Auth,
  Protected
} from '@/views';
import Authenthicate from '@/services/Auth';

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
  {
    path: '/protected',
    name: 'Proteceted',
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
  try {
    const response = await Authenthicate.authorize();
    if(protectedRoutes.includes(to.path)) {
      if(response.data.authorized) {
        next();
      } else {
        next('login');
      }
    } else {
      if(!response.data.authorized && (to.path === '/login' || to.path === '/register')) {
        next();
      } else {
        next('protected');
      }
    }
  } catch (error) {
    next();
  }
})

export default router
