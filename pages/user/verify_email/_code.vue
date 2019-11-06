<template>
  <div>
    <h1 class="c-title">
      メールアドレスの認証結果
    </h1>
    <section class="c-section">
      <div class="p-verify-email">
        <div v-if="isVerified">
          <h2 class="c-title--sub">
            認証に成功しました
          </h2>
          <p>メールアドレスの認証が完了しました。</p>

          <div class="p-verify-email__login">
            <nuxt-link to="/dashboard" class="c-btn c-btn--main">
              ログイン
            </nuxt-link>
          </div>
        </div>

        <div v-else>
          <div v-if="this.$store.state.user.errorRedirectPath == '/user/login'">
            <h2 class="c-title--sub">
              {{ this.$store.state.user.errorMessage }}
            </h2>

            <p>
              既にメールアドレスの認証が完了していますので、ログインをお願いします。
            </p>

            <div class="p-verify-email__login">
              <nuxt-link to="/user/login" class="c-btn c-btn--main">
                ログイン
              </nuxt-link>
            </div>
          </div>

          <div v-else>
            <h2 class="c-title--sub">
              認証に失敗しました
            </h2>
            <p>
              メールに届いた認証URLを正しくクリックできているかご確認ください。
            </p>

            <div class="u-hidden">
              <p>
                それでも失敗する場合は、登録されたメールアドレスへ再度認証メールをお送りいたします。
              </p>

              <div class="p-form u-mt-16">
                <form @submit.prevent="sendAuthenticationMail">
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
                      認証メールを再送信する
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Meta from "~/assets/mixins/meta"
export default {
  mixins: [Meta],
  data() {
    return {
      isLoading: false,

      meta: {
        title: "メールアドレスの認証結果",
        description:
          "PAGEFUL（ペイジフル）のメールアドレスの認証結果の確認ページ"
      }
    }
  },
  async asyncData(context) {
    await context.store.dispatch("mail/verify", {
      verify_code: context.route.params.code
    })

    return {
      code: context.route.params.code,
      isVerified: !context.store.state.user.isError
    }
  },
  methods: {
    // codeは正しいにもかかわらず、認証できない場合。codeが正しくなければ、メールは再送信されない
    async sendAuthenticationMail() {
      this.isLoading = true

      await this.$store.dispatch("mail/sendVerificationEmailByCode", {
        verifyCode: this.code
      })

      this.isLoading = false
    }
  }
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
