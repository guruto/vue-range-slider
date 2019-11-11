<template>
  <div v-if="isActive" class="c-loader">
	<div class="c-loader__backdrop" />
    <div class="c-loader__content" />
  </div>
</template>

<script>
export default {
  props: ["isActive"]
}
</script>

<style lang="scss">
.c-loader {
	z-index: 1000;
	display: block;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	&__backdrop {
		position: fixed;
		height: 100%;
		width: 100%;
		background-color: rgba(0, 0, 0, 0.2);
		z-index: 1000;
	}

  &__content,
  &__content:after {
    border-radius: 50%;
    width: 40px;
    height: 40px;
  }
  &__content {
    position: fixed;
    top: 30%;
    left: 0;
    right: 0;
    margin: auto;
	z-index: 1000;

    font-size: 10px;
    text-indent: -9999em;
    border-top: 5px solid $color_main;
    border-right: 5px solid $color_main;
    border-bottom: 5px solid $color_main;
    border-left: 5px solid $color_main_light;
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
