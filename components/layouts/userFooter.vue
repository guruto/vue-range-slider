<template>
  <div class="l-user-footer">
    <div class="l-user-footer__content">
      <div
        v-if="this.$store.state.page.twitterId"
        class="l-user-footer__content__item"
      >
        <a :href="this.$store.state.page.twitterUrl" target="_blank">
          <img src="/img/icon_footer_twitter@2x.png" alt="twitter" />
        </a>
      </div>
      <div
        v-if="this.$store.state.page.instagramId"
        class="l-user-footer__content__item"
      >
        <a :href="this.$store.state.page.instagramUrl" target="_blank">
          <img src="/img/icon_footer_instagram@2x.png" alt="twitter" />
        </a>
      </div>
      <div
        v-if="this.$store.state.page.lineId"
        class="l-user-footer__content__item"
      >
        <a :href="this.$store.state.page.lineUrl" target="_blank">
          <img src="/img/icon_footer_line@2x.png" alt="twitter" />
        </a>
      </div>
      <div
        v-if="this.$store.state.page.facebookId"
        class="l-user-footer__content__item"
      >
        <a :href="this.$store.state.page.facebookUrl" target="_blank">
          <img src="/img/icon_footer_facebook@2x.png" alt="twitter" />
        </a>
      </div>
      <div class="l-user-footer__content__item">
        <a href="/">
          <img src="/img/icon_footer_home@2x.png" alt="home" />
        </a>
      </div>
    </div>
    <div class="l-user-footer__powered">
      <a :href="$getUrl('/')">
        <span>powered by</span>
        <img src="/img/title@2x.png" alt="PAGEFUL[ペイジフル]" />
      </a>
    </div>
    <div class="l-user-footer__lead">
      <div class="l-user-footer__lead__content u-cf">
        <div class="l-user-footer__lead__content__info">
          <img src="/img/footer/logo.png" alt="PAGEFUL[ペイジフル]">
          <span>自分だけのコンテンツ配信サイトを作成</span>
        </div>
        <div class="l-user-footer__lead__content__action">
          <a :href="$getUrl() + '?from=footer_lead'">無料ではじめる</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserFooter"
}
</script>

<style lang="scss">
.l-user-footer {
  margin: 20px 0;
  @media #{$screen_pc} {
    margin: 20px 0 40px;
  }
  &__content {
    padding: 10px 5%;
    text-align: center;
    &__item {
      display: inline-block;
      margin-right: 10px;
      &:last-child {
        margin-right: 0;
      }
      a {
        display: block;
        height: 100%;
      }
      img {
        width: 32px;
        height: 32px;
      }
    }
  }
  &__powered {
    text-align: center;
    margin: 20px 0;
    span {
      color: $color_dark_gray;
      font-size: 14px;
    }
    img {
      vertical-align: -2px;
      width: 82px;
    }
  }
  &__lead {
    text-align: center;
    width: 100%;
    &__content {
      padding: 13px 8px;
      width: 100%;
      @media #{$screen_pc} {
        padding: 25px;
        width: $screen_max_size_tablet;
      }
      margin: 0 auto;
      background-color: #469DE0;
      text-align: left;
      &__info {
        float: left;
        img {
          width: 103px;
          display: block;
          margin-bottom: 8px;
        }
        span {
          font-size: 11px;
          color: $color_white;
          display: block;
          font-weight: bold;
        }
      }
      &__action {
        float: right;
        a {
          border-radius: 4px;
          background-color: #276FA7;
          padding: 10px 8px;
          @media #{$screen_pc} {
            padding: 13px 18px;
          }
          color: $color_white;
          font-weight: bold;
          display: block;
        }
      }
    }
  }
}
</style>
