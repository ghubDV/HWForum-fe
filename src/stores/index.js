import { createStore } from 'vuex';
import authenthication from './modules/authenthication.store';
import common from './modules/common.store';

export default createStore({
  modules: {
    common: common,
    auth: authenthication
  }
})