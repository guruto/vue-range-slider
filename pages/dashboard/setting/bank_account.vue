<template>
  <div class="p-setting-profile">
    <h1 class="c-title">
      銀行口座設定
    </h1>
    <section class="c-section">
      <div>
        <div class="p-form">
          <form @submit.prevent="update">
  
            <div class="p-form__group">
              <label class="p-form__label">銀行名</label>
              <div class="p-form__item">
                <input type="text" v-model="bankName" placeholder="例）みずほ銀行"/>
              </div>
            </div>
  
            <div class="p-form__group">
              <label class="p-form__label">支店名</label>
              <div class="p-form__item">
                <input type="text" v-model="branchName" placeholder="例）渋谷中央支店"/>
              </div>
            </div>
  
            <div class="p-form__group">
              <label class="p-form__label">口座種別</label>
              <div class="p-form__item" style="margin-bottom: 8px">
                <input
                  id="account-type-normal"
                  v-model="accountType"
                  type="radio"
                  value="NORMAL"
                >
                <label for="account-type-normal">普通口座</label>
              </div>
              <div class="p-form__item" style="margin-bottom: 8px">
                <input
                  id="account-type-current"
                  v-model="accountType"
                  type="radio"
                  value="CURRENT"
                >
                <label for="account-type-current">当座口座</label>
              </div>
              <div class="p-form__item" style="margin-bottom: 8px">
                <input
                  id="account-type-saving"
                  v-model="accountType"
                  type="radio"
                  value="SAVING"
                >
                <label for="account-type-saving">貯蓄口座</label>
              </div>
            </div>
  
            <div class="p-form__group">
              <label class="p-form__label">口座番号</label>
              <div class="p-form__item">
                <input type="text" max="7" v-model="accountNumber" placeholder="1234567"/>
              </div>
            </div>
  
            <div class="p-form__group">
              <label class="p-form__label">口座名義人（カナ）</label>
              <div class="p-form__item">
                <input type="text" v-model="accountNameKana" placeholder="タナカ ハナコ"/>
              </div>
            </div>

            <div class="p-form__button">
              <button
                :class="{
                  'c-btn': true,
                  'c-btn--main': true,
                  'is-loading': isLoading
                }"
                type="submit"
                :disabled="!canSubmit || isLoading"
              >
                変更
              </button>
            </div>
            
          </form>
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
  computed: {
    canSubmit() {
      return (this.bankName.length > 0 && this.branchName.length > 0 && this.accountType.length > 0 && this.accountNumber.length > 0 && this.accountNameKana.length > 0)
    }
  },
  data() {
    return {
      isLoading: false,
      
      bankName: "",
      branchName: "",
      accountType: "NORMAL",
      accountNumber: "",
      // accountName: "",
      accountNameKana: "",

      meta: {
        title: "銀行口座設定",
        description: "PAGEFUL（ペイジフル）の銀行口座設定ページ"
      }
    }
  },
  async asyncData(context) {
    await context.store.dispatch("bankAccount/getMyself")

    return {
      bankName: context.store.state.bankAccount.bankName,
      branchName: context.store.state.bankAccount.branchName,
      accountType: context.store.state.bankAccount.accountType,
      accountNumber: context.store.state.bankAccount.accountNumber,
      // accountName: context.store.state.bankAccount.accountName,
      accountNameKana: context.store.state.bankAccount.accountNameKana,
    }
  },
  methods: {
    async update() {
      // const validated = await this.$validator.validateAll()
      // if (!validated) {
      //   return
      // }
      
      this.isLoading = true

      await this.$store.dispatch("bankAccount/save", {
        bankName: this.bankName,
        branchName: this.branchName,
        accountType: this.accountType,
        accountNumber: this.accountNumber,
        // accountName: this.accountName,
        accountNameKana: this.accountNameKana,
      })

      this.isLoading = false

      window.scrollTo(0, 0)
    }
  }
}
</script>

<style lang="scss"></style>
