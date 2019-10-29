<template>
	<div class="l-container">
		<Header ref="header"
						:isTopIndex="getIsTopIndex"
						:isTopPage="getIsTopPage"
						:isUserPage="getIsUserPage"></Header>

		<Navigation></Navigation>
		<FlashMessage></FlashMessage>

		<div class="l-content" :class="{'l-content--has-image': showHeaderImage}">
			<ul v-if="showHeaderImage" class="c-slide">
				<li v-for="(headerImage, index) in this.$store.state.page.design.headerMediaList" v-bind:key="index"
				class="c-slide__main-visual" :class="{'is-active': isActiveSlide === index}"
				:ref="`slide_${index}`">
					<img class="is-user-page__header-image" :src='headerImage.url'>
				</li>
			</ul>
			<nuxt></nuxt>
		</div>

		<UserFooter v-if="!getIsTopPage"></UserFooter>
		<Footer v-if="getIsTopPage"></Footer>
	</div>
</template>

<script>
	import Header from "../components/layouts/header";
	import Footer from "../components/layouts/footer";
	import Navigation from "../components/layouts/navigation";
	import UserFooter from "../components/layouts/userFooter";

	export default {
		name: "default",
		components: {UserFooter, Navigation, Footer, Header},
		computed: {
			getIsTopIndex() {
				// 未ログイン かつ ユーザーページではない かつ トップページLP
				let routeName = this.$route.name
				if (!routeName) {
					return false
				}
				routeName = routeName.replace('___ja', '')

				return (!this.$store.state.subDomain.hasSubDomain && routeName == 'index')
			},
			getIsTopPage() {
				// 未ログイン かつ ユーザーページではない
				let routeName = this.$route.name
				if (!routeName) {
					return false
				}
				routeName = routeName.replace('___ja', '')

				return (!this.$store.state.subDomain.hasSubDomain && ['index', 'user-login', 'user-sign_up', 'user-callback', 'user-sign_up_email_sent', 'user-forgot_password', 'user-verify_email-code', 'user-reset_password-code',
					'info-about', 'info-company', 'info-inquiry', 'info-privacy', 'info-term',].indexOf(routeName) !== -1)
			},
			getIsUserPage() {
				// ユーザーページ
				let routeName = this.$route.name
				if (!routeName) {
					return false
				}
				routeName = routeName.replace('___ja', '')

				return (this.$store.state.subDomain.hasSubDomain && ['index', 'page', 'post-item-label', 'about', 'request', 'member-sign_up', 'member-login', 'member-profile', 'member-setting', 'member-info-term', 'member-info-transaction_law'].indexOf(routeName) !== -1)
			},
			showHeaderImage() {
				// ヘッダー画像表示判定
				let routeName = this.$route.name
				if (!routeName) {
					return false
				}
				routeName = routeName.replace('___ja', '')
				return (this.$store.state.subDomain.hasSubDomain && this.$store.state.page
					&& this.$store.state.page.design.headerMediaUrl !== ''
					&& ['index', 'about', 'request', 'member-sign_up', 'member-login'].indexOf(routeName) !== -1
					&& 0 < this.$store.state.page.design.headerMediaList.length)
			}
		},
		mounted() {
			setInterval(() => {
				if (this.$store.state && this.isActiveSlide < this.$store.state.page.design.headerMediaList.length-1) {
					this.isActiveSlide++;
				} else {
					this.isActiveSlide = 0;
				}
			}, this.slidTime);
		},
		data() {
			return {
				isActiveSlide: 0,
				slidTime: 7000
			}
		}
	}
</script>

<style lang="scss">
.is-user-page__header-image {
	width: 100%;
	max-width: $screen_max_size_tablet;
	margin: 0 auto;
	display: block;
}
@keyframes show{
	from{
		opacity: 0;
	}
	to{
		opacity: 1;
	}
}
.c-slide{
	display: block;
	max-width: $screen_max_size_tablet;
	height: auto;
	margin: 0 auto;
	&__main-visual {
		display: none;
		&.is-active{
			display: block;
			animation: show 1s linear 0s;
		}
	}
}

</style>