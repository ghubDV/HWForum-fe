import Auth from '@/services/Auth';
import { formatResponse } from '@/helpers/common.helper';
import Router from '@/routes';
import { LOGIN, PROTECTED } from '@/common/schemas/route.schema';

const state = {
  authInit: false,

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

  getUsername (state) {
    return state.user.username;
  },

  getAuthInit (state) {
    return state.authInit;
  },

  getValidation (state) {
    return state.validation;
  }
}

const mutations = {
  AUTH_INIT (state) {
    state.authInit = true;
  },

  LOG_IN (state, payload) {
    state.user.isLoggedIn = true;
    state.user.username = payload.username;
  },

  LOG_OUT (state) {
    state.user.isLoggedIn = false;
    state.user.username = '';
  },

  RESET_VALIDATION (state) {
    state.validation.messages = [];
    state.validation.type = '';
  },

  UPDATE_VALIDATION (state, payload) {
    state.validation.messages = [];
    state.validation.type = '';

    state.validation.messages = [...payload.messages];
    state.validation.type = payload.type;
  },

  UPDATE_USERNAME (state, payload) {
    state.user.username = payload;
  }
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

      commit('RESET_VALIDATION');

      Router.push(PROTECTED.path);
      
    } catch (error) {
      commit('UPDATE_VALIDATION', formatResponse(error));
    }
  },

  async logout ({ commit, state }) {
    try {
      if(state.user.isLoggedIn) {
        await Auth.logout();

        commit('LOG_OUT');
  
        Router.push(LOGIN.path);
      } 
    } catch {
      return;
    }
  },

  async activate ({ commit }, { code }) {
    try {
      const response = await Auth.activate({
        type: 'activate',
        code: code
      });

      commit('UPDATE_VALIDATION', formatResponse(response));

      Router.push(LOGIN.path);
      
    } catch (error) {
      commit('UPDATE_VALIDATION', formatResponse(error));
    }
  },

  async reset ({ commit, state }, data) {
    try {
      data.username = state.user.username;

      const response = await Auth.reset(data);

      commit('UPDATE_VALIDATION', formatResponse(response));

      Router.push(LOGIN.path);
      
    } catch (error) {
      commit('UPDATE_VALIDATION', formatResponse(error));
    }
  },

  async sendCode ({ commit }, type) {
    try {
      const response  = await Auth.sendCode(type);

      commit('UPDATE_VALIDATION', formatResponse(response));
    } catch (error) {
      commit('UPDATE_VALIDATION', formatResponse(error));
    }
  },

  async checkReset ({ commit }, { code }) {
    try {
      const response  = await Auth.checkReset({
        type: 'reset',
        code: code
      });

      commit('UPDATE_VALIDATION', formatResponse(response));

      commit('UPDATE_USERNAME', response.data.user);
    } catch (error) {
      commit('UPDATE_VALIDATION', formatResponse(error));
    }
  },

  async authorize ({ commit, state }) {
    if (!state.authInit) {
      commit('AUTH_INIT');
    }

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