export const state = () => ({
  isError: false,
  errorMessage: "",

  items: [],
  itemCount: 0
})

export const mutations = {
  SET_REQUEST_LIST_DATA: function(state, data) {
    state.isError = false
    state.errorMessage = ""

    state.items = data.requests
    state.itemCount = data.all_count
  },

  SET_REQUEST_LIST_ERROR: function(state) {
    state.isError = true
  }
}

import Api from "~/plugins/api"

export const actions = {
  async getListMyself({ rootState, commit }, { type, selectType }) {
    // API連携
    const params = {
      type: type,
      select_type: selectType
    }
    const result = await Api.getRequestListMyself(
      params,
      rootState.user.authorizationToken
    )

    if (!result.is_error) {
      commit("SET_REQUEST_LIST_DATA", result.data)
    } else {
      // エラー処理
      commit("SET_REQUEST_LIST_ERROR")
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
