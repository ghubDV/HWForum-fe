import { createWebHistory, createRouter } from 'vue-router'
import * as routeSchema from '@/common/schemas/route.schema';
import * as Views from '@/views';
import store from '@/stores';

const ifProtected = (to, from, next) => {
  if (store.getters['auth/getUserAuth']) {
    next();
    return;
  }
  next('/login');
}

const ifNotProtected = (to, from, next) => {
  if (!store.getters['auth/getUserAuth']) {
    next();
    return;
  }
  next('/');
}

const routes = () => {
  let routeCollection = [];

  for(const route of Object.values(routeSchema)) {
    route.component = Views[route.component]
    
    if(route.auth) {
      route.beforeEnter = ifProtected;
    }

    if(route.noAuth) {
      route.beforeEnter = ifNotProtected;
    }
    
    routeCollection.push(route);
  }

  return routeCollection;
}

const router = createRouter({
  history: createWebHistory(),
  routes: routes()
})

export default router
