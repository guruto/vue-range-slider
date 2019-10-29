<template>
	<div class="design-settings">
		<h1 class="c-title">デザイン設定</h1>
		<section class="c-section">
			<div>
				<div class="p-form">
					<form @submit.prevent="update">

						<div class="p-form__group">
							<label class="p-form__item__toggle-label p-form__item__toggle--no-margin">ヘッダー画像を使用する</label>
							<ToggleButton class="p-form__item__toggle"
							              :value="showHedaderUpload" @change="showHedaderUpload = !showHedaderUpload"
							              :width="34" :height="14"
							              :color="{checked: '#C3D9E6', unchecked: '#CCCCCC'}"
							              :switch-color="{checked: '#179ee6', unchecked: '#FFFFFF'}"
							/>
							<div v-for="(headerImage, index) in headerMediaList" v-bind:key="index"
							     v-show="showHedaderUpload && 0 < headerMediaList.length" class="p-form__thumbnail__content">
								<span @click="handleDeleteHeaderImage(index)" class="p-form__thumbnail__content__delete-btn"><i class="far fa-times-circle"></i></span>
								<img class="p-form__thumbnail__content__image" :src="headerImage.thumbnailImageUrl">
							</div>
							<p v-if="headerImageUploadMax <= headerMediaList.length">選択可能な画像数は4枚です</p>
							<div v-show="showHedaderUpload" class="p-form__upload-file-label p-form__upload-file-label--header">
								<img src='/img/icon_design_image@2x.png' alt=''>
								<span>ヘッダー画像をアップロード</span>
								<div class="p-form__label__spinner">
									<spinner :isActive="loading.isHedaderUploading"></spinner>
								</div>

								<input ref="fileinput" type="file" id="form-select-text-thumbnail-image"
								       accept=".jpg,.gif,.png,image/gif,image/jpeg,image/png"
								       :disabled="headerImageUploadMax <= headerMediaList.length"
								       @change="handleInputHeaderImageFile"/>
							</div>
						</div>

						<div class="p-form__group">
							<label class="p-form__item__toggle-label">ロゴ画像を使用する</label>
							<ToggleButton class="p-form__item__toggle p-form__item__toggle--no-margin"
								:value="showLogoUpload" @change="showLogoUpload = !showLogoUpload"
								:width="34" :height="14"
								:color="{checked: '#C3D9E6', unchecked: '#CCCCCC'}"
								:switch-color="{checked: '#179ee6', unchecked: '#FFFFFF'}"
								/>
							<div v-show="showLogoUpload && !logoImageData.thumbnailImagePath" class="p-form__upload-file-label p-form__upload-file-label--logo">
								<img src='/img/icon_design_image@2x.png' alt=''>
								<span>ロゴ画像をアップロード</span>
								<div class="p-form__label__spinner">
									<spinner :isActive="loading.isLogoUploading"></spinner>
								</div>
								<input type="file" id="form-select-text-thumbnail-image"
									accept=".jpg,.gif,.png,image/gif,image/jpeg,image/png"
									@change="handleInputLogoImageFile"/>
							</div>
							<div v-show="showLogoUpload && logoImageData.thumbnailImagePath" class="p-form__thumbnail__content">
								<span @click="handleDeleteLogoImage" class="p-form__thumbnail__content__delete-btn"><i class="far fa-times-circle"></i></span>
								<img class="p-form__thumbnail__content__image" :src="logoImageData.thumbnailImageUrl">
							</div>
						</div>

						<div class="p-form__button">
							<button :class="{'c-btn': true, 'c-btn--main': true, 'is-loading': loading.isLoading}" type="submit"
							 :disabled="loading.isLoading" @click="update">変更</button>
						</div>
					</form>
				</div>
			</div>
		</section>
		<CropModal
			modalName = "design"
			actionMessage="OK"
			:post="headerImageData"
			:canvasWidth = 1080
			:canvasHeight = 360
			:loading = loading
			v-on:modalClose="modalClose"
			v-on:modalUpdate="modalUpdate"
			ref="cropModal"></CropModal>
	</div>
</template>

<script>
	import Api from "~/plugins/api";
	import Meta from '~/assets/mixins/meta'

	export default {
		layout: 'dashboard',
		mixins: [Meta],
		data() {
			return {
				loading: {
					isLoading: false,
					isLogoUploading: false,
					isHedaderUploading: false,
				},
				showLogoUpload: true,
				showHedaderUpload: true,
				error: null,
				meta: {
					title: 'デザイン設定',
					description: 'PAGEFUL（ペイジフル）のデザイン設定ページ',
				},
				logoImageData: {
					thumbnailImagePath: "",
					thumbnailImageUrl:  "",
				},
				headerImageData: {
					thumbnailImagePath: "",
					thumbnailImageUrl:  "",
				},
				headerMediaList: [{
					thumbnailImagePath: "",
					thumbnailImageUrl:  "",
				}],
				headerImageUploadMax: 4
			}
		},
		async asyncData(context) {
			await context.store.dispatch("design/getMyself", {});
			return {
				logoImageData: {
					 thumbnailImagePath: context.store.state.design.logo_media_path || "",
					 thumbnailImageUrl: context.store.state.design.logo_media_url || "",
				},
				headerMediaList: [...context.store.state.design.header_media_list] || [],
			}
		},
		computed: {
			currentTabComponent() {
				return this.currentTab;
			},
	  },
		methods: {
			handleInputLogoImageFile(e) {
				e.preventDefault();
				if (e.target.files.length > 0) {
					this.uploadThumbnailImage(e.target.files[0])
				}
			},
			handleInputHeaderImageFile(e) {
				e.preventDefault();
				if (e.target.files.length > 0) {
					this.$store.dispatch('cropModal/show')
					this.$refs.cropModal.setCanvasImage(e)
				}
			},
			handleDeleteLogoImage(e) {
				this.logoImageData.thumbnailImagePath = ''
				this.logoImageData.thumbnailImageUrl  = ''
			},
			handleDeleteHeaderImage(index) {
				this.headerMediaList.splice(index, 1);
			},
			async uploadThumbnailImage(selectedImage) {
				this.loading.isLogoUploading = true;
				const data = new FormData();
				data.append('file_data', selectedImage);
				data.append('type', 'header');
				const result = await Api.uploadPageDesignImage(data, this.$store.state.user.authorizationToken);
				if (!result.data.is_error) {
					this.logoImageData.thumbnailImagePath = result.data.path;
					this.logoImageData.thumbnailImageUrl = result.data.url;
				} else {
					// todo エラー処理
				}
				this.loading.isLogoUploading = false;
			},
			modalUpdate(e) {
				this.headerMediaList = [...this.headerMediaList, {thumbnailImagePath: e.path, thumbnailImageUrl:  e.url,}]
				this.headerImageData = {
					thumbnailImagePath: "",
					thumbnailImageUrl:  "",
				};
				this.$refs.fileinput.value = "";
			},
			modalClose() {
				this.$refs.fileinput.value = "";
			},
			async update() {
				this.loading.isLoading = true;
				await this.$store.dispatch("design/edit", {
					logo_media_path: this.showLogoUpload ? this.logoImageData.thumbnailImagePath : '',
					header_media_path_list: this.showHedaderUpload ? this.headerMediaList.map(v => v.thumbnailImagePath) : []
				});
				this.loading.isLoading = false;
				window.scrollTo(0,0);
			},
		}
	}
</script>

<style lang="scss">
	.design-settings{
		.vue-js-switch .v-switch-core .v-switch-button {
			width: 20px !important;
			height: 20px !important;
			top: -6px !important;
	        left: -6px !important;
			filter: drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.21));
		}

	}
</style>