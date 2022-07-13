import Auth from '@/services/Auth';

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
  getUserAuth(state) {
    return state.user.isLoggedIn;
  }
}

const mutations = {
  LOG_IN(state, payload) {
    state.user.isLoggedIn = true;
    state.user.username = payload.username;
  },

  LOG_OUT(state) {
    state.user.isLoggedIn = false;
    state.user.username = '';
  },

  UPDATE_VALIDATION(state, payload) {
    state.validation.messages = [],
    state.validation.type = '',

    state.validation.messages = [...payload.messages];
    state.validation.type = payload.type;
  }
}

const actions = {
  async auth({ commit }, { user, authType }) {
    try {
      const response = await Auth[authType](user);

      commit('UPDATE_VALIDATION', {
        messages: [response.data.message],
        type: 'success'
      });

      if(authType === 'login') {
        commit('LOG_IN', {
          username: response.data.username
        });
      }
      
    } catch (error) {
      const errorMessage = `${error.response.statusText}: ${error.response.data.message}`;

      commit('UPDATE_VALIDATION', {
        messages: [errorMessage],
        type: 'error'
      });
    }
  },

  async authorize({ commit }) {
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