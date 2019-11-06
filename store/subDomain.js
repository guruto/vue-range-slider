export const state = () => ({
  subDomain: null,
  hasSubDomain: false
})

export const mutations = {
  SET_SUB_DOMAIN(state, subDomain) {
    state.subDomain = subDomain
    state.hasSubDomain = true
  },

  CLEAR_SUB_DOMAIN(state) {
    state.subDomain = null
    state.hasSubDomain = false
  }
}

export const actions = {
  set({ commit }, { subDomain }) {
    commit("SET_SUB_DOMAIN", subDomain)
  },
  clear({ commit }) {
    commit("CLEAR_SUB_DOMAIN")
  }
}

export const getters = {
  subDomain: state => state.subDomain
}
