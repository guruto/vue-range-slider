<template>
  <div class="p-request">
    <section class="c-section">
      <div class="p-request__head">
        <div class="p-user-top">
          <div class="p-user-top__head">
            <div class="p-user-top__head__title">
              <img
                v-if="this.$store.state.page.design.logoMediaUrl !== ''"
                class="logo_image"
                :src="this.$store.state.page.design.logoMediaUrl"
                :alt="page.name"
              />
              <a v-else href="/"
                ><h2>{{ page.name }}</h2></a
              >
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
      </div>

      <div class="p-request__content">
        <h1 class="c-title" style="text-align: center; font-size: 16px">
          {{ profile.name }}さんに質問
        </h1>
        <p style="text-align: center; margin-bottom: 20px;">
          聞きたいことを匿名で質問できます。
        </p>

        <div class="p-form">
          <form @submit.prevent="addRequest">
            <div class="p-form__group">
              <div class="p-form__item">
                <textarea
                  v-model="requestBody"
                  rows="8"
                  placeholder="質問内容を入力"
                />
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
                質問する
              </button>
            </div>
          </form>
        </div>
      </div>

      <div v-if="postList.length > 0" class="p-request__post">
        <h2 class="c-title--sub">
          過去の回答
        </h2>
        <div v-for="item in postList" class="p-request__post__item">
          <nuxt-link :to="'/post/item/' + item.label">
            <div
              v-if="item.thumbnail_image_url"
              class="p-request__post__item__thumbnail"
            >
              <img
                v-if="item.thumbnail_image_url"
                :src="item.thumbnail_image_url"
              />
            </div>

            <div class="p-request__post__item__content">
              <p>{{ item.comment }}</p>
            </div>
            <div class="u-cf" style="padding: 4px 16px 16px">
              <span class="p-request__post__item__time">{{
                item.published_at | moment
              }}</span>
            </div>
          </nuxt-link>
        </div>
      </div>

      <div class="u-mt-32 u-ta-c">
        <nuxt-link to="/" class="c-btn c-btn--default">
          ホームに戻る
        </nuxt-link>
      </div>
    </section>
  </div>
</template>

<script>
import Meta from "~/assets/mixins/meta"
import moment from "moment"

export default {
  filters: {
    moment(unixtime) {
      return moment.unix(unixtime).format("YYYY/MM/DD HH:mm")
    }
  },
  // components: {Page},
  mixins: [Meta],
  data() {
    return {
      isLoading: false,
      pageLabel: "",

      page: {
        name: "",
        description: ""
      },
      profile: {
        iconImageUrl: "",
        name: "",
        description: ""
      },
      requestBody: "",
      postList: [],

      meta: {
        subDomainForUrl: null
      }
    }
  },
  async asyncData(context) {
    const pageLabel = context.store.state.page.label
    if (!pageLabel) {
      // 404処理
      context.error({
        statusCode: 404
      })
      return
    }

    await context.store.dispatch("page/getRequestInfo", {
      pageLabel: pageLabel
    })
    if (context.store.state.page.isError) {
      // 404処理
      context.error({
        statusCode: 404
      })
    } else {
      return {
        pageLabel: pageLabel,

        page: {
          name: context.store.state.page.name,
          description: context.store.state.page.description
        },
        profile: {
          iconImageUrl: context.store.state.profile.iconImageUrl,
          name: context.store.state.profile.name,
          description: context.store.state.profile.description
        },
        postList: context.store.state.postList.items,

        meta: {
          title: context.store.state.profile.name
            ? context.store.state.profile.name + "さんへの質問募集"
            : "質問募集",
          twitterTitle: "質問募集",
          description: context.store.state.profile.name
            ? context.store.state.profile.name +
              "さんに聞きたいことを匿名で質問できます。"
            : "聞きたいことを匿名で質問できます。",
          twitterDescription: "聞きたいことを匿名で質問できます。",

          userPageTitle: context.store.state.page.name,
          notUseBaseTitle: false,
          subDomainForUrl: context.store.state.page.label,
          image: context.store.state.profile.requestOgpImageUrl,
          isTwitterCardLarge: true
        }
      }
    }
  },
  methods: {
    async addRequest() {
      if (this.requestBody.length === 0) {
        return
      }

      this.isLoading = true

      await this.$store.dispatch("request/add", {
        pageLabel: this.pageLabel,
        body: this.requestBody
      })

      this.requestBody = ""
      this.isLoading = false

      window.scrollTo(0, 0)
    }
  }
}
</script>

<style lang="scss">
.p-request {
  .logo_image {
    max-width: 100%;
  }
  &__post {
    &__item {
      width: 100%;
      box-sizing: border-box;
      margin: 0 auto 24px;
      background-color: $color_white;
      box-shadow: 0 1px 16px rgba(0, 0, 0, 0.12);
      border-radius: 4px;

      &__thumbnail {
        width: 100%;
        span {
          border-top-left-radius: 4px;
          border-top-right-radius: 4px;
          display: block;
          background-size: cover;
          background-position: 50%;
          background-repeat: no-repeat;
          vertical-align: middle;
          width: 100%;
          height: 245px;
          background-color: $color_light;

          @media #{$screen_pc} {
            height: 350px;
          }
        }
        img {
          /*display: none;*/
          display: block;
          width: 100%;
          height: auto;
        }
      }
      &__content {
        padding: 16px;
        p {
          color: $color_text;
          font-size: 13px;
          font-weight: normal;
        }
      }
      &__time {
        float: right;
        font-size: 12px;
        color: $color_gray;
      }
    }
  }
}
</style>
