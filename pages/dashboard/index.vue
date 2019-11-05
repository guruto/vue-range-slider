<template>
	<div class="p-dashboard">
		<h1 class="c-title">ダッシュボード</h1>

		<div class="p-dashboard__navigation">
			<div class="p-dashboard__navigation__item">
				<nuxt-link to="/dashboard/post/manage">
					<div class="p-dashboard__navigation__item__icon" style="background-color: #179EE6;">
						<img src="/img/dashboard_navigation/post.png" alt="投稿">
					</div>
					<span class="p-dashboard__navigation__item__name">投稿</span>
				</nuxt-link>
			</div>
			<div class="p-dashboard__navigation__item">
				<nuxt-link to="/dashboard/request">
					<div class="p-dashboard__navigation__item__icon" style="background-color: #23DDC0;">
						<img src="/img/dashboard_navigation/answer.png" alt="質問">
					</div>
					<span class="p-dashboard__navigation__item__name">質問</span>
				</nuxt-link>
			</div>
			<div class="p-dashboard__navigation__item">
				<nuxt-link to="/dashboard/setting/page">
					<div class="p-dashboard__navigation__item__icon" style="background-color: #FF7BBD;">
						<img src="/img/dashboard_navigation/page.png" alt="サイト">
					</div>
					<span class="p-dashboard__navigation__item__name">サイト</span>
				</nuxt-link>
			</div>
			<div class="p-dashboard__navigation__item">
				<nuxt-link to="/dashboard/setting/profile">
					<div class="p-dashboard__navigation__item__icon" style="background-color: #16CAE2;">
						<img src="/img/dashboard_navigation/profile.png" alt="プロフィール">
					</div>
					<span class="p-dashboard__navigation__item__name">プロフ</span>
				</nuxt-link>
			</div>
			<div class="p-dashboard__navigation__item">
				<nuxt-link to="/dashboard/setting/design">
					<div class="p-dashboard__navigation__item__icon" style="background-color: #20F058;">
						<img src="/img/dashboard_navigation/design.png" alt="デザイン">
					</div>
					<span class="p-dashboard__navigation__item__name">デザイン</span>
				</nuxt-link>
			</div>
			<div class="p-dashboard__navigation__item">
				<nuxt-link to="/dashboard/member/manage">
					<div class="p-dashboard__navigation__item__icon" style="background-color: #FF7F60;">
						<img src="/img/dashboard_navigation/member.png" alt="メンバー">
					</div>
					<span class="p-dashboard__navigation__item__name">メンバー</span>
				</nuxt-link>
			</div>
			<div class="p-dashboard__navigation__item">
				<nuxt-link to="/dashboard/member/belong">
					<div class="p-dashboard__navigation__item__icon" style="background-color: #FFBE29;">
						<img src="/img/dashboard_navigation/member_page.png" alt="登録サイト">
					</div>
					<span class="p-dashboard__navigation__item__name">登録サイト</span>
				</nuxt-link>
			</div>
			<div class="p-dashboard__navigation__item">
				<nuxt-link to="/dashboard/setting/list">
					<div class="p-dashboard__navigation__item__icon" style="background-color: #8B8BFF;">
						<img src="/img/dashboard_navigation/setting.png" alt="各種設定">
					</div>
					<span class="p-dashboard__navigation__item__name">各種設定</span>
				</nuxt-link>
			</div>
		</div>

		<div style="padding: 0 5% 30px;">
			<a class="c-btn c-btn--main p-dashboard__site-link" :href="$getUrl('/', this.$store.state.user.page.label)" target="_blank">
				<i class="material-icons">open_in_new</i>
				<span>自分のページを開く</span>
			</a>
		</div>

		<div class="p-dashboard__attention">
			<div v-if="this.$store.state.user.status.postCount == 0" class="p-dashboard__attention__item" @click="$store.dispatch('modal/show')">
				<div class="p-dashboard__attention__item__icon" style="background-color: #179EE6;">
					<img src="/img/dashboard_attention/post.png" alt="初めての投稿を作成">
				</div>
				<div class="p-dashboard__attention__item__content">
					<p class="p-dashboard__attention__item__content__title">初めての投稿を作成しましょう</p>
					<p class="p-dashboard__attention__item__content__description">ブログ、画像、動画、ファイル、URL引用など様々な形式で投稿を作成できます。</p>
				</div>
			</div>
			<div v-if="this.$store.state.user.status.requestCount == 0" class="p-dashboard__attention__item">
				<div class="p-dashboard__attention__item__icon" style="background-color: #23DDC0;">
					<img src="/img/dashboard_attention/request.png" alt="SNSで質問を募集">
				</div>
				<div class="p-dashboard__attention__item__content">
					<p class="p-dashboard__attention__item__content__title">SNSで質問を募集しましょう</p>
					<p class="p-dashboard__attention__item__content__description">Twitterなどで質問を集めて回答したり、書いてほしいブログテーマを集めることができます。</p>
				</div>
				<nuxt-link to="/dashboard/request"></nuxt-link>
			</div>
			<div v-if="!this.$store.state.user.status.isPageDesignModified" class="p-dashboard__attention__item">
				<div class="p-dashboard__attention__item__icon" style="background-color: #20F058;">
					<img src="/img/dashboard_attention/design.png" alt="サイトページのデザイン">
				</div>
				<div class="p-dashboard__attention__item__content">
					<p class="p-dashboard__attention__item__content__title">サイトのデザインをしましょう</p>
					<p class="p-dashboard__attention__item__content__description">ヘッダー画像、ロゴ画像を設定することができます。</p>
				</div>
				<nuxt-link to="/dashboard/setting/design"></nuxt-link>
			</div>
			<div v-if="!this.$store.state.user.status.isEmailVerified" class="p-dashboard__attention__item">
				<div class="p-dashboard__attention__item__icon" style="background-color: #8B8BFF;">
					<img src="/img/dashboard_attention/mail.png" alt="メールアドレスの認証">
				</div>
				<div class="p-dashboard__attention__item__content">
					<p class="p-dashboard__attention__item__content__title">メールアドレスの認証が完了していません</p>
					<p class="p-dashboard__attention__item__content__description">届いている認証メールをご確認ください。再度認証メールを送信する場合はこちらをクリックしてください。</p>
				</div>
				<nuxt-link to="/dashboard/user/resend_verify_email"></nuxt-link>
			</div>
		</div>

		<section class="c-section">
			<div class="p-dashboard__group">
				<div class="p-dashboard__group__head">
					<img src="/img/icon_notification_important@2x.png">
					<h2>お知らせ</h2>
				</div>
				<div class="p-dashboard__group__item">
					<div class="notification">
						<div v-if="this.$store.state.notificationList.items.length == 0">
							<span>お知らせはありません。</span>
						</div>
						<div v-else class="notification__list">
							<div v-for="(notification, notificationIndex) in this.$store.state.notificationList.items" :key="notificationIndex" class="notification__list__item">
								<a :href="notification.url">
									<span>{{notification.body}}</span>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<section class="c-section">
			<div class="p-dashboard__group">
				<div class="p-dashboard__group__head">
					<i class="material-icons">edit</i>
					<h2>投稿</h2>
				</div>
				<div class="p-dashboard__group__item">
					<span class="p-dashboard__group__item__label">投稿情報</span>
					<p class="p-dashboard__group__item__value">現在の投稿数　{{this.$store.state.user.status.postCount}}</p>
				</div>
				<div class="p-dashboard__group__item">
					<span class="p-dashboard__group__item__label">最新の投稿一覧</span>
					<p v-if="this.$store.state.postList.items.length === 0" class="p-dashboard__group__item__value">投稿はまだありません</p>

					<div v-if="this.$store.state.postList.items.length > 0" class="post">
						<div v-for="(post, postIndex) in this.$store.state.postList.items" :key="postIndex" class="post__item">
							<nuxt-link :to="'/post/item/' + post.label">
								<div class="post__item__content">
									<div class="post__item__thumbnail">
										<span v-if="!post.post_item.thumbnail_image_url" class="post__item__thumbnail__image" :style="'background-image: url(' + post.thumbnail_image_url + ')'"></span>
										<span v-else class="post__item__thumbnail__image" :style="'background-image: url(' + post.post_item.url + ')'"></span>
									</div>
									<div class="post__item__title">
										<span class="is-title">{{post.title}}</span>
										<span class="is-comment">{{post.comment.length > 50 ? post.comment.substr(0, 50) + '…' : post.comment}}</span>
									</div>
								</div>
								<div class="post__item__info u-cf">
									<div style="float: left">
										<div :class="{'p-post__label__publish': true, 'is-published': (post.is_published === '1')}">
											<span>{{post.is_published === '1' ? '公開中' : '下書き'}}</span>
										</div>
										<div class="p-post__label__type">
											<i v-if="post.type == 'TEXT'" class="material-icons">edit</i>
											<i v-else-if="post.type == 'IMAGE'" class="material-icons">camera_alt</i>
											<i v-else-if="post.type == 'LINK'" class="material-icons">link</i>
											<i v-else-if="post.type == 'VIDEO'" class="material-icons">videocam_off</i>
											<i v-else-if="post.type == 'SOUND'" class="material-icons">headset</i>
											<i v-else-if="post.type == 'ANSWER'" class="material-icons">forum</i>
											<i v-else-if="post.type == 'FILE'" class="material-icons">folder</i>
											<span>{{post.type_text}}</span>
										</div>
									</div>
									<span class="post__item__info__time">{{post.updated_at | moment}}</span>
	<!--								<div @click="handlePostItemMore" class="post__item__info__more" :data-post-index="postIndex">-->
	<!--									<i class="material-icons is-more-icon">more_horiz</i>-->
	<!--								</div>-->
								</div>
							</nuxt-link>
						</div>
					</div>
				</div>
				<div class="p-dashboard__group__action">
					<nuxt-link to="/dashboard/post/manage" class="c-btn">もっと見る</nuxt-link>
				</div>
			</div>
		</section>

<!--		<div class="p-popover" id="post-list-popover" v-show="isShowPopoverMorePostItem">-->
<!--			<div class="p-popover__arrow"></div>-->
<!--			<div class="p-popover__body">-->
<!--				<ul>-->
<!--					<li @click="handlePostItemEdit">編集する</li>-->
<!--					<li @click="handlePostItemDelete" class="is-delete">削除する</li>-->
<!--				</ul>-->
<!--			</div>-->
<!--		</div>-->

		<div class="p-post-manage__add">
			<div class="p-post-manage__add__link" @click="$store.dispatch('modal/show')">
				<span>投稿</span>
				<i class="material-icons">add</i>
			</div>
		</div>

		<Modal type="add_post"
		       title="新規投稿"></Modal>

	</div>
</template>

<script>
	import moment from 'moment'
	import Meta from '~/assets/mixins/meta'
	export default {
		layout: 'dashboard',
		mixins: [Meta],
		data() {
			return {
				isShowPopoverMorePostItem: false,

				meta: {
					title: 'ダッシュボード',
					description: 'PAGEFUL（ペイジフル）の投稿管理ページ',
				}
			}
		},
		async asyncData({store, params}) {
			await store.dispatch("user/getInfoForDashboard");
		},
		filters: {
			moment(unixtime) {
				return moment.unix(unixtime).format('YYYY/MM/DD HH:mm')
			}
		},
		methods: {
			handlePostItemMore() {

			},
			handlePostItemEdit() {

			},
			handlePostItemDelete() {

			},
		}
	}
</script>

<style lang="scss">
	.p-dashboard {
		&__navigation {
			padding: 0 5% 15px;
			display: flex;
			justify-content: left;
			flex-wrap: wrap;
			&__item {
				margin: 0 3px 8px;
				width: 60px;
				text-align: center;

				display: flex;
				flex-direction: column;
				a {
					display: block;
					width: 100%;
				}
				&__icon {
					margin: auto;
					width: 56px;
					height: 56px;
					border-radius: 4px;
					position: relative;
					img {
						position: absolute;
						margin: auto;
						top: 0;
						right: 0;
						left: 0;
						bottom: 0;
						width: 38px;
					}
				}
				&__name {
					display: inline-block;
					width: 100%;
					text-align: center;
					font-size: 12px;
					font-weight: bold;
					color: $color_dark_gray;
				}
			}
		}
		&__site-link {
			border: 2px solid $color_main !important;
			color: $color_main !important;
			background-color: transparent !important;
			width: 100%;
			i {
				vertical-align: -7px;
			}
			span {
				font-size: 14px;
				font-weight: bold;
			}
		}
		&__attention {
			@media #{$screen_pc} {
				margin: 0 5% 0;
			}
			&__item {
				table-layout: fixed;
				display: table;
				width: 100%;
				min-height: 105px;
				box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12);
				margin-bottom: 20px;
				cursor: pointer;
				position: relative;
				a {
					position: absolute;
					top: 0;
					bottom: 0;
					right: 0;
					left: 0;
				}
				&__icon {
					display: table-cell;
					width: 105px;
					height: 100%;
					position: relative;
					img {
						width: 54px;
						position: absolute;
						margin: auto;
						top: 0;
						right: 0;
						bottom: 0;
						left: 0;
					}
				}
				&__content {
					display: table-cell;
					width: 100%;
					padding: 16px;
					background-color: $color_white;
					&__title {
						font-size: 14px;
						font-weight: bold;
						color: $color_text;
						margin-bottom: 6px;
					}
					&__description {
						font-size: 12px;
						font-weight: normal;
						color: $color_dark_gray;
					}
				}
			}
		}

		&__group {
			&__head {
				margin-bottom: 24px;
				h2 {
					font-weight: bold;
					font-size: 15px;
					margin: 0;
					color: $color_dark_gray;
					display: inline-block;
				}
				i {
					color: $color_dark_gray;
					font-size: 16px;
					vertical-align: -2px;
				}
				img {
					width: 16px;
					vertical-align: -2px;
				}
			}
			&__item {
				margin-bottom: 18px;
				&:last-child {
					margin-bottom: 0;
				}
				&__label {
					display: inline-block;
					font-size: 13px;
					font-weight: bold;
					color: $color_gray;
					margin-bottom: 8px;
				}
				&__value {
					font-size: 15px;
					font-weight: normal;
					color: $color_text;

					i {
						font-size: 15px;
						vertical-align: -2px;
					}
				}

				& .notification {
					&__list {
						&__item {
							display: block;
							margin-bottom: 8px;
							cursor: pointer;
							a {
								display: block;
							}
							span {
								color: $color_link;
							}
						}
					}
				}
				
				& .post {
					&__item {
						margin-bottom: 40px;
						&:last-child {
							margin-bottom: 0;
						}
						&__content {
							display: table;
							table-layout: fixed;
							width: 100%;
							margin-bottom: 4px;
						}
						&__thumbnail {
							display: table-cell;
							vertical-align: top;
							width: 70px;
							&__image {
								width: 56px;
								height: 56px;
								display: inline-block;
								background-size: cover;
								background-position: 50%;
								background-repeat: no-repeat;
								background-color: $color_light;
							}
						}
						&__title {
							display: table-cell;
							vertical-align: top;
							width: 100%;
							& .is-title {
								font-size: 13px;
								font-weight: bold;
								color: $color_text;
								display: block;
								margin-bottom: 3px;
							}
							& .is-comment {
								font-size: 12px;
								font-weight: normal;
								color: $color_dark_gray;
								display: block;
								margin-bottom: 0;
							}
						}
						&__info {
							&__more {
								float: right;
								cursor: pointer;
								height: 100%;
								i {
									color: $color_light_gray;
									margin-top: 4px;
								}
							}
							&__time {
								float: right;
								font-size: 12px;
								color: $color_gray;
								margin-top: 7px;
							}
						}
					}
				}
			}
			&__action {
				margin-top: 30px;
				.c-btn {
					width: 100%;
					color: $color_white;
					background-color: $color_main;
					font-size: 14px;
					font-weight: bold;
					padding: 12px 0;
				}
			}
		}
	}
</style>