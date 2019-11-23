<template>
  <header
    :class="{
      'l-header': true,
      'is-top-index': isTopIndex,
      'is-top-page': isTopPage,
      'is-user-page': isUserPage
    }"
  >
    <div class="l-header__content">
      <div class="l-header__content__drawer-toggle">
        <div
          class="l-header__content__drawer-toggle__content"
          role="button"
          @click="
            $store.dispatch('navigation/toggleSidebar', {
              isTopPage: isTopPage,
              isUserPage: isUserPage
            })
          "
        >
          <div class="l-header__content__drawer-toggle__content__item" />
          <div class="l-header__content__drawer-toggle__content__item" />
          <div class="l-header__content__drawer-toggle__content__item" />
        </div>
      </div>

      <div class="l-header__content__logo">
        <div v-if="isUserPage">
          <nuxt-link to="/">
            <span v-if="this.$store.state.page.label">{{
              this.$store.state.page.name
            }}</span>
            <span v-else><img src="/img/title@2x.png" alt="PAGEFUL[ペイジフル]"/></span>
          </nuxt-link>
        </div>
        <div v-else-if="isTopPage">
          <a :href="$getUrl('/')"><img src="/img/title@2x.png" alt="PAGEFUL[ペイジフル]"/></a>
        </div>
        <div v-else>
          <a :href="$getUrl('/dashboard')"><img src="/img/title@2x.png" alt="PAGEFUL[ペイジフル]"/></a>
        </div>
      </div>

      <!--			<div class="l-header__content__back" v-if="isUserPagePost" @click="handleClickBrowserBack">-->
      <!--				<div class="l-header__content__back__item">-->
      <!--					<img src="/img/header_back@2x.png" alt="戻る">-->
      <!--				</div>-->
      <!--			</div>-->
    </div>
  </header>
</template>

<script>
export default {
  props: ["isTopIndex", "isTopPage", "isUserPage"],
  methods: {
    // handleClickBrowserBack() {
    // 	this.$router.push(this.$store.state.route.backPath)
    // },
  }
}
</script>

<style lang="scss">
.l-header {
  width: 100%;
  background-color: $color_white;
  position: fixed;
  z-index: 12;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  /*border-bottom: 1px solid rgba(0, 0, 0, 0.09);*/
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.09);

  &.is-user-page {
    box-shadow: none;
    background-color: transparent;
    .l-header__content {
      &__drawer-toggle {
        left: 0;
        right: auto;
        width: 40px;
        height: 40px;
        margin: 10px 0 0 10px;
        &__content {
          background-color: $color_main;
          padding: 10px;
          border-radius: 2px;
          width: 100%;
          height: 100%;
          margin: 0;
          &__item {
            background-color: $color_white;
            &:last-child {
              margin-bottom: 0;
            }
          }
        }
      }
      &__logo {
        display: none;
      }
    }
  }
  &.is-top-index {
    display: none;
  }
  &.is-top-page {
    .l-header__content {
      &__drawer-toggle {
        display: none;
      }
    }
  }

  &__content {
    height: 50px;
    position: relative;
    width: 100%;
    margin: 0 auto;
    max-width: $screen_max_size_tablet;
    &__drawer-toggle {
      position: absolute;
      top: 0;
      left: 0;
      width: 70px;
      height: 100%;
      cursor: pointer;
      &__content {
        width: 35%;
        margin: 17px auto 0;
        &__item {
          margin-bottom: 6px;
          width: 100%;
          height: 2px;
          background-color: $color_text;
        }
      }
    }

    &__logo {
      position: absolute;
      top: 17px;
      left: 80px;
      right: 80px;
      bottom: 0;
      margin: auto;
      text-align: center;
      padding: 0;
      display: inline-block;
      text-decoration: none;
      &:link,
      &:visited,
      &:hover,
      &:active,
      &:focus {
        text-decoration: none;
      }
      img {
        width: 103px;
      }
      span {
        color: $color_text;
        margin: 0;
        padding: 0;
        display: inline-block;
        font-size: 18px;
        font-weight: bold;
      }
    }
  }
}
</style>
