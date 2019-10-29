<template>
	<div class="l-container is-dashboard">
		<Header v-if="(this.$store.state.page.label || this.$route.name != 'index')"
		        :isTopPage="getIsTopPage"
		        :isUserPage="getIsUserPage"></Header>

		<Navigation></Navigation>
		<FlashMessage></FlashMessage>

		<div class="l-content is-dashboard">
			<nuxt></nuxt>
		</div>

	</div>
</template>

<script>
	import Header from "../components/layouts/header";
	import Navigation from "../components/layouts/navigation";

	export default {
		name: "dashboard",
		components: {Navigation, Header},
		head: {
			bodyAttrs: {
				class: 'is-dashboard-body'
			}
		},
		computed: {
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

				return (this.$store.state.subDomain.hasSubDomain && ['index', 'content', 'post-item-label', 'profile', 'request'].indexOf(routeName) !== -1)
			},
		},
		data() {


			return {
			}
		}
	}
</script>