<template>
  <div>
    <h1 class="c-title">
      売上履歴
    </h1>
  
    <section class="c-section">
      <div class="p-transaction-history">
        
        <div class="p-transaction-history__none">
          <p>売上履歴はありません。</p>
        </div>
        
        <div class="p-transaction-history__list">
          <div class="p-transaction-history__list__item">
            <nuxt-link to="/dashboard/post/item/" class="p-transaction-history__list__item__title">post title</nuxt-link>
            <p class="p-transaction-history__list__item__amount">¥1000</p>
            <p class="p-transaction-history__list__item__datetime">2019/01/01 12:35</p>
          </div>
          <div class="p-transaction-history__list__item">
            <nuxt-link to="/dashboard/post/item/" class="p-transaction-history__list__item__title">post title</nuxt-link>
            <p class="p-transaction-history__list__item__amount">¥1000</p>
            <p class="p-transaction-history__list__item__datetime">2019/01/01 12:35</p>
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
          title:       "売上履歴",
          description: "PAGEFUL（ペイジフル）の売上履歴ページ"
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
  .p-transaction-history {
    &__none {
      margin: 15px 0;
      text-align: center;
    }
    &__list {
      &__item {
        margin-bottom: 16px;
        &__title {
          font-size: 15px;
          font-weight: normal;
          margin-bottom: 4px;
          display: block;
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