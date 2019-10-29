<template>
	<div class="p-setting__page">
		<h1 class="c-title">メンバー登録サイト一覧</h1>
		<section class="c-section">
			<div class="p-page-list">

				<div v-if="this.$store.state.pageList.items.length > 0">
					<div class="p-page-list__item" v-for="item in this.$store.state.pageList.items">
						<div class="p-page-list__item__content">
							<a :href="$getUrl('', item.label)" target="_blank">
								<p class="p-page-list__item__content__page">{{item.name}}</p>
								<div class="p-page-list__item__content__profile">
									<div class="p-page-list__item__content__profile__icon">
										<span class="p-page-list__item__content__profile__icon__image" :style="'background-image: url(' + item.profile.icon_image_url + ')'"></span>
									</div>
									<div class="p-page-list__item__content__profile__name">
										<span>{{item.profile.name}}</span>
									</div>
								</div>
							</a>
						</div>
					</div>

					<div style="text-align: center; margin-top: 30px;">
						<nuxt-link to="/dashboard" class="c-btn c-btn--main">ダッシュボードに戻る</nuxt-link>
					</div>
				</div>
				<div v-else>
					<p style="">メンバー登録したサイトはありません。</p>
					<div style="text-align: center; margin-top: 30px;">
						<nuxt-link to="/dashboard" class="c-btn c-btn--main">ダッシュボードに戻る</nuxt-link>
					</div>
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
				meta: {
					title: 'メンバー登録サイト一覧',
					description: 'メンバー登録サイトの一覧ページ',
				}
			}
		},
		async asyncData(context) {
			await context.store.dispatch("pageList/getListMemberBelongedMyself", {});

			return {

			}
		},
		methods: {
		}
	}
</script>

<style lang="scss">
	.p-page-list {
		&__item {
			margin-bottom: 16px;
			&__content {
				a {
					display: block;
				}
				&__page {
					font-size: 16px;
					color: $color_text;
					margin-bottom: 6px;
				}
				&__profile {
					display: flex;
					&__icon {
						width: 32px;
						height: 32px;
						border-radius: 50%;
						overflow: hidden;
						background-color: $color_light;
						display: inline-block;
						margin-right: 8px;
						&__image {
							display: inline-block;
							background-size: cover;
							background-position: 50%;
							background-repeat: no-repeat;
							width: 100%;
							height: 100%;
						}
					}
					&__name {
						display: inline-block;
						font-size: 14px;
						font-weight: normal;
						color: $color_text;
						margin-top: 6px;
					}
				}
			}
		}
	}
</style>