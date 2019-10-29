export default function ({store, req, route, redirect }) {
	console.log('middleware auth')
	
	let routeName = route.name;
	if (!routeName) {
		return
	}
	routeName = routeName.replace('___ja', '')
	
	// ログイン処理が必要かの判断
	if (!store.state.user.authenticated) {
		// authorizationTokenがない場合、ログインが必要なpathはログインページへリダイレクトする
		const notRequireAuthPathList = [
			'index', 'page-label', 'page', 'about', 'request', 'post-item-label', 'user-login', 'user-sign_up', 'user-callback', 'user-forgot_password', 'user-verify_email-code', 'user-reset_password-code',
			'member-sign_up', 'member-login', 'member-profile', 'member-setting', 'member-info-term', 'member-info-transaction_law',
			'info-about', 'info-company', 'info-inquiry', 'info-privacy', 'info-term',
		]
		if (notRequireAuthPathList.indexOf(routeName) === -1) {
			// どのパス（route.path）に遷移しようとしていたか、vuexで保存する。ログイン後リダイレクトする
			store.dispatch("user/setAfterLoginRedirectPath", {
				afterLoginRedirectPath: route.path
			});
			
			return redirect('/user/login')
		}
		
	} else {
		// authorizationTokenがある場合、トップ/新規登録/ログインページにアクセスする際はホームへリダイレクトする
		if (routeName == 'user-sign_up' || routeName == 'user-login') {
			return redirect(process.env.BASE_URL + '/dashboard')
		}
	}
}