export const state = () => ({
	emailNotice:            false,
	emailRequestCreate:     false,
	emailPostCommentCreate: false,
});

export const mutations = {
	SET_SETTING_DATA: function (state, data) {
		state.emailNotice            = (data.email_notice === '1')
		state.emailRequestCreate     = (data.email_request_create === '1')
		state.emailPostCommentCreate = (data.email_post_comment_create === '1')
	},
};

import Api from "~/plugins/api";

export const actions = {
	async get({ rootState, commit, dispatch }) {
		// API連携
		const result = await Api.getSetting(rootState.user.authorizationToken)
		
		if (!result.is_error) {
			commit('SET_SETTING_DATA', result.data)
			
		} else {
			// エラー処理
			dispatch('flashMessage/showError', result.error_message, {root: true})
		}
	},
	
	async edit({rootState, commit, dispatch}, {emailNotice, emailRequestCreate, emailPostCommentCreate}) {
		// API連携
		const params = {
			email_notice: emailNotice ? 1 : 0,
			email_request_create: emailRequestCreate ? 1 : 0,
			email_post_comment_create: emailPostCommentCreate ? 1 : 0,
		}
		const result = await Api.editSetting(params, rootState.user.authorizationToken)
		
		if (!result.is_error) {
			dispatch('flashMessage/showSuccess', '更新完了しました。', {root: true})
			
		} else {
			// エラー処理
			dispatch('flashMessage/showError', result.error_message, {root: true})
		}
	},
};