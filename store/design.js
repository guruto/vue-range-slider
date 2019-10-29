export const state = () => ({
	isError: false,
	
	logo_media_path: '',
	logo_media_url: '',
	header_media_list: [],
});

export const mutations = {
	SET_DESIGN_DATA: function (state, data) {
		state.isError           = false;
		state.logo_media_path   = data.logo_media_path;
		state.logo_media_url   = data.logo_media_url;
		state.header_media_list = data.header_media_list;
	},
	
	SET_DESIGN_ERROR: function (state) {
		state.isError = true;
	},
};

import Api from "~/plugins/api";

export const actions = {
	
	async getMyself({rootState, commit}, {}) {
		const result = await Api.getPageDesign(rootState.user.authorizationToken)
		
		if (!result.is_error) {
			result.data.header_media_list = result.data.header_media_list.map(v =>  Object({thumbnailImageUrl: v.url, thumbnailImagePath: v.path}))
			commit('SET_DESIGN_DATA', result.data)
			
		} else {
			// エラー処理
			commit('SET_DESIGN_ERROR')
		}
	},
	
	async edit({rootState, commit, dispatch}, {logo_media_path, header_media_path_list}) {
		// API連携
		const params = {
			type: 'header',
			logo_media_path: logo_media_path,
			header_media_path_list: header_media_path_list,
		}
		const result = await Api.editPageDesign(params, rootState.user.authorizationToken)
		
		if (!result.is_error) {
			dispatch('flashMessage/showSuccess', '更新完了しました。', {root: true})
			
		} else {
			// エラー処理
			dispatch('flashMessage/showError', result.error_message, {root: true})
		}
	},

};