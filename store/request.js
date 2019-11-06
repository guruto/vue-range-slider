export const state = () => ({
  isError: false,

  label: "",
  type: "",
  body: "",
  isAnswered: false,
  createdAt: ""
})

import moment from "moment"

export const mutations = {
  SET_REQUEST_DATA: function(state, data) {
    state.isError = false
    state.label = data.label
    state.type = data.type
    state.body = data.body
    state.isAnswered = data.is_answered
    state.createdAt = moment.unix(data.created_at).format("YYYY/MM/DD HH:mm")
  },

  SET_REQUEST_SUCCESS: function(state) {
    state.isError = false
  },
  SET_REQUEST_ERROR: function(state) {
    state.isError = true
  }
}

import Api from "~/plugins/api"

export const actions = {
  async add({ commit, dispatch }, { pageLabel, body }) {
    const params = {
      type: "QUESTION",
      target_page_label: pageLabel,
      body: body
    }
    const result = await Api.addRequest(params)

    if (!result.is_error) {
      commit("SET_REQUEST_SUCCESS")
      dispatch("flashMessage/showSuccess", "質問を投稿しました。", {
        root: true
      })
    } else {
      // エラー処理
      commit("SET_REQUEST_ERROR", result.error_message)
      dispatch("flashMessage/showError", result.error_message, { root: true })
    }
  },

  async get({ rootState, commit }, { label }) {
    const result = await Api.getRequest(
      label,
      rootState.user.authorizationToken
    )

    if (!result.is_error) {
      commit("SET_REQUEST_DATA", result.data)
    } else {
      // エラー処理
      commit("SET_REQUEST_ERROR", result.error_message)
    }
  }
}
