import Topics from '@/services/Topics';
import { formatResponse } from '@/helpers/common.helper';

const state = {
  forumList: [],
  threadList: {},
  threadPageSize: 10,
}

const getters = {
  getTopicsCategories() {
    return state.forumList;
  }
}

const mutations = {
  UPDATE_LIST (state, data) {
    state.forumList = [...data];
  },

  UPDATE_THREADS (state, data) {
    state.threadList = Object.assign({}, data);
  }
}

const actions = {
  async fetchForumList ({ commit }) {
    try {
      const { data } = await Topics.getTopicsCategories();
      commit('UPDATE_LIST', data);
    } catch (error) {
      return formatResponse(error);
    }
  },

  async fetchThreadList ({ commit }, { topicID, page }) {
    try {
      const { data } = await Topics.getThreadsTopic({ 
        topicID, 
        pageSize: state.threadPageSize,
        page
      });
      commit('UPDATE_THREADS', data);
    } catch(error) {
      return formatResponse(error);
    }
  }
}

const topicsStore = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

export default topicsStore;