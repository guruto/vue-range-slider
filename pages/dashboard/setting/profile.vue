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
                <spinner :is-active="loading.isIconUploading" />
              </div>
              <div class="p-form__image">
                <div class="p-form__image__content">
                  <span
                    v-if="imageData.iconImageUrl"
                    class="p-form__image__content__data"
                    :style="
                      'background-image: url(' + imageData.iconImageUrl + ')'
                    "
                  />
                  <div
                    class="p-form__image__content__select"
                    @click="handleSelectIconImage"
                  />
                  <i class="fas fa-camera" @click="handleSelectIconImage" />
                  <input
                    id="form-select-icon-image"
                    ref="fileinput"
                    type="file"
                    accept=".jpg,.gif,.png,image/gif,image/jpeg,image/png"
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

            <div class="p-form__group">
              <label class="p-form__label">自己紹介</label>
              <div class="p-form__item">
                <textarea
                  v-model="description"
                  rows="6"
                  placeholder="自己紹介文を入力"
                >{{ description }}</textarea>
              </div>
            </div>

            <div class="p-form__button">
              <button
                :class="{
                  'c-btn': true,
                  'c-btn--main': true,
                  'is-loading': loading.isLoading
                }"
                type="submit"
                :disabled="loading.isLoading"
              >
                変更
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
    <CropModal
      ref="cropModal"
      modal-name="profile"
      :modal-width="200"
      :canvas-width="300"
      :canvas-height="300"
      :loading="loading"
      action-message="OK"
      :post="imageData"
      @modalClose="modalClose"
    />
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
      loading: {
        isLoading: false,
        isIconUploading: false
      },
      imageData: {
        iconImagePath: "",
        iconImageUrl: ""
      },
      name: "",
      description: "",

      meta: {
        title: "プロフィール設定",
        description: "PAGEFUL（ペイジフル）のプロフィール設定ページ"
      }
    }
  },
  async asyncData(context) {
    await context.store.dispatch("profile/getMyself", {})
    console.log(context.store.state.profile)

    return {
      imageData: {
        iconImagePath: context.store.state.profile.iconImagePath,
        iconImageUrl: context.store.state.profile.iconImageUrl
      },
      name: context.store.state.profile.name,
      description: context.store.state.profile.description
    }
  },
  methods: {
    handleSelectIconImage() {
      const input = document.querySelector("#form-select-icon-image")
      input.click()
    },
    handleInputIconImageFile(e) {
      e.preventDefault()
      if (e.target.files.length > 0) {
        this.$store.dispatch("cropModal/show")
        this.$refs.cropModal.setCanvasImage(e)
      }
    },
    modalClose() {
      this.$refs.fileinput.value = ""
    },
    async update() {
      const validated = await this.$validator.validateAll()
      if (!validated) {
        return
      }

      this.loading.isLoading = true

      await this.$store.dispatch("profile/edit", {
        // label:       this.label,
        name: this.name,
        description: this.description,
        iconImagePath: this.imageData.iconImagePath
      })

      this.loading.isLoading = false

      window.scrollTo(0, 0)
    }
  }
}
</script>

<style lang="scss"></style>
