<template>
  <div class="p-setting-social">
    <h1 class="c-title">
      SNS連携設定
    </h1>
    <section class="c-section">
      <div class="p-setting-social__description">
        <p>SNS連携を行うとログイン、投稿のシェアが簡単になります。</p>
        <p>
          ※連携することで勝手に各SNSへ投稿、フォローなど行うことはありません。
        </p>
      </div>

      <div class="p-form">
        <div class="p-form__group">
          <label class="p-form__label">Twitter</label>
          <div class="p-form__item u-cf">
            <span class="p-form__value" style="vertical-align: -13px;">{{
              info.TWITTER.linked == "1"
                ? "@" + info.TWITTER.screen_name
                : "未連携"
            }}</span>
            <button
              type="button"
              :class="{
                'c-btn': true,
                'is-loading': isLoading,
                'c-btn--main': info.TWITTER.linked != '1',
                'c-btn--default': info.TWITTER.linked == '1'
              }"
              :disabled="isLoading"
              style="float: right;"
              @click="handleTwitter"
            >
              {{ info.TWITTER.linked == "1" ? "解除" : "連携する" }}
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Meta from "~/assets/mixins/meta"
import Api from "~/plugins/api"

export default {
  layout: "dashboard",
  mixins: [Meta],
  data() {
    return {
      isLoading: false,
      info: {},

      meta: {
        title: "SNS連携設定",
        description: "PAGEFUL（ペイジフル）のSNS連携設定ページ"
      }
    }
  },
  async asyncData(context) {
    await context.store.dispatch("userService/getInfo")

    return {
      info: context.store.state.userService.info
    }
  },
  methods: {
    async handleTwitter() {
      if (this.info.TWITTER.linked == "0") {
        // 連携処理
        const result = await Api.getRedirectDataWithSocial({
          type: "TWITTER",
          method: "link"
        })
        const oauth_redirect_data = result.data

        // Cookieに保存
        this.$cookies.remove("tmpOauthToken")
        this.$cookies.remove("tmpOauthTokenSecret")
        this.$cookies.set(
          "tmpOauthToken",
          oauth_redirect_data.tmp_oauth_token,
          { path: "/", maxAge: 60 * 30 }
        )
        this.$cookies.set(
          "tmpOauthTokenSecret",
          oauth_redirect_data.tmp_oauth_token_secret,
          { path: "/", maxAge: 60 * 30 }
        )

        window.location.href = oauth_redirect_data.redirect_url
        return
      }

      // 解除処理
      this.isLoading = true

      const param = {
        type: "TWITTER",
        serviceUserId: this.info.TWITTER.service_user_id
      }
      await this.$store.dispatch("userService/delete", param)

      console.log(this.$store.state.userService)
      if (this.$store.state.userService.isError) {
        this.$router.push(this.$store.state.userService.errorRedirectPath)
      }

      this.isLoading = false

      this.info = this.$store.state.userService.info
    }
  }
}
</script>

<style lang="scss">
.p-setting-social {
  &__description {
    margin-bottom: 30px;
  }
}
</style>
