<template>
  <div>
    <h1 class="c-title">
      売上管理
    </h1>
  
    <section class="c-section">
      <div class="p-sale-manage">
  
        <div class="p-sale-manage__info">
          <h2 class="c-title--sub">売上総額</h2>
          <p class="p-sale-manage__info__amount">¥{{this.$store.state.userSales.cumulativeAmount | price}}</p>
        </div>
        <div class="p-sale-manage__info">
          <h2 class="c-title--sub">未出金の売上総額</h2>
          <p class="p-sale-manage__info__amount">¥{{this.$store.state.userSales.notPayoutAmount | price}}</p>
        </div>
        
        <div class="p-sale-manage__payout">
          <nuxt-link to="/dashboard/sales/payout" class="c-btn c-btn--main">
            出金申請する
          </nuxt-link>
        </div>
        
        <div class="p-sale-manage__other">
          <h2 class="c-title--sub">履歴</h2>
          <nuxt-link to="/dashboard/sales/transaction_history" class="c-btn c-btn--main">
            売上履歴
          </nuxt-link>
          <nuxt-link to="/dashboard/sales/payout_history" class="c-btn c-btn--main">
            出金履歴
          </nuxt-link>
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
      meta: {
        title:       "売上管理",
        description: "PAGEFUL（ペイジフル）の売上管理ページ"
      }
    }
  },
  async asyncData(context) {
    await context.store.dispatch("userSales/getInfoMyself")
    
    return {
    }
  },
  methods: {}
}
</script>
<style lang="scss">
  .p-sale-manage {
    &__info {
      margin-bottom: 20px;
      &__amount {
        font-size: 24px;
        font-weight: bold;
        color: $color_dark_gray;
      }
    }
    &__payout {
      text-align: center;
      margin-bottom: 20px;
      .c-btn {
        width: 100% !important;
      }
    }
    &__other {
      text-align: center;
      margin-bottom: 20px;
      .c-btn {
        width: 100% !important;
        margin-bottom: 12px;
      }
    }
  }
</style>