<template>
  <div>
    <h1 class="c-title">
      出金履歴
    </h1>
    
    <section class="c-section">
      <div class="p-payout-history">
        
        <div class="p-payout-history__none">
          <p>出金履歴はありません。</p>
        </div>
        
        <div class="p-payout-history__list">
          <div class="p-payout-history__list__item">
            <p class="p-payout-history__list__item__status">申請済み</p>
            <p class="p-payout-history__list__item__amount">¥1000</p>
            <p class="p-payout-history__list__item__datetime">2019/01/01</p>
          </div>
          <div class="p-payout-history__list__item">
            <p class="p-payout-history__list__item__status">振り込み済み</p>
            <p class="p-payout-history__list__item__amount">¥1000</p>
            <p class="p-payout-history__list__item__datetime">2019/01/01</p>
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
    data() {
      return {
        meta: {
          title:       "出金履歴",
          description: "PAGEFUL（ペイジフル）の出金履歴ページ"
        }
      }
    },
    async asyncData(context) {
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