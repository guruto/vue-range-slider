<template>
  <div>
    <h1 class="c-title">
      出金申請
    </h1>
  
    <section class="c-section">
      <div class="p-payout">
  
        <div class="p-form">
          <div class="p-form__group">
            <label class="p-form__label">未出金の売上総額</label>
            <p class="p-form__value" style="margin-bottom: 8px">
              ¥{{this.$store.state.userSales.notPayoutAmount | price}}
            </p>
            <p class="p-form__info">出金手数料の300円を引かれた額を、申請から通常5~7営業日以内にお振込します。</p>
          </div>
  
          <div v-if="!this.$store.state.userSales.canPayout">
            <p v-if="this.$store.state.userSales.hasRequestNotPaidOut">すでに出金申請中です。出金完了後に再度申請が可能です。</p>
            <p v-if="this.$store.state.userSales.notPayoutAmount < 301">出金最低額を満たしていません。301円以上から出金可能です。</p>
            <p v-if="!this.$store.state.userSales.hasBankAccount">出金先の銀行口座設定がありません。</p>
          </div>
  
          <div class="p-form__button">
            <button
              @click="handleAddRequest"
              :class="{
                  'c-btn': true,
                  'c-btn--main': true,
                  'is-loading': isLoading
                }"
              type="button"
              :disabled="isLoading || !this.$store.state.userSales.canPayout"
            >
              出金申請
            </button>
          </div>
          
          <div>
            <p style="margin-bottom: 16px">出金先の設定はこちらから</p>
            <nuxt-link class="c-btn c-btn--default" to="/dashboard/setting/bank_account">
              銀行口座設定
            </nuxt-link>
          </div>
          
        </div>
  
  
        </div>
    </section>
    
  </div>
</template>
<script>
import postList from "~/components/pages/postList"
import Meta from "~/assets/mixins/meta"

export default {
  layout:     "dashboard",
  components: {postList},
  mixins:     [Meta],
  filters: {
    price(price_text) {
      return Number(price_text).toLocaleString()
    }
  },
  data() {
    return {
      isLoading: false,
      
      meta: {
        title:       "出金申請",
        description: "PAGEFUL（ペイジフル）の出金申請ページ"
      }
    }
  },
  async asyncData(context) {
    await context.store.dispatch("userSales/getInfoMyself")
    
    return {}
  },
  methods: {
    async handleAddRequest() {
      this.isLoading = true
  
      await this.$store.dispatch("payout/request")
      
      this.isLoading = false
    },
  }
}
</script>
<style lang="scss">
  .p-payout {
    .p-form__value {
      font-size: 24px !important;
      font-weight: bold;
      color: $color_dark_gray;
    }
  }
</style>