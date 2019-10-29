<template>
	<div class="p-flash-message" v-if="isActive">
		<div :class="'p-flash-message__content ' + typeClassName">
			<div class="flash__message-content p-flash-message__content__body">{{body}}</div>
			<button type="button" class="p-flash-message__content__close">
				<span @click="handleClose">×</span>
			</button>
		</div>
	</div>
</template>

<script>
	export default {
		computed: {
			isActive() {
				return this.$store.getters['flashMessage/isActive']
			},
			typeClassName() {
				const type = this.$store.getters['flashMessage/type']
				let className = 'is-info'
				if (type == 'ERROR') {
					className = 'is-error'
				} else if (type == 'SUCCESS') {
					className = 'is-success'
				}

				return className
			},
			body() {
				return this.$store.getters['flashMessage/body']
			},
		},
		methods: {
			handleClose() {
				this.$store.dispatch("flashMessage/close");
			},
		}
	}
</script>

<style lang="scss">
	.p-flash-message {
		position: fixed;
		top: 65px;
		width: 100%;
		z-index: 10001;

		&__content {
			width: 90%;
			max-width: $screen_max_size_tablet * 0.85;
			margin: 0 auto;
			box-shadow: 0 4px 5px rgba(0, 0, 0, 0.16);
			border-radius: 4px;
			position: relative;
			background-color: #EEEEEE;
			&__body {
				padding: 12px 20px;
				font-weight: bold;
				font-size: 14px;
				color: $color_dark_gray;
			}
			&__close {
				bottom: 0;
				cursor: pointer;
				-webkit-box-sizing: border-box;
				box-sizing: border-box;
				position: absolute;
				top: 0;
				right: 0;
				color: inherit;
				-webkit-appearance: none;
				-moz-appearance: none;
				appearance: none;
				background-color: transparent;
				background: none;
				border: none;
				font-size: 18px;
				line-height: 10px;
				margin: 0;
				padding: 8px;
				span {
					font-weight: bold;
					color: $color_dark_gray;
				}
			}
			&.is-error {
				background-color: #F0CECC;
				.p-flash-message__content__body {
					color: #F05E54;
				}
				.p-flash-message__content__close {
					span {
						color: #F05E54;
					}
				}
			}
			&.is-success {
				background-color: #CCE2F0;
				.p-flash-message__content__body {
					color: #55BAF0;
				}
				.p-flash-message__content__close {
					span {
						color: #55BAF0;
					}
				}
			}
		}
	}
</style>