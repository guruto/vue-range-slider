export const state = () => ({
	isError:      false,
	errorMessage: '',
	
	isMine:             false,
	label:              null,
	type:               '',
	scope:              'PUBLIC',
	typeText:           '',
	title:              '',
	comment:            '',
	thumbnailImageUrl:  '',
	thumbnailImagePath: '',
	thumbnailMediaList: [],
	isPublished:        false,
	publishedAt:        '',
	updatedAt:          '',
	relatedPosts:       [],
	
	// URL引用POST
	itemLink: {
		linkUrl:           '',
		title:             '',
		description:       '',
		siteName:          '',
		siteType:          '',
		thumbnailImageUrl: '',
		contentMediaUrl:   '',
		contentMediaType:  '',
		uniqueId:          '',
	},
	
	// 画像POST
	// uploadしたPostImage
	uploadedPostImages: {},
	// postに紐づくPostImage
	itemImages: [],
	
	// テキストPOST（BLOG形式）
	itemText: {},
	
	// 動画POST
	itemVideo: {
		videoUrl:          '',
		fileUrl:           '',
		title:             '',
		description:       '',
		siteName:          '',
		siteType:          '',
		thumbnailImageUrl: '',
		contentMediaUrl:   '',
		contentMediaType:  '',
		uniqueId:          '',
		contentType:       '',
		path:              '',
		fileSize:          '',
	},
	// 音声POST
	itemSound: {
		contentType: '',
		path:        '',
		fileSize:    '',
		url:         ''
	},
	// ファイルPOST
	itemFile: {
		contentType:  '',
		path:         '',
		fileSize:     '',
		fileSizeText: '',
		url:          '',
		fileName:     '',
	},
	// 回答POST
	itemAnswer: {
		request: {}
	},
	
});

import Vue from 'vue'
import moment from 'moment'

export const mutations = {
	SET_POST_DATA: function (state, data) {
		state.isError      = false;
		state.errorMessage = '';
		
		state.isMine             = (data.is_mine === '1')
		state.label              = data.label
		state.scope              = data.scope
		state.type               = data.type
		state.typeText           = data.type_text
		state.title              = data.title
		state.comment            = data.comment
		state.thumbnailImageUrl  = data.thumbnail_image_url
		state.thumbnailImagePath = data.thumbnail_image_path
		state.isPublished        = (data.is_published === '1')
		state.publishedAt        = data.published_at ? moment.unix(data.published_at).format('YYYY/MM/DD HH:mm') : ''
		state.updatedAt          = moment.unix(data.updated_at).format('YYYY/MM/DD HH:mm')
	},
	
	SET_RELATED_POST_DATA: function(state, data) {
		state.isError      = false;
		state.errorMessage = '';
		
		state.relatedPosts = data;
	},
	
	SET_POST_LABEL_DATA: function(state, label) {
		state.isError      = false;
		state.errorMessage = '';
		state.label        = label;
	},
	
	SET_POST_TEXT_DATA: function(state, data) {
		state.isError      = false;
		state.errorMessage = '';
		state.itemText     = {
			body:      (data.body) ? JSON.parse(data.body) : [],
			draftBody: (data.draft_body) ? JSON.parse(data.draft_body) : [],
		};
	},

	SET_POST_LINK_DATA: function (state, data) {
		state.isError      = false;
		state.errorMessage = '';
		state.itemLink = {
			linkUrl:           data.link_url,
			title:             data.title,
			description:       data.description,
			siteName:          data.site_name,
			siteType:          data.site_type,
			thumbnailImageUrl: data.thumbnail_image_url,
			contentMediaUrl:   data.content_media_url,
			contentMediaType:  data.content_media_type,
			uniqueId:          data.unique_id,
		};
	},

	SET_POST_SOUND_DATA: function(state, data) {
		state.isError      = false
		state.errorMessage = ''
		state.thumbnailMediaList = data.thumbnail_media_list
		
		state.itemSound     = {
			url:         data.post_item.url,
			path:        data.post_item.path,
			contentType: data.post_item.content_type,
			fileSize:    data.post_item.file_size,
		};
	},
	
	SET_POST_IMAGE_DATA: function (state, data) {
		state.isError      = false;
		state.errorMessage = '';
		state.itemImages   = data;
		
		for (const i in data) {
			const image = data[i]
			state.uploadedPostImages[image.label] = image
		}
	},
	
	SET_POST_VIDEO_DATA: function (state, data) {
		state.isError      = false;
		state.errorMessage = '';
		console.log("SET_POST_VIDEO_DATA")
		console.log(data)

		state.itemVideo = {
			title:         data.title,
			comment:       data.comment,
			urlSite:       data.url_site,
			videoUrl:      data.url,
			videoUniqueId: data.url_id,
			fileUrl:       data.file_url,
			path:          data.path,
		};
	},
	
	SET_POST_FILE_DATA: function(state, data) {
		state.isError            = false;
		state.errorMessage       = '';
		state.thumbnailMediaList = data.thumbnail_media_list;
		
		state.itemFile = {
			url:          data.post_item.url,
			path:         data.post_item.path,
			contentType:  data.post_item.content_type,
			fileSize:     data.post_item.file_size,
			fileSizeText: data.post_item.file_size_text,
			fileName:     data.post_item.file_name,
		};
	},
	
	SET_POST_ANSWER_DATA: function (state, data) {
		state.isError      = false;
		state.errorMessage = '';
		state.itemAnswer = {
			request: {
				label:     data.request.label,
				body:      data.request.body,
				createdAt: moment.unix(data.request.created_at).format('YYYY/MM/DD HH:mm'),
			}
		};
	},
	
	SET_POST_DRAFT_DATA: function (state) {
		state.isError      = false;
		state.errorMessage = '';
		state.isPublished  = false
	},
	
	SET_UPLOAD_POST_IMAGE_DATA: function (state, data) {
		// state.uploadedPostImages[data.label] = data
		Vue.set(state.uploadedPostImages, data.label, data)
	},
	DELETE_UPLOAD_POST_IMAGE: function (state, label) {
		Vue.delete(state.uploadedPostImages, label);
	},
	
	RESET_UPLOAD_POST_IMAGE: function(state) {
		state.uploadedPostImages = {}
	},
	
	SET_UPLOAD_POST_SOUND_DATA: function (state, data) {
		state.itemSound = {
			contentType: data.content_type,
			path:        data.path,
			fileSize:    data.file_size,
			url:         data.url
		};
	},
	
	SET_UPLOAD_POST_VIDEO_DATA: function (state, data) {
		state.itemVideo = {
			contentType: data.content_type,
			path:        data.path,
			fileSize:    data.file_size,
			fileUrl:     data.url,
		};
	},
	
	CLEAR_UPLOAD_POST_VIDEO_DATA: function (state) {
		state.itemVideo = {
			contentType: '',
			path:        '',
			fileSize:    '',
			videoUrl:    ''
		};
	},
	
	SET_UPLOAD_POST_FILE_DATA: function (state, data) {
		state.itemFile = {
			contentType:  data.content_type,
			path:         data.path,
			fileSize:     data.file_size,
			fileSizeText: data.file_size_text,
			url:          data.url,
			fileName:     data.file_name,
		};
	},
	
	SET_POST_SUCCESS: function (state) {
		state.isError      = false
		state.errorMessage = ''
	},
	
	SET_POST_ERROR: function (state, errorMessage) {
		state.isError      = true;
		state.errorMessage = errorMessage;
	},
};

import Api from "~/plugins/api";

export const actions = {
	/////////////////////////
	// 共通処理
	/////////////////////////
	async save({ rootState, commit, dispatch }, param) {
		const result = await Api.savePost(param, rootState.user.authorizationToken)
		
		if (!result.is_error) {
			commit('SET_POST_SUCCESS');
			
			let message = '投稿完了しました。'
			if (param.isEdit) {
				message = '更新完了しました。'
			} else {
				if (!param.is_publish) {
					message = '下書き保存完了しました。'
				}
			}
			dispatch('flashMessage/showSuccess', message, {root: true})
			
		} else {
			// エラー処理
			commit('SET_POST_ERROR', result.error_message);
			dispatch('flashMessage/showError', result.error_message, {root: true})
		}
	},
	
	async modifyDraft({ rootState, commit, dispatch }, {label}) {
		const result = await Api.modifyDraftPost(label, {}, rootState.user.authorizationToken)
		
		if (!result.is_error) {
			commit('SET_POST_SUCCESS')
			commit('SET_POST_DRAFT_DATA')
			dispatch('flashMessage/showSuccess', '下書きに戻しました。', {root: true})
			
		} else {
			// エラー処理
			commit('SET_POST_ERROR', result.error_message);
			dispatch('flashMessage/showError', result.error_message, {root: true})
		}
	},
	
	async delete({ rootState, commit, dispatch }, param) {
		const result = await Api.deletePost(param.label, {}, rootState.user.authorizationToken)
		
		if (!result.is_error) {
			dispatch('flashMessage/showSuccess', '削除しました。', {root: true})
			
		} else {
			// エラー処理
			commit('SET_POST_ERROR', result.error_message);
			dispatch('flashMessage/showError', result.error_message, {root: true})
		}
	},
	
	async get({rootState, commit}, {label, pageLabel}) {
		let [postResult, profileResult, pageResult, postCommentListResult] = await Promise.all([
			Api.getPost(label, rootState.user.authorizationToken),
			Api.getProfile(pageLabel, {}, rootState.user.authorizationToken),
			Api.getPage(pageLabel, {}, rootState.user.authorizationToken),
			Api.getPostCommentList({post_label: label}, rootState.user.authorizationToken),
		])
		
		// postCommentListResultのエラー判定はここで行わない
		if (!postResult.is_error && !profileResult.is_error && !pageResult.is_error) {
			commit('SET_POST_DATA', postResult.data);
			commit('SET_RELATED_POST_DATA', postResult.data.related_posts);
			if (postResult.data.type == 'LINK') {
				commit('SET_POST_LINK_DATA', postResult.data.post_item);
				
			} else if (postResult.data.type == 'IMAGE') {
				commit('SET_POST_IMAGE_DATA', postResult.data.post_item);
				
			} else if (postResult.data.type == 'TEXT') {
				commit('SET_POST_TEXT_DATA', postResult.data.post_item);
				
			} else if (postResult.data.type == 'VIDEO') {
				commit('SET_POST_VIDEO_DATA', postResult.data.post_item);
				
			} else if (postResult.data.type == 'SOUND') {
				commit('SET_POST_SOUND_DATA', postResult.data);
				
			} else if (postResult.data.type == 'FILE') {
				commit('SET_POST_FILE_DATA', postResult.data);
				
			}  else if (postResult.data.type == 'ANSWER') {
				commit('SET_POST_ANSWER_DATA', postResult.data.post_item);
			}
			
			// profileResult
			commit('profile/SET_PROFILE_DATA', profileResult.data, {root: true});
			// pageResult
			commit('page/SET_PAGE_DATA', pageResult.data, {root: true})
			
			// postCommentListResult
			if (!postCommentListResult.is_error) {
				commit('postCommentList/SET_POST_COMMENT_LIST_DATA', postCommentListResult.data, {root: true})
			}
			
		} else {
			// エラー処理
			commit('SET_POST_ERROR');
		}
	},
	
	async getMyself({rootState, commit}, {label}) {
		const result = await Api.getPostMyself(label, rootState.user.authorizationToken)
		
		if (!result.is_error) {
			commit('SET_POST_DATA', result.data);
			
			if (result.data.type == 'LINK') {
				commit('SET_POST_LINK_DATA', result.data.post_item);
				
			} else if (result.data.type == 'IMAGE') {
				commit('SET_POST_IMAGE_DATA', result.data.post_item);
				
			} else if (result.data.type == 'TEXT') {
				commit('SET_POST_TEXT_DATA', result.data.post_item);
				
			} else if (result.data.type == 'VIDEO') {
				commit('SET_POST_VIDEO_DATA', result.data.post_item);
				
			} else if (result.data.type == 'SOUND') {
				commit('SET_POST_SOUND_DATA', result.data);
				
			} else if (result.data.type == 'FILE') {
				commit('SET_POST_FILE_DATA', result.data);
				
			} else if (result.data.type == 'ANSWER') {
				commit('SET_POST_ANSWER_DATA', result.data.post_item);
				
			} else {
				// エラー処理
				commit('SET_POST_ERROR', result.error_message);
			}
		}
	},
	
	/////////////////////////
	// TEXTタイプ
	/////////////////////////
	async saveDraftText({ rootState, commit, dispatch }, param) {
		const params = {
			type:                 'TEXT',
			label:                param.label,
			title:                param.title,
			thumbnail_image_path: param.thumbnailImagePath,
			draft_body:           (param.draftBody) ? JSON.stringify(param.draftBody) : '',
		}
		const result = await Api.saveTextPost(params, rootState.user.authorizationToken)
		
		if (!result.is_error) {
			commit('SET_POST_LABEL_DATA', result.data.post_label)
			
		} else {
			// エラー処理
			commit('SET_POST_ERROR', result.error_message);
		}
	},
	
	
	/////////////////////////
	// IMAGEタイプ
	/////////////////////////
	async uploadImage({ rootState, commit, dispatch }, {fileData}) {
		const data = new FormData();
		data.append('file_data', fileData);
		const result = await Api.uploadPostImage(data, rootState.user.authorizationToken)
		
		if (!result.is_error) {
			commit('SET_UPLOAD_POST_IMAGE_DATA', result.data);
			
		} else {
			// エラー処理
			// commit('SET_POST_ERROR', result.error_message);
			dispatch('flashMessage/showError', result.error_message, {root: true})
		}
	},
	deleteUploadedPostImageByLabel({commit}, label) {
		commit('DELETE_UPLOAD_POST_IMAGE', label);
	},
	resetUploadedPostImages({commit}) {
		commit('RESET_UPLOAD_POST_IMAGE');
	},
	
	/////////////////////////
	// LINKタイプ
	/////////////////////////
	async getInfoLinkUrl({ rootState, commit, dispatch }, {linkUrl}) {
		const params = {
			link_url: linkUrl,
		}
		const result = await Api.getInfoLinkUrl(params, rootState.user.authorizationToken)
		
		if (!result.is_error) {
			// post_linkにデータセット
			commit('SET_POST_LINK_DATA', result.data)
			
		} else {
			// エラー処理
			commit('SET_POST_ERROR', result.error_message)
			dispatch('flashMessage/showError', result.error_message, {root: true})
		}
	},
	
	/////////////////////////
	// SOUNDタイプ
	/////////////////////////
	async uploadSound({ rootState, commit, dispatch }, {fileData}) {
		const data = new FormData();
		data.append('file_data', fileData);
		const result = await Api.uploadPostSound(data, rootState.user.authorizationToken)
		
		if (!result.is_error) {
			commit('SET_UPLOAD_POST_SOUND_DATA', result.data);
			
		} else {
			// エラー処理
			// commit('SET_POST_ERROR', result.error_message);
			dispatch('flashMessage/showError', result.error_message, {root: true})
		}
	},
	/////////////////////////
	// VIDEOタイプ
	/////////////////////////
	async uploadVideo({ rootState, commit, dispatch }, {fileData}) {
		const data = new FormData();
		data.append('file_data', fileData)
		const result = await Api.uploadPostVideo(data, rootState.user.authorizationToken)
		
		if (!result.is_error) {
			commit('SET_UPLOAD_POST_VIDEO_DATA', result.data)
		} else {
			// エラー処理
			dispatch('flashMessage/showError', result.error_message, {root: true})
		}
	},
	async clearVideo({ rootState, commit, dispatch }) {
		commit('CLEAR_UPLOAD_POST_VIDEO_DATA')
	},
	/////////////////////////
	// FILEタイプ
	/////////////////////////
	async uploadFile({ rootState, commit, dispatch }, {fileData}) {
		const data = new FormData();
		data.append('file_data', fileData);
		const result = await Api.uploadPostFile(data, rootState.user.authorizationToken)
		
		if (!result.is_error) {
			commit('SET_UPLOAD_POST_FILE_DATA', result.data);
			
		} else {
			// エラー処理
			// commit('SET_POST_ERROR', result.error_message);
			dispatch('flashMessage/showError', result.error_message, {root: true})
		}
	},
};
