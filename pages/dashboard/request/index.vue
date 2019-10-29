<template>
	<div>
		<h1 class="c-title">質問管理</h1>

		<section class="c-section">
			<div class="p-request-list">

				<div class="p-request-list__head">
					<a class="p-request-list__head__item is-tweet c-btn" :href="shareTweetUrl" target="_blank"><img src="/img/icon_service_twitter@2x.png">質問募集ツイートをする</a>
					<button class="p-request-list__head__item is-copy c-btn" v-clipboard:copy="$getUrl('/request', this.$store.state.page.label)" v-clipboard:success="clipboardSuccess" v-clipboard:error="clipboardError">質問募集リンクをコピーする</button>
				</div>

				<div class="p-request-list__tab">
					<div :class="{'p-request-list__tab__item': true, 'is-selected' : selectType == 'ALL'}">
						<nuxt-link to="/dashboard/request?select_type=ALL">全て</nuxt-link>
					</div>
					<div :class="{'p-request-list__tab__item': true, 'is-selected' : selectType == 'NOT_ANSWERED'}">
						<nuxt-link to="/dashboard/request?select_type=NOT_ANSWERED">未回答</nuxt-link>
					</div>
					<div :class="{'p-request-list__tab__item': true, 'is-selected' : selectType == 'ANSWERED'}">
						<nuxt-link to="/dashboard/request?select_type=ANSWERED">回答済み</nuxt-link>
					</div>
				</div>

				<div v-if="requestList.length > 0">
					<div v-for="item in requestList" class="p-request-list__item">
						<nuxt-link :to="item.is_answered == '1' ? '/post/item/' + item.post.label : '/dashboard/post/add?type=ANSWER&request_label=' + item.label">
							<div class="p-request-list__item__body">
								<p v-html="item.body.replace(/\n/g,'<br/>')"></p>
							</div>
							<div :class="{'p-request-list__item__answered': true, 'is-answered': item.is_answered == '1'}">
								<span>{{item.is_answered == '1' ? '回答済み' : '未回答'}}</span>
							</div>
							<div class="p-request-list__item__foot u-cf">
								<span class="p-request-list__item__foot__time">{{item.created_at}}</span>
								<span v-if="item.is_answered == '0'" class="p-request-list__item__foot__action">回答する</span>
							</div>
						</nuxt-link>
					</div>
				</div>
				<div v-else>
					<p style="text-align: center;margin: 30px 0;">該当する質問はありません。</p>
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
			console.log('data')
			return {
				selectType: 'ALL',
				requestList: [],

				meta: {
					title: '質問管理',
					description: 'PAGEFUL（ペイジフル）の質問管理ページ',
				}
			}
		},
		async asyncData(context) {
			console.log('asyncData')
			const selectType = (context.route.query.select_type) ? context.route.query.select_type : 'ALL'

			await context.store.dispatch("requestList/getListMyself", {type: 'QUESTION', selectType: selectType});

			return {
				selectType: selectType,
				requestList: context.store.state.requestList.items,
			}
		},
		watch: {
			'$route' (to, from) {
				// ルートの変更の検知...
				this.selectType = (this.$route.query.select_type) ? this.$route.query.select_type : 'ALL'
				this.getRequestListSelectType(this.selectType)
			}
		},
		computed: {
			shareTweetUrl() {
				// const pageTitle   = this.$store.state.page.name
				// const profileName = this.$store.state.profile.name
				// const text        = '「' + pageTitle + '」の' + profileName + 'が質問を募集中'
				const text = '質問を募集中です！'

				return 'http://twitter.com/share?url='+ encodeURIComponent(this.$getUrl('/request', this.$store.state.page.label)) +'&text=' + encodeURIComponent(text)
			},
		},
		methods: {
			clipboardSuccess() {
				alert('URLをコピーしました')
			},
			clipboardError() {
				alert('URLのコピーに失敗しました')
			},
			async getRequestListSelectType(selectType) {
				// this.selectType = e.currentTarget.dataset.selectType

				await this.$store.dispatch("requestList/getListMyself", {type: 'QUESTION', selectType: selectType});
				this.requestList = this.$store.state.requestList.items
			}
		}
	}
</script>

<style lang="scss">
	.p-request-list {
		&__head {
			text-align: center;
			&__item {
				width: 100%;
				border-radius: 4px;
				margin-bottom: 12px;
				font-weight: bold;
				font-size: 14px;
				&.is-tweet {
					color: $color_white;
					background-color: #1DA1F2;
					border: 1px solid #1DA1F2;
					img {
						width: 18px;
						vertical-align: -2px;
						margin-right: 7px;
					}
				}
				&.is-copy {
					border: 1px solid $color_main;
					background-color: $color_white;
					color: $color_main;
				}
			}
		}
		&__tab {
			display: flex;
			justify-content: center;
			align-items: center;
			margin: 20px 0 40px;
			&__item {
				cursor: pointer;
				width: 33%;
				text-align: center;
				display: table-cell;
				box-sizing: border-box;
				border-bottom: 2px solid $color_border;
				a {
					color: $color-border;
					display: block;
					padding: 14px 0;
				}
				&.is-selected {
					border-bottom: 2px solid $color_main;
					a {
						font-weight: bold;
						color: $color_main;
					}
				}
			}
		}
		&__item {
			box-shadow: 0 1px 16px rgba(0,0,0,0.12);
			border-radius: 4px;
			padding: 16px;
			margin-bottom: 20px;
			cursor: pointer;
			&:hover {
				opacity: 0.8;
			}
			a {
				display: block;
			}
			&__body {
				margin-bottom: 20px;
				p {
					color: $color_text;
				}
			}
			&__answered {
				display: inline-block;
				top: 16px;
				right: 16px;
				text-align: right;
				box-shadow: 0 1px 3px rgba(0,0,0,0.24);
				margin-bottom: 12px;
				&.is-answered {
					span {
						background-color: $color_main;
						color: $color_white;
					}
				}
				span {
					padding: 8px 12px;
					font-weight: bold;
					border: none;
					background-color: #F2F5F8;
					color: $color_dark_gray;
					border-radius: 4px;
					font-size: 12px;
				}
			}
			&__foot {
				&__time {
					font-size: 12px;
					color: $color_gray;
				}
				&__action {
					float: right;
					color: $color_link;
					font-size: 12px;
				}
			}
		}
	}
</style>