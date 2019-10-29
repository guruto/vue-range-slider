<template>
	<div>
		<h1 class="c-title">パスワードを忘れた場合</h1>
		<section class="c-section">
			<div>
				<p class="u-mb-16">ご登録されているメールアドレスに、パスワードの再設定を行うためのメールを送信します。</p>
				<div class="p-form">
					<form @submit.prevent="sendResetPasswordEmail">
						<div class="p-form__group">
							<label class="p-form__label">登録メールアドレス</label>
							<div class="p-form__item">
								<input type="email" :class="{'is-error': errors.has('email')}" v-validate="'required|email'" name="email" v-model="email" placeholder="登録メールアドレスを入力"/>
							</div>
							<span class="p-form__item-error" v-show="errors.has('email')">{{ errors.first('email') }}</span>
						</div>

						<div class="p-form__button">
							<button :class="{'c-btn': true, 'c-btn--main': true, 'is-loading': isLoading}" type="submit" :disabled="isLoading">再設定メール送信</button>
						</div>

						<p>メールが届かない場合はメールアドレスが間違えているか、登録されていない可能性があります。</p>
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
				email: '',

				meta: {
					title: 'パスワードを忘れた場合',
					description: 'PAGEFUL（ペイジフル）のパスワードの再設定の案内ページ',
				}
			}
		},
		async asyncData(context) {
		},
		methods: {
			async sendResetPasswordEmail() {
				const validated = await this.$validator.validateAll()
				if (!validated) {
					return
				}

				this.isLoading = true

				await this.$store.dispatch("mail/sendResetPasswordEmail", {
					email: this.email,
				});

				if (!this.$store.state.user.isError) {
					this.email = '';
				}

				this.isLoading = false
			}
		}
	}
</script>

<style lang="scss">
</style>