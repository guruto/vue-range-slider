import moment from "moment";

export const state = () => ({
	isError:           false,
	errorMessage:      '',
	errorRedirectPath: null,
	
	email: null,
	verified_at: null,
});

export const mutations = {
	SET_MAIL_DATA: function (state, data) {
		state.isError            = false
		state.errorMessage       = ''
		state.errorRedirectPath  = null
		
		state.email      = data.email
		state.verifiedAt = moment().format('YYYY-MM-DD HH:mm:ss')
	},
	
	SET_VERIFIED: function(state) {
		state.isError           = false;
		state.errorMessage      = '';
		state.errorRedirectPath = null;
		
		state.emailVerifiedAt   = moment().format('YYYY-MM-DD HH:mm:ss');
	},
	
	SET_MAIL_SUCCESS: function(state) {
		state.isError           = false
		state.errorMessage      = ''
		state.errorRedirectPath = null
	},
	
	SET_MAIL_ERROR: function(state, data) {
		state.isError           = true
		state.errorMessage      = data.error_message
		state.errorRedirectPath = data.redirect_path
	},
};

import Api from "~/plugins/api";

export const actions = {
	async sendVerificationEmail({commit, rootState, dispatch}, {email}) {
		const params = {
			email: email,
		}
		const result = await Api.sendVerificationEmail(params, rootState.user.authorizationToken)
		
		if (!result.is_error) {
			commit('SET_MAIL_SUCCESS');
			dispatch('flashMessage/showSuccess', '認証メールを送信しました。', {root: true})
			
		} else {
			// エラー処理
			commit('SET_USER_ERROR', result);
			dispatch('flashMessage/showError', result.error_message, {root: true})
		}
	},
	
	async verify({commit}, {verify_code}) {
		const params = {
			verify_code: verify_code,
		}
		const result = await Api.verifyEmail(params)
		
		if (!result.is_error) {
			commit('SET_VERIFIED');
			// commit('SET_MAIL_DATA', result.data)
			commit('user/SET_USER_DATA', result.data, {root: true})
			commit('page/SET_PAGE_DATA', result.data.page, {root: true});
			commit('profile/SET_PROFILE_DATA', result.data.profile, {root: true});
			
		} else {
			commit('SET_MAIL_ERROR', result);
		}
	},
	
	async resendVerificationEmail({commit, rootState, dispatch}) {
		// API連携
		const result = await Api.resendVerificationEmail(rootState.user.authorizationToken)
		
		if (!result.is_error) {
			commit('SET_MAIL_SUCCESS');
			dispatch('flashMessage/showSuccess', '認証メールを再送信しました。', {root: true})
			
		} else {
			commit('SET_MAIL_ERROR', result);
			dispatch('flashMessage/showError', result.error_message, {root: true})
		}
	},
	
	async sendResetPasswordEmail({commit, dispatch}, {email}) {
		const params = {
			email: email
		}
		const result = await Api.sendResetPasswordEmail(params)
		
		if (!result.is_error) {
			commit('SET_MAIL_SUCCESS')
			dispatch('flashMessage/showSuccess', 'パスワード再設定メールを送信しました。', {root: true})
			
		} else {
			commit('SET_MAIL_ERROR', result)
			dispatch('flashMessage/showError', result.error_message, {root: true})
		}
	},
	
	async getMyself({ commit, rootState, dispatch }) {
		const result = await Api.getMailMyself(rootState.user.authorizationToken)
		
		if (!result.is_error) {
			commit("SET_MAIL_DATA", result.data);
			
		} else {
			// エラー処理
			commit('SET_MAIL_ERROR', result);
			dispatch('flashMessage/showError', result.error_message, {root: true})
		}
	},
	
	async edit({ commit, rootState, dispatch }, {email}) {
		const params = {
			email: email
		}
		const result = await Api.editMail(params, rootState.user.authorizationToken)
		
		if (!result.is_error) {
			dispatch('flashMessage/showSuccess', '更新完了しました。', {root: true})
			
		} else {
			commit('SET_MAIL_ERROR', result);
			dispatch('flashMessage/showError', result.error_message, {root: true})
		}
	},
};