export const state = () => ({
  isError: false,
  errorMessage: "",

  items: [],
  itemCount: 0,
})

export const mutations = {
  SET_DATA: function(state, data) {
    state.isError = false
    state.errorMessage = ""

    state.items = data
  },

  SET_SUCCESS: function(state) {
    state.isError = false
    state.errorMessage = ""
  },

  SET_ERROR: function(state, errorMessage) {
    state.isError = true
    state.errorMessage = errorMessage
  }
}

import Api from "~/plugins/api"

export const actions = {
  async getSellHistoriesMyself({ rootState, commit }) {
    const res = await Api.getSellPostTransactionHistoriesMyself(
      rootState.user.authorizationToken
    )
    
    if (!res.is_error) {
      commit("SET_DATA", res.data)
    } else {
      // エラー処理
      commit("SET_ERROR")
    }
  }
}
