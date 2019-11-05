<template>
	<div class="p-post-add">

		<post-form
			:isEdit="false"
			:post="post"></post-form>
	</div>
</template>

<script>
	import Meta from '~/assets/mixins/meta'
	import PostForm from "~/components/pages/postForm"

	export default {
		layout: 'dashboard',
		components: {PostForm},
		mixins: [Meta],
		data() {
			return {
				meta: {
					title: '新規投稿',
					description: 'PAGEFUL（ペイジフル）の新規投稿ページ',
				}
			}
		},
		async asyncData(context) {
			context.store.dispatch("post/resetUploadedPostImages")

			// twitterシェア可能か連携状態を取得
			await context.store.dispatch('userService/getInfo')
			const canShareTwitter = Boolean(context.store.state.userService.info.TWITTER.linked == '1')

			let requestData = {}

			const type = (context.route.query.type) ? context.route.query.type : 'TEXT'
			if (type === 'ANSWER') {
				// type == ANSWERの場合、request_labelからrequestデータを取得する
				if (!context.route.query.hasOwnProperty('request_label')) {
					// 404
					context.error({
						statusCode: 404,
						message:    'そのページは存在しません。'
					})
					return
				}

				// requestデータの取得
				await context.store.dispatch("request/get", {label: context.route.query.request_label});
				if (context.store.state.request.is_error) {
					// 404
					context.error({
						statusCode: 500,
						message:    '正しい処理ではありません。'
					})
					return
				}
				requestData = {
					label:     context.store.state.request.label,
					body:      context.store.state.request.body,
					createdAt: context.store.state.request.createdAt,
				}
			}

			return {
				post: {
					label:              null,
					type:               type, // default
					scope:              'PUBLIC',
					price:              null,
					title:              "",
					comment:            "",
					thumbnailImagePath: "",
					thumbnailImageUrl:  "",
					thumbnailMediaList: [],
					isPublished:        false,
					// LINKタイプ
					itemLink: {
						linkUrl:               "",
						linkTitle:             "",
						linkDescription:       "",
						linkSiteName:          "",
						linkThumbnailImageUrl: "",
						linkContentMediaType:  "",
						linkContentMediaUrl:   "",
						linkSiteType:          "",
						linkUniqueId:          "",
						fetchedUrl:            "",
					},

					// TEXTタイプ
					itemText: {
						draftBody: '',
						Body:      '',
					},
					// VIDEOタイプ
					itemVideo: {
						urlSite:       '',
						videoUrl:      '',
						fileUrl:       '',
						videoUniqueId: '',
						path:          '',
						contentType:   '',
						fileName:      '',
						fileSize:      ''
					},
					// SOUNDタイプ
					itemSound: {
						url: '',
						path: '',
						contentType: '',
						fileSize: ''
					},
					// FILEタイプ
					itemFile: {
						fileName: '',
						url: '',
						path: '',
						contentType: '',
						fileSize: '',
						fileSizeText: '',
					},
					itemAnswer: {
						request: requestData
					},

					canShareTwitter: canShareTwitter,
				}
			}
		},
		// created() {
			// todo:: 一度設定すると、別画面に遷移しても発動するので、plugin化する

			// if (process.browser) {
			// 	window.addEventListener('beforeunload', function(e){
			// 		e.returnValue = "ページを離れようとしています。よろしいですか？";
			// 	}, false);
			// }
			// },
			// beforeRouteLeave(to, from, next) {
			// console.log('beforeRouteLeave')
			// const result = window.confirm('編集中ですが、');
			// if (result) {
			// 	return next()
			// }
		// },
		methods: {
		}
	}
</script>

<style lang="scss">
	.p-post-add {
		background-color: $color_white;
		padding-top: 30px;
	}
</style>