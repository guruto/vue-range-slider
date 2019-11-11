export const state = () => ({
  isError: false,
  errorMessage: "",

  items: []
})

export const mutations = {
  SET_DATA: function(state, data) {
    state.isError = false
    state.errorMessage = ""

    state.items = data
  },

  SET_ERROR: function(state, errorMessage) {
    state.isError = true
    state.errorMessage = errorMessage
  }
}

import Api from "~/plugins/api"

export const actions = {
  async getListMyself({ rootState, commit }) {
    // API連携
    const params = {}
    const res = await Api.getNotificationListMyself(
      params,
      rootState.user.authorizationToken
    )

    if (!res.is_error) {
      commit("SET_DATA", res.data)
    } else {
      // エラー処理
      commit("SET_ERROR", res.error_message)
    }
  }
}
