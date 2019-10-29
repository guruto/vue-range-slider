<template>
	<div>
		<h1 class="c-title">メールアドレスの認証</h1>

		<section class="c-section">
			<div>
				<div class="p-form">
					<form @submit.prevent="resendAuthenticationMail">

						<p>登録されたメールアドレスへ再度認証メールをお送りいたします。</p>
						<p>{{this.$store.state.user.email}}</p>
						<nuxt-link to="/dashboard/setting/mail">メールアドレスの変更</nuxt-link>

						<div class="p-form__button">
							<button :class="{'c-btn': true, 'c-btn--main': true, 'is-loading': isLoading}" type="submit" :disabled="isLoading">認証メールを再送信する</button>
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
		layout: 'dashboard',
		mixins: [Meta],
		data() {
			return {
				isLoading: false,
				email: '',

				meta: {
					title: '認証メールの送信',
					description: 'PAGEFUL（ペイジフル）の認証メール',
				}
			}
		},
		async asyncData(context) {
			await context.store.dispatch("user/getMyself", {});

		},
		methods: {
			async resendAuthenticationMail() {
				this.isLoading = true

				await this.$store.dispatch("mail/resendVerificationEmail");

				this.isLoading = false
			}
		}
	}
</script>

<style>
	p {
		margin-bottom: 8px;
	}
</style>