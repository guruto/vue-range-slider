<template>
	<div>
		<h1 class="c-title u-ta-c">ダッシュボードへログイン</h1>
		<section class="c-section">
			<div class="p-login">

				<div v-if="this.fromVerifyEmail" class="p-login__message">
					<p>メールアドレスの認証に成功しました。ログインをお願いします。</p>
				</div>

				<div class="p-login__service">
					<div class="p-login__service__item">
						<button @click="handleLoginTwitter" type="button" :class="{'c-btn': true, 'is-twitter': true, 'is-loading': isLoadingLoginTwitter}"><img src="/img/icon_service_twitter@2x.png" alt="Twitterでログイン">Twitterでログイン</button>
					</div>
					<div class="p-login__service__separator">もしくは</div>
				</div>

				<div class="p-login__form">
					<h2 class="c-title--sub">メールアドレスでログイン</h2>
					<div class="p-form">
						<form @submit.prevent="login">
							<div class="p-form__group">
<!--								<label class="p-form__label">メールアドレス</label>-->
								<div class="p-form__item">
									<input type="email":class="{'is-error': errors.has('email')}" v-validate="'required|email'" name="email" v-model="email" placeholder="メールアドレスを入力"/>
								</div>
								<span class="p-form__item-error" v-show="errors.has('email')">{{ errors.first('email') }}</span>
							</div>

							<div class="p-form__group">
<!--								<label class="p-form__label">パスワード</label>-->
								<div class="p-form__item">
									<input type="password" :class="{'is-error': errors.has('password')}" v-validate="'required|min:6|max:30'" name="password" v-model="password" placeholder="パスワードを入力"/>
								</div>
								<span class="p-form__item-error" v-show="errors.has('password')">{{ errors.first('password') }}</span>
							</div>

							<div class="p-form__password-forgot">
								<nuxt-link to="/user/forgot_password">パスワードを忘れた方はこちら</nuxt-link>
							</div>

							<div class="p-form__button">
								<button :class="{'c-btn': true, 'c-btn--main': true, 'is-loading': isLoading}" type="submit" :disabled="isLoading">ログイン</button>
							</div>
							<div class="p-form__button">
								<nuxt-link class="c-btn c-btn--default" to="/user/sign_up">未登録の場合は新規登録へ</nuxt-link>
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
	import Meta from '~/assets/mixins/meta'
	import Api from "~/plugins/api";
	import {getUrl} from "../../plugins/get-url";

	export default {
		mixins: [Meta],
		data() {
			return {
				isLoading: false,
				isLoadingLoginTwitter: false,

				email: "",
				password: "",
				fromVerifyEmail: false,

				meta: {
					title: 'ダッシュボードへログイン',
					description: 'PAGEFUL（ペイジフル）のダッシュボードへのログインページ',
				}
			}
		},
		async asyncData(context) {
			if (context.store.state.subDomain.hasSubDomain) {
				context.redirect(getUrl('/user/login'))
			}

			if (context.route.query.from == 'verify_email') {
				return {
					fromVerifyEmail: true,
				}
			}
		},
		methods: {
			async handleLoginTwitter() {
				this.isLoadingLoginTwitter = true

				const result = await Api.getRedirectDataWithSocial({type: 'TWITTER', method: 'login'})
				const oauth_redirect_data = result.data

				// Cookieに保存
				this.$cookies.remove('tmpOauthToken')
				this.$cookies.remove('tmpOauthTokenSecret')
				this.$cookies.set('tmpOauthToken', oauth_redirect_data.tmp_oauth_token, {path: '/', maxAge: 60 * 30})
				this.$cookies.set('tmpOauthTokenSecret', oauth_redirect_data.tmp_oauth_token_secret, {path: '/', maxAge: 60 * 30})

				window.location.href = oauth_redirect_data.redirect_url
				this.isLoadingLoginTwitter = false
			},

			async login() {
				const validated = await this.$validator.validateAll()
				if (!validated) {
					return
				}

				this.isLoading = true

				await this.$store.dispatch("user/login", {
					email: this.email,
					password: this.password,
				})

				this.isLoading = false

				if (!this.$store.state.user.isError) {
					this.$router.push(this.$store.state.user.afterLoginRedirectPath);
				}
			}
		}
	}
</script>

<style lang="scss">
</style>