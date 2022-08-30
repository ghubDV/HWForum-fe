const NOTIFICATION_DURATION = 10000;

const state = {
  loader: {
    isLoading: false,
    progress: 0,
  },

  notification: {
    visible: false,
    type: '',
    message: {}
  }
}

const getters = {
  getLoaderProgress (state) {
    return state.loader.progress;
  },

  getLoaderState (state) {
    return state.loader.isLoading;
  }
}

const mutations = {
  SET_PROGRESS (state, progress) {
    state.loader.progress = progress; 
  },

  SET_LOADING (state, loading) {
    state.loader.isLoading = loading;
  },

  SHOW_NOTIFICATION (state, notification) {
    state.notification = {
      visible: true,
      ...notification
    }
  },

  HIDE_NOTIFICATION (state) {
    state.notification = {
      visible: false,
      type: '',
      message: {}
    }
  }
}

const actions = {
  startLoading ({ commit }) {
    commit('SET_LOADING', true);
    commit('SET_PROGRESS', 25);
  },

  finishLoading ({ commit }) {
    commit('SET_PROGRESS', 100);
    setTimeout(function() {
      commit('SET_LOADING', false);
    }, 1000);
  },

  sendNotification({ commit }, { type, message }) {
    commit('SHOW_NOTIFICATION', { type, message });

    setTimeout(function() {
      commit('HIDE_NOTIFICATION');
    }, NOTIFICATION_DURATION);
  },

  hideNotification({ commit }) {
    commit('HIDE_NOTIFICATION');
  }
}

const commonStore = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

export default commonStore;