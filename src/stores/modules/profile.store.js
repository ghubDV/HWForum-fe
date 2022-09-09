import Profile from '@/services/Profile';
import store from '@/stores';
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
      store.commit('auth/UPDATE_PROFILE', profile.profileName);

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
      store.commit('auth/UPDATE_PROFILE', profile.profileName);

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