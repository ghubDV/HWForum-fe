import Auth from '@/services/Auth';
import { formatResponse } from '@/helpers/common.helper';
import Router from '@/routes';
import { LOGIN, PROTECTED } from '@/common/schemas/route.schema';

const state = {
  user: {
    isLoggedIn: false,
    username: ''
  },

  validation: {
    messages: [],
    type: '',
  }
}

const getters = {
  getUserAuth (state) {
    return state.user.isLoggedIn;
  },

  getValidation (state) {
    return state.validation;
  }
}

const mutations = {
  LOG_IN (state, payload) {
    state.user.isLoggedIn = true;
    state.user.username = payload.username;
  },

  LOG_OUT (state) {
    state.user.isLoggedIn = false;
    state.user.username = '';
  },

  UPDATE_VALIDATION (state, payload) {
    state.validation.messages = [];
    state.validation.type = '';

    state.validation.messages = [...payload.messages];
    state.validation.type = payload.type;
  },
}

const actions = {
  async register ({ commit }, user) {
    try {
      const response = await Auth.register(user);

      commit('UPDATE_VALIDATION', formatResponse(response));
      
    } catch (error) {
      commit('UPDATE_VALIDATION', formatResponse(error));
    }
  },

  async login ({ commit }, user) {
    try {
      const response = await Auth.login(user);

      commit('LOG_IN', {
        username: response.data.username
      });

      Router.push(PROTECTED.path);
      
    } catch (error) {
      commit('UPDATE_VALIDATION', formatResponse(error));
    }
  },

  async logout ({ commit }) {
    try {
      console.log('oi')
      await Auth.logout();
      console.log('don')

      commit('LOG_OUT');

      Router.go();
    } catch {
      return;
    }
  },

  async activate ({ commit }, code) {
    try {
      const response = await Auth.activate(code);

      commit('UPDATE_VALIDATION', formatResponse(response));

      Router.push(LOGIN.path);
      
    } catch (error) {
      commit('UPDATE_VALIDATION', formatResponse(error));
    }
  },

  async authorize ({ commit }) {
    try {
      const response = await Auth.authorize();

      commit('LOG_IN', {
        username: response.data.username
      });
    } catch {
      commit('LOG_OUT');
    }
  }
}

const authStore = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

export default authStore;