const state = {
  loader: {
    isLoading: false,
    progress: 0,
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
  }
}

const actions = {
  startLoading ({ commit }) {
    commit('SET_LOADING', true);
    commit('SET_PROGRESS', 1);
    commit('SET_PROGRESS', 25);
  },

  finishLoading ({ commit }) {
    commit('SET_PROGRESS', 100);
    setTimeout(function() {
      commit('SET_LOADING', false);
    }, 1000);
  },
}

const mainStore = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

export default mainStore;