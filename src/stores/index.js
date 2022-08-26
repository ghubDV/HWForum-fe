import { createStore } from 'vuex';
import authenthication from './modules/authenthication.store';
import common from './modules/common.store';
import profile from './modules/profile.store';
import thread from './modules/thread.store';
import topics from './modules/topics.store';

export default createStore({
  modules: {
    common: common,
    auth: authenthication,
    profile: profile,
    thread: thread,
    topics: topics,
  }
})