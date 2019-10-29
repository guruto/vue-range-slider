<template>
	<div>
		<h1 class="c-title">各種設定</h1>
		<section class="c-section">
			<div>
				<h2 class="c-title--sub">メール通知設定</h2>
				<div class="p-form">
					<form @submit.prevent="update">
						<div class="p-form__group">
							<label class="p-form__value">運営からのお知らせ</label>
							<ToggleButton class="p-form__item__toggle" v-model="emailNotice" :width="70" :height="30" :font-size="12"
							              :labels="{checked: 'ON', unchecked: 'OFF'}"/>
						</div>

						<div class="p-form__group">
							<label class="p-form__value">質問の通知</label>
							<ToggleButton class="p-form__item__toggle" v-model="emailRequestCreate" :width="70" :height="30" :font-size="12"
							              :labels="{checked: 'ON', unchecked: 'OFF'}"/>
						</div>

						<div class="p-form__group">
							<label class="p-form__value">投稿へのコメントの通知</label>
							<ToggleButton class="p-form__item__toggle" v-model="emailPostCommentCreate" :width="70" :height="30" :font-size="12"
							              :labels="{checked: 'ON', unchecked: 'OFF'}"/>
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

				meta: {
					title: '各種設定',
					description: 'PAGEFUL（ペイジフル）の各種設定ページ',
				}
			}
		},
		async asyncData(context) {
			await context.store.dispatch("setting/get");

			return {
				emailNotice: context.store.state.setting.emailNotice,
				emailRequestCreate: context.store.state.setting.emailRequestCreate,
				emailPostCommentCreate: context.store.state.setting.emailPostCommentCreate,
			}
		},
		methods: {
			async update() {
				this.isLoading = true

				await this.$store.dispatch("setting/edit", {
					emailNotice: this.emailNotice,
					emailRequestCreate: this.emailRequestCreate,
					emailPostCommentCreate: this.emailPostCommentCreate,
				});

				this.isLoading = false

				window.scrollTo(0,0);
			}
		}
	}
</script>

<style>

</style>