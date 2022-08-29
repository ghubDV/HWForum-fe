import Profile from '@/services/Profile';
import { formatResponse } from '@/helpers/common.helper';

const state = {
}

const getters = {
}

const mutations = {
}

const actions = {
  async createProfile (_ctx, profile) {
    try {
      const response = await Profile.createProfile(profile);

      return formatResponse(response);
    } catch (error) {
      return formatResponse(error);
    }
  },

  async getProfile(_ctx, username) {
    try {
      const response = await Profile.getProfile(username)
      return response.data.profile;
    } catch (error) {
      return formatResponse(error);
    }
  },

  async updateProfile(_ctx, profile) {
    try {
      const response = await Profile.updateProfile(profile);

      return formatResponse(response);
    } catch (error) {
      return formatResponse(error);
    }
  }
}

const profileStore = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

export default profileStore;