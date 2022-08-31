import Thread from '@/services/Thread';
import Router from '@/routes';
import { formatResponse,createFriendlyURL } from '@/helpers/common.helper';

const state = {
  thread: {},
  comments: []
}

const getters = {
}

const mutations = {
  UPDATE_THREAD(state, data) {
    state.thread = {...data};
  },

  UPDATE_COMMENTS(state, data) {
    state.comments = [...data];
  }
}

const actions = {
  async createComment (_ctx, comment) {
    try {
      const response = await Thread.createComment(comment)

      return formatResponse(response);
    } catch (error) {
      return formatResponse(error);
    }
  },

  async createThread (_ctx, thread) {
    try {
      const response = await Thread.createThread(thread)

      if(response.data.threadID) {
        Router.push(createFriendlyURL('/thread/', thread.name, response.data.threadID));
      }
    } catch (error) {
      return formatResponse(error);
    }
  },

  async getThreadAndComments ({ commit }, threadID) {
    try {
      const response = await Thread.getThreadAndComments(threadID);

      if(response.data) {
        commit('UPDATE_THREAD', response.data[0]);
        commit('UPDATE_COMMENTS', response.data.slice(1));
      }

      return response.data;
    } catch (error) {
      return formatResponse(error);
    }
  },

  async updatePost(_ctx, post) {
    try {
      const response = await Thread.updatePost(post);
      return formatResponse(response);
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