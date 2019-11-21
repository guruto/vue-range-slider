export const state = () => ({
  isActive: false,
  targetType: null,
})

export const mutations = {
  SHOW(state, targetType) {
    state.isActive = true
    state.targetType = targetType
  },
  HIDE(state) {
    state.isActive = false
    state.targetType = null
  }
}

export const actions = {
  show({ commit }, targetType) {
    console.log(targetType)
    commit("SHOW", targetType)
  },
  hide({ commit }) {
    commit("HIDE")
  }
}

export const getters = {
  isActive: state => state.isActive,
  targetType: state => state.targetType,
}
