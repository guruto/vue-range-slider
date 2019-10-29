<template>
	<div>
		<h1 class="c-title">パスワードの変更</h1>
		<section class="c-section">
			<div>
				<div class="p-form">
					<form @submit.prevent="update">
						<div class="p-form__group">
							<label class="p-form__label">現在のパスワード</label>
							<div class="p-form__item">
								<input type="password" :class="{'is-error': errors.has('passwordNow')}" v-validate="'min:6|max:30'" name="passwordNow" v-model="passwordNow" placeholder="6文字以上で入力"/>
							</div>
							<div class="p-form__info">
								<span class="p-form__info__label">SNSアカウントで登録して、パスワードを未設定の場合は空欄のままにしてください。</span>
							</div>
							<span class="p-form__item-error" v-show="errors.has('passwordNow')">{{ errors.first('passwordNow') }}</span>
						</div>

						<div class="p-form__group">
							<label class="p-form__label">新しいパスワード</label>
							<div class="p-form__item">
								<input type="password" :class="{'is-error': errors.has('passwordNew')}" v-validate="'required|min:6|max:30'" name="passwordNew" v-model="passwordNew" placeholder="6文字以上で入力" ref="passwordNew"/>
							</div>
							<span class="p-form__item-error" v-show="errors.has('passwordNew')">{{ errors.first('passwordNew') }}</span>
						</div>

						<div class="p-form__group">
							<label class="p-form__label">新しいパスワード（確認）</label>
							<div class="p-form__item">
								<input type="password" :class="{'is-error': errors.has('passwordNewConfirm')}" v-validate="'required|min:6|max:30|confirmed:passwordNew'" name="passwordNewConfirm"  v-model="passwordNewConfirm" placeholder="6文字以上で入力"/>
							</div>
							<span class="p-form__item-error" v-show="errors.has('passwordNewConfirm')">{{ errors.first('passwordNewConfirm') }}</span>
						</div>

						<div class="p-form__button">
							<button :class="{'c-btn': true, 'c-btn--main': true, 'is-loading': isLoading}" type="submit" :disabled="isLoading">変更</button>
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
				passwordNow: "",
				passwordNew: "",
				passwordNewConfirm: "",

				meta: {
					title: 'パスワードの変更',
					description: 'PAGEFUL（ペイジフル）のパスワードの変更ページ',
				}
			}
		},
		async asyncData({store, params}) {
		},
		methods: {
			async update() {
				const validated = await this.$validator.validateAll()
				if (!validated) {
					return
				}

				this.isLoading = true

				await this.$store.dispatch("user/editPassword", {
					passwordNow: this.passwordNow,
					passwordNew: this.passwordNew,
					passwordNewConfirm: this.passwordNewConfirm,
				});

				this.isLoading = false

				window.scrollTo(0,0);
			}
		}
	}
</script>

<style>

</style>