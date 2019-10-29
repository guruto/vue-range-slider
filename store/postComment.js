export const state = () => ({
	isError:      false,
	errorMessage: '',
	
	body: '',
	profile: {},
	page: {},
});

export const mutations = {
	SET_POST_COMMENT_DATA: function (state, data) {
		state.isError      = false
		state.errorMessage = ''
		
		state.body    = data.body
		state.page    = data.page
		state.profile = data.profile
	},
	
	SET_POST_COMMENT_SUCCESS: function (state) {
		state.isError      = false
		state.errorMessage = ''
	},
	
	SET_POST_COMMENT_ERROR: function (state, errorMessage) {
		state.isError      = true
		state.errorMessage = errorMessage
	},
};

import Api from "~/plugins/api";

export const actions = {
	/////////////////////////
	// 共通処理
	/////////////////////////
	async add({ rootState, commit, dispatch }, {postLabel, body}) {
		const param = {
			post_label: postLabel,
			body:       body,
		}
		const result = await Api.addPostComment(param, rootState.user.authorizationToken)
		
		if (!result.is_error) {
			commit('SET_POST_COMMENT_SUCCESS')
			
			commit('postCommentList/ADD_POST_COMMENT_LIST_DATA', result.data, {root: true})
			
			dispatch('flashMessage/showSuccess', 'コメント投稿しました。', {root: true})
			
		} else {
			// エラー処理
			commit('SET_POST_COMMENT_ERROR', result.error_message)
			dispatch('flashMessage/showError', result.error_message, {root: true})
		}
	},
	
	async delete({ rootState, commit, dispatch }, {postCommentLabel, postCommentIndex}) {
		const param = {
			label: postCommentLabel,
		}
		const result = await Api.deletePostComment(param, rootState.user.authorizationToken)
		
		if (!result.is_error) {
			commit('SET_POST_COMMENT_SUCCESS')
			
			commit('postCommentList/DELETE_POST_COMMENT', postCommentIndex, {root: true})
			
			dispatch('flashMessage/showSuccess', 'コメント削除しました。', {root: true})
			
		} else {
			// エラー処理
			commit('SET_POST_COMMENT_ERROR', result.error_message)
			dispatch('flashMessage/showError', result.error_message, {root: true})
		}
	},
};