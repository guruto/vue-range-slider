export const state = () => ({
  isError: false,

  label: null,
  name: null,
  description: null,

  // sns, links
  twitterId: null,
  facebookId: null,
  instagramId: null,
  lineId: null,
  twitterUrl: null,
  facebookUrl: null,
  instagramUrl: null,
  lineUrl: null,
  links: [],

  design: {
    logoMediaUrl: "",
    headerMediaList: []
  }
})

import Vue from "vue"

export const mutations = {
  SET_PAGE_DATA: function(state, data) {
    state.isError = false
    state.label = data.label
    state.name = data.name
    state.description = data.description

    state.twitterId = data.twitter_id
    state.facebookId = data.facebook_id
    state.instagramId = data.instagram_id
    state.lineId = data.line_id
    state.twitterUrl = data.twitter_url
    state.facebookUrl = data.facebook_url
    state.instagramUrl = data.instagram_url
    state.lineUrl = data.line_url

    state.design.logoMediaUrl = data.page_design.logo_media_url
    state.design.headerMediaList = data.page_design.header_media_list
  },

  SET_PAGE_LABEL: function(state, label) {
    state.label = label
  },

  SET_PAGE_LINK_DATA: function(state, data) {
    state.links = data
  },

  EDIT_PAGE_LINK: function(state, data) {
    Vue.set(state.links, data.order_index, data)
  },

  DELETE_PAGE_LINK: function(state, index) {
    Vue.delete(state.links, index)
  },

  SET_PAGE_ERROR: function(state) {
    state.isError = true
  }
}

import Api from "~/plugins/api"

export const actions = {
  async getWithPostList({ rootState, commit }, { label }) {
    // pageデータとpostデータ一覧の取得
    let [pageResult, postListResult, profileResult] = await Promise.all([
      Api.getPage(label, {}, rootState.user.authorizationToken),
      Api.getPostList(label, {}, rootState.user.authorizationToken),
      Api.getProfile(label, {}, rootState.user.authorizationToken)
    ])

    if (
      !pageResult.is_error &&
      !postListResult.is_error &&
      !profileResult.is_error
    ) {
      // pageResult
      commit("SET_PAGE_DATA", pageResult.data)
      commit("SET_PAGE_LINK_DATA", pageResult.data.links)

      // postListResult
      commit("postList/SET_POST_LIST_DATA", postListResult.data, { root: true })

      // profileResult
      commit("profile/SET_PROFILE_DATA", profileResult.data, { root: true })
    } else {
      // エラー処理
      commit("SET_PAGE_ERROR")
    }
  },
  
  async getMyself({ rootState, commit }) {
    const result = await Api.getPageMyself(rootState.user.authorizationToken)

    if (!result.is_error) {
      commit("SET_PAGE_DATA", result.data)
      commit("SET_PAGE_LINK_DATA", result.data.links)
    } else {
      // エラー処理
      commit("SET_PAGE_ERROR")
    }
  },

  async getAboutInfo({ rootState, commit }, { pageLabel }) {
    let [pageResult, profileResult] = await Promise.all([
      Api.getPage(pageLabel, {}, rootState.user.authorizationToken),
      Api.getProfile(pageLabel, {}, rootState.user.authorizationToken)
    ])

    if (!profileResult.is_error && !pageResult.is_error) {
      commit("SET_PAGE_DATA", pageResult.data)
      commit("SET_PAGE_LINK_DATA", pageResult.data.links)
      commit("profile/SET_PROFILE_DATA", profileResult.data, { root: true })
    } else {
      // エラー処理
      commit("SET_PROFILE_ERROR")
    }
  },

  async getRequestInfo({ rootState, commit }, { pageLabel }) {
    let [pageResult, profileResult, postListResult] = await Promise.all([
      Api.getPage(pageLabel, {}, rootState.user.authorizationToken),
      Api.getProfile(pageLabel, {}, rootState.user.authorizationToken),
      Api.getPostList(
        pageLabel,
        { type: "ANSWER" },
        rootState.user.authorizationToken
      )
    ])

    if (
      !profileResult.is_error &&
      !pageResult.is_error &&
      !postListResult.is_error
    ) {
      commit("SET_PAGE_DATA", pageResult.data)
      commit("SET_PAGE_LINK_DATA", pageResult.data.links)
      commit("profile/SET_PROFILE_DATA", profileResult.data, { root: true })
      commit("postList/SET_POST_LIST_DATA", postListResult.data, { root: true })
    } else {
      // エラー処理
      commit("SET_PROFILE_ERROR")
    }
  },

  async edit(
    { rootState, dispatch },
    { label, name, description, twitterId, instagramId, lineId, facebookId }
  ) {
    const params = {
      label: label,
      name: name,
      description: description,
      twitter_id: twitterId,
      instagram_id: instagramId,
      line_id: lineId,
      facebook_id: facebookId
    }
    const result = await Api.editPage(params, rootState.user.authorizationToken)

    if (!result.is_error) {
      // flash message
      dispatch("flashMessage/showSuccess", "更新完了しました。", { root: true })
    } else {
      // エラー処理
      dispatch("flashMessage/showError", result.error_message, { root: true })
    }
  },

  async addLink({ rootState, commit, dispatch }, { title, url, orderIndex }) {
    const params = {
      title: title,
      url: url,
      order_index: orderIndex
    }
    const result = await Api.addPageLink(
      params,
      rootState.user.authorizationToken
    )

    if (!result.is_error) {
      commit("SET_PAGE_LINK_DATA", result.data)
      dispatch("flashMessage/showSuccess", "追加しました。", { root: true })
    } else {
      // エラー処理
      dispatch("flashMessage/showError", result.error_message, { root: true })
    }
  },

  async editLink(
    { rootState, commit, dispatch },
    { label, title, url, index }
  ) {
    const params = {
      label: label,
      title: title,
      url: url
    }
    const result = await Api.editPageLink(
      params,
      rootState.user.authorizationToken
    )

    if (!result.is_error) {
      params.order_index = index
      commit("EDIT_PAGE_LINK", params)
      // flash message
      dispatch("flashMessage/showSuccess", "追加しました。", { root: true })
    } else {
      // エラー処理
      dispatch("flashMessage/showError", result.error_message, { root: true })
    }
  },

  async deleteLink({ rootState, commit, dispatch }, { label, index }) {
    const params = {
      label: label
    }
    const result = await Api.deletePageLink(
      params,
      rootState.user.authorizationToken
    )

    if (!result.is_error) {
      commit("DELETE_PAGE_LINK", index)
      dispatch("flashMessage/showSuccess", "追加しました。", { root: true })
    } else {
      // エラー処理
      dispatch("flashMessage/showError", result.error_message, { root: true })
    }
  },

  async setLabel({ commit }, { label }) {
    commit("SET_PAGE_LABEL", label)
  }
}
