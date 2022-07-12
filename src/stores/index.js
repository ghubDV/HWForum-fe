import { createStore } from 'vuex';
import authenthication from './modules/authenthication';

export default createStore({
  modules: {
    authenthication
  }
})