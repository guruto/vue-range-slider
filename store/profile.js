export const state = () => ({
  isError: false,

  label: null,
  name: "",
  description: "",
  iconImagePath: "",
  iconImageUrl: "",
  requestOgpImageUrl: ""
})

export const mutations = {
  SET_PROFILE_DATA: function(state, data) {
    state.isError = false
    // state.label         = data.label;
    state.name = data.name
    state.description = data.description
    state.iconImagePath = data.icon_image_path
    state.iconImageUrl = data.icon_image_url
    state.requestOgpImageUrl = data.request_ogp_image_url
  },

  SET_PROFILE_ERROR: function(state) {
    state.isError = true
  }
}

import Api from "~/plugins/api"

export const actions = {
  async get({ rootState, commit }, { pageLabel }) {
    const result = await Api.getProfile(
      pageLabel,
      {},
      rootState.user.authorizationToken
    )

    if (!result.is_error) {
      commit("SET_PROFILE_DATA", result.data)
    } else {
      // エラー処理
      commit("SET_PROFILE_ERROR")
    }
  },
  
  async getMyself({ rootState, commit }) {
    const result = await Api.getProfileMyself(rootState.user.authorizationToken)

    if (!result.is_error) {
      commit("SET_PROFILE_DATA", result.data)
    } else {
      // エラー処理
      commit("SET_PROFILE_ERROR")
    }
  },
  
  async edit({ rootState, dispatch }, { name, description, iconImagePath }) {
    // API連携
    const params = {
      // label: label,
      name: name,
      description: description,
      icon_image_path: iconImagePath
    }
    const result = await Api.editProfile(
      params,
      rootState.user.authorizationToken
    )

    if (!result.is_error) {
      dispatch("flashMessage/showSuccess", "更新完了しました。", { root: true })
    } else {
      // エラー処理
      dispatch("flashMessage/showError", result.error_message, { root: true })
    }
  }
}
