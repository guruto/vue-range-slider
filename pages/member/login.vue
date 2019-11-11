<template>
  <div class="p-member-login">
    <section class="c-section">
      <div class="p-user-top">
        <div class="p-user-top__head">
          <div class="p-user-top__head__title">
            <a href="/"><h2>{{ page.name }}</h2></a>
          </div>
          <div class="p-user-top__head__description">
            <p v-html="page.description.replace(/\n/g, '<br/>')" />
          </div>
          <div class="p-user-top__head__profile">
            <div class="p-user-top__head__profile__content">
              <nuxt-link to="/about">
                <div class="p-user-top__head__profile__content__thumbnail">
                  <span
                    class="p-user-top__head__profile__content__thumbnail__image"
                    :style="
                      'background-image: url(' + profile.iconImageUrl + ')'
                    "
                  />
                </div>
                <span class="p-user-top__head__profile__content__name">{{
                  profile.name
                }}</span>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="c-section">
      <h1 class="c-title u-ta-c">
        メンバーログイン
      </h1>
      <p style="text-align: center;">「{{ page.name }}」にログイン。</p>

      <div class="p-login">
        <div class="p-login__service">
          <div class="p-login__service__item">
            <button
              type="button"
              :class="{
                'c-btn': true,
                'is-twitter': true,
                'is-loading': isLoadingLoginTwitter
              }"
              @click="handleMemberLoginTwitter"
            >
              <img
                src="/img/icon_service_twitter@2x.png"
                alt="Twitterでメンバーログイン"
              >Twitterでメンバーログイン
            </button>
          </div>
          <div class="p-login__service__separator">
            もしくは
          </div>
        </div>

        <div class="p-login__form">
          <h2 class="c-title--sub">
            メールアドレスでメンバーログイン
          </h2>
          <div class="p-form">
            <form @submit.prevent="login">
              <div class="p-form__group">
                <div class="p-form__item">
                  <input
                    v-model="email"
                    v-validate="'required|email'"
                    type="email"
                    :class="{ 'is-error': errors.has('email') }"
                    name="email"
                    placeholder="メールアドレスを入力"
                  >
                </div>
                <span v-show="errors.has('email')" class="p-form__item-error">{{
                  errors.first("email")
                }}</span>
              </div>

              <div class="p-form__group">
                <div class="p-form__item">
                  <input
                    v-model="password"
                    v-validate="'required|min:6|max:30'"
                    type="password"
                    :class="{ 'is-error': errors.has('password') }"
                    name="password"
                    placeholder="パスワードを入力"
                  >
                </div>
                <span
                  v-show="errors.has('password')"
                  class="p-form__item-error"
<<<<<<< HEAD
                  >{{ errors.first("password") }}</span
                >
=======
                >{{ errors.first("password") }}</span>
>>>>>>> master
              </div>

              <div class="p-form__password-forgot">
                <nuxt-link to="/user/forgot_password">
                  パスワードを忘れた方はこちら
                </nuxt-link>
              </div>

              <div class="p-form__button">
                <button
                  :class="{
                    'c-btn': true,
                    'c-btn--main': true,
                    'is-loading': isLoading
                  }"
                  type="submit"
                  :disabled="isLoading"
                >
                  メンバーログイン
                </button>
              </div>
              <div class="p-form__button">
                <nuxt-link class="c-btn c-btn--default" to="/member/sign_up">
                  未登録の場合はメンバー登録へ
                </nuxt-link>
              </div>
            </form>
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
  mixins: [Meta],
  data() {
    return {
      isLoading: false,
      isLoadingLoginTwitter: false,

      email: "",
      password: ""
    }
  },
  async asyncData(context) {
    // page情報取得
    const pageLabel = context.store.state.subDomain.subDomain
    if (!pageLabel || pageLabel == undefined) {
      // 404処理
      context.error({
        statusCode: 404,
        message: "そのページは存在しません。"
      })
    }

    if (context.store.state.user.authenticated) {
      if (context.store.state.user.page.label == pageLabel) {
        // 自分のpageの場合はトップへリダイレクト
        context.redirect("/")
      }
      if (
        context.store.state.user.memberPageLabelList.indexOf(pageLabel) !== -1
      ) {
        // user.authenticated && 既にmember、であればユーザーページのトップへリダイレクト
        context.redirect("/")
      } else {
        // user.authenticated && memberではない、であれば/member/sign_upにリダイレクト
        context.redirect("/member/sign")
      }
    }

    // errorメッセージ、successメッセージを表示。callbackからrouter.pushではなく、redirectで遷移してくるため、パラメーターで判断
    if (
      context.route.query.hasOwnProperty("error_message") &&
      context.route.query.error_message.length > 0
    ) {
      context.store.dispatch(
        "flashMessage/showError",
        context.route.query.error_message
      )
    }

    await context.store.dispatch("page/getAboutInfo", {
      pageLabel: pageLabel
    })
    return {
      page: {
        label: pageLabel,
        name: context.store.state.page.name,
        description: context.store.state.page.description
      },
      profile: {
        iconImageUrl: context.store.state.profile.iconImageUrl,
        name: context.store.state.profile.name,
        description: context.store.state.profile.description
      },

      meta: {
        title: context.store.state.page.name + "へログイン",
        userPageTitle: context.store.state.page.name,
        notUseBaseTitle: false,
        description: context.store.state.page.name + "のログインページです。",
        subDomainForUrl: context.store.state.page.label,
        image: context.store.state.profile.iconImageUrl
      }
    }
  },
  methods: {
    async handleMemberLoginTwitter() {
      this.isLoadingLoginTwitter = true

      const result = await Api.getRedirectDataWithSocial({
        type: "TWITTER",
        method: "member_login",
        page_label: this.page.label
      })
      const oauth_redirect_data = result.data

      // Cookieに保存
      this.$cookies.remove("tmpOauthToken", {
        domain: process.env.COOKIE_DOMAIN
      })
      this.$cookies.remove("tmpOauthTokenSecret", {
        domain: process.env.COOKIE_DOMAIN
      })
      // member登録の際は、callbackページを挟むためサブドメ間で共有する
      this.$cookies.set("tmpOauthToken", oauth_redirect_data.tmp_oauth_token, {
        path: "/",
        maxAge: 60 * 30,
        domain: process.env.COOKIE_DOMAIN
      })
      this.$cookies.set(
        "tmpOauthTokenSecret",
        oauth_redirect_data.tmp_oauth_token_secret,
        { path: "/", maxAge: 60 * 30, domain: process.env.COOKIE_DOMAIN }
      )

      window.location.href = oauth_redirect_data.redirect_url
      this.isLoadingLoginTwitter = false
    },

    async login() {
      const validated = await this.$validator.validateAll()
      if (!validated) {
        return
      }

      this.isLoading = true

      await this.$store.dispatch("member/login", {
        email: this.email,
        password: this.password,
        pageLabel: this.page.label
      })

      this.isLoading = false

      if (!this.$store.state.member.isError) {
        this.$router.push(this.$store.state.member.afterLoginRedirectPath)
      }
    }
  }
}
</script>

<style lang="scss"></style>
