import Thread from '@/services/Thread';
import Router from '@/routes';
import { formatResponse,createFriendlyURL } from '@/helpers/common.helper';

const state = {
  thread: {},
  comments: [],
  pageCount: 1,
  pageSize: 10
}

const getters = {
  getPageSize(state) {
    return state.pageSize;
  }
}

const mutations = {
  UPDATE_THREAD(state, data) {
    state.thread = {...data};
    state.pageCount = data.pageCount;
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

  async deletePost (_ctx, post) {
    try {
      const response = await Thread.deletePost(post);

      return formatResponse(response);
    } catch (error) {
      return formatResponse(error);
    }
  },

  async updatePost (_ctx, post) {
    try {
      const response = await Thread.updatePost(post);
      return formatResponse(response);
    } catch (error) {
      return formatResponse(error);
    }
  },

  async getThreadAndComments ({ commit }, { threadID, page }) {
    try {
      const response = await Thread.getThreadAndComments({ threadID, pageSize: state.pageSize, page });

      if(response.data) {
        commit('UPDATE_THREAD', response.data[0]);
        commit('UPDATE_COMMENTS', response.data.slice(1));
      }
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