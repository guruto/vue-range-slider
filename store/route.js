export const state = () => ({
  backPath: "/"
})

export const mutations = {
  SET_BACK_PATH(state, path) {
    state.backPath = path
  },

  CLEAR_BACK_PATH(state) {
    state.backPath = "/"
  }
}

export const actions = {
  set({ commit }, backPath) {
    commit("SET_BACK_PATH", backPath)
  },
  clear({ commit }) {
    commit("CLEAR_BACK_PATH")
  }
}

export const getters = {
  backPath: state => state.backPath
}
