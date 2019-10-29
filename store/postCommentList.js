export const state = () => ({
	isError:      false,
	errorMessage: '',
	
	items: [],
	itemCount: 0,
	
})

import Vue from 'vue'

export const mutations = {
	SET_POST_COMMENT_LIST_DATA: function (state, data) {
		state.isError      = false;
		state.errorMessage = '';
		
		state.items     = data.post_comments
		state.itemCount = Number(data.all_count)
	},
	
	ADD_POST_COMMENT_LIST_DATA: function (state, data) {
		// Vue.set(state.items, data.label, data)
		state.items.push(data)
		state.itemCount += 1;
	},
	
	DELETE_POST_COMMENT: function (state, index) {
		Vue.delete(state.items, index);
		state.itemCount -= 1;
	},
	
	SET_POST_COMMENT_LIST_SUCCESS: function (state) {
		state.isError      = false
		state.errorMessage = ''
	},
	
	SET_POST_COMMENT_LIST_ERROR: function (state, errorMessage) {
		state.isError      = true;
		state.errorMessage = errorMessage;
	},
};

import Api from "~/plugins/api";

export const actions = {
	async getList({rootState, commit}, {postLabel}) {
		const params = {
			post_label: postLabel
		}
		const res = await Api.getPostCommentList(params, rootState.user.authorizationToken)
		
		if (!res.is_error) {
			commit('SET_POST_COMMENT_LIST_DATA', res.data);
			
		} else {
			// エラー処理
			commit('SET_POST_COMMENT_LIST_ERROR', res.error_message);
		}
	},
};