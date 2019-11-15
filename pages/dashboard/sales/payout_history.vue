<template>
  <div>
    <h1 class="c-title">
      出金履歴
    </h1>
    
    <section class="c-section">
      <div class="p-payout-history">
        
        <div class="p-payout-history__none" v-if="this.$store.state.payoutList.items.length == 0">
          <p>出金履歴はありません。</p>
        </div>
        
        <div class="p-payout-history__list">
          <div class="p-payout-history__list__item" v-for="item in this.$store.state.payoutList.items">
            <p class="p-payout-history__list__item__status">{{item.status_text}}</p>
            <p class="p-payout-history__list__item__amount">¥{{item.total_amount | price}}</p>
            <p class="p-payout-history__list__item__datetime">{{item.created_at | moment}}</p>
          </div>
        </div>
      
      </div>
    </section>
  </div>
</template>

<script>
  import postList from "~/components/pages/postList"
  import Meta from "~/assets/mixins/meta"
  import moment from "moment"
  
  export default {
    layout:     "dashboard",
    components: {postList},
    mixins:     [Meta],
    filters: {
      price(price_text) {
        return Number(price_text).toLocaleString()
      },
      moment(unixtime) {
        return moment.unix(unixtime).format("YYYY/MM/DD")
      }
    },
    data() {
      return {
        meta: {
          title:       "出金履歴",
          description: "PAGEFUL（ペイジフル）の出金履歴ページ"
        }
      }
    },
    async asyncData(context) {
      await context.store.dispatch("payoutList/getHistoriesMyself")
      
      return {}
    },
    methods: {}
  }
</script>

<style lang="scss">
.p-payout-history {
  &__none {
    margin: 15px 0;
    text-align: center;
  }
  &__list {
    &__item {
      margin-bottom: 16px;
      &__status {
        font-size: 15px;
        font-weight: normal;
        margin-bottom: 4px;
      }
      &__amount {
        font-size: 15px;
        font-weight: bold;
        color: $color_dark_gray;
        margin-bottom: 4px;
      }
      &__datetime {
        font-size: 13px;
        font-weight: normal;
        color: $color_dark_gray;
      }
    }
  }
}
</style>