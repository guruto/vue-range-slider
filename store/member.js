export const state = () => ({
  isError: false,
  errorMessage: "",
  errorRedirectPath: null,
  successMessage: "",

  authenticated: false,
  afterLoginRedirectPath: "/member/profile",

  label: "",

  user: {
    authorizationToken: null,
    memberPageLabelList: []
  },
  profile: {},
  setting: {}
})

export const mutations = {
  SET_MEMBER_DATA: function(state, data) {
    state.isError = false
    state.errorMessage = ""
    state.errorRedirectPath = null

    state.authenticated = Boolean(data.user.authorization_token)

    state.label = data.label
    state.user = {
      authorizationToken: data.user.authorization_token,
      memberPageLabelList: data.user.member_page_label_list
    }

    this.$cookies.set("AuthorizationToken", data.user.authorization_token, {
      path: "/",
      maxAge: 60 * 60 * 24 * 14,
      domain: process.env.COOKIE_DOMAIN
    })
  },
  SET_MEMBER_ERROR: function(state, data) {
    state.isError = true
    state.errorMessage = data.error_message
    state.errorRedirectPath = data.redirect_path
    state.successMessage = ""
  },
  SET_MEMBER_SETTING_DATA: function(state, data) {
    state.isError = false
    state.errorMessage = ""
    state.errorRedirectPath = null

    state.setting = {
      postNotification: Boolean(data.post_notification === "1")
    }
  },

  SET_MEMBER_PROFILE_DATA: function(state, data) {
    state.isError = false
    state.errorMessage = ""
    state.errorRedirectPath = null

    state.profile = {
      name: data.name,
      description: data.description,
      iconImageUrl: data.icon_image_url,
      iconImagePath: data.icon_image_path
    }
  },
  SET_MEMBER_SUCCESS_MESSAGE: function(state, message) {
    state.successMessage = message
  }
}

import Api from "~/plugins/api"

export const actions = {
  async signUp({ commit, dispatch }, { email, password, pageLabel }) {
    // メアドでのメンバー登録。userデータ作成に合わせてmemberデータも作成する
    const params = {
      email: email,
      password: password,
      page_label: pageLabel
    }
    const res = await Api.memberSignUp(params)

    if (!res.is_error) {
      commit("SET_MEMBER_DATA", res.data)

      // user.jsへmember_page_label_listを更新する
      commit(
        "user/SET_USER_MEMBER_PAGE_LABEL_LIST_DATA",
        res.data.user.member_page_label_list,
        { root: true }
      )

      const message =
        res.hasOwnProperty("success_message") && res.success_message.length > 0
          ? res.success_message
          : "メンバー登録完了しました。"
      dispatch("flashMessage/showSuccess", message, { root: true })
    } else {
      // エラー処理
      commit("SET_MEMBER_ERROR", res)
      dispatch("flashMessage/showError", res.error_message, { root: true })
    }
  },
  async signUpCallbackFromTwitter(
    { commit, dispatch },
    { oauthToken, oauthVerifier, tmpOauthToken, tmpOauthTokenSecret, pageLabel }
  ) {
    const params = {
      oauth_token: oauthToken,
      oauth_verifier: oauthVerifier,
      tmp_oauth_token: tmpOauthToken,
      tmp_oauth_token_secret: tmpOauthTokenSecret,
      page_label: pageLabel
    }
    const res = await Api.memberSignUpCallbackFromTwitter(params)

    if (!res.is_error) {
      commit("SET_MEMBER_DATA", res.data)

      const message =
        res.hasOwnProperty("success_message") && res.success_message.length > 0
          ? res.success_message
          : "メンバー登録完了しました。"
      // dispatch('flashMessage/showSuccess', message, {root: true})
      commit("SET_MEMBER_SUCCESS_MESSAGE", message)
    } else {
      // エラー処理
      commit("SET_MEMBER_ERROR", res)
      // dispatch('flashMessage/showError', res.error_message, {root: true})
    }
  },
  async signUpForAuthenticated({ commit, dispatch, rootState }, { pageLabel }) {
    // user authenticatedの状態で、メンバー登録処理
    const params = {
      page_label: pageLabel
    }
    const res = await Api.memberSignUpForAuthenticated(
      params,
      rootState.user.authorizationToken
    )

    if (!res.is_error) {
      commit("SET_MEMBER_DATA", res.data)

      const message =
        res.hasOwnProperty("success_message") && res.success_message.length > 0
          ? res.success_message
          : "メンバー登録完了しました。"
      dispatch("flashMessage/showSuccess", message, { root: true })
    } else {
      // エラー処理
      commit("SET_MEMBER_ERROR", res)
      dispatch("flashMessage/showError", res.error_message, { root: true })
    }
  },
  async login({ commit, dispatch }, { email, password, pageLabel }) {
    const params = {
      email: email,
      password: password,
      page_label: pageLabel
    }
    const res = await Api.memberLogin(params)

    if (!res.is_error) {
      commit("SET_MEMBER_DATA", res.data)
      dispatch("flashMessage/showSuccess", "ログインしました。", { root: true })
    } else {
      // エラー処理
      commit("SET_MEMBER_ERROR", res)
      dispatch("flashMessage/showError", res.error_message, { root: true })
    }
  },
  async loginCallbackFromTwitter(
    { commit, dispatch },
    { oauthToken, oauthVerifier, tmpOauthToken, tmpOauthTokenSecret, pageLabel }
  ) {
    const params = {
      oauth_token: oauthToken,
      oauth_verifier: oauthVerifier,
      tmp_oauth_token: tmpOauthToken,
      tmp_oauth_token_secret: tmpOauthTokenSecret,
      page_label: pageLabel
    }
    const res = await Api.memberLoginCallbackFromTwitter(params)

    if (!res.is_error) {
      commit("SET_MEMBER_DATA", res.data)
      // dispatch('flashMessage/showSuccess', 'ログインしました。', {root: true})
      commit("SET_MEMBER_SUCCESS_MESSAGE", "ログインしました。")
    } else {
      // エラー処理
      commit("SET_MEMBER_ERROR", res)
      // dispatch('flashMessage/showError', res.error_message, {root: true})
    }
  },
  async unsubscribe({ commit, rootState, dispatch }, { pageLabel }) {
    const params = {
      page_label: pageLabel
    }
    const res = await Api.memberUnsubscribe(
      params,
      rootState.user.authorizationToken
    )

    if (!res.is_error) {
      dispatch(
        "flashMessage/showSuccess",
        "メンバー登録の解除が完了しました。",
        { root: true }
      )
    } else {
      commit("SET_MEMBER_ERROR", res)
      dispatch("flashMessage/showError", res.error_message, { root: true })
    }
  },
  async getSetting({ commit, rootState, dispatch }, { pageLabel }) {
    const params = {
      page_label: pageLabel
    }
    const res = await Api.getMemberSetting(
      params,
      rootState.user.authorizationToken
    )

    if (!res.is_error) {
      commit("SET_MEMBER_SETTING_DATA", res.data)
    } else {
      commit("SET_MEMBER_ERROR", res)
      dispatch("flashMessage/showError", res.error_message, { root: true })
    }
  },
  async editSetting(
    { rootState, commit, dispatch },
    { pageLabel, postNotification }
  ) {
    const params = {
      page_label: pageLabel,
      post_notification: postNotification ? 1 : 0
    }
    const result = await Api.editMemberSetting(
      params,
      rootState.user.authorizationToken
    )

    if (!result.is_error) {
      dispatch("flashMessage/showSuccess", "更新完了しました。", { root: true })
    } else {
      // エラー処理
      dispatch("flashMessage/showError", result.error_message, { root: true })
    }
  },

  async getProfileMyself({ commit, rootState, dispatch }, { pageLabel }) {
    const params = {
      page_label: pageLabel
    }
    const res = await Api.getMemberProfileMyself(
      params,
      rootState.user.authorizationToken
    )

    if (!res.is_error) {
      commit("SET_MEMBER_PROFILE_DATA", res.data)
    } else {
      commit("SET_MEMBER_ERROR", res)
      dispatch("flashMessage/showError", res.error_message, { root: true })
    }
  },
  async editProfile(
    { rootState, commit, dispatch },
    { pageLabel, name, description, iconImagePath }
  ) {
    const params = {
      page_label: pageLabel,
      name: name,
      description: description,
      icon_image_path: iconImagePath
    }
    const result = await Api.editMemberProfile(
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
