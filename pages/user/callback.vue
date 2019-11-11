<template>
  <div>
    <section class="c-section">
      <Loading :is-active="true" />
    </section>
  </div>
</template>

<script>
import Meta from "~/assets/mixins/meta"

export default {
  mixins: [Meta],
  layout: "callback",
  data() {
    return {
      isLoading: false,

      meta: {
        title: "Twitter登録・ログイン",
        description: "PAGEFUL（ペイジフル）のTwitter登録・ログイン"
      }
    }
  },
  async asyncData(context) {},
  async mounted() {
    console.log("callback mounted")
    const method = this.$route.query.m
    let path = ""
    if (method == "sign_up") {
      path = "user/signUpCallbackFromTwitter"
    } else if (method == "login") {
      path = "user/loginCallbackFromTwitter"
    } else if (method == "link") {
      path = "userService/linkCallbackFromTwitter"
    } else if (method == "member_sign_up") {
      path = "member/signUpCallbackFromTwitter"
    } else if (method == "member_login") {
      path = "member/loginCallbackFromTwitter"
    }
    if (!path) {
      // TODO:: エラー処理
      return
    }

    const tmpOauthToken = this.$cookies.get("tmpOauthToken")
    const tmpOauthTokenSecret = this.$cookies.get("tmpOauthTokenSecret")
    this.$cookies.remove("tmpOauthTokenSecret")
    this.$cookies.remove("tmpOauthTokenSecret", {
      domain: process.env.COOKIE_DOMAIN
    })
    this.$cookies.remove("tmpOauthToken")
    this.$cookies.remove("tmpOauthToken", { domain: process.env.COOKIE_DOMAIN })

    let params = {
      oauthToken: this.$route.query.oauth_token,
      oauthVerifier: this.$route.query.oauth_verifier,
      tmpOauthToken: tmpOauthToken,
      tmpOauthTokenSecret: tmpOauthTokenSecret
    }
    if (this.$route.query.p) {
      params["pageLabel"] = this.$route.query.p
    }
    await this.$store.dispatch(path, params)

    if (method == "member_sign_up" || method == "member_login") {
      // member処理

      if (this.$store.state.member.isError) {
        // member error処理
        let path = ""
        if (method == "member_sign_up") {
          path = "/member/sign_up"
        } else if (method == "member_login") {
          path = "/member/login"
        }
        // redirectだからパラメーターでエラー情報を渡す
        const url = this.$getUrl(path, this.$route.query.p)
        window.location.href =
          url + "?error_message=" + this.$store.state.member.errorMessage
        return
      } else {
        // member success処理
        let path = ""
        let message = ""
        if (method == "member_sign_up") {
          // ユーザーページへ遷移。pushじゃなくてredirect
          path = "/"
          message =
            this.$store.state.member.successMessage.length > 0
              ? this.$store.state.member.successMessage
              : "メンバー登録完了しました。"
        } else if (method == "member_login") {
          // ユーザーページへ遷移
          path = "/"
          message = "ログインしました。"
        }
        const url = this.$getUrl(path, this.$route.query.p)
        window.location.href = url + "?success_message=" + message
        return
      }
    } else {
      // user処理

      if (this.$store.state.user.isError) {
        let errorPath = "/user/" + method
        if (method == "link") {
          errorPath = "/dashboard/setting/social"
        }
        if (this.$store.state.user.errorRedirectPath) {
          errorPath = this.$store.state.user.errorRedirectPath
        }
        this.$router.push(errorPath)
      } else {
        let successPath = "/dashboard"
        if (method == "link") {
          successPath = "/dashboard/setting/social"
        }

        this.$router.push(successPath)
      }
    }
  },
  methods: {}
}
</script>

<style lang="scss">
.p-verify-email {
  &__login {
    margin-top: 30px;
    text-align: center;
    .c-btn {
      width: 90%;
    }
  }
}
</style>
