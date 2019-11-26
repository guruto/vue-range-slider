<template>
  <div class="p-setting-list">
    <h1 class="c-title">
      各種設定
    </h1>

    <section class="c-section">
      <ul>
        <li>
          <nuxt-link to="/dashboard/setting/page">
            <span>サイト設定</span>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/dashboard/setting/profile">
            <span>プロフィール設定</span>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/dashboard/setting/design">
            <span>デザイン設定</span>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/dashboard/setting/setting">
            <span>通知設定</span>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/dashboard/setting/social">
            <span>SNS連携設定</span>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/dashboard/setting/mail">
            <span>メールアドレス設定</span>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/dashboard/setting/password">
            <span>パスワード設定</span>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/dashboard/setting/bank_account">
            <span>出金先の銀行口座設定</span>
          </nuxt-link>
        </li>
        <li @click="handleLogout">
          <span class="is-logout">ログアウト</span>
        </li>
      </ul>
    </section>
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
      isLoading: false,

      meta: {
        title: "各種設定",
        description: "PAGEFUL（ペイジフル）の各種設定ページ"
      }
    }
  },
  async asyncData(context) {
    return {}
  },
  methods: {
    handleLogout() {
      this.$store.dispatch("user/logout")
      this.$router.push("/user/login")
    }
  }
}
</script>

<style lang="scss">
.p-setting-list {
  ul {
    li {
      width: 100%;
      a {
        display: block;
      }
      span {
        padding: 10px 0;
        display: block;
        font-size: 15px;
        font-weight: bold;
        color: $color_text;
        &.is-logout {
          color: $color_accent;
        }
      }
    }
  }
}
</style>
