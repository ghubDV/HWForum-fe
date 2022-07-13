import { createApp } from 'vue'
import App from './App.vue'
import routes from './routes';
import store from './stores';
import './assets/styles/main.scss';

const app = createApp(App)

app
  .use(store)
  .use(routes)
  .mount('#app');
