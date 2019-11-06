import cookieparser from "cookieparser"

export const state = () => ({
  // isCalled: fals
})

export const getters = {
  // isCalled: (state) => state.isCalled
}

export const mutations = {
  // setIsCalled(state) {
  // 	state.isCalled = true
  // }
}

import Api from "~/plugins/api"

export const actions = {
  async nuxtServerInit({ rootState, commit }, { req }) {
    console.log("nuxtServerInit")

    // authenticationTokenがCookieにある場合、user情報取得のAPIを実行し、user stateにデータセットする
    const cookie = req.headers.hasOwnProperty("cookie")
      ? req.headers.cookie
      : false

    if (cookie) {
      const parsedCookie = cookieparser.parse(req.headers.cookie)
      const authorizationToken = parsedCookie.AuthorizationToken
      console.log(authorizationToken)

      if (
        authorizationToken != "undefined" &&
        authorizationToken != undefined
      ) {
        const result = await Api.getUserMyself(authorizationToken)

        if (!result.is_error) {
          commit("user/SET_USER_DATA", result.data, { root: true })
          commit("page/SET_PAGE_DATA", result.data.page, { root: true })
          commit("profile/SET_PROFILE_DATA", result.data.profile, {
            root: true
          })
        } else {
          // エラー処理
        }
      }
    }
  },

  nuxtClientInit({ commit }, context) {
    // console.log('nuxtClientInit');
  }
}
