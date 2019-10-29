<template>
	<div class="p-setting-profile">
		<h1 class="c-title">メンバー設定</h1>
		<section class="c-section">
			<div>
				<div class="p-form">
					<form @submit.prevent="update">

						<div class="p-form__group">
							<label class="p-form__value">新規投稿を通知する</label>
							<ToggleButton class="p-form__item__toggle" v-model="postNotification" :width="70" :height="30" :font-size="12"
							              :labels="{checked: 'ON', unchecked: 'OFF'}"/>
						</div>

						<div class="p-form__button">
							<button :class="{'c-btn': true, 'c-btn--main': true, 'is-loading': isLoading}" type="submit" :disabled="isLoading">変更</button>
						</div>

						<div class="p-form__button">
							<button @click="handleUnsubscribe" :class="{'c-btn': true, 'c-btn--accent': true, 'is-loading': isUnsubscribeLoading}" type="button" :disabled="isUnsubscribeLoading">メンバー登録を解除する</button>
						</div>
					</form>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
	import Meta from '~/assets/mixins/meta'
	import Api from "~/plugins/api";

	export default {
		mixins: [Meta],
		data() {
			return {
				isLoading: false,
				isUnsubscribeLoading: false,

				postNotification: false,
			}
		},
		async asyncData(context) {
			// page情報取得
			const pageLabel = context.store.state.subDomain.subDomain;
			if (!pageLabel || pageLabel == undefined) {
				// 404処理
				context.error({
					statusCode: 404,
				})
			}

			// ユーザー認証済みだけどメンバーではない場合
			if (context.store.state.user.memberPageLabelList.indexOf(pageLabel) === -1) {
				context.redirect('/member/sign_up')
			}

			// page情報取得&自分のmember_profile情報を取得
			await context.store.dispatch("page/getAboutInfo", {
				pageLabel: pageLabel
			})
			await context.store.dispatch("member/getSetting", {
				pageLabel: pageLabel
			});
			if (context.store.state.page.isError || context.store.state.member.isError) {
				context.error({
					statusCode: 500,
				})
			}

			return {
				pageLabel:        pageLabel,
				postNotification: context.store.state.member.setting.postNotification,

				meta: {
					title: 'メンバー設定',
					description: 'メンバー設定ページです。',
				}
			}
		},
		methods: {
			async update() {
				this.isLoading = true

				await this.$store.dispatch("member/editSetting", {
					pageLabel:        this.pageLabel,
					postNotification: this.postNotification,
				});

				this.isLoading = false

				window.scrollTo(0,0);
			},

			async handleUnsubscribe() {
				const res = confirm('メンバー登録を解除しますか？')
				if (res) {
					this.isUnsubscribeLoading = true

					await this.$store.dispatch("member/unsubscribe", {
						pageLabel: this.pageLabel,
					});

					this.isUnsubscribeLoading = false

					// ユーザーページのホームにリダイレクト
					this.$router.push('/');
				}
			},
		}
	}
</script>

<style lang="scss">
</style>