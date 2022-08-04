import Topics from '@/services/Topics';
import { formatResponse } from '@/helpers/common.helper';

const state = {
  forumList: []
}

const getters = {
  getTopicsCategories() {
    return state.forumList;
  }
}

const mutations = {
  UPDATE_LIST (state, payload) {
    state.forumList = [...payload];
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