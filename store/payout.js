export const state = () => ({
  isError: false,
  errorMessage: "",
  
  totalAmount: null,
  
})

export const mutations = {
  SET_DATA: function(state, data) {
    state.isError = false
    state.errorMessage = ""

    state.totalAmount = data.total_amount
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
  async request({ rootState, commit, dispatch }) {
    const res = await Api.requestPayout(
      rootState.user.authorizationToken
    )
    
    if (!res.is_error) {
      commit("SET_SUCCESS")
      commit("userSales/SET_PAYOUT_REQUEST_DATA", {}, { root: true })
      dispatch("flashMessage/showSuccess", "出金申請が完了しました。", { root: true })
      
    } else {
      // エラー処理
      commit("SET_ERROR")
      dispatch("flashMessage/showError", res.error_message, { root: true })
    }
  }
}
