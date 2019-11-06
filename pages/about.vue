<template>
  <div class="p-about">
    <h1 class="c-title">
      ABOUT
    </h1>

    <section class="c-section">
      <div class="p-about__page">
        <div class="p-about__page__content">
          <div class="p-about__page__content__name">
            <img
              v-if="this.$store.state.page.design.logoMediaUrl !== ''"
              class="logo_image"
              :src="this.$store.state.page.design.logoMediaUrl"
              :alt="page.name"
            >
            <a v-else href="/"
              ><h2>{{ page.name }}</h2></a
            >
          </div>
          <div class="p-about__page__content__description">
            <p v-html="page.description.replace(/\n/g, '<br/>')" />
          </div>
        </div>
      </div>
      <div class="p-about__profile">
        <h2 class="c-title--sub">
          プロフィール
        </h2>
        <div class="p-about__profile__content">
          <div class="p-about__profile__content__head">
            <div class="p-about__profile__content__thumbnail">
              <span
                class="p-about__profile__content__thumbnail__image"
                :style="'background-image: url(' + profile.iconImageUrl + ')'"
              />
            </div>
            <div class="p-about__profile__content__name">
              <h3>{{ profile.name }}</h3>
            </div>
          </div>
          <div class="p-about__profile__content__description">
            <p v-html="profile.description.replace(/\n/g, '<br/>')" />
          </div>
        </div>
      </div>
      <div class="p-about__link">
        <div class="p-about__link__sns">
          <div v-if="page.twitterId" class="p-about__link__sns__item">
            <a :href="page.twitterUrl" target="_blank">
              <img src="/img/icon_about_twitter@2x.png" alt="twitter" />
            </a>
          </div>
          <div v-if="page.instagramId" class="p-about__link__sns__item">
            <a :href="page.instagramUrl" target="_blank">
              <img src="/img/icon_about_instagram@2x.png" alt="instagram" />
            </a>
          </div>
          <div v-if="page.lineId" class="p-about__link__sns__item">
            <a :href="page.lineUrl" target="_blank">
              <img src="/img/icon_about_line@2x.png" alt="line" />
            </a>
          </div>
          <div v-if="page.facebookId" class="p-about__link__sns__item">
            <a :href="page.facebookUrl" target="_blank">
              <img src="/img/icon_about_facebook@2x.png" alt="facebook" />
            </a>
          </div>
        </div>
        <div class="p-about__link__other">
          <div v-for="link in page.links" class="p-about__link__other__item">
            <a :href="link.url" target="_blank">
              <span>{{ link.title }}</span>
              <i class="material-icons">open_in_new</i>
            </a>
          </div>
        </div>
      </div>

      <div class="p-about__action">
        <nuxt-link to="/" class="c-btn c-btn--default">
          ホームに戻る
        </nuxt-link>
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
      page: {
        name: "",
        description: ""
      },
      profile: {
        iconImageUrl: "",
        name: "",
        description: ""
      },

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

    await context.store.dispatch("page/getAboutInfo", {
      pageLabel: pageLabel
    })
    if (context.store.state.page.isError) {
      // 404処理
      context.error({
        statusCode: 404
      })
    } else {
      return {
        page: {
          name: context.store.state.page.name,
          description: context.store.state.page.description,
          twitterId: context.store.state.page.twitterId,
          facebookId: context.store.state.page.facebookId,
          instagramId: context.store.state.page.instagramId,
          lineId: context.store.state.page.lineId,
          twitterUrl: context.store.state.page.twitterUrl,
          instagramUrl: context.store.state.page.instagramUrl,
          facebookUrl: context.store.state.page.facebookUrl,
          lineUrl: context.store.state.page.lineUrl,
          links: context.store.state.page.links
        },
        profile: {
          iconImageUrl: context.store.state.profile.iconImageUrl,
          name: context.store.state.profile.name,
          description: context.store.state.profile.description
        },

        meta: {
          title: "ABOUT",
          userPageTitle: context.store.state.page.name,
          notUseBaseTitle: false,
          description: context.store.state.page.description
            ? context.store.state.page.description
            : context.store.state.page.name + "のABOUTページです。",
          subDomainForUrl: context.store.state.page.label,
          image: context.store.state.profile.iconImageUrl
        }
      }
    }
  },
  methods: {}
}
</script>

<style lang="scss">
.logo_image {
  max-width: 100%;
}
</style>
