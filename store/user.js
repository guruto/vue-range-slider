export const state = () => ({
	isError:           false,
	errorMessage:      '',
	errorRedirectPath: null,
	
	authenticated:          false,
	afterLoginRedirectPath: '/dashboard',
	
	authorizationToken: null,
	memberPageLabelList: [],
	
	status: {
		isEmailVerified:      false,
		postCount:            0,
		requestCount:         0,
		isPageDesignModified: false,
	},
	
	// userPage: 自分のページ情報。pageは閲覧時のデータにする
	page: {
		label:         null,
		name:          null,
		description:   null,
	},
});

export const mutations = {
	SET_AUTH_DATA: function (state, authorizationToken) {
		state.isError            = false;
		state.errorMessage       = '';
		state.errorRedirectPath  = null;
		
		state.authenticated      = Boolean(authorizationToken);
		state.authorizationToken = authorizationToken;
		
		this.$cookies.set('AuthorizationToken', authorizationToken, {path: '/', maxAge: 60 * 60 * 24 * 14, domain: process.env.COOKIE_DOMAIN})
	},
	
	SET_USER_DATA: function (state, data) {
		state.isError            = false;
		state.errorMessage       = '';
		state.errorRedirectPath  = null;
		
		state.authenticated       = Boolean(data.authorization_token)
		state.authorizationToken  = data.authorization_token
		state.memberPageLabelList = data.member_page_label_list
		
		state.status.isEmailVerified      = (data.status.is_email_verified === '1')
		state.status.postCount            = data.status.post_count
		state.status.requestCount         = data.status.request_count
		state.status.isPageDesignModified = (data.status.is_page_design_modified === '1')
		
		if (data.page !== undefined) {
			state.page = {
				label:         data.page.label,
				name:          data.page.name,
				description:   data.page.description,
			}
		}
		
		this.$cookies.set('AuthorizationToken', data.authorization_token, {path: '/', maxAge: 60 * 60 * 24 * 14, domain: process.env.COOKIE_DOMAIN})
	},
	
	SET_USER_MEMBER_PAGE_LABEL_LIST_DATA: function (state, memberPageLabelList) {
		state.memberPageLabelList = memberPageLabelList
	},
	
	SET_AFTER_LOGIN_REDIRECT_PATH: function(state, afterLoginRedirectPath) {
		state.afterLoginRedirectPath = afterLoginRedirectPath
	},
	
	LOGOUT: function (state) {
		state.isError                = false;
		state.errorMessage           = '';
		state.authenticated          = false;
		state.afterLoginRedirectPath = '/dashboard';
		state.authenticated          = false;
		state.authorizationToken     = null;
		state.userId                 = null;
		
		this.$cookies.remove('AuthorizationToken', {domain: process.env.COOKIE_DOMAIN})
		this.$cookies.removeAll();
	},
	
	SET_USER_SUCCESS: function (state) {
		state.isError           = false;
		state.errorMessage      = '';
		state.errorRedirectPath = null;
	},
	
	SET_USER_ERROR: function(state, data) {
		state.isError           = true;
		state.errorMessage      = data.error_message;
		state.errorRedirectPath = data.redirect_path;
	},
};

import Api from "~/plugins/api";

export const actions = {
	async setAuthData({commit}, {authorizationToken}) {
		commit('SET_AUTH_DATA', authorizationToken)
	},
	
	async setAfterLoginRedirectPath({commit}, {afterLoginRedirectPath}) {
		commit('SET_AFTER_LOGIN_REDIRECT_PATH', afterLoginRedirectPath)
	},
	
	async signUp({ commit, dispatch }, { email, password }) {
		const params = {
			email: email,
			password: password,
		}
		const result = await Api.signUp(params)
		
		if (!result.is_error) {
			commit("SET_USER_DATA", result.data)
			commit('page/SET_PAGE_DATA', result.data.page, {root: true});
			commit('profile/SET_PROFILE_DATA', result.data.profile, {root: true});
			dispatch('flashMessage/showSuccess', '登録完了しました。', {root: true})
			
		} else {
			// エラー処理
			commit('SET_USER_ERROR', result);
			dispatch('flashMessage/showError', result.error_message, {root: true})
		}
	},
	
	async signUpCallbackFromTwitter({ commit, dispatch }, { oauthToken, oauthVerifier, tmpOauthToken, tmpOauthTokenSecret }) {
		const params = {
			oauth_token: oauthToken,
			oauth_verifier: oauthVerifier,
			tmp_oauth_token: tmpOauthToken,
			tmp_oauth_token_secret: tmpOauthTokenSecret,
		}
		const result = await Api.signUpCallbackFromTwitter(params)
		
		if (!result.is_error) {
			commit("SET_USER_DATA", result.data)
			commit('page/SET_PAGE_DATA', result.data.page, {root: true});
			commit('profile/SET_PROFILE_DATA', result.data.profile, {root: true});
			
			const message = result.hasOwnProperty('success_message') && result.success_message.length > 0 ? result.success_message : '登録完了しました。'
			dispatch('flashMessage/showSuccess', message, {root: true})
			
		} else {
			// エラー処理
			commit('SET_USER_ERROR', result);
			dispatch('flashMessage/showError', result.error_message, {root: true})
		}
	},
	
	async login({ commit, dispatch }, { email, password }) {
		const params = {
			email: email,
			password: password,
		}
		const result = await Api.login(params)
		
		if (!result.is_error) {
			commit("SET_USER_DATA", result.data)
			commit('page/SET_PAGE_DATA', result.data.page, {root: true});
			commit('profile/SET_PROFILE_DATA', result.data.profile, {root: true});
			dispatch('flashMessage/showSuccess', 'ログインしました。', {root: true})
			
		} else {
			// エラー処理
			commit('SET_USER_ERROR', result);
			dispatch('flashMessage/showError', result.error_message, {root: true})
		}
	},
	
	async loginCallbackFromTwitter({ commit, dispatch }, { oauthToken, oauthVerifier, tmpOauthToken, tmpOauthTokenSecret }) {
		const params = {
			oauth_token: oauthToken,
			oauth_verifier: oauthVerifier,
			tmp_oauth_token: tmpOauthToken,
			tmp_oauth_token_secret: tmpOauthTokenSecret,
		}
		const result = await Api.loginCallbackFromTwitter(params)
		
		if (!result.is_error) {
			commit("SET_USER_DATA", result.data)
			commit('page/SET_PAGE_DATA', result.data.page, {root: true});
			commit('profile/SET_PROFILE_DATA', result.data.profile, {root: true});
			dispatch('flashMessage/showSuccess', 'ログインしました。', {root: true})
			
		} else {
			// エラー処理
			commit('SET_USER_ERROR', result);
			dispatch('flashMessage/showError', result.error_message, {root: true})
		}
	},
	
	async resetPassword({commit, dispatch}, {password, reset_password_code}) {
		const params = {
			password:            password,
			reset_password_code: reset_password_code
		}
		const result = await Api.resetPassword(params)
		
		if (!result.is_error) {
			commit('SET_USER_SUCCESS');
			dispatch('flashMessage/showSuccess', 'パスワードを再設定しました。', {root: true})
			
		} else {
			commit('SET_USER_ERROR', result);
			dispatch('flashMessage/showError', result.error_message, {root: true})
		}
	},
	
	async logout({ commit, dispatch }) {
		commit("LOGOUT");
		dispatch('flashMessage/showSuccess', 'ログアウトしました。', {root: true})
	},
	
	async getMyself({ commit, state, dispatch }) {
		// 最初のアクセスで実行する
		// user、page、profileデータを一気に取得する
		const result = await Api.getUserMyself(state.authorizationToken)
		
		if (!result.is_error) {
			commit("SET_USER_DATA", result.data)
			commit('page/SET_PAGE_DATA', result.data.page, {root: true});
			commit('profile/SET_PROFILE_DATA', result.data.profile, {root: true});
			
		} else {
			commit('SET_USER_ERROR', result);
			dispatch('flashMessage/showError', result.error_message, {root: true})
		}
	},
	
	async getInfoForDashboard({ commit, state, dispatch }) {
		// ダッシュボードページで必要な情報を取得
		// user、page、profile、postListデータを一気に取得する
		let [result, postListResult, notificationListResult] = await Promise.all([
			Api.getUserMyself(state.authorizationToken),
			Api.getPostListMyself({page:1, limit: 3}, state.authorizationToken),
			Api.getNotificationListMyself({}, state.authorizationToken),
		])
		
		if (!result.is_error && !postListResult.is_error && !notificationListResult.is_error) {
			commit("SET_USER_DATA", result.data)
			commit('page/SET_PAGE_DATA', result.data.page, {root: true});
			commit('profile/SET_PROFILE_DATA', result.data.profile, {root: true});
			commit('postList/SET_POST_LIST_DATA', postListResult.data, {root: true});
			commit('notificationList/SET_DATA', notificationListResult.data, {root: true});
			
		} else {
			commit('SET_USER_ERROR', result);
			dispatch('flashMessage/showError', result.error_message, {root: true})
		}
	},
	
	async editPassword({ commit, state, dispatch }, {passwordNow, passwordNew, passwordNewConfirm}) {
		const params = {
			password_now: passwordNow,
			password_new: passwordNew,
			password_new_confirm: passwordNewConfirm,
		}
		const result = await Api.editPassword(params, state.authorizationToken)
		
		if (!result.is_error) {
			dispatch('flashMessage/showSuccess', '更新完了しました。', {root: true})
			
		} else {
			commit('SET_USER_ERROR', result);
			dispatch('flashMessage/showError', result.error_message, {root: true})
		}
	},
};