<template>
	<div>
		<h1 class="c-title">パスワードの再設定</h1>
		<section class="c-section">
			<div class="">

				<div class="p-form">
					<form @submit.prevent="resetPassword">
						<div class="p-form__group">
							<label class="p-form__label">再設定するパスワード</label>
							<div class="p-form__item">
								<input type="password" :class="{'is-error': errors.has('password')}" v-validate="'required|min:6|max:30'" v-model="password" placeholder="パスワードを入力"/>
							</div>
							<span class="p-form__item-error" v-show="errors.has('password')">{{ errors.first('password') }}</span>
						</div>

						<div class="p-form__button">
							<button :class="{'c-btn': true, 'c-btn--main': true, 'is-loading': isLoading}" type="submit" :disabled="isLoading">再設定</button>
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
				password: '',

				meta: {
					title: 'パスワードの再設定',
					description: 'PAGEFUL（ペイジフル）のパスワードの再設定ページ',
				}
			}
		},
		async asyncData(context) {

		},
		methods: {
			async resetPassword() {
				const validated = await this.$validator.validateAll()
				if (!validated) {
					return
				}

				this.isLoading = true

				await this.$store.dispatch("user/resetPassword", {
					reset_password_code: this.$route.params.code,
					password:            this.password,
				});

				this.isLoading = false

				if (!this.$store.state.user.isError) {
					this.$router.push("/user/login");
				}
			}
		}
	}
</script>

<style lang="scss">
</style>