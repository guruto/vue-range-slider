<template>
	<div v-if="isActive" class="c-modal">
		<div v-if="isActive" class="c-modal__backdrop" @click="hideModal"></div>

		<transition name="c-modal__transition">
			<div class="c-modal__content crop-modal" :style="{ maxWidth:modalWidth? modalWidth+ 'px' : 'initial' }" >
				<div class="c-modal__content__body">
					<div class="c-modal__content__body__add-post">
						<div class="crop-modal__canvas-frame">
							<no-ssr>
							<canvas
								ref="canvas"
								:style="{ borderRadius:isProfile ? 50+ '%' : 0 }"
								:width="canvasWidth"
								:height="canvasHeight"
								@touchstart.prevent="onMouseDown($event)"
								@mousedown.prevent="onMouseDown($event)"
								@touchend.prevent="onMouseUp($event)"
								@mouseout.prevent="onMouseUp($event)"
								@mouseup.prevent="onMouseUp($event)"
								@touchmove.prevent="moveImage($event)"
								@mousemove.prevent="moveImage($event)"
								></canvas>
								</no-ssr>
						</div>
						<vue-range-slider ref="slider"
							:value='scale' :min=1 :max=30 :step=0.1 @slide-end="scaling"></vue-range-slider>
					</div>
				</div>
				<div class="c-modal__content__action">
					<div v-if="actionMessage" class="c-modal__content__action__btn-wrapper is-action">
						<button @click="handleButtonAction" class="c-btn c-btn--main">{{actionMessage}}</button>
					</div>
					<div class="c-modal__content__action__btn-wrapper">
						<button @click="handleButtonCancel" class="c-btn c-btn--default">キャンセル</button>
					</div>
				</div>
			</div>
		</transition>

	</div>
</template>

<script>
	import Api from "~/plugins/api";
	import loadImage from 'blueimp-load-image';
	export default {
		props: [
			'modalName', 'modalWidth', 'canvasWidth', 'canvasHeight', 'loading',
			'actionMessage', 'cancelMessage', 'onHandleAction', 'onHandleCancel', 'post'],
		data() {
			return {
				iw: 0,
				ih: 0,
				ix: 0,
				iy: 0,
				sx: 0,
				sy: 0,
				scale: 1,
				image: undefined,
				isMouseDown: false,
			}
		},
		computed: {
			isActive() {
				return this.$store.getters['cropModal/isActive']
			},
			isProfile() {
				return this.modalName === "profile"
			}
		},
		mounted() {
			if (process.browser) {
				window.addEventListener(
					'resize',
					this.scaling(this.image, this.ix, this.iy, this.scale),
					false);
			}
		},
		beforeDestroy: function () {
			if (process.browser) {
				window.removeEventListener(
					'resize',
					this.scaling(this.image, this.ix, this.iy, this.scale),
					false);
			}
		},
		methods: {
			setCanvasImage(e) {
				const file = e.target.files[0];
				this.load(file, loadedCanvas => this.loadCanvas(loadedCanvas));
			},
			load(file, callback) {
				const options = {canvas: true};
				const _this = this;
				loadImage.parseMetaData(file, data => {
					if (data.exif) {
						options.orientation = data.exif.get('Orientation');
					}
					loadImage(file, callback, options);
				});
			},
			loadCanvas(loadedCanvas) {
				this.image = new Image();
				this.image.crossOrigin = 'Anonymous';
				this.image.src = loadedCanvas.toDataURL('image/jpeg');
				this.image.onload = _ => {
					const iw = this.iw = loadedCanvas.width;
					const ih = this.ih = loadedCanvas.height;
					const canvas = this.$refs.canvas;
					const cw = this.$refs.canvas.width;
					const ch = this.$refs.canvas.height;
					let ratio = 1;

					if (cw < iw && ch < ih && (ch/cw <= ih/iw)) {
						ratio = iw / cw;
						this.image.width = iw / ratio;
						this.image.height = ih / ratio;
						this.ix = this.image.width / 2;
						this.iy = this.image.height / 2;
					} else if(cw < iw && ch < ih && (cw/ch < iw/ih)) {
						ratio = ih > iw ? iw / cw :  ih / ch;
						this.image.width = iw / ratio;
						this.image.height = ih / ratio;
						this.ix = this.image.width / 2;
						this.iy = this.image.height / 2;
					} else if(iw < cw && (ch/ih <= cw/iw)) {
						ratio = cw / iw;
						this.image.width = cw;
						this.image.height = ih * ratio;
						this.ix = this.image.width / 2;
						this.iy = this.image.height / 2;
					} else if(ih < ch) {
						ratio = ch / ih
						this.image.height = ch;
						this.image.width = iw * ratio;
						this.ix = this.image.width / 2;
						this.iy = this.image.height / 2;
					} else {
						this.ix = this.image.width / 2;
						this.iy = this.image.height / 2;
					}
					canvas.getContext('2d').drawImage(this.image,
						0, 0, iw, ih,
						cw / 2 - this.ix, ch / 2 - this.iy,
						this.image.width, this.image.height);
				};
			},
			scaling() {
				if(this.$refs.canvas) {
					this.scale = this.$refs.slider.val;
					this.drawImage(this.image, this.ix, this.iy, this.scale);
				}
			},
			drawImage(image, ix, iy, scale, isMouseUp=false) {
				if(image && this.$refs.canvas) {
					const canvas = this.$refs.canvas;
					const cw = canvas.width;
					const ch = canvas.height;
					const ctx = canvas.getContext('2d');
					const dx = cw / 2 - ix * scale;
					const dy = ch / 2 - iy * scale;
					const dw = image.width * scale;
					const dh = image.height * scale;
					const canMoveXR = -dx <= (image.width * scale - canvas.width)
					const canMoveXL = dx <= 0;
					const canMoveYT = dy <= 0;
					const canMoveYB = -dy <= (image.height * scale - canvas.height)
					if (!canMoveXR && canMoveXL && canMoveYT && canMoveYB) {
						ctx.clearRect(0, 0, cw, ch);
						ctx.drawImage(image,
							0, 0, this.iw, this.ih,
							(image.width * scale - canvas.width) * -1, dy, dw, dh)
					} else if (canMoveXR && !canMoveXL && canMoveYT && canMoveYB) {
						ctx.clearRect(0, 0, cw, ch);
						ctx.drawImage(image,
							0, 0, this.iw, this.ih,
							0, dy, dw, dh);
					} else if (canMoveXR && canMoveXL && !canMoveYT && canMoveYB) {
						ctx.clearRect(0, 0, cw, ch);
						ctx.drawImage(image,
							0, 0, this.iw, this.ih,
							dx, 0, dw, dh);
					} else if (canMoveXR && canMoveXL && canMoveYT && !canMoveYB) {
						ctx.clearRect(0, 0, cw, ch);
						ctx.drawImage(image,
							0, 0, this.iw, this.ih,
							dx, (image.height * scale - canvas.height) * -1, dw, dh);
					}
					else if (canMoveXR && canMoveXL && canMoveYT && canMoveYB) {
						ctx.clearRect(0, 0, cw, ch);
						ctx.drawImage(image,
							0, 0, this.iw, this.ih,
							dx, dy, dw, dh);
					}
					if (isMouseUp) {
						this.ix = ix;
						this.iy = iy;
					}
				}
			},
			onMouseDown(e) {
				this.isMouseDown = true;
				this.sx = e.pageX || e.touches[0].clientX;
				this.sy = e.pageY || e.touches[0].clientY;
			},
			onMouseUp(e) {
				if (this.isMouseDown) {
					this.isMouseDown = false;
					this.drawImage(
						this.image,
						this.ix + (this.sx - (e.pageX || e.changedTouches[0].clientX)) / this.scale,
						this.iy + (this.sy - (e.pageY || e.changedTouches[0].clientY)) / this.scale,
						this.scale,
						true);
				}
			},
			moveImage(e){
				if (this.isMouseDown) {
					this.drawImage(
						this.image,
						this.ix + (this.sx - (e.pageX || e.touches[0].clientX)) / this.scale,
						this.iy + (this.sy - (e.pageY || e.touches[0].clientY)) / this.scale,
						this.scale);
				}
			},
			async uploadImage(canvas) {
				const dataUrl = canvas.toDataURL('image/jpeg');
				const blob = this.dataURItoBlob(dataUrl);
				// upload
				const data = new FormData();
				data.append('file_data', blob);
				// DB保存はここでしない
				let result;
				if(this.modalName === "postText") {
					result = await Api.uploadPostThumbnailImage(data, this.$store.state.user.authorizationToken);
				} else if(this.modalName === "design") {
					this.loading.isHedaderUploading = true;
					data.append('type', 'header')
					result = await Api.uploadPageDesignImage(data, this.$store.state.user.authorizationToken);
				} else if(this.modalName === "profile") {
					this.loading.isIconUploading = true;
					data.append('type', 'ICON')
					result = await Api.uploadProfileImage(data, this.$store.state.user.authorizationToken)
				}

				if (!result.data.is_error && this.post.thumbnailImagePath !== undefined) {
					this.post.thumbnailImagePath = result.data.path;
					this.post.thumbnailImageUrl = result.data.url;
					this.loading.isHedaderUploading = true;
				} else if(!result.data.is_error && this.post.iconImagePath !== undefined) {
					this.post.iconImagePath = result.data.path
					this.post.iconImageUrl  = result.data.url
				} else {
					// todo エラー処理
				}
				if (this.modalName === "profile") {
					this.loading.isIconUploading = false;
				} else if (this.modalName === "design") {
					this.loading.isHedaderUploading = false;
				}
				this.$emit('modalUpdate', result.data);
			},
			dataURItoBlob(base64Image) {
				const bin = atob(base64Image.split("base64,")[1]);
				const len = bin.length;
				const barr = new Uint8Array(len);
				let i = 0;
				while (i < len) {
					barr[i] = bin.charCodeAt(i);
					i++;
				}
				return new Blob([barr], {type: 'image/jpeg'});
			},
			hideModal() {
				this.scale = 1;
				this.minRange = 1;
				this.$emit('modalClose');
				this.$store.dispatch('cropModal/hide')
			},
			handleButtonAction() {
				this.uploadImage(this.$refs.canvas);
				this.hideModal();
			},
			handleButtonCancel() {
				this.hideModal();
			},
		}
	}
</script>

<style lang="scss">
	.c-modal{
		.crop-modal {
			text-align: center;
			.c-modal__content__body{
				padding: 0;
			}
			&__canvas-frame {
				margin: 16px 0;
				width: 100%;
				font-size: 0;
			}
			canvas {
				width: 100%;
				cursor: move;
			}
			// vue-range-slider override
			.vue-range-slider{
				width: 80% !important;
				margin: auto;
				@media #{$screen_pc} {
					width: calc(100% - 100px) !important;
				}
			}
			.vue-range-slider.slider-component .slider {
				height: 2px !important;
			}
			.vue-range-slider.slider-component .slider .slider-dot.slider-always .slider-tooltip-wrap {
				display: none !important;
			}
			.vue-range-slider.slider-component .slider .slider-dot{
				height: 12px !important;
				width: 12px !important;
				background: $color_icons-image;
				box-shadow: none;
			}
			.vue-range-slider.slider-component .slider .slider-process {
				background: $color_icons-image;
				border-radius: 0;
			}
		}
	}
</style>
