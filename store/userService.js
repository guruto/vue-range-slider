export const state = () => ({
  isError: false,
  errorMessage: "",
  errorRedirectPath: null,

  info: {}
})

export const mutations = {
  SET_USER_SERVICE_DATA: function(state, res) {
    state.isError = false
    state.errorMessage = ""
    state.errorRedirectPath = null

    state.info = res.data
  },
  SET_USER_SERVICE_ERROR: function(state, res) {
    state.isError = true
    state.errorMessage = res.error_message
    state.errorRedirectPath = res.redirect_path
  }
}

import Api from "~/plugins/api"

export const actions = {
  async getInfo({ commit, rootState, dispatch }) {
    const res = await Api.getUserServiceInfo(rootState.user.authorizationToken)

    if (!res.is_error) {
      commit("SET_USER_SERVICE_DATA", res)
    } else {
      commit("SET_USER_SERVICE_ERROR", res)
      dispatch("flashMessage/showError", res.error_message, { root: true })
    }
  },

  async delete({ commit, rootState, dispatch }, { type, serviceUserId }) {
    const params = {
      type: type,
      service_user_id: serviceUserId
    }
    const res = await Api.deleteUserService(
      params,
      rootState.user.authorizationToken
    )

    if (!res.is_error) {
      commit("SET_USER_SERVICE_DATA", res)
      dispatch("flashMessage/showSuccess", "解除完了しました。", { root: true })
    } else {
      commit("SET_USER_SERVICE_ERROR", res)
      dispatch("flashMessage/showError", res.error_message, { root: true })
    }
  },

  async linkCallbackFromTwitter(
    { commit, rootState, dispatch },
    { oauthToken, oauthVerifier, tmpOauthToken, tmpOauthTokenSecret }
  ) {
    const params = {
      oauth_token: oauthToken,
      oauth_verifier: oauthVerifier,
      tmp_oauth_token: tmpOauthToken,
      tmp_oauth_token_secret: tmpOauthTokenSecret
    }
    const res = await Api.linkCallbackFromTwitter(
      params,
      rootState.user.authorizationToken
    )

    if (!res.is_error) {
      commit("SET_USER_SERVICE_DATA", res)
      dispatch("flashMessage/showSuccess", "連携完了しました。", { root: true })
    } else {
      // エラー処理
      commit("SET_USER_SERVICE_ERROR", res)
      dispatch("flashMessage/showError", res.error_message, { root: true })
    }
  }
}
