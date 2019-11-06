export const state = () => ({
  isActive: false,
  body: "",
  type: "INFO" // INFO, SUCCESS, ERROR
})

export const mutations = {
  SHOW_SUCCESS(state, message) {
    state.isActive = true
    state.body = message
    state.type = "SUCCESS"
  },

  SHOW_ERROR(state, message) {
    state.isActive = true
    state.body = message
    state.type = "ERROR"
  },

  HIDE(state) {
    state.isActive = false
    state.body = ""
    state.type = "INFO"
  }
}

export const actions = {
  showSuccess({ commit }, message) {
    commit("SHOW_SUCCESS", message)

    setTimeout(() => {
      commit("HIDE")
    }, 4000)
  },

  showError({ commit }, message) {
    commit("SHOW_ERROR", message)
  },

  close({ commit }) {
    commit("HIDE")
  }
}

export const getters = {
  isActive: state => state.isActive,
  body: state => state.body,
  type: state => state.type
}
