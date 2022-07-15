import { createWebHistory, createRouter } from 'vue-router'
import * as routeSchema from '@/common/schemas/route.schema';
import * as Views from '@/views';
import store from '@/stores';

const protectedRoutes = [];

const routes = () => {
  let routeCollection = [];

  for(const route of Object.values(routeSchema)) {
    route.component = Views[route.component]
    
    if(route.protected) {
      protectedRoutes.push(route.path);
    }
    routeCollection.push(route);
  }

  return routeCollection;
}

const router = createRouter({
  history: createWebHistory(),
  routes: routes()
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
