<template>
  <div class="l-content">
    <div class="p-error">
      <section class="c-section">
        <div v-if="error.statusCode === 404" class="p-error__content">
          <img
            src="/img/icon_error@2x.png"
            alt="指定のページが見つかりません"
          />
          <h1 class="p-error__content__title">
            指定のページが見つかりません。
          </h1>
          <a :href="$getUrl()" class="c-btn c-btn--main">ホームに戻る</a>
        </div>
        <div v-else class="p-error__content">
          <img src="/img/icon_error@2x.png" alt="ページが表示できません">
          <h1 class="p-error__content__title">
            ページが表示できません。
          </h1>
          <p style="margin-top: 20px;">
            サーバー内部の問題が発生しています。<br >しばらくしてからもう一度お試しください。
          </p>
          <a :href="$getUrl()" class="c-btn c-btn--main">ホームに戻る</a>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Header from "../components/layouts/header"
import Footer from "../components/layouts/footer"
import Navigation from "../components/layouts/navigation"

export default {
  components: { Navigation, Footer, Header },
  props: ["error"],
  created() {
    return {}
  }
}
</script>

<style lang="scss">
.p-error {
  &__content {
    text-align: center;
    margin-top: 48px;
    &__title {
      font-size: 18px;
      font-weight: bold;
      margin: 0;
    }
    img {
      width: 93px;
      margin-bottom: 20px;
    }
    p {
      font-size: 13px;
    }
    a {
      margin: 48px 0 0;
    }
  }
}
</style>
