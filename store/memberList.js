export const state = () => ({
  isError: false,
  errorMessage: "",

  items: [],
  itemCount: 0
})

export const mutations = {
  SET_MEMBER_LIST_DATA: function(state, data) {
    state.isError = false
    state.errorMessage = ""

    state.items = data.members
    state.itemCount = data.all_count
  },

  SET_MEMBER_LIST_ERROR: function(state, errorMessage) {
    state.isError = true
    state.errorMessage = errorMessage
  }
}

import Api from "~/plugins/api"

export const actions = {
  async getListBelongToMyPage({ rootState, commit }) {
    // API連携
    const params = {}
    const res = await Api.getMemberListBelongToMyPage(
      params,
      rootState.user.authorizationToken
    )

    if (!res.is_error) {
      commit("SET_MEMBER_LIST_DATA", res.data)
    } else {
      // エラー処理
      commit("SET_MEMBER_LIST_ERROR", res.error_message)
    }
  }

  // async getList({rootState, commit}, {pageLabel}) {
  // 	const result = await Api.getRequestList(pageLabel, {});
  //
  // 	if (!result.is_error) {
  // 		commit('SET_REQUEST_LIST_DATA', result.data)
  //
  // 	} else {
  // 		// エラー処理
  // 		commit('SET_REQUEST_LIST_ERROR')
  // 	}
  // },
}
