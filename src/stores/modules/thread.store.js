import Thread from '@/services/Thread';
import Router from '@/routes';
import { formatResponse } from '@/helpers/common.helper';

const state = {
  thread: {}
}

const getters = {
}

const mutations = {
  UPDATE_THREAD(state, data) {
    state.thread = {...data};
  }
}

const actions = {
  async createThread (_ctx, thread) {
    try {
      const response = await Thread.createThread(thread)

      if(response.data.threadID) {
        Router.push(`/thread.${response.data.threadID}`);
      }
    } catch (error) {
      return formatResponse(error);
    }
  },
  
  async getThreadById ({ commit }, threadID) {
    try {
      const response = await Thread.getThreadById(threadID);
      commit('UPDATE_THREAD', response.data);
    } catch (error) {
      return formatResponse(error);
    }
  }
}

const threadStore = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

export default threadStore;