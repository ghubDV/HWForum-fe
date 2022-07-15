import { createStore } from 'vuex';
import authenthication from './modules/authenthication';
import main from './modules/main';

export default createStore({
  modules: {
    main: main,
    auth: authenthication
  }
})