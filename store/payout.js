export const state = () => ({
  isError: false,
  errorMessage: "",

  sumAmount: null,
  
})

export const mutations = {
  SET_DATA: function(state, data) {
    state.isError = false
    state.errorMessage = ""

    state.sumAmount = data.sum_amount
    state.isPaidOut = data.is_paid_out
    state.paidOutAt = data.paid_out_at
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
  async request({ rootState, commit }) {
    const res = await Api.requestPayout(
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
