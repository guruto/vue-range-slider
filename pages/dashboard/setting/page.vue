<template>
	<div class="p-setting__page">
		<h1 class="c-title">サイト設定</h1>
		<section class="c-section">
			<div>
				<div class="p-form">
					<form @submit.prevent="update">
						<h2 class="c-title--sub">基本情報</h2>
						<div class="p-form__group">
							<label class="p-form__label">アカウントID</label>
							<div class="p-form__item">
								<input type="text" :class="{'is-error': errors.has('pageLabel')}" v-validate="'required|min:3|max:30'" name="pageLabel" v-model="label" placeholder="アカウントIDを入力"/>
<!--								<span @click="handleUrlClear" class="p-form__item__clear-btn"><i class="far fa-times-circle"></i></span>-->
							</div>
							<span class="p-form__item-error" v-show="errors.has('pageLabel')">{{ errors.first('pageLabel') }}</span>
							<div class="p-form__info">
								<span class="p-form__info__label">ページURL</span>
								<span class="p-form__info__content">https://{{label}}.pageful.app</span>
							</div>
						</div>

						<div class="p-form__group">
							<label class="p-form__label">サイト名</label>
							<div class="p-form__item">
								<input type="text" :class="{'is-error': errors.has('pageName')}" v-validate="'required|min:3|max:30'" name="pageName" v-model="name" placeholder="サイト名を入力"/>
							</div>
							<span class="p-form__item-error" v-show="errors.has('pageName')">{{ errors.first('pageName') }}</span>
						</div>

						<div class="p-form__group">
							<label class="p-form__label">サイト説明</label>
							<div class="p-form__item">
								<textarea v-model="description" rows="6" placeholder="サイト説明文を入力"></textarea>
							</div>
						</div>

						<div class="p-form__group">
							<h2 class="c-title--sub">SNS・リンク設定</h2>
<!--							<label class="p-form__label">SNS・リンク設定</label>-->

							<div class="p-setting-page__link__sns">
								<div class="p-form__group">
									<label class="p-form__label">Twitter ID</label>
									<div class="p-form__item">
										<span class="p-setting-page__link__sns__logo p-setting-page__link__sns__logo--twitter"></span>
										<input type="text" placeholder="twitter id" v-model="twitterId"/>
									</div>
									<div class="p-form__info">
										<span class="p-form__info__label">先頭に@を付けないでください。</span>
									</div>
								</div>
								<div class="p-form__group">
									<label class="p-form__label">Instagramアカウント</label>
									<div class="p-form__item">
										<span class="p-setting-page__link__sns__logo p-setting-page__link__sns__logo--instagram"></span>
										<input type="text" placeholder="instagram id" v-model="instagramId"/>
									</div>
									<div class="p-form__info">
										<span class="p-form__info__label">先頭に@を付けないでください。</span>
									</div>
								</div>
								<div class="p-form__group">
									<label class="p-form__label">LINE公式アカウント</label>
									<div class="p-form__item">
										<span class="p-setting-page__link__sns__logo p-setting-page__link__sns__logo--line"></span>
										<input type="text" placeholder="LINE@ id" v-model="lineId"/>
									</div>
									<div class="p-form__info">
										<span class="p-form__info__label">先頭に@を付けないでください。</span>
									</div>
								</div>
								<div class="p-form__group">
									<label class="p-form__label">Facebookアカウント</label>
									<div class="p-form__item">
										<span class="p-setting-page__link__sns__logo p-setting-page__link__sns__logo--facebook"></span>
										<input type="text" placeholder="facebook id" v-model="facebookId"/>
									</div>
								</div>
							</div>
							<div class="p-setting-page__link__other">
								<div class="p-setting-page__link__other__content">
									<label class="p-form__label">その他のリンク</label>
									<ul>
										<li v-for="(link, linkIndex) in this.links" class="p-setting-page__link__other__content__item">
<!--											<div class="is-drag">-->
<!--												<img src="/img/icon_drag_indicator@2x.png">-->
<!--											</div>-->
											<div class="is-link-icon">
												<i class="material-icons is-more-icon">link</i>
											</div>
											<span>{{link.title}}</span>
											<span>{{link.url}}</span>
											<div @click="handleMoreOtherLink" class="is-more" :data-link-index="linkIndex">
												<i class="material-icons is-more-icon">more_horiz</i>
											</div>
										</li>
									</ul>
								</div>

								<div class="p-setting-page__link__other__add">
									<button type="button" @click="handleAddLinkOther" class="c-btn"><i class="material-icons">add</i>リンクを追加する</button>
								</div>
							</div>

						</div>

						<div class="p-form__button">
							<button :class="{'c-btn': true, 'c-btn--main': true, 'is-loading': isLoading}" type="submit" :disabled="isLoading">変更</button>
						</div>
					</form>
				</div>
			</div>
		</section>

		<div class="p-popover" id="link-popover" v-show="isShowPopoverMoreControlLink">
			<div class="p-popover__arrow"></div>
			<div class="p-popover__body">
				<ul>
					<li @click="handleLinkItemEdit">編集する</li>
					<li @click="handleLinkItemDelete" class="is-delete">削除する</li>
				</ul>
			</div>
		</div>

		<Modal type="page_link"
		       :title="modalTitle"
		       :actionMessage="modalActionMessage"
		       :initialPageLinkTitle="modalLinkTitle"
		       :initialPageLinkUrl="modalLinkUrl"
		       :onHandleAction="handleExecuteLinkModalAction"></Modal>

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

				label: "",
				name: "",
				description: "",

				twitterId:   '',
				facebookId:  '',
				instagramId: '',
				lineId:      '',
				links:       [],

				isShowPopoverMoreControlLink: false,
				selectedLinkIndex:            null,
				modalTitle:                   'リンクを追加する',
				modalActionMessage:           '追加する',
				modalLinkTitle:               '',
				modalLinkUrl:                 '',

				meta: {
					title: 'サイト設定',
					description: 'PAGEFUL（ペイジフル）のサイト設定ページ',
				}
			}
		},
		async asyncData(context) {
			await context.store.dispatch("page/getMyself", {});
			console.log(context.store.state.user);

			return {
				label: context.store.state.page.label,
				name: context.store.state.page.name,
				description: context.store.state.page.description,

				twitterId:   context.store.state.page.twitterId,
				facebookId:  context.store.state.page.facebookId,
				instagramId: context.store.state.page.instagramId,
				lineId:      context.store.state.page.lineId,

				links:       context.store.state.page.links,
			}
		},
		methods: {
			async update() {
				const validated = await this.$validator.validateAll()
				if (!validated) {
					return
				}

				// snsアカウントの1文字目の@を削除する
				if (this.twitterId.slice(0, 1) === '@') {
					this.twitterId = this.twitterId.slice(1)
				}
				if (this.instagramId.slice(0, 1) === '@') {
					this.instagramId = this.instagramId.slice(1)
				}
				if (this.lineId.slice(0, 1) === '@') {
					this.lineId = this.lineId.slice(1)
				}

				this.isLoading = true

				await this.$store.dispatch("page/edit", {
					label:       this.label,
					name:        this.name,
					description: this.description,
					twitterId:   this.twitterId,
					instagramId: this.instagramId,
					lineId:      this.lineId,
					facebookId:  this.facebookId,
				});

				this.isLoading = false

				window.scrollTo(0,0);
			},

			handleAddLinkOther() {
				// show modal

				this.selectedLinkIndex = null

				this.modalTitle         = 'リンクを追加する'
				this.modalActionMessage = '追加する'
				this.modalLinkTitle     = ''
				this.modalLinkUrl       = ''

				this.$store.dispatch('modal/show')
			},
			async handleExecuteLinkModalAction(title, value) {
				if (this.selectedLinkIndex === null) {
					// 新規追加
					await this.$store.dispatch("page/addLink", {
						title: title,
						url:   value,
						orderIndex: this.links.length
					});

				} else {
					// 編集
					const link = this.links[this.selectedLinkIndex]
					await this.$store.dispatch("page/editLink", {
						label: link.label,
						title: title,
						url:   value,
						index: this.selectedLinkIndex,
					});
				}

				this.links = this.$store.state.page.links

			},
			handleMoreOtherLink(e) {
				// 編集、削除のpopover表示処理
				this.isShowPopoverMoreControlLink = !this.isShowPopoverMoreControlLink

				// popoverの位置処理
				const popover     = document.getElementById('link-popover')
				const top         = e.target.getBoundingClientRect().top
				popover.style.top = window.pageYOffset + top + 35 + 'px'

				this.selectedLinkIndex = e.currentTarget.dataset.linkIndex;

				if (this.isShowPopoverMoreControlLink) {
					document.body.addEventListener('click', this.handlePopoverClickOutside)
				} else {
					document.body.removeEventListener('click', this.handlePopoverClickOutside)
				}
			},
			handlePopoverClickOutside(e) {
				if (e.target.className != 'is-more' && e.target.className != 'material-icons is-more-icon') {
					this.isShowPopoverMoreControlLink = false
				}
			},
			handleLinkItemEdit() {
				if (this.selectedLinkIndex === null) {
					return
				}

				this.modalTitle         = 'リンクを編集する'
				this.modalActionMessage = '編集する'
				this.modalLinkTitle     = this.links[this.selectedLinkIndex].title
				this.modalLinkUrl       = this.links[this.selectedLinkIndex].url

				this.$store.dispatch('modal/show')
			},
			async handleLinkItemDelete() {
				if (this.selectedLinkIndex === null) {
					return
				}

				const link = this.links[this.selectedLinkIndex]
				await this.$store.dispatch("page/deleteLink", {
					label: link.label,
					index: this.selectedLinkIndex,
				});

				this.links = this.$store.state.page.links;
			}
		}
	}
</script>

<style lang="scss">
	.p-setting-page {
		&__link {
			&__sns {
				input {
					padding-left: 68px !important;
				}
				&__logo {
					position: absolute;
					top: 0;
					left: 0;
					width: 50px;
					height: 50px;
					border-radius: 4px 0 0 4px;
					background-repeat: no-repeat;
					background-position: center;
					&--twitter {
						background-color: #1da1f2;
						background-image: url("/img/icon_setting_twitter@2x.png");
						background-size: 18px;
					}
					&--instagram {
						background: url("/img/icon_setting_instagram@2x.png") center center / 18px 18px no-repeat, linear-gradient(to bottom, #7024c4 0%,#c21975 33.99%,#c74c4d 67.98%,#e09b3d 100%);
					}
					&--line {
						background-color: #00b900;
						background-image: url("/img/icon_setting_line@2x.png");
						background-size: 19.5px;
					}
					&--facebook {
						background-color: #1877f2;
						background-image: url("/img/icon_setting_facebook@2x.png");
						background-size: 9px;
					}
				}
			}
			&__other {
				&__content {
					&__item {
						border-radius: 8px;
						border: 1px solid $color_border;
						background-color: $color_white;
						margin-bottom: 20px;
						position: relative;
						padding-left: 55px;
						&:last-child {
							margin-bottom: 0;
						}
						span {
							color: $color_dark_gray;
							font-size: 13px;
							display: block;
							margin: 10px 0;
							text-align: left;
						}
						.is-drag {
							position: absolute;
							left: 14px;
							display: inline-block;
							height: 100%;
							padding-top: 6px;
							cursor: pointer;
							img {
								width: 24px;
							}
						}
						.is-link-icon {
							position: absolute;
							top: 0;
							left: 0;
							height: 100%;
							display: inline-block;
							background-color: $color_border;
							width: 40px;
							border-top-left-radius: 8px;
							border-bottom-left-radius: 8px;
							i {
								color: $color_white;
								position: absolute;
								top: 0;
								bottom: 0;
								right: 0;
								left: 0;
								margin: auto;
								width: 24px;
								height: 24px;
							}
						}
						.is-more {
							position: absolute;
							top: 0;
							right: 14px;
							display: inline-block;
							height: 100%;
							padding-top: 22px;
							color: $color_light_gray;
							cursor: pointer;
						}
					}
				}
				&__add {
					text-align: center;
					margin-top: 16px;
					margin-bottom: 50px;
					button {
						border-radius: 8px;
						border: 1px solid $color_main;
						background-color: $color_white;
						font-size: 14px;
						padding: 12px 20px;
						color: $color_main;
						font-weight: bold;
						i {
							vertical-align: -6px;
							color: $color_main;
						}
					}
				}
			}
		}
	}
</style>