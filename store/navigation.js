export const state = () => ({
  toggleSidebarForDashboard: false, // ダッシュボード
  toggleSidebarForTopPage: false, // トップページ
  toggleSidebarForUserPage: false // ユーザーページ
})

export const mutations = {
  TOGGLE_SIDEBAR_FOR_DASHBOARD(state) {
    state.toggleSidebarForDashboard = !state.toggleSidebarForDashboard
    state.toggleSidebarForTopPage = false
    state.toggleSidebarForUserPage = false
  },
  TOGGLE_SIDEBAR_FOR_TOP_PAGE(state) {
    state.toggleSidebarForDashboard = false
    state.toggleSidebarForTopPage = !state.toggleSidebarForTopPage
    state.toggleSidebarForUserPage = false
  },
  TOGGLE_SIDEBAR_FOR_USER_PAGE(state) {
    state.toggleSidebarForDashboard = false
    state.toggleSidebarForTopPage = false
    state.toggleSidebarForUserPage = !state.toggleSidebarForUserPage
  },
  CLOSE_TOGGLE_SIDEBAR(state) {
    state.toggleSidebarForDashboard = false
    state.toggleSidebarForTopPage = false
    state.toggleSidebarForUserPage = false
  }
}

export const actions = {
  toggleSidebar({ commit }, { isTopPage = false, isUserPage = false }) {
    if (isTopPage && !isUserPage) {
      commit("TOGGLE_SIDEBAR_FOR_TOP_PAGE")
    } else if (!isTopPage && isUserPage) {
      commit("TOGGLE_SIDEBAR_FOR_USER_PAGE")
    } else {
      commit("TOGGLE_SIDEBAR_FOR_DASHBOARD")
    }
  },
  closeToggleSidebar({ commit }) {
    commit("CLOSE_TOGGLE_SIDEBAR")
  }
}

export const getters = {
  toggleSidebarForDashboard: state => state.toggleSidebarForDashboard,
  toggleSidebarForTopPage: state => state.toggleSidebarForTopPage,
  toggleSidebarForUserPage: state => state.toggleSidebarForUserPage
}
