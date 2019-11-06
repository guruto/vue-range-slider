<template>
  <div>
    <h1 class="c-title">
      パスワードの変更
    </h1>
    <section class="c-section">
      <div>
        <div class="p-form">
          <form @submit.prevent="update">
            <div class="p-form__group">
              <label class="p-form__label">現在のパスワード</label>
              <div class="p-form__item">
                <input
                  v-model="passwordNow"
                  v-validate="'min:6|max:30'"
                  type="password"
                  :class="{ 'is-error': errors.has('passwordNow') }"
                  name="passwordNow"
                  placeholder="6文字以上で入力"
                >
              </div>
              <div class="p-form__info">
                <span class="p-form__info__label"
                  >SNSアカウントで登録して、パスワードを未設定の場合は空欄のままにしてください。</span
                >
              </div>
              <span
                v-show="errors.has('passwordNow')"
                class="p-form__item-error"
                >{{ errors.first("passwordNow") }}</span
              >
            </div>

            <div class="p-form__group">
              <label class="p-form__label">新しいパスワード</label>
              <div class="p-form__item">
                <input
                  ref="passwordNew"
                  v-model="passwordNew"
                  v-validate="'required|min:6|max:30'"
                  type="password"
                  :class="{ 'is-error': errors.has('passwordNew') }"
                  name="passwordNew"
                  placeholder="6文字以上で入力"
                />
              </div>
              <span
                v-show="errors.has('passwordNew')"
                class="p-form__item-error"
                >{{ errors.first("passwordNew") }}</span
              >
            </div>

            <div class="p-form__group">
              <label class="p-form__label">新しいパスワード（確認）</label>
              <div class="p-form__item">
                <input
                  v-model="passwordNewConfirm"
                  v-validate="'required|min:6|max:30|confirmed:passwordNew'"
                  type="password"
                  :class="{ 'is-error': errors.has('passwordNewConfirm') }"
                  name="passwordNewConfirm"
                  placeholder="6文字以上で入力"
                >
              </div>
              <span
                v-show="errors.has('passwordNewConfirm')"
                class="p-form__item-error"
                >{{ errors.first("passwordNewConfirm") }}</span
              >
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
                変更
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Meta from "~/assets/mixins/meta"
export default {
  layout: "dashboard",
  mixins: [Meta],
  data() {
    return {
      isLoading: false,
      passwordNow: "",
      passwordNew: "",
      passwordNewConfirm: "",

      meta: {
        title: "パスワードの変更",
        description: "PAGEFUL（ペイジフル）のパスワードの変更ページ"
      }
    }
  },
  async asyncData({ store, params }) {},
  methods: {
    async update() {
      const validated = await this.$validator.validateAll()
      if (!validated) {
        return
      }

      this.isLoading = true

      await this.$store.dispatch("user/editPassword", {
        passwordNow: this.passwordNow,
        passwordNew: this.passwordNew,
        passwordNewConfirm: this.passwordNewConfirm
      })

      this.isLoading = false

      window.scrollTo(0, 0)
    }
  }
}
</script>

<style></style>
