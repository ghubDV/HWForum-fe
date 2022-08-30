import Auth from '@/services/Auth';
import { formatResponse, getAvatarColor } from '@/helpers/common.helper';
import Router from '@/routes';
import { HOME, LOGIN } from '@/common/schemas/route.schema';

const state = {
  authInit: false,

  user: {
    isLoggedIn: false,
    username: '',
    avatar: ''
  },
}

const getters = {
  getUserAuth (state) {
    return state.user.isLoggedIn;
  },

  getUsername (state) {
    return state.user.username;
  },

  getAvatar (state) {
    return state.user.avatar;
  },

  getAuthInit (state) {
    return state.authInit;
  },
}

const mutations = {
  AUTH_INIT (state) {
    state.authInit = true;
  },

  LOG_IN (state, payload) {
    state.user = {
      ...state.user,
      isLoggedIn: true,
      username: payload.username,
      avatar: localStorage.getItem('avatar') || getAvatarColor()
    }
  },

  LOG_OUT (state) {
    state.user.isLoggedIn = false;
    state.user.username = '';
    state.user.avatar = '';
    localStorage.removeItem('avatar');
  },

  UPDATE_USERNAME (state, payload) {
    state.user.username = payload;
  }
}

const actions = {
  async register (_ctx, user) {
    try {
      const response = await Auth.register(user);

      return formatResponse(response);
      
    } catch (error) {
      return formatResponse(error);
    }
  },

  async login ({ commit }, user) {
    try {
      const response = await Auth.login(user);

      localStorage.setItem('avatar', getAvatarColor());

      commit('LOG_IN', {
        username: response.data.username
      });

      Router.push(HOME.path);
      
    } catch (error) {
      return formatResponse(error);
    }
  },

  async logout ({ commit, state }, redirect = false) {
    try {
      if(state.user.isLoggedIn) {
        await Auth.logout();

        commit('LOG_OUT');
      }

      if(redirect) {
        Router.push(LOGIN.path);
      }
    } catch {
      return;
    }
  },

  async activate (_ctx, { code }) {
    try {
      await Auth.activate({
        type: 'activate',
        code: code
      });
      
      Router.push({
        path: LOGIN.path,
        query: { success: 'activate' }
      });
      
    } catch (error) {
      return formatResponse(error);
    }
  },

  async reset ({ state }, data) {
    try {
      data.username = state.user.username;

      await Auth.reset(data);
      
      Router.push({
        path: LOGIN.path,
        query: { success: 'reset' }
      });
      
    } catch (error) {
      return formatResponse(error);
    }
  },

  async sendCode (_ctx, data) {
    try {
      const response  = await Auth.sendCode(data);

      return formatResponse(response);
    } catch (error) {
      return formatResponse(error);
    }
  },

  async checkReset ({ commit }, { code }) {
    try {
      const response  = await Auth.checkReset({
        type: 'reset',
        code: code
      });

      commit('UPDATE_USERNAME', response.data.user);

      return formatResponse(response);
    } catch (error) {
      return formatResponse(error);
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