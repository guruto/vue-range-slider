<template>
  <div v-if="isActive" class="c-loader">
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
  height: 100%;
  width: 100%;
  position: relative;

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
    z-index: 10000;

    // position: relative;
    // margin: 60px auto;
    font-size: 10px;
    text-indent: -9999em;
    border-top: 5px solid $color_main_light;
    border-right: 5px solid $color_main_light;
    border-bottom: 5px solid $color_main_light;
    border-left: 5px solid $color_main;
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
