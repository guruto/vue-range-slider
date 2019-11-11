<template>
  <div class="main-slider">
    <hooper
      ref="hooper"
      :wheel-control="false"
      :auto-play="false"
      @slide="handleSlide($event)"
    >
      <slide
        v-for="(item, i) in thumbnailList"
        :key="i"
        :index="i"
        :style="{ backgroundImage: `url(${item.url})` }"
      />
      <hooper-navigation slot="hooper-addons" />
    </hooper>
    <div class="main-slider__thumbnail-list">
      <div
        v-for="(item, i) in thumbnailList"
        :key="i"
        ref="item"
        :data-num="i"
        class="main-slider__thumbnail-list__item"
        :class="{
          'main-slider__thumbnail-list__item--selected': i === selectSlideNum
        }"
        @click="handleThumbnailImage"
      >
        <img
          class="main-slider__thumbnail-list__item__img"
          style="display: inline-block"
          :src="item.url"
        >
      </div>
    </div>
  </div>
</template>

<script>
import { Hooper, Slide, Navigation as HooperNavigation } from "hooper"
import "hooper/dist/hooper.css"

export default {
  components: {
    Hooper,
    Slide,
    HooperNavigation
  },
  props: ["thumbnailList"],
  data() {
    return {
      selectSlideNum: 0
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.state.user.authenticated
    }
  },
  methods: {
    handleThumbnailImage(e) {
      this.$refs.hooper.slideTo(e.currentTarget.dataset.num)
      this.selectSlideNum = parseInt(e.currentTarget.dataset.num)
    },
    handleSlide(e) {
      this.selectSlideNum = e.currentSlide
    }
  }
}
</script>

<style lang="scss">
.main-slider {
  .hooper {
    outline: none;
    height: 240px;
  }
  .hooper-slide {
    overflow: hidden;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
    height: 240px;
  }
  .hooper-next,
  .hooper-prev {
    top: 120px;
    outline: none;
  }
  .icon {
    width: 40px;
    height: 40px;
  }
  .slide_link {
    width: 100%;
    display: block;
  }
  &__thumbnail-list {
    margin: 20px;
    &__item {
      background: $color_main_light;
      position: relative;
      overflow: hidden;
      opacity: 0.6;
      cursor: pointer;
      display: inline-block;
      height: 77px;
      width: 77px;
      border-radius: 4px;
      margin-bottom: 10px;
      @media #{$screen_pc} {
        height: 128px;
        width: 128px;
      }
      &:not(:last-child) {
        margin-right: 10px;
      }
      &:hover {
        opacity: 1;
      }
      &--selected {
        opacity: 1;
        cursor: auto;
      }
      &__img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }
}
</style>
