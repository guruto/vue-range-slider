export const state = () => ({
  isError: false,
  errorMessage: "",

  items: [],
  itemCount: 0
})

// import Vue from 'vue'
// import moment from 'moment'

export const mutations = {
  SET_POST_LIST_DATA: function(state, data) {
    state.isError = false
    state.errorMessage = ""

    state.items = data.posts
    state.itemCount = data.all_count
  },

  SET_POST_LIST_SUCCESS: function(state) {
    state.isError = false
    state.errorMessage = ""
  },

  SET_POST_LIST_ERROR: function(state, errorMessage) {
    state.isError = true
    state.errorMessage = errorMessage
  }
}

import Api from "~/plugins/api"

export const actions = {
  async getListMyself({ rootState, commit }, { type }) {
    const params = {}
    if (type) {
      params["type"] = type
    }
    const result = await Api.getPostListMyself(
      params,
      rootState.user.authorizationToken
    )

    if (!result.is_error) {
      commit("SET_POST_LIST_DATA", result.data)
    } else {
      // エラー処理
      commit("SET_POST_LIST_ERROR", result.error_message)
    }
  }
}
