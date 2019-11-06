<template>
  <div v-if="isActive" class="c-modal">
    <div v-if="isActive" class="c-modal__backdrop" @click="hideModal" />

    <transition name="c-modal__transition">
      <div class="c-modal__content">
        <div class="c-modal__content__head">
          <div class="c-modal__content__head__title">
            <span>{{ title }}</span>
          </div>
        </div>
        <div class="c-modal__content__body">
          <div
            v-if="type == 'description'"
            class="c-modal__content__body__description"
          >
            <span>{{ description }}</span>
          </div>

          <div
            v-else-if="type == 'page_link'"
            class="c-modal__content__body__page-link"
          >
            <div class="p-form" style="padding-bottom: 0;">
              <div class="p-form__group">
                <div class="p-form__item">
                  <input
                    type="text"
                    placeholder="リンクの名前"
                    :value="pageLinkTitleComputed"
                    @keyup="handleChangePageLinkTitle"
                  >
                </div>
              </div>
              <div class="p-form__group">
                <div class="p-form__item">
                  <input
                    type="text"
                    placeholder="https://pageful.app"
                    :value="pageLinkUrlComputed"
                    @keyup="handleChangePageLinkUrl"
                  >
                </div>
              </div>
            </div>
          </div>

          <div
            v-else-if="type == 'add_post'"
            class="c-modal__content__body__add-post"
          >
            <ul>
              <li @click="hideModal">
                <nuxt-link to="/dashboard/post/add?type=TEXT">
                  <span class="icons icons--text" />
                  <span>ブログ</span>
                </nuxt-link>
              </li>
              <li @click="hideModal">
                <nuxt-link to="/dashboard/post/add?type=IMAGE">
                  <span class="icons icons--image" />
                  <span>写真・画像</span>
                </nuxt-link>
              </li>
              <li @click="hideModal">
                <nuxt-link to="/dashboard/post/add?type=VIDEO">
                  <span class="icons icons--video" />
                  <span>動画</span>
                </nuxt-link>
              </li>
              <li @click="hideModal">
                <nuxt-link to="/dashboard/post/add?type=SOUND">
                  <span class="icons icons--sound" />
                  <span>音声</span>
                </nuxt-link>
              </li>
              <li @click="hideModal">
                <nuxt-link to="/dashboard/post/add?type=FILE">
                  <span class="icons icons--file" />
                  <span>ファイル</span>
                </nuxt-link>
              </li>
              <li @click="hideModal">
                <nuxt-link to="/dashboard/post/add?type=LINK">
                  <span class="icons icons--link" />
                  <span>リンク引用</span>
                </nuxt-link>
              </li>
              <li @click="hideModal">
                <nuxt-link to="/dashboard/request">
                  <span class="icons icons--answer" />
                  <span>質問回答</span>
                </nuxt-link>
              </li>
            </ul>
          </div>

          <div
            v-else-if="type == 'save_publish_setting'"
            class="c-modal__content__body__add-post"
          >
            <div class="p-form">
              <div class="p-form__group">
                <label class="p-form__label">公開範囲</label>
                <div style="margin: 12px 0 0; display: block;">
                  <div class="p-form__item p-form__item--label">
                    <input
                      id="scope-all"
                      v-model="scope"
                      type="radio"
                      value="PUBLIC"
                    />
                    <label for="scope-all">全公開</label>
                  </div>
                  <div class="p-form__item p-form__item--label">
                    <input
                      id="scope-member"
                      v-model="scope"
                      type="radio"
                      value="MEMBER"
                    />
                    <label for="scope-member">メンバー限定</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="c-modal__content__action">
          <div
            v-if="actionMessage"
            class="c-modal__content__action__btn-wrapper is-action"
          >
            <button class="c-btn" @click="handleButtonAction">
              {{ actionMessage }}
            </button>
          </div>
          <div
            v-if="subActionMessage"
            class="c-modal__content__action__btn-wrapper is-default"
          >
            <button class="c-btn" @click="handleButtonSubAction">
              {{ subActionMessage }}
            </button>
          </div>
          <div class="c-modal__content__action__btn-wrapper is-cancel">
            <button class="c-btn" @click="handleButtonCancel">
              キャンセル
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: [
    "type",
    "title",
    "description",
    "actionMessage",
    "subActionMessage",
    "cancelMessage",
    "onHandleAction",
    "onHandleSubAction",
    "onHandleCancel",
    "" + "initialPageLinkTitle",
    "initialPageLinkUrl",
    "initialScope"
  ],
  data() {
    return {
      // Page_linkの追加
      pageLinkTitle: this.initialPageLinkTitle,
      pageLinkUrl: this.initialPageLinkUrl,

      // Postの公開設定
      scope: this.initialScope
    }
  },
  computed: {
    isActive() {
      return this.$store.getters["modal/isActive"]
    },
    pageLinkTitleComputed() {
      this.pageLinkTitle = this.initialPageLinkTitle
      return this.initialPageLinkTitle ? this.initialPageLinkTitle : ""
    },
    pageLinkUrlComputed() {
      this.pageLinkUrl = this.initialPageLinkUrl
      return this.initialPageLinkUrl ? this.initialPageLinkUrl : ""
    }
  },
  methods: {
    handleChangePageLinkTitle(e) {
      this.pageLinkTitle = e.target.value
    },
    handleChangePageLinkUrl(e) {
      this.pageLinkUrl = e.target.value
    },

    hideModal() {
      this.$store.dispatch("modal/hide")
    },
    handleButtonAction() {
      if (this.type == "page_link") {
        // urlチェック
        if (
          !this.pageLinkUrl.match(
            /^(https?|ftp)(:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+)$/
          )
        ) {
          console.log("invalid url")
          return
        }
        if (this.pageLinkTitle.length == 0) {
          console.log("no title")
          return
        }
        this.onHandleAction(this.pageLinkTitle, this.pageLinkUrl)
      } else if (this.type == "save_publish_setting") {
        this.onHandleAction(this.scope, "public")
      } else {
        this.onHandleAction()
      }

      this.setStateDefault()
      this.$store.dispatch("modal/hide")
    },
    handleButtonSubAction() {
      if (this.type == "save_publish_setting") {
        this.onHandleAction(this.scope, "draft")
      }

      this.setStateDefault()
      this.$store.dispatch("modal/hide")
    },
    handleButtonCancel() {
      // this.onHandleCancel();
      this.setStateDefault()
      this.$store.dispatch("modal/hide")
    },
    setStateDefault() {
      this.pageLinkTitle = ""
      this.pageLinkUrl = ""
      this.scope = "PUBLIC"
    }
  }
}
</script>
