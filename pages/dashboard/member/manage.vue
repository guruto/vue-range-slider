<template>
  <div class="p-member">
    <h1 class="c-title">
      メンバー一覧
    </h1>

    <section class="c-section">
      <div class="">
        <p class="p-member__description">
          自分のサイトに登録しているメンバーの一覧です。
        </p>

        <p
          v-if="this.$store.state.memberList.items.length === 0"
          class="p-member__none"
        >
          メンバーはまだいません
        </p>

        <div
          v-if="this.$store.state.memberList.items.length > 0"
          class="p-member__list"
        >
          <div
            v-for="(member, memberIndex) in this.$store.state.memberList.items"
            :key="memberIndex"
            class="p-member__list__item"
          >
            <a :href="$getUrl('/', member.page.label)" target="_blank">
              <div class="p-member__list__item__content">
                <div class="p-member__list__item__icon">
                  <span
                    class="p-member__list__item__icon__image"
                    :style="
                      'background-image: url(' +
                        member.profile.icon_image_url +
                        ')'
                    "
                  />
                </div>
                <div class="p-member__list__item__info">
                  <span>{{
                    member.profile.name ? member.profile.name : "名前未設定"
                  }}</span>
                </div>
              </div>
            </a>
          </div>
        </div>

        <div style="text-align: center; margin-top: 30px;">
          <nuxt-link to="/dashboard" class="c-btn c-btn--main">
            ダッシュボードに戻る
          </nuxt-link>
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
      meta: {
        title: "メンバー一覧",
        description: "PAGEFUL（ペイジフル）のメンバー一覧ページ"
      }
    }
  },
  async asyncData(context) {
    await context.store.dispatch("memberList/getListBelongToMyPage", {})

    return {}
  },
  methods: {}
}
</script>

<style lang="scss">
.p-member {
  &__list {
    margin-top: 20px;
    &__item {
      margin-bottom: 15px;
      &:last-child {
        margin-bottom: 0;
      }
      &__content {
        display: table;
        table-layout: fixed;
        width: 100%;
        margin-bottom: 4px;
      }
      &__icon {
        display: table-cell;
        vertical-align: top;
        width: 70px;
        &__image {
          border-radius: 50%;
          background-color: $color_light;
          width: 50px;
          height: 50px;
          display: inline-block;
          background-size: cover;
          background-position: 50%;
          background-repeat: no-repeat;
        }
      }
      &__info {
        display: table-cell;
        vertical-align: middle;
        width: 100%;
        span {
          font-size: 14px;
          font-weight: normal;
          color: $color_text;
          display: block;
          margin-top: -6px;
        }
      }
    }
  }
}
</style>
