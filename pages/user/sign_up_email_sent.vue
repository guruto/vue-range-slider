<template>
	<div>
		<h1 class="c-title">メールアドレスの認証</h1>
		<section class="c-section">
			<div class="p-sign-up-mail-sent">
				<div class="p-sign-up-mail-sent__message">
					<p>メールアドレスに認証メールを送りました。
						<br>メール内の認証リンクをクリックしてください。</p>
				</div>

				<h2 class="c-title--sub u-mt-24">認証メールが届かない場合</h2>
				<div class="p-sign-up-mail-sent__message">
					<p>認証メールが届かない場合はこちらのフォームから再度入力をお願いします。</p>
				</div>
				<div class="p-form u-mt-16">
					<form @submit.prevent="sendAuthenticationMail">
						<div class="p-form__group">
							<div class="p-form__item">
								<input type="email" :class="{'is-error': errors.has('email')}" v-validate="'required|email'" name="email" v-model="email" placeholder="メールアドレスを入力"/>
							</div>
							<span class="p-form__item-error" v-show="errors.has('email')">{{ errors.first('email') }}</span>
						</div>

						<div class="p-form__button">
							<button :class="{'c-btn': true, 'c-btn--main': true, 'is-loading': isLoading}" type="submit" :disabled="isLoading">再送信</button>
						</div>
					</form>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
	import Meta from '~/assets/mixins/meta'
	export default {
		mixins: [Meta],
		data() {
			return {
				isLoading: false,
				email: "",

				meta: {
					title: 'メールアドレスの認証',
					description: 'PAGEFUL（ペイジフル）のメールアドレスの認証ページ',
				}
			}
		},
		async asyncData(context) {
			// auth状態の場合のみアクセスできる
		},
		methods: {
			async sendAuthenticationMail() {
				const validated = await this.$validator.validateAll()
				if (!validated) {
					return
				}

				this.isLoading = true

				await this.$store.dispatch("mail/sendVerificationEmail", {
					email: this.email,
				});

				this.isLoading = false
			}
		}
	}
</script>

<style lang="scss">
	.p-sign-up-mail-sent {
		&__message {
			p {
				margin: 0;
				font-size: 15px;
				font-weight: normal;
			}
		}
	}
</style>