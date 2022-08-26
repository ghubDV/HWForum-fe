import Thread from '@/services/Thread';
import { formatResponse } from '@/helpers/common.helper';

const state = {
}

const getters = {
}

const mutations = {
}

const actions = {
  async createThread (_ctx, thread) {
    try {
      const response = await Thread.createThread(thread)
      return formatResponse(response);
    } catch (error) {
      return formatResponse(error);
    }
  },
}

const threadStore = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

export default threadStore;