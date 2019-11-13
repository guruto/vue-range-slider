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
              ¥1000
            </p>
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
              :disabled="isLoading"
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
  data() {
    return {
      meta: {
        title:       "出金申請",
        description: "PAGEFUL（ペイジフル）の出金申請ページ"
      }
    }
  },
  async asyncData(context) {
    return {}
  },
  methods: {
    async handleAddRequest() {
    
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