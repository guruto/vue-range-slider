<template>
  <div>
    <section v-if="this.$store.state.subDomain.hasSubDomain" class="c-section">
      <div class="p-user-top">
        <div class="p-user-top__head">
          <div class="p-user-top__head__title">
            <img
              v-if="this.$store.state.page.design.logoMediaUrl !== ''"
              class="logo_image"
              :src="this.$store.state.page.design.logoMediaUrl"
              :alt="page.name"
            >
            <a v-else href="/"><h1>{{ page.name }}</h1></a>
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
        <div class="p-user-top__request">
          <nuxt-link class="c-btn p-user-top__request__action" to="/request">
            {{ profile.name ? profile.name + "さんに" : "" }}質問をする
          </nuxt-link>
        </div>

        <post-list
          :posts="this.$store.state.postList.items"
          :is-dashboard="false"
        />

        <div
          v-if="this.$store.state.postList.items.length > 0"
          class="p-user-top__request u-mt-40"
        >
          <nuxt-link class="c-btn p-user-top__request__action" to="/request">
            {{ profile.name ? profile.name + "さんに" : "" }}質問をする
          </nuxt-link>
        </div>
      </div>
    </section>

    <div v-else>
      <topPage />
    </div>
  </div>
</template>

<script>
import postList from "~/components/pages/postList"
import topPage from "~/components/pages/topPage"
import Meta from "~/assets/mixins/meta"

export default {
  components: { postList, topPage },
  mixins: [Meta],
  data() {
    return {
      page: {
        name: "",
        description: ""
      },
      profile: {
        name: "",
        description: "",
        iconImageUrl: ""
      },

      meta: {
        title:
          "PAGEFUL（ペイジフル） - 誰でも簡単にコンテンツ配信・販売サイトを作成",
        notUseBaseTitle: true,
        description:
          "PAGEFUL（ペイジフル）では、ブログ、写真・画像、URLなど様々な形式でコンテンツを作成・配信できます。ブログ、自分のホームページ、思い出の写真のストック場所など用途も自由です。",
        subDomainForUrl: null,
        image: "https://pageful.app/img/top_page/concept@2x.png"
      }
    }
  },
  async asyncData(context) {
    const pageLabel = context.store.state.subDomain.subDomain
    if (pageLabel) {
      await context.store.dispatch("page/getWithPostList", {
        label: pageLabel
      })
      if (context.store.state.page.isError) {
        // 404処理
        context.error({
          statusCode: 404
        })
      }

      // member登録・ログインのsuccessメッセージを表示。callbackからrouter.pushではなく、redirectで遷移してくるため、パラメーターで判断
      if (
        context.route.query.hasOwnProperty("success_message") &&
        context.route.query.success_message.length > 0
      ) {
        context.store.dispatch(
          "flashMessage/showSuccess",
          context.route.query.success_message
        )
      }

      return {
        page: {
          name: context.store.state.page.name,
          description: context.store.state.page.description
        },
        profile: {
          name: context.store.state.profile.name,
          description: context.store.state.profile.description,
          iconImageUrl: context.store.state.profile.iconImageUrl
        },

        meta: {
          title: context.store.state.page.name,
          userPageTitle: context.store.state.page.name,
          notUseBaseTitle: true,
          description: context.store.state.page.description
            ? context.store.state.page.description
            : context.store.state.page.name,
          subDomainForUrl: pageLabel,
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
