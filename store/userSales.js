export const state = () => ({
  isError: false,
  errorMessage: "",
  
  cumulativeAmount: null,
  notPayoutAmount: null,
  canPayout: false,
})

export const mutations = {
  SET_DATA: function(state, data) {
    state.isError = false
    state.errorMessage = ""

    state.cumulativeAmount = data.cumulative_amount
    state.notPayoutAmount = data.not_payout_amount
    state.canPayout = (data.not_payout_amount > 0)
  },

  SET_SUCCESS: function(state) {
    state.isError = false
    state.errorMessage = ""
  },
  
  SET_PAYOUT_REQUEST_DATA: function(state) {
    state.isError = false
    state.errorMessage = ""
    
    state.notPayoutAmount = 0
    state.canPayout = false
  },

  SET_ERROR: function(state, errorMessage) {
    state.isError = true
    state.errorMessage = errorMessage
  }
}

import Api from "~/plugins/api"

export const actions = {
  async getInfoMyself({ rootState, commit }) {
    const res = await Api.getUserSalesInfoMyself(
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
