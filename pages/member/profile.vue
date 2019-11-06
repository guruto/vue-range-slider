<template>
  <div class="p-setting-profile">
    <h1 class="c-title">
      プロフィール設定
    </h1>
    <section class="c-section">
      <div>
        <div class="p-form">
          <form @submit.prevent="update">
            <div class="p-form__group">
              <label class="p-form__label">アイコン</label>
              <div class="p-form__label__spinner">
                <spinner :is-active="isIconUploading" />
              </div>
              <div class="p-form__image">
                <div class="p-form__image__content">
                  <span
                    v-if="iconImageUrl"
                    class="p-form__image__content__data"
                    :style="'background-image: url(' + iconImageUrl + ')'"
                  />
                  <div
                    class="p-form__image__content__select"
                    @click="handleSelectIconImage"
                  />
                  <i class="fas fa-camera" @click="handleSelectIconImage" />
                  <input
                    id="form-select-icon-image"
                    type="file"
                    @change="handleInputIconImageFile"
                  >
                </div>
              </div>
            </div>

            <div class="p-form__group">
              <label class="p-form__label">ニックネーム</label>
              <div class="p-form__item">
                <input
                  v-model="name"
                  v-validate="'required|min:1|max:30'"
                  type="text"
                  :class="{ 'is-error': errors.has('name') }"
                  name="name"
                  placeholder="ニックネームを入力"
                >
              </div>
              <span v-show="errors.has('name')" class="p-form__item-error">{{
                errors.first("name")
              }}</span>
            </div>

            <div class="p-form__group" style="display: none;">
              <label class="p-form__label">自己紹介</label>
              <div class="p-form__item">
                <textarea
                  v-model="description"
                  rows="6"
                  placeholder="自己紹介文を入力"
                  >{{ description }}</textarea
                >
              </div>
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
import Api from "~/plugins/api"

export default {
  mixins: [Meta],
  data() {
    return {
      isLoading: false,
      isIconUploading: false,

      name: "",
      description: "",
      iconImageUrl: "",
      iconImagePath: ""
    }
  },
  async asyncData(context) {
    // 一旦使わないことにした
    context.error({
      statusCode: 404
    })

    // page情報取得
    const pageLabel = context.store.state.subDomain.subDomain
    if (!pageLabel || pageLabel == undefined) {
      // 404処理
      context.error({
        statusCode: 404
      })
    }

    // ユーザー認証済みだけどメンバーではない場合
    if (
      context.store.state.user.memberPageLabelList.indexOf(pageLabel) === -1
    ) {
      context.redirect("/member/sign_up")
    }

    // page情報取得&自分のmember_profile情報を取得
    await context.store.dispatch("page/getAboutInfo", {
      pageLabel: pageLabel
    })
    await context.store.dispatch("member/getProfileMyself", {
      pageLabel: pageLabel
    })
    if (
      context.store.state.page.isError ||
      context.store.state.member.isError
    ) {
      context.error({
        statusCode: 500
      })
    }
    console.log(context.store.state.member)

    return {
      pageLabel: pageLabel,
      name: context.store.state.member.profile.name,
      description: context.store.state.member.profile.description,
      iconImageUrl: context.store.state.member.profile.iconImageUrl,
      iconImagePath: context.store.state.member.profile.iconImagePath,

      meta: {
        title: "メンバープロフィール設定",
        description: "メンバープロフィール設定ページです。"
      }
    }
  },
  methods: {
    handleSelectIconImage() {
      const input = document.querySelector("#form-select-icon-image")
      input.click()
    },
    handleInputIconImageFile(e) {
      e.preventDefault()
      if (e.target.files.length === 0) {
        return
      }

      this.uploadImage(e.target.files[0], "ICON")
    },
    async uploadImage(selectedImage, type) {
      console.log(selectedImage)

      // upload
      this.isIconUploading = true

      const data = new FormData()
      data.append("file_data", selectedImage)
      data.append("type", type)
      const result = await Api.uploadMemberProfileImage(
        data,
        this.$store.state.user.authorizationToken
      )

      if (!result.data.is_error) {
        this.iconImagePath = result.data.path
        this.iconImageUrl = result.data.url
      } else {
        // todo エラー処理
      }

      this.isIconUploading = false
    },
    async update() {
      const validated = await this.$validator.validateAll()
      if (!validated) {
        return
      }

      this.isLoading = true

      await this.$store.dispatch("member/editProfile", {
        pageLabel: this.pageLabel,
        name: this.name,
        description: this.description,
        iconImagePath: this.iconImagePath
      })

      this.isLoading = false

      window.scrollTo(0, 0)
    }
  }
}
</script>

<style lang="scss"></style>
