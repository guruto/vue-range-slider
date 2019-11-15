export const state = () => ({
  isError: false,
  errorMessage: "",
  
  cumulativeSalesAmount: null,
  notPayoutSalesAmount: null,
  latestOrderId: null,
  latestRequestCardNumber: null,
  canPayout: false,
})

export const mutations = {
  SET_DATA: function(state, data) {
    state.isError = false
    state.errorMessage = ""

    state.cumulativeSalesAmount = data.cumulative_sales_amount
    state.notPayoutSalesAmount = data.not_payout_sales_amount
    state.latestOrderId = data.latest_order_id
    state.latestRequestCardNumber = data.latest_request_card_number
    state.canPayout = (data.not_payout_sales_amount > 0)
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
  async getInfoMyself({ rootState, commit }) {
    const res = await Api.getUserPaymentInfoMyself(
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
