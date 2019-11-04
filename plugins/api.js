import axios from "axios";
import * as qs from "qs";

const api = axios.create({
	baseURL: process.env.API_BASE_URL,
	credentials: true,
	responseType: 'json'
});

api.interceptors.request.use((request) => {
	console.log('api request: ' + request.url)
	// console.log(request.headers)
	return request;
});

api.interceptors.response.use((response) => {
	console.log('api response')
	console.log(response.data)
	if (response.data.is_error === '0') {
		return Promise.resolve({
			is_error:        false,
			data:            response.data.data,
			success_message: (response.data.hasOwnProperty('success_message') && response.data.success_message.length > 0) ? response.data.success_message : '',
		});
		
	} else {
		// エラーメッセージを返す
		return Promise.resolve({
			is_error:      true,
			error_title:   response.data.error_title,
			error_message: response.data.error_message,
			error_code:    response.data.code,
			redirect_path: response.data.redirect_path,
		});
	}
	
}, (error) => {
	return Promise.resolve({
		is_error:          true,
		error_title:       '通信エラー',
		error_description: '通信にエラーが発生しました。',
		error:             error
	});
});

function apiGet(path, params = {}, authorizationToken = '') {
	let url = path;
	if (Object.keys(params).length > 0) {
		url += `?${qs.stringify(params)}`;
	}
	
	const config = {
		headers: {
			'Content-Type':        'application/json',
			'Authorization-Token': authorizationToken ? authorizationToken : '',
			'accept':              'application/json',
		},
		data: {}
	}
	
	return api.get(url, config)
}

function apiPost(path, params = {}, authorizationToken = '', isMultipart = false) {
	const config = {
		headers: {
			'Content-Type': isMultipart ? 'multipart/form-data' : 'application/x-www-form-urlencoded',
			'Authorization-Token': authorizationToken
		},
		// data: {}
	};
	
	// 画像ファイルなどでMultipartの場合は、paramsはformDataの形式で送るようにする
	const data = isMultipart ? params : qs.stringify(params)
	
	return api.post(path, data, config);
}

export default {
	
	getUserMyself(authorizationToken) {
		return apiGet('users/get_myself', {}, authorizationToken);
	},
	
	signUp(params) {
		return apiPost('users/sign_up', params);
	},
	login(params) {
		return apiPost('users/login', params);
	},
	signUpCallbackFromTwitter(params) {
		return apiPost('users/sign_up_callback_from_twitter', params);
	},
	loginCallbackFromTwitter(params) {
		return apiPost('users/login_callback_from_twitter', params);
	},
	
	resetPassword(params) {
		return apiPost('users/reset_password', params);
	},
	
	editPassword(params, authorizationToken) {
		return apiPost('users/edit_password', params, authorizationToken);
	},
	
	getMailMyself(authorizationToken) {
		return apiGet('mails/get_myself', {}, authorizationToken);
	},
	
	sendVerificationEmail(params, authorizationToken) {
		return apiPost('mails/send_verification', params, authorizationToken);
	},
	
	resendVerificationEmail(authorizationToken) {
		return apiPost('mails/resend_verification', {}, authorizationToken);
	},
	
	verifyEmail(params) {
		return apiPost('mails/verify', params);
	},
	
	sendResetPasswordEmail(params) {
		return apiPost('mails/send_reset_password', params);
	},
	
	editMail(params, authorizationToken) {
		return apiPost('mails/edit', params, authorizationToken);
	},
	
	getNotificationListMyself(params, authorizationToken) {
		return apiGet('notifications/get_list_myself', params, authorizationToken);
	},
	
	/////////////////////////////////
	// user_service
	/////////////////////////////////
	getRedirectDataWithSocial(params) {
		return apiGet('user_services/get_redirect_data_with_social', params);
	},
	linkCallbackFromTwitter(params, authorizationToken) {
		return apiPost('user_services/link_callback_from_twitter', params, authorizationToken);
	},
	getUserServiceInfo(authorizationToken) {
		return apiGet('user_services/get_info', {}, authorizationToken);
	},
	deleteUserService(params, authorizationToken) {
		return apiPost('user_services/delete', params, authorizationToken);
	},
	
	/////////////////////////////////
	// member
	/////////////////////////////////
	memberSignUp(params) {
		return apiPost('members/sign_up', params);
	},
	memberSignUpCallbackFromTwitter(params) {
		return apiPost('members/sign_up_callback_from_twitter', params);
	},
	memberSignUpForAuthenticated(params, authorizationToken) {
		return apiPost('members/sign_up_for_authorized', params, authorizationToken);
	},
	memberLogin(params) {
		return apiPost('members/login', params);
	},
	memberLoginCallbackFromTwitter(params) {
		return apiPost('members/login_callback_from_twitter', params);
	},
	getMemberMyself(params, authorizationToken) {
		return apiGet('members/get_myself', params, authorizationToken);
	},
	getMemberListBelongToMyPage(params, authorizationToken) {
		return apiGet('members/get_list_belong_to_my_page', params, authorizationToken);
	},
	memberUnsubscribe(params, authorizationToken) {
		return apiPost('members/unsubscribe', params, authorizationToken);
	},
	getMemberSetting(params, authorizationToken) {
		return apiGet('member_settings/get_myself', params, authorizationToken);
	},
	editMemberSetting(params, authorizationToken) {
		return apiPost('member_settings/edit', params, authorizationToken);
	},
	getMemberProfileMyself(params, authorizationToken) {
		return apiGet('member_profile/get_myself', params, authorizationToken);
	},
	editMemberProfile(params, authorizationToken) {
		return apiPost('member_profile/edit', params, authorizationToken);
	},
	uploadMemberProfileImage(params, authorizationToken) {
		return apiPost('member_profile/upload_image', params, authorizationToken, true);
	},
	
	// settingGet(params, authorizationToken) {
	// 	return apiGet('settings/get', params, authorizationToken);
	// },
	
	// settingUpdate(params, authorizationToken) {
	// 	return apiPost('settings/edit', params, authorizationToken);
	// },
	
	getInfoLinkUrl(params, authorizationToken) {
		return apiGet('post_links/get_info', params, authorizationToken);
	},
	
	uploadPostImage(params, authorizationToken) {
		return apiPost('post_upload_images/upload', params, authorizationToken, true);
	},
	
	uploadImageForText(params, authorizationToken) {
		return apiPost('post_texts/upload_image', params, authorizationToken, true);
	},
	
	uploadPostSound(params, authorizationToken) {
		return apiPost('post_sounds/upload', params, authorizationToken, true);
	},
	
	uploadPostVideo(params, authorizationToken) {
		return apiPost('post_videos/upload', params, authorizationToken, true);
	},
	
	uploadPostFile(params, authorizationToken) {
		return apiPost('post_files/upload', params, authorizationToken, true);
	},
	
	getInfoTextLinkUrl(params, authorizationToken) {
		return apiGet('post_texts/get_link_info', params, authorizationToken);
	},
	
	saveTextPost(params, authorizationToken) {
		return apiPost('posts/save_draft_text', params, authorizationToken);
	},
	
	uploadPostThumbnailImage(params, authorizationToken) {
		return apiPost('posts/upload_thumbnail_image', params, authorizationToken, true);
	},
	
	savePost(params, authorizationToken) {
		return apiPost('posts/save', params, authorizationToken);
	},
	
	modifyDraftPost(postLabel, params, authorizationToken) {
		return apiPost('posts/modify_draft/' + postLabel, params, authorizationToken);
	},
	
	deletePost(postLabel, params, authorizationToken) {
		return apiPost('posts/delete/' + postLabel, params, authorizationToken);
	},
	
	getPost(postLabel, authorizationToken) {
		return apiGet('posts/get/' + postLabel, {}, authorizationToken);
	},
	
	getPostMyself(postLabel, authorizationToken) {
		return apiGet('posts/get_myself/' + postLabel, {}, authorizationToken);
	},
	
	getPostList(pageLabel, params, authorizationToken) {
		return apiGet('posts/get_list_by_page_label/' + pageLabel, params, authorizationToken);
	},
	
	getPostListMyself(params, authorizationToken) {
		return apiGet('posts/get_list_myself', params, authorizationToken);
	},
	
	addPostComment(params, authorizationToken) {
		return apiPost('post_comments/add', params, authorizationToken);
	},
	
	deletePostComment(params, authorizationToken) {
		return apiPost('post_comments/delete', params, authorizationToken);
	},
	
	getPostCommentList(params, authorizationToken) {
		return apiGet('post_comments/get_list', params, authorizationToken);
	},
	
	addRequest(params) {
		return apiPost('requests/add', params);
	},
	
	getRequest(requestLabel, authorizationToken) {
		return apiGet('requests/get/' + requestLabel, {}, authorizationToken);
	},
	
	getRequestListMyself(params, authorizationToken) {
		return apiGet('requests/get_list_myself', params, authorizationToken);
	},
	
	getPage(pageLabel, params, authorizationToken) {
		return apiGet('pages/get/' + pageLabel, params, authorizationToken);
	},
	
	getPageMyself(authorizationToken) {
		return apiGet('pages/get_myself', {}, authorizationToken);
	},
	
	getPageListMemberBelongedMyself(params, authorizationToken) {
		return apiGet('pages/get_list_member_belonged_myself', params, authorizationToken);
	},
	
	editPage(params, authorizationToken) {
		return apiPost('pages/edit', params, authorizationToken);
	},
	
	addPageLink(params, authorizationToken) {
		return apiPost('page_links/add', params, authorizationToken);
	},
	
	editPageLink(params, authorizationToken) {
		return apiPost('page_links/edit', params, authorizationToken);
	},
	
	deletePageLink(params, authorizationToken) {
		return apiPost('page_links/delete', params, authorizationToken);
	},
	
	getProfile(pageLabel, params, authorizationToken) {
		return apiGet('profile/get/' + pageLabel, params, authorizationToken);
	},
	
	getProfileMyself(authorizationToken) {
		return apiGet('profile/get_myself', {}, authorizationToken);
	},
	
	editProfile(params, authorizationToken) {
		return apiPost('profile/edit', params, authorizationToken);
	},
	
	uploadProfileImage(params, authorizationToken) {
		return apiPost('profile/upload_image', params, authorizationToken, true);
	},
	
	getSetting(authorizationToken) {
		return apiGet('settings/get', {}, authorizationToken);
	},
	
	editSetting(params, authorizationToken) {
		return apiPost('settings/edit', params, authorizationToken);
	},
	
	uploadPageDesignImage(params, authorizationToken) {
		return apiPost('page_designs/upload_image', params, authorizationToken, true);
	},
	
	editPageDesign(params, authorizationToken) {
		return apiPost('page_designs/edit', params, authorizationToken);
	},
	
	getPageDesign(authorizationToken) {
		return apiGet('page_designs/get_myself', {}, authorizationToken);
	},
}
