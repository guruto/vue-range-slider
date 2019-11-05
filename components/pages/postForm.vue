<template>
	<div class="p-form">

		<div class="p-form__operation u-cf" style="padding: 0 5%;">
			<div class="p-form__operation__back">
				<a href="/dashboard/post/manage" :class="{'c-btn': true, 'c-btn--default': true}">戻る</a>
			</div>
			<div class="p-form__operation__save">
				<button v-if="post.type == 'TEXT'" :class="{'c-btn': true, 'c-btn--default': true}" id="text-saving-btn" type="button" :disabled="isDraftSaving">{{isDraftSaving ? '一時保存中' : (post.isPublished) ? '一時保存' : '下書き保存'}}</button>
				<button v-else @click="handleSaveDraft" :class="{'c-btn': true, 'c-btn--default': true, 'is-loading': isDraftSaving}" type="button" >下書き保存</button>

				<button @click="handlePublishSetting" :class="{'c-btn': true, 'c-btn--main': true, 'is-loading': isLoading}" type="button" :disabled="!canPublishSetting">公開設定</button>
			</div>
		</div>

		<div v-if="isEdit" class="p-post__head-info">
			<div class="p-post__head-info__content">
				<span class="p-post__label__type">
					<i v-if="post.type == 'TEXT'" class="material-icons">edit</i>
					<i v-else-if="post.type == 'IMAGE'" class="material-icons">camera_alt</i>
					<i v-else-if="post.type == 'LINK'" class="material-icons">link</i>
					<i v-else-if="post.type == 'VIDEO'" class="material-icons">videocam_off</i>
					<i v-else-if="post.type == 'SOUND'" class="material-icons">headset</i>
					<i v-else-if="post.type == 'ANSWER'" class="material-icons">forum</i>
					<i v-else-if="post.type == 'FILE'" class="material-icons">folder</i>
					<span>{{post.typeText}}</span>
				</span>

				<span :class="{'p-post__label__publish': true, 'is-published': post.isPublished}">{{post.isPublished ? '公開中' : '下書き'}}</span>
			</div>
		</div>

		<div v-if="post.type == 'TEXT'" class="p-form__text">
			<div class="p-form__thumbnail">
				<div v-if="post.thumbnailImagePath" class="p-form__thumbnail__content">
					<span @click="handleDeleteThumbnailImage" class="p-form__thumbnail__content__delete-btn"><i class="far fa-times-circle"></i></span>
					<img class="p-form__thumbnail__content__image" :src="post.thumbnailImageUrl">

				</div>
				<div v-else style="padding: 0 5%;">
					<div  @click="handleSelectTextThumbnailImage" class="p-form__thumbnail__select">
						<img src="/img/form_icon_thumbnail@2x.png" alt="サムネイル画像を選択">
						<!--					<span class="p-form__thumbnail__select__description">サムネイル画像</span>-->
						<input ref="fileinput" type="file" id="form-select-text-thumbnail-image"
							accept=".jpg,.gif,.png,image/gif,image/jpeg,image/png"
							@change="handleInputTextThumbnailImageFile"/>
					</div>
				</div>
			</div>

			<div style="padding: 0 5%;">
				<div class="p-editor__title">
					<h1>
						<div class="p-editor__title__content"
						     @focusout="handleTitleEdit"
						     @keyup="handleTitleEdit"
						     @keydown="handleTitleEditKeyDown"
						     contenteditable="true"
						     data-placeholder="タイトルを入力…"
						     :data-active-placeholder="(post.title.length === 0)">{{post.title}}</div>
					</h1>
				</div>

				<editor
					:autofocus="false"
					holder-id="pageful-editor"
					save-button-id="text-saving-btn"
					:init-data="initData"
					:authorizationToken="this.$store.state.user.authorizationToken"
					@save="handleTextSave"
					@ready="onReady"
					@change="onChange"
				/>
			</div>
		</div>

		<form v-else-if="post.type == 'LINK'">
			<div style="padding: 0 5%;">

				<div class="p-form__group">
					<div class="p-form__item">
						<input type="url" v-validate="'url'" name="linkUrl" v-model="post.itemLink.linkUrl" @focusout="handleFocusOutGetInfoLinkUrl" @paste="handlePasteGetInfoLinkUrl" placeholder="URLを入力 https://"/>
						<span @click="handleUrlClear" class="p-form__item__clear-btn"><i class="far fa-times-circle"></i></span>
					</div>
					<span class="p-form__item-error" v-show="errors.has('linkUrl')">{{ errors.first('linkUrl') }}</span>
				</div>

				<div class="p-form__ogp u-mt-16">
					<div class="p-ogp" v-if="post.itemLink.linkTitle">
						<span @click="handleUrlClear" class="p-ogp__delete-btn"><i class="fas fa-times"></i></span>
						<div v-if="post.itemLink.linkThumbnailImageUrl" class="p-ogp__thumbnail">
							<img :src="post.itemLink.linkThumbnailImageUrl">
						</div>
						<div class="p-ogp__info">
							<span class="p-ogp__info__title">{{post.itemLink.linkTitle}}</span>
							<span class="p-ogp__info__description">{{post.itemLink.linkDescription}}</span>
							<span class="p-ogp__info__site">{{post.itemLink.linkSiteName}}</span>
						</div>
					</div>
				</div>

				<div class="p-form__group">
					<div class="p-form__item">
						<textarea rows="10" v-model="post.comment" placeholder="コメントを入力">{{post.comment}}</textarea>
					</div>
				</div>
			</div>
		</form>

		<form v-else-if="post.type == 'IMAGE'">
			<div v-show="Object.keys(this.$store.state.post.uploadedPostImages).length > 0" class="p-form__image-upload__content">
				<div v-for="(uploadedPostImage, uploadedPostImageLabel, index) in this.$store.state.post.uploadedPostImages" :key="index" class="p-form__image-upload__content__item">
					<span @click="handleDeleteUploadedImage" :data-label="uploadedPostImageLabel" class="p-form__image-upload__content__item__delete-btn"><i class="fas fa-times"></i></span>
					<div class="p-form__image-upload__content__item__thumbnail">
						<img :src="uploadedPostImage.url">
					</div>
				</div>
			</div>

			<div @click="handleSelectImages" @dragleave.prevent @dragover.prevent @drop.prevent="handleDropImages" class="p-form__image-upload">
				<div class="p-form__image-upload__description">
					<img src="/img/form_icon_upload_image@2x.png" alt="画像を追加">
					<span>画像を追加<br>複数枚の選択が可能</span>
				</div>
				<input @change="handleInputImageFile" id="form-select-image" type="file" accept="image/png,image/jpeg,image/gif" multiple/>
			</div>

			<div style="padding: 0 5%;">
				<div class="p-form__group">
					<div class="p-form__item">
						<input type="text" v-validate="'required'" name="title" v-model="post.title" placeholder="タイトルを入力"/>
						<span @click="handleUrlClear" class="p-form__item__clear-btn"><i class="far fa-times-circle"></i></span>
					</div>
					<span class="p-form__item-error" v-show="errors.has('title')">{{ errors.first('title') }}</span>
				</div>
				<div class="p-form__group">
					<div class="p-form__item">
						<textarea rows="10" v-model="post.comment" placeholder="コメントを入力"></textarea>
					</div>
				</div>
			</div>
		</form>

		<form v-else-if="post.type == 'VIDEO'">
			<div style="padding: 0 5%;">
				<div v-show="post.itemVideo.path === '' && post.itemVideo.videoUrl === '' && !isVideoUrlInputing"
						@click="handleSelectVideo()" @dragleave.prevent @dragover.prevent @drop.prevent="handleDropVideo" class="p-form__sound-upload">
					<div class="p-form__sound-upload__description">
						<img src="/img/form_icon_upload_video@2x.png" alt="動画ファイルを追加">
						<span>動画ファイルを追加</span>
						<spinner :isActive="isVideoUploading"></spinner>
					</div>
					<input @change="handleInputVideoFile" ref="selectVideo" type="file" accept="video/*"/>
				</div>
				<div v-if="post.itemVideo.path === ''" class="p-form__group">
					<div class="p-form__item">
						<input type="url" v-validate="'url'" name="videoUrl" v-model="post.itemVideo.videoUrl"
									 @focusout="handleFocusOutGetInfoVideoUrl" @paste="handlePasteGetInfoVideoUrl"
									 @focus="handleFocusVideoUrlInput"
									 placeholder="URLを入力 https://" :disabled="isVideoUploading"/>
						<span @click="handleVideoClear" class="p-form__item__clear-btn"><i class="far fa-times-circle"></i></span>
					</div>
					<span class="p-form__item-error" v-show="errors.has('videoUrl')">{{ errors.first('videoUrl') }}</span>
					<div class="p-form__info">
						<span class="p-form__info__label">YoutubeとVimeoのリンクのみ</span>
					</div>
				</div>

				<div class="p-form__ogp u-mt-16" v-if="!isVideoUrlInputing && (post.itemVideo.videoUrl !== '' || post.itemVideo.path !== '')">
					<div v-if="post.itemVideo.path !== ''" class="p-video">
						<span @click="handleVideoClear"><i class="far fa-times-circle p-video__clear-btn"></i></span>
						<video class="p-video__content" :src="post.itemVideo.fileUrl" controls></video>
					</div>
					<div class="p-embed" v-else>
						<iframe v-if="post.itemVideo.urlSite === 'YOUTUBE'"
										:src="`https://www.youtube.com/embed/${post.itemVideo.videoUniqueId}`"
						        frameborder="0"
						        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
						        allowfullscreen>
						</iframe>
						<div v-else-if="post.itemVideo.urlSite === 'VIMEO'">
							<iframe :src="`https://player.vimeo.com/video/${post.itemVideo.videoUniqueId}`"
											frameborder="0"
											allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
											allowfullscreen>
							</iframe>
						</div>
					</div>
				</div>
				<div class="p-form__group">
					<div class="p-form__item">
						<input type="text" v-validate="'required'" name="title" v-model="post.title" placeholder="タイトルを入力"/>
						<span @click="handleUrlClear" class="p-form__item__clear-btn"><i class="far fa-times-circle"></i></span>
					</div>
					<span class="p-form__item-error" v-show="errors.has('title')">{{ errors.first('title') }}</span>
				</div>
				<div class="p-form__group">
					<div class="p-form__item">
						<textarea rows="10" v-model="post.comment" placeholder="コメントを入力"></textarea>
					</div>
				</div>
			</div>
		</form>

		<form v-else-if="post.type == 'SOUND'">

			<div v-show="post.itemSound.url === ''"
					 @click="handleSelectSound()" @dragleave.prevent @dragover.prevent @drop.prevent="handleDropSound" class="p-form__sound-upload">
				<div class="p-form__sound-upload__description">
					<img src="/img/form_icon_upload_sound@2x.png" alt="音声ファイルを追加">
					<span>音声ファイルを追加</span>
					<spinner :isActive="isSoundUploading"></spinner>
				</div>
				<input @change="handleInputSoundFile" ref="selectSound" type="file" accept="audio/mp3,audio/aac"/>
			</div>

			<div style="padding: 0 5%;">
				<div v-show="post.itemSound.url !== ''" class="p-form__sound-upload__content">
					<span @click="handleDeleteUploadedSound" class="p-form__sound-upload__content__delete-btn"><i class="fas fa-times"></i></span>
					<audio class="p-form__sound-upload__content__audio" controls :src="post.itemSound.url">ご使用の中のブラウザが<code>audio</code>要素に対応していません</audio>
				</div>
				<div class="p-form__group">
					<div class="p-form__thumbnail-list">
						<div v-for="(thumbImageItem, i) in thumbnailMediaList" :key="i" ref="thumbImageItem"
								 class="p-form__thumbnail-list__item" :class="{'p-form__thumbnail-list__item--disable': thumbImageItem.disabled}">
							<span v-show="thumbImageItem.url" @click="handleDeleteListThumbImage" class="p-form__thumbnail-list__item__delete-btn">
								<i :data-num="i" class="far fa-times-circle"></i></span>
							<img v-show="thumbImageItem.url" class="p-form__thumbnail-list__item__img" :src='thumbImageItem.url'>
							<label v-show="!thumbImageItem.url" class="p-form__thumbnail-list__item__label"
										 :class="{'p-form__thumbnail-list__item__label--disable': thumbImageItem.disabled}">
								<input :data-num="i" type="file" style="display:none" :disabled="thumbImageItem.disabled"
											 accept=".jpg,.gif,.png,image/gif,image/jpeg,image/png" @change="handleSelectListThumbImage"/>
								<spinner :isActive="thumbImageItem.isUploading"></spinner>
							</label>
						</div>
					</div>
				</div>
				<div class="p-form__group">
					<div class="p-form__item">
						<input type="text" v-validate="'required'" name="title" v-model="post.title" placeholder="タイトルを入力"/>
						<span @click="handleUrlClear" class="p-form__item__clear-btn"><i class="far fa-times-circle"></i></span>
					</div>
					<span class="p-form__item-error" v-show="errors.has('title')">{{ errors.first('title') }}</span>
				</div>
				<div class="p-form__group">
					<div class="p-form__item">
						<textarea rows="10" v-model="post.comment" placeholder="コメントを入力"></textarea>
					</div>
				</div>
			</div>
		</form>

		<form v-else-if="post.type == 'FILE'">
			<div v-show="!post.itemFile.url && !isFileUploadRetry" @click="handleSelectFile" @dragleave.prevent @dragover.prevent @drop.prevent="handleDropFile" class="p-form__file-upload">
				<div class="p-form__file-upload__description">
					<img src="/img/form_icon_upload_file@2x.png" alt="ファイルを追加">
					<span>ファイルを追加</span>
					<spinner :isActive="isFileUploading"></spinner>
				</div>
				<input @change="handleInputFile" ref="selectFile" type="file"/>
			</div>
			<div style="padding: 0 5%;">
				<div v-show="post.itemFile.url" class="p-form__group">
					<div class="p-form__item">
						<div class="p-form__upload-file">
							<span @click="handleDeleteUploadedFile" class="p-form__upload-file__delete-btn"><i class="fas fa-times"></i></span>
							<p class="p-form__upload-file__label">{{ post.itemFile.fileName }}</p>
							<p class="p-form__upload-file__text">{{ post.itemFile.fileSizeText }}</p>
						</div>
					</div>
				</div>
			</div>
			<div v-show="!post.itemFile.url && isFileUploadRetry" @click="handleSelectRetryFile" @dragleave.prevent @dragover.prevent @drop.prevent="handleDropFile" class="p-form__file-upload p-form__file-upload--retry">
				<div class="p-form__file-upload__description">
					<img src="/img/form_icon_upload_file@2x.png" alt="ファイルを追加">
					<span>ファイルを追加</span>
					<spinner :isActive="isFileUploading"></spinner>
				</div>
				<input @change="handleInputFile" ref="selectRetryFile" type="file" />
			</div>


			<div style="padding: 0 5%;">
				<div class="p-form__group">
					<div class="p-form__thumbnail-list">
						<div v-for="(thumbImageItem, i) in thumbnailMediaList" :key="i" ref="thumbImageItem"
								 class="p-form__thumbnail-list__item" :class="{'p-form__thumbnail-list__item--disable': thumbImageItem.disabled}">
							<span v-show="thumbImageItem.url" @click="handleDeleteListThumbImage" class="p-form__thumbnail-list__item__delete-btn">
								<i :data-num="i" class="far fa-times-circle"></i></span>
							<img v-show="thumbImageItem.url" class="p-form__thumbnail-list__item__img" :src='thumbImageItem.url'>
							<label v-show="!thumbImageItem.url" class="p-form__thumbnail-list__item__label"
										 :class="{'p-form__thumbnail-list__item__label--disable': thumbImageItem.disabled}">
								<input :data-num="i" type="file" style="display:none" :disabled="thumbImageItem.disabled"
											 accept=".jpg,.gif,.png,image/gif,image/jpeg,image/png" @change="handleSelectListThumbImage"/>
								<spinner :isActive="thumbImageItem.isUploading"></spinner>
							</label>
						</div>
					</div>
				</div>
				<div class="p-form__group">
					<div class="p-form__item">
						<input type="text" v-validate="'required'" name="title" v-model="post.title" placeholder="タイトルを入力"/>
						<span @click="handleUrlClear" class="p-form__item__clear-btn"><i class="far fa-times-circle"></i></span>
					</div>
					<span class="p-form__item-error" v-show="errors.has('title')">{{ errors.first('title') }}</span>
				</div>
				<div class="p-form__group">
					<div class="p-form__item">
						<textarea rows="10" v-model="post.comment" placeholder="コメントを入力"></textarea>
					</div>
				</div>
			</div>
		</form>

		<form v-else-if="post.type == 'ANSWER'">
			<div class="answer" style="padding: 0 5%;">
				<div class="request">
					<div class="request__body">
						<p v-html="post.itemAnswer.request.body.replace(/\n/g,'<br/>')"></p>
					</div>
					<span class="request__time">{{post.itemAnswer.request.createdAt}}</span>
				</div>

				<div class="p-form__group">
					<div class="p-form__item">
						<textarea rows="10" v-model="post.comment" placeholder="回答を入力">{{post.comment}}</textarea>
					</div>
					<div v-if="!isEdit && post.canShareTwitter" style="text-align: right; margin-top: 10px;">
						<input type="checkbox" id="share-twitter" true-value="1" false-value="0" v-model="shareTwitter">
						<label for="share-twitter" :class="{'is-checked': shareTwitter == '1'}">Twitterにも投稿</label>
					</div>
				</div>
			</div>
		</form>

		<Modal type="save_publish_setting"
		       title="公開設定"
		       actionMessage="公開する"
		       :onHandleAction="executePublishSetting"
		       :initialScope="(isEdit) ? post.scope : 'PUBLIC'">
		</Modal>

		<CropModal
			modalName="postText"
			actionMessage="OK"
			:post="post"
			:canvasWidth = 1280
			:canvasHeight = 670
			v-on:modalClose="handleCloseCropModal"
			ref="cropModal">
		</CropModal>

	</div>

</template>

<script>
	import Api from "~/plugins/api";
	import Editor from "../ui/editor";

	export default {
		components: {Editor},
		props: ['isEdit', 'post'],
		data() {
			return {
				isLoading:     this.post.isLoading,
				isDraftSaving: false,
				isSoundUploading: false,
				isVideoUploading: false,
				isVideoUrlInputing: false,
				isFileUploading: false,
				isFileUploadRetry: false,
				thumbnailMediaList: [
					{id: 'tmb01', url: '', isUploading: false, disabled: false, path: '', content_type: '', file_size: ''},
					{id: 'tmb02', url: '', isUploading: false, disabled: true, path: '', content_type: '', file_size: ''},
					{id: 'tmb03', url: '', isUploading: false, disabled: true, path: '', content_type: '', file_size: ''},
					{id: 'tmb04', url: '', isUploading: false, disabled: true, path: '', content_type: '', file_size: ''}
				],
				tmpDraftBody: this.post.itemText.draftBody, // draftBodyの更新を一時的に保持する
				tmpTitle:     this.post.title, // titleの更新を一時的に保持する
				shareTwitter: this.post.canShareTwitter ? '1' : '0', // SNS連携済み or 未連携

				// editor-js設定
				initData : (this.post.itemText.draftBody !== undefined && this.post.itemText.draftBody.hasOwnProperty('blocks') && this.post.itemText.draftBody.blocks.length > 0) ? this.post.itemText.draftBody : {},
			}
		},
		computed: {
			canPublishSetting() {
				if (this.isLoading) {
					return 0
				}

				if (this.post.type == 'LINK') {
					return (this.post.itemLink.linkTitle.length > 0)

				} else if (this.post.type == 'IMAGE') {
					const labels = Object.keys(this.$store.state.post.uploadedPostImages)
					return (this.post.title !== '' && labels.length > 0)

				} else if (this.post.type == 'VIDEO') {
					return (this.post.title !== '' && (this.post.itemVideo.videoUrl !== '' || this.post.itemVideo.fileUrl !== ''))

				} else if (this.post.type == 'SOUND') {
					return (this.post.title !== '' && this.post.itemSound.url !== '')

				} else if (this.post.type == 'ANSWER') {
					return (this.post.comment.length > 0)

				} else if (this.post.type == 'FILE') {
					return (this.post.title !== '' && this.post.itemFile.path !== '')
				}

				return true
			},
		},
		mounted() {
			if (this.post.type == 'FILE' || this.post.type == 'SOUND') {
				if(this.post.thumbnailMediaList && 0 < this.post.thumbnailMediaList.length) {
					this.post.thumbnailMediaList.map((v, i) => {
						this.thumbnailMediaList[i] = {
							id:           `tmb0${i + 1}`,
							url:          v.url,
							isUploading:  false,
							disabled:     false,
							path:         v.path,
							content_type: v.content_type,
							file_size:    v.file_size,
						}
					});
					if (this.post.thumbnailMediaList.length < this.thumbnailMediaList.length) {
						this.thumbnailMediaList[this.post.thumbnailMediaList.length].disabled = false;
					}
				};
			}
		},
		beforeDestroy() {
			this.$validator.reset()
		},
		methods: {
			////////////////////////
			// FORM全体の処理
			////////////////////////
			// ブログ以外の下書き保存処理
			async handleSaveDraft() {
				const validated = await this.$validator.validateAll()
				if (!validated) {
					return
				}

				this.isDraftSaving = true

				let params           = this.getParams(this.post.type)
				params['type']       = this.post.type
				params['scope']      = this.post.scope
				params['is_publish'] = 0
				if (this.isEdit) {
					params['label'] = this.post.label
				}
				// APIでは利用しないがstoreで利用する
				params['isEdit'] = this.isEdit

				await this.$store.dispatch("post/save", params);

				this.isDraftSaving = false

				if (!this.$store.state.post.isError) {
					// リダイレクト
					if (this.isEdit) {
						// 編集時は個別ページへ
						this.$router.push('/post/item/' + this.post.label)
					} else {
						// 新規追加時はダッシュボードへ
						this.$router.push('/dashboard/post/manage')
					}
				}
			},
			// 公開範囲設定の処理
			handlePublishSetting() {
				// 公開設定モーダルを表示

				if (this.post.type == 'TEXT') {
					// ブログ形式の場合、一時保存処理を行う
					this.saveTextDraftData(this.tmpTitle, this.tmpDraftBody)
				}

				this.$store.dispatch('modal/show')
			},
			async executePublishSetting(scope, publish_type) {
				// 公開設定の実行
				// scope: 全公開、メンバー限定
				// publish_type: すぐ公開、下書き保存
				const validated = await this.$validator.validateAll()
				if (!validated) {
					return
				}

				this.isLoading = true

				// 公開設定のAPI処理
				let params           = this.getParams(this.post.type)
				params['type']       = this.post.type
				params['scope']      = scope
				params['is_publish'] = (publish_type === 'public') ? 1 : 0
				if (this.isEdit) {
					params['label'] = this.post.label
				}
				// APIでは利用しないがstoreで利用する
				params['isEdit'] = this.isEdit

				await this.$store.dispatch("post/save", params);

				this.isLoading = false

				if (!this.$store.state.post.isError) {
					// 成功時のリダイレクト
					if (this.isEdit) {
						// 編集時は個別ページへ
						this.$router.push('/post/item/' + this.post.label)
					} else {
						// 新規追加時はダッシュボードへ
						this.$router.push('/dashboard/post/manage')
					}
				}
			},
			getParams(type) {
				let params = {}
				if (type == 'TEXT') {
					params = this.getParamsForText()

				} else if (type == 'LINK') {
					params = this.getParamsForLink()

				} else if (this.post.type == 'IMAGE') {
					params = this.getParamsForImage()

				} else if (this.post.type == 'VIDEO') {
					params = this.getParamsForVideo()

				} else if (this.post.type == 'SOUND') {
					params = this.getParamsForSound()

				} else if (this.post.type == 'FILE') {
					params = this.getParamsForFile()

				} else if (this.post.type == 'ANSWER') {
					params = this.getParamsForAnswer()
				}
				return params
			},
			getParamsForText() {
				const params = {
					label:                this.post.label,
					thumbnail_image_path: this.post.thumbnailImagePath,
				}
				return params
			},
			getParamsForLink() {
				const params = {
					title:   this.post.title,
					comment: this.post.comment,

					link_url:                 this.post.itemLink.linkUrl,
					link_title:               this.post.itemLink.linkTitle,
					link_description:         this.post.itemLink.linkDescription,
					link_site_name:           this.post.itemLink.linkSiteName,
					link_thumbnail_image_url: this.post.itemLink.linkThumbnailImageUrl,
					link_content_media_type:  this.post.itemLink.linkContentMediaType,
					link_content_media_url:   this.post.itemLink.linkContentMediaUrl,
					link_site_type:           this.post.itemLink.linkSiteType,
					link_unique_id:           this.post.itemLink.linkUniqueId,
				}
				return params
			},
			getParamsForImage() {
				const labels = Object.keys(this.$store.state.post.uploadedPostImages);
				if (labels.length === 0) {
					return {}
				}

				const params = {
					title:                    this.post.title,
					comment:                  this.post.comment,
					post_upload_image_labels: labels,
				}
				return params
			},
			getParamsForVideo() {
				const params = (this.post.itemVideo.path !== '')
					? {
						title:   this.post.title,
						comment: this.post.comment,
						path:         this.post.itemVideo.path,
						content_type: this.post.itemVideo.contentType,
						file_name:    this.post.itemVideo.fileName,
						file_size:    this.post.itemVideo.fileSize,
					}: {
						title:   this.post.title,
						comment: this.post.comment,
						url:          this.post.itemVideo.videoUrl,
						url_site:     this.post.itemVideo.urlSite,
						url_id:       this.post.itemVideo.videoUniqueId,
					}
				return params
			},
			getParamsForSound() {
				const params = {
					title:        this.post.title,
					comment:      this.post.comment,
					url:          this.post.itemSound.url,
					path:         this.post.itemSound.path,
					content_type: this.post.itemSound.contentType,
					file_size:    this.post.itemSound.fileSize,
					thumbnail_media_list: this.getParamsThumbnailMediaList(this.thumbnailMediaList),
				}
				return params
			},
			getParamsForFile() {
				const params = {
					title:                this.post.title,
					comment:              this.post.comment,
					file_name:            this.post.itemFile.fileName,
					path:                 this.post.itemFile.path,
					content_type:         this.post.itemFile.contentType,
					file_size:            this.post.itemFile.fileSize,
					thumbnail_media_list: this.getParamsThumbnailMediaList(this.thumbnailMediaList),
				}
				return params
			},
			getParamsForAnswer() {
				const params = {
					comment:       this.post.comment,
					request_label: this.post.itemAnswer.request.label,
					share_twitter: this.shareTwitter,
				}
				return params
			},
			getParamsThumbnailMediaList(thumbnailMediaList) {
				const _thumbnailMediaList = []
				thumbnailMediaList.filter(v => v.url !== '').map(v => {
					_thumbnailMediaList.push({
						path:         v.path,
						content_type: v.content_type,
						file_size:    v.file_size,
					});
				})
				return _thumbnailMediaList
			},

			////////////////////////
			// TEXTタイプのeditor・API処理
			////////////////////////
			// ブログサムネイル処理
			handleSelectTextThumbnailImage() {
				const input = document.querySelector('#form-select-text-thumbnail-image');
				input.click();
			},
			handleInputTextThumbnailImageFile(e) {
				e.preventDefault();
				if (e.target.files.length > 0) {
					this.$store.dispatch('cropModal/show')
					this.$refs.cropModal.setCanvasImage(e)
				}
			},
			handleDeleteThumbnailImage() {
				this.post.thumbnailImagePath = ''
				this.post.thumbnailImageUrl  = ''
			},
			handleCloseCropModal() {
				this.$refs.fileinput.value = "";
			},

			// editor.jsの処理、更新系の処理
			onReady() {
				// console.log('editor ready')
			},
			onChange(response) {
				// stateの更新でeditorのフォーカスがトップになってしまう問題を回避

				// 一時保存処理
				if (this.tmpDraftBody != response) {
					this.tmpDraftBody = response

					this.saveTextDraftData(this.tmpTitle, response)
				}
			},
			handleTextSave(response) {
				// ブログ形式の下書き保存ボタンのクリック時の処理
				// #text-saving-btnの保存ボタンをクリックした際に、editor.vueからemitされてこのイベント発生する
				this.saveTextDraftData(this.tmpTitle, response)

				if (!this.$store.state.post.isError) {
					let message = (this.post.isPublished) ? '一時保存しました。' : '下書き保存しました。'
					this.$store.dispatch('flashMessage/showSuccess', message)

					// リダイレクト
					if (this.isEdit) {
						// 編集時は個別ページへ
						this.$router.push('/post/item/' + this.post.label)
					} else {
						// 新規追加時はダッシュボードへ
						this.$router.push('/dashboard/post/manage')
					}
				} else {
					let message = (this.post.isPublished) ? '一時保存に失敗しました。' : '下書き保存に失敗しました。'
					this.$store.dispatch('flashMessage/showError', message)
				}
			},
			// titleの更新処理
			handleTitleEdit(e) {
				if (this.tmpTitle === e.target.innerHTML) {
					return
				}

				// this.post.title = e.target.innerHTML
				this.tmpTitle = e.target.innerHTML

				this.saveTextDraftData(this.tmpTitle, this.tmpDraftBody)
			},
			// タイトル入力中に改行を不可にする
			handleTitleEditKeyDown(e) {
				if (e.keyCode == 13) {
					e.target.blur()
					return false
				}
			},
			async saveTextDraftData(title, body) {
				if (this.isDraftSaving) {
					//保存中は更新しない
					console.log('skip text saving')
					return
				}

				this.isDraftSaving = true

				await this.$store.dispatch("post/saveDraftText", {
					label:              this.post.label,
					title:              title,
					draftBody:          (body) ? body : '',
					thumbnailImagePath: this.post.thumbnailImagePath,
				});

				this.post.label = this.$store.state.post.label

				this.isDraftSaving = false
			},

			////////////////////////
			// 画像タイプのPOST処理
			////////////////////////
			handleDeleteUploadedImage(e) {
				const uploadedPostImageLabel = e.currentTarget.dataset.label
				console.log(uploadedPostImageLabel)

				this.$store.dispatch("post/deleteUploadedPostImageByLabel", uploadedPostImageLabel);

				console.log(this.$store.state.post.uploadedPostImages)
			},
			handleSelectImages() {
				const input = document.querySelector('#form-select-image');
				input.click();
			},
			handleInputImageFile(e) {
				e.preventDefault();
				if (e.target.files.length === 0) {
					return
				}

				this.uploadImages(e.target.files)
			},
			handleDropImages(e) {
				const fileList = e.dataTransfer.files;
				if (fileList.length === 0) {
					return
				}

				this.uploadImages(fileList)
			},
			async uploadImages(selectedImages) {
				console.log(selectedImages)

				// upload
				for (let i = 0; i < selectedImages.length; i++) {
					let image = selectedImages[i];
					console.log(image)
					this.$store.dispatch("post/uploadImage", {
						fileData: image
					});
				}
			},

			////////////////////////
			// URLタイプのPOST処理
			////////////////////////
			handleUrlClear() {
				this.post.title   = ''
				this.post.comment = ''

				this.post.itemLink.linkUrl               = ''
				this.post.itemLink.linkTitle             = ''
				this.post.itemLink.linkDescription       = ''
				this.post.itemLink.linkSiteName          = ''
				this.post.itemLink.linkThumbnailImageUrl = ''
				this.post.itemLink.linkContentMediaType  = ''
				this.post.itemLink.linkContentMediaUrl   = ''
				this.post.itemLink.linkSiteType          = ''
				this.post.itemLink.linkUniqueId          = ''
				this.post.itemLink.fetchedUrl            = ''
			},
			async handlePasteGetInfoLinkUrl(e) {
				const linkUrl = e.clipboardData.getData('text');
				if (linkUrl.length === 0) {
					return
				}

				this.post.itemLink.fetchedUrl = linkUrl

				await this.getInfoLinkUrl(linkUrl)

				// フォーカス外す
				e.target.blur()
			},
			async handleFocusOutGetInfoLinkUrl() {
				if (this.post.itemLink.linkUrl.length === 0 || this.post.itemLink.fetchedUrl === this.post.itemLink.linkUrl) {
					return
				}

				this.post.itemLink.fetchedUrl = this.post.itemLink.linkUrl

				this.getInfoLinkUrl(this.post.itemLink.linkUrl)
			},
			async getInfoLinkUrl(linkUrl) {
				// 独自にURLチェック
				if (!linkUrl.match(/^(https?|ftp)(:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+)$/)) {
					console.log('invalid url')
					return
				}

				await this.$store.dispatch("post/getInfoLinkUrl", {
					linkUrl: linkUrl
				});

				if (!this.$store.state.post.isError) {
					this.post.itemLink.linkTitle             = this.$store.state.post.itemLink.title
					this.post.itemLink.linkDescription       = this.$store.state.post.itemLink.description
					this.post.itemLink.linkSiteName          = this.$store.state.post.itemLink.siteName
					this.post.itemLink.linkThumbnailImageUrl = this.$store.state.post.itemLink.thumbnailImageUrl
					this.post.itemLink.linkContentMediaType  = this.$store.state.post.itemLink.contentMediaType
					this.post.itemLink.linkContentMediaUrl   = this.$store.state.post.itemLink.contentMediaUrl
					this.post.itemLink.linkSiteType          = this.$store.state.post.itemLink.siteType
					this.post.itemLink.linkUniqueId          = this.$store.state.post.itemLink.uniqueId
				}
			},

			////////////////////////
			// VIDEOタイプのPOST処理
			////////////////////////
			handleVideoClear() {
				this.post.title   = ''
				this.post.comment = ''
				if(this.post.itemVideo.path !== '') {
					this.$store.dispatch("post/clearVideo")
					this.post.itemVideo.path        = ''
					this.post.itemVideo.contentType = ''
					this.post.itemVideo.fileSize    = ''
					this.post.itemVideo.fileName    = ''
					this.$refs.selectVideo.value = ''
				}
				this.post.itemVideo.urlSite       = ''
				this.post.itemVideo.videoUrl      = ''
				this.post.itemVideo.videoUniqueId = ''
			},
			async handlePasteGetInfoVideoUrl(e) {
				const videoUrl = e.clipboardData.getData('text');
				if (videoUrl.length === 0) {
					return
				}
				this.post.itemVideo.fetchedUrl = videoUrl

				this.getInfoVideoUrl(videoUrl)

				// フォーカス外す
				e.target.blur()
			},
			handleSelectVideo() {
				this.$refs.selectVideo.click();
			},
			handleInputVideoFile(e) {
				const files = e.target.files;
				if (0 < files.length && !this.isVideoUploading) {
					this.uploadVideo(files[0])
				}
			},
			handleDropVideo(e) {
				const fileList = e.dataTransfer.files;
				const soundReg = /^(video\/.*)$/;
				if (0 < fileList.length && !this.isVideoUploading && soundReg.test(fileList[0].type)) {
					this.uploadVideo(fileList[0])
				}
			},
			async uploadVideo(selectedVideo) {
				this.isVideoUploading = true
				console.log(selectedVideo)
				// upload
				await this.$store.dispatch("post/uploadVideo", {
					fileData: selectedVideo
				});
				this.post.itemVideo.fileUrl     = this.$store.state.post.itemVideo.fileUrl
				this.post.itemVideo.path        = this.$store.state.post.itemVideo.path
				this.post.itemVideo.contentType = this.$store.state.post.itemVideo.contentType
				this.post.itemVideo.fileSize    = this.$store.state.post.itemVideo.fileSize
				this.post.itemVideo.fileName    = selectedVideo.name.match(/(.*)\.[^.]+$/)[1] || ''
				this.isVideoUploading           = false
			},
			handleFocusVideoUrlInput() {
				this.isVideoUrlInputing = true
			},
			async handleFocusOutGetInfoVideoUrl() {
				this.isVideoUrlInputing = false
				if (this.post.itemVideo.videoUrl.length === 0 || this.post.itemVideo.fetchedUrl === this.post.itemVideo.videoUrl) {
					return
				}

				this.post.itemVideo.fetchedUrl = this.post.itemVideo.videoUrl

				this.getInfoVideoUrl(this.post.itemVideo.videoUrl)
			},
			getInfoVideoUrl(videoUrl) {
				// 独自にURLチェック
				if (!videoUrl.match(/^(https?|ftp)(:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+)$/)) {
					console.log('invalid url')
					return
				}
				const youtubePattern = /(?:https:\/\/)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/
				const vimeoPattern   = /(?:https:\/\/)?vimeo\.com(?:\/.*|.*\/videos)?(?:\/)(.+)/
				const isYoutube      = youtubePattern.test(videoUrl)
				const isVimeo        = vimeoPattern.test(videoUrl)
				const matchYoutube   = videoUrl.match(/(?:\?v=([^&]+)|be\/(.*))/)
				const matchVimeo     = videoUrl.match(vimeoPattern);
				const youtubeId      = isYoutube ? (matchYoutube[1] || matchYoutube[2]) : null
				const vimeoId        = isVimeo ? matchVimeo[1] : null
				const videoId        = youtubeId || vimeoId

				this.post.itemVideo.videoUrl      = videoUrl
				this.post.itemVideo.videoUniqueId = videoId
				this.post.itemVideo.urlSite       = youtubeId ? 'YOUTUBE' : 'VIMEO'
			},

			////////////////////////
			// 音声タイプのPOST処理
			////////////////////////
			handleDeleteUploadedSound(e) {
				this.post.itemSound.url         = ''
				this.post.itemSound.path        = ''
				this.post.itemSound.contentType = ''
				this.post.itemSound.fileSize    = ''
			},
			handleSelectSound() {
				this.$refs.selectSound.click();
			},
			handleInputSoundFile(e) {
				const files = e.target.files;
				if (0 < files.length && !this.isSoundUploading) {
					this.uploadSound(files[0])
				}
			},
			handleDropSound(e) {
				const fileList = e.dataTransfer.files;
				const soundReg = /^(audio\/mp3|audio\/aac)$/;
				if (0 < fileList.length && !this.isSoundUploading && soundReg.test(fileList[0].type)) {
					this.uploadSound(fileList[0])
				}
			},
			async uploadSound(selectedSound) {
				this.isSoundUploading = true
				// upload
				await this.$store.dispatch("post/uploadSound", {
					fileData: selectedSound
				});
				this.post.itemSound.url         = this.$store.state.post.itemSound.url
				this.post.itemSound.path        = this.$store.state.post.itemSound.path
				this.post.itemSound.contentType = this.$store.state.post.itemSound.contentType
				this.post.itemSound.fileSize    = this.$store.state.post.itemSound.fileSize
				this.isSoundUploading           = false
			},

			////////////////////////
			// ファイルタイプのPOST処理
			////////////////////////
			handleDeleteUploadedFile(e) {
				console.log("handleDeleteUploadedFile call")
				this.isFileUploadRetry          = true
				this.post.itemFile.fileName     = ''
				this.post.itemFile.url          = ''
				this.post.itemFile.path         = ''
				this.post.itemFile.contentType  = ''
				this.post.itemFile.fileSize     = ''
				this.post.itemFile.fileSizeText = ''
			},
			handleSelectFile() {
				this.$refs.selectFile.click()
			},
			handleSelectRetryFile() {
				this.$refs.selectRetryFile.click()
			},
			handleInputFile(e) {
				const files = e.target.files;
				if (0 < files.length && !this.isFileUploading) {
					this.uploadFile(files[0])
				}
			},
			handleDropFile(e) {
				const fileList = e.dataTransfer.files;
				if (0 < fileList.length && !this.isFileUploading) {
					this.uploadFile(fileList[0])
				}
			},
			async uploadFile(selectedFile) {
				this.isFileUploading = true;
				// upload
				await this.$store.dispatch("post/uploadFile", {
					fileData: selectedFile
				});
				this.post.itemFile.fileName     = selectedFile.name.match(/(.*)\.[^.]+$/)[1] || ''
				this.post.itemFile.url          = this.$store.state.post.itemFile.url
				this.post.itemFile.path         = this.$store.state.post.itemFile.path
				this.post.itemFile.contentType  = this.$store.state.post.itemFile.contentType
				this.post.itemFile.fileSize     = this.$store.state.post.itemFile.fileSize
				this.post.itemFile.fileSizeText = this.$store.state.post.itemFile.fileSizeText
				this.isFileUploading            = false
			},
			toBase64(file){
				return new Promise((resolve, reject) => {
					const reader = new FileReader()
					reader.readAsDataURL(file)
					reader.onerror = error => reject(error)
					reader.onload  = () => resolve(reader.result)
				})
			},
			dataURItoBlob(base64Image) {
				const bin = atob(base64Image.split("base64,")[1])
				const len = bin.length
				const barr = new Uint8Array(len)
				let i = 0
				while (i < len) {
					barr[i] = bin.charCodeAt(i)
					i++
				}
				return new Blob([barr], {type: 'image/jpeg'})
			},
			async handleSelectListThumbImage(e) {
				const files = e.target.files;
				if (0 < files.length) {
					const target = this.thumbnailMediaList[e.target.dataset.num];
					if (parseInt(e.target.dataset.num) + 1 < this.thumbnailMediaList.length) {
						const nextTarget = this.thumbnailMediaList[parseInt(e.target.dataset.num) + 1];
						nextTarget.disabled = false;
					}
					target.isUploading = true
					const base64Image  = await this.toBase64(files[0])
					const blobImage    = this.dataURItoBlob(base64Image)
					const data         = new FormData()
					data.append('file_data', blobImage)

					const result        = await Api.uploadPostThumbnailImage(data, this.$store.state.user.authorizationToken)
					target.url          = result.data.url
					target.path         = result.data.path
					target.content_type = result.data.content_type
					target.file_size    = result.data.file_size
					target.isUploading  = false
				}
				this.thumbnailMediaList.splice()
			},
			handleDeleteListThumbImage(e) {
				this.thumbnailMediaList[e.target.dataset.num].url = '';
				const tmps = this.thumbnailMediaList.filter(v => v.url !== '').map(v => {
					return {
						url:          v.url,
						path:         v.path,
						content_type: v.content_type,
						file_size:    v.file_size,
					}
				})
				this.thumbnailMediaList.forEach((v, i) => {
					v.url = '';
					if (i !== 0) {
						v.disabled = true;
					}
				})
				tmps.push('');
				tmps.forEach((tmp, i) => {
					if (tmp !== '') {
						this.thumbnailMediaList[i].url          = tmp.url
						this.thumbnailMediaList[i].path         = tmp.path
						this.thumbnailMediaList[i].content_type = tmp.content_type
						this.thumbnailMediaList[i].file_size    = tmp.file_size
					}
					this.thumbnailMediaList[i].disabled = false
				})
				this.thumbnailMediaList.splice()
			}
		}
	}

</script>

<style lang="scss">
	.request {
		background-color: $color_main_light;
		border-radius: 4px;
		padding: 16px;
		margin-bottom: 20px;
		&__body {
			margin-bottom: 20px;
		}
		&__time {
			font-size: 12px;
			color: $color_gray;
		}

		&__thumbnail {
			width: 100%;
			&__wrapper {
				position: relative;
				width: 100%;
				padding-top: 100%;
				svg {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>