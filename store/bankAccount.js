export const state = () => ({
  isError: false,
  
  bankName: "",
  branchName: "",
  accountType: "NORMAL",
  accountNumber: "",
  // accountName: "",
  accountNameKana: "",
})

export const mutations = {
  SET_DATA: function(state, data) {
    state.isError = false
    
    state.bankName = data.bank_name
    state.branchName = data.branch_name
    state.accountType = data.account_type
    state.accountNumber = data.account_number
    // state.accountName = data.account_name
    state.accountNameKana = data.account_name_kana
  },

  SET_ERROR: function(state) {
    state.isError = true
  }
}

import Api from "~/plugins/api"

export const actions = {
  async getMyself({ rootState, commit }) {
    const res = await Api.getBankAccountMyself(rootState.user.authorizationToken)

    if (!res.is_error) {
      commit("SET_DATA", res.data)
    } else {
      // エラー処理
      commit("SET_ERROR")
    }
  },
  
  async save({ rootState, dispatch, commit }, param) {
    const params = {
      bank_name: param.bankName,
      branch_name: param.branchName,
      account_type: param.accountType,
      account_number: param.accountNumber,
      // account_name: param.accountName,
      account_name_kana: param.accountNameKana,
    }
    const res = await Api.saveBankAccount(
      params,
      rootState.user.authorizationToken
    )

    if (!res.is_error) {
      commit("SET_DATA", res.data)
      dispatch("flashMessage/showSuccess", "更新完了しました。", { root: true })
    } else {
      // エラー処理
      commit("SET_ERROR")
      dispatch("flashMessage/showError", result.error_message, { root: true })
    }
  }
}
