<template>
	<div v-if="isActive" class="c-spinner">
		<div class="c-spinner__content"></div>
	</div>
</template>

<script>
	export default {
		props: ['isActive']
	}
</script>

<style lang="scss">
	.c-spinner {
		display: inline-block;
		&__content,
		&__content:after {
			border-radius: 50%;
			width: 20px;
			height: 20px;
		}
		&__content {
			margin: 0;
			padding: 0;
			position: relative;

			font-size: 10px;
			text-indent: -9999em;
			border-top: 2px solid $color_main_light;
			border-right: 2px solid $color_main_light;
			border-bottom: 2px solid $color_main_light;
			border-left: 2px solid $color_main;
			-webkit-transform: translateZ(0);
			-ms-transform: translateZ(0);
			transform: translateZ(0);
			-webkit-animation: load8 1.1s infinite linear;
			animation: load8 1.1s infinite linear;
		}
		@-webkit-keyframes load8 {
			0% {
				-webkit-transform: rotate(0deg);
				transform: rotate(0deg);
			}
			100% {
				-webkit-transform: rotate(360deg);
				transform: rotate(360deg);
			}
		}
		@keyframes load8 {
			0% {
				-webkit-transform: rotate(0deg);
				transform: rotate(0deg);
			}
			100% {
				-webkit-transform: rotate(360deg);
				transform: rotate(360deg);
			}
		}
	}
</style>
