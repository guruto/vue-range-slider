<template>
  <div>
    <h1 class="c-title">
      出金申請
    </h1>
  
    <section class="c-section">
      <div class="p-payout">
  
        <div class="p-form">
          <div class="p-form__group">
            <label class="p-form__label">出金可能な売上</label>
            <p class="p-form__value">
              ¥{{this.$store.state.userSales.notPayoutAmount | price}}
            </p>
          </div>
  
          <p v-if="!this.$store.state.userSales.canPayout">現在出金可能な売上がありません。</p>
  
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