<template>
	<div>
		<h1 class="c-title">メールアドレスの変更</h1>

		<section class="c-section">
			<div>
				<div class="p-form">
					<form @submit.prevent="update">
						<div class="p-form__group">
							<label class="p-form__label">現在のメールアドレス</label>
							<p class="p-form__value">{{this.$store.state.mail.email}}</p>
						</div>

						<div class="p-form__group">
							<label class="p-form__label">新しいメールアドレス</label>
							<div class="p-form__item">
								<input type="email" :class="{'is-error': errors.has('email')}" v-validate="'required|email'" v-model="email" name="email" placeholder="メールアドレスを入力"/>
							</div>
							<span class="p-form__item-error" v-show="errors.has('email')">{{ errors.first('email') }}</span>
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
				email: '',

				meta: {
					title: 'メールアドレスの変更',
					description: 'PAGEFUL（ペイジフル）のメールアドレスの変更ページ',
				}
			}
		},
		async asyncData(context) {
			await context.store.dispatch("mail/getMyself");

		},
		methods: {
			async update() {
				const validated = await this.$validator.validateAll()
				if (!validated) {
					return
				}

				this.isLoading = true

				await this.$store.dispatch("mail/edit", {
					email: this.email,
				});

				this.isLoading = false

				window.scrollTo(0,0);
			}
		}
	}
</script>

<style>

</style>