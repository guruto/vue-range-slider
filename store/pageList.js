export const state = () => ({
  isError: false,
  errorMessage: "",

  items: [],
  itemCount: 0
})

export const mutations = {
  SET_PAGE_LIST_DATA: function(state, data) {
    state.isError = false
    state.errorMessage = ""

    state.items = data.pages
    state.itemCount = data.all_count
  },

  SET_PAGE_LIST_ERROR: function(state, errorMessage) {
    state.isError = true
    state.errorMessage = errorMessage
  }
}

import Api from "~/plugins/api"

export const actions = {
  async getListMemberBelongedMyself({ rootState, commit }) {
    // API連携
    const params = {}
    const res = await Api.getPageListMemberBelongedMyself(
      params,
      rootState.user.authorizationToken
    )

    if (!res.is_error) {
      commit("SET_PAGE_LIST_DATA", res.data)
    } else {
      // エラー処理
      commit("SET_PAGE_LIST_ERROR", res.error_message)
    }
  }
}
