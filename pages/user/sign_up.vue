<template>
	<div>
		<h1 class="c-title u-ta-c">新規登録</h1>
		<section class="c-section">
			<div class="p-login">
				<div class="p-login__service">
					<div class="p-login__service__item">
						<button @click="handleSignUpTwitter" type="button" :class="{'c-btn': true, 'is-twitter': true, 'is-loading': isLoadingSignUpTwitter}"><img src="/img/icon_service_twitter@2x.png" alt="Twitterではじめる">Twitterではじめる</button>
					</div>
					<div class="p-login__service__separator">もしくは</div>
				</div>

				<div class="p-login__form">
					<h2 class="c-title--sub">メールアドレスではじめる</h2>
					<div class="p-form">
						<form @submit.prevent="signUp">
							<div class="p-form__group">
<!--								<label class="p-form__label">メールアドレス</label>-->
								<div class="p-form__item">
									<input type="email" :class="{'is-error': errors.has('email')}" v-validate="'required|email'" name="email" v-model="email" placeholder="メールアドレスを入力"/>
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

							<div class="p-form__button">
								<button :class="{'c-btn': true, 'c-btn--main': true, 'is-loading': isLoading}" type="submit" :disabled="isLoading">新規登録</button>
								<p class="p-form__button__agreement"><a href="/info/term">利用規約</a>・<a href="/info/privacy">プライバシーポリシー</a></p>

							</div>
							<div class="p-form__button">
								<nuxt-link class="c-btn c-btn--default" to="/user/login">登録済みの場合はログインへ</nuxt-link>
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
				isLoadingSignUpTwitter: false,

				email: "",
				password: "",

				meta: {
					title: '新規登録',
					description: 'PAGEFUL（ペイジフル）の新規登録ページ',
				}
			}
		},
		async asyncData(context) {
			if (context.store.state.subDomain.hasSubDomain) {
				context.redirect(getUrl('/user/sign_up'))
			}
		},
		methods: {
			async handleSignUpTwitter() {
				this.isLoadingSignUpTwitter = true

				const result = await Api.getRedirectDataWithSocial({type: 'TWITTER', method: 'sign_up'})
				const oauth_redirect_data = result.data

				// Cookieに保存
				this.$cookies.remove('tmpOauthToken')
				this.$cookies.remove('tmpOauthTokenSecret')
				this.$cookies.set('tmpOauthToken', oauth_redirect_data.tmp_oauth_token, {path: '/', maxAge: 60 * 30})
				this.$cookies.set('tmpOauthTokenSecret', oauth_redirect_data.tmp_oauth_token_secret, {path: '/', maxAge: 60 * 30})

				window.location.href = oauth_redirect_data.redirect_url
				this.isLoadingSignUpTwitter = false
			},

			async signUp() {
				const validated = await this.$validator.validateAll()
				if (!validated) {
					return
				}

				this.isLoading = true

				await this.$store.dispatch("user/signUp", {
					email: this.email,
					password: this.password
				})

				this.isLoading = false

				if (!this.$store.state.user.isError) {
					this.$router.push("/dashboard");
				}
			}
		}
	}
</script>

<style lang="scss">
</style>