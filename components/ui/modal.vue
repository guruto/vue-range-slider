<template>
  <div v-if="isActive" class="c-modal">
    <div v-if="isActive" class="c-modal__backdrop" @click="hideModal" />

    <transition name="c-modal__transition">
	  <div class="c-modal__wrapper">
      <div class="c-modal__content">
        <div class="c-modal__content__head">
          <div class="c-modal__content__head__title">
            <span>{{ title }}</span>
          </div>
        </div>
        <div class="c-modal__content__body">
          <div
            v-if="type == 'description'"
            class="c-modal__content__body__description"
          >
            <span>{{ description }}</span>
          </div>

          <div
            v-else-if="type == 'page_link'"
            class="c-modal__content__body__page-link"
          >
            <div class="p-form" style="padding-bottom: 0;">
              <div class="p-form__group">
                <div class="p-form__item">
                  <input
                    type="text"
                    placeholder="リンクの名前"
                    :value="pageLinkTitleComputed"
                    @keyup="handleChangePageLinkTitle"
                  >
                </div>
              </div>
              <div class="p-form__group">
                <div class="p-form__item">
                  <input
                    type="text"
                    placeholder="https://pageful.app"
                    :value="pageLinkUrlComputed"
                    @keyup="handleChangePageLinkUrl"
                  >
                </div>
              </div>
            </div>
          </div>

          <div
            v-else-if="type == 'add_post'"
            class="c-modal__content__body__add-post"
          >
            <ul>
              <li @click="hideModal">
                <nuxt-link to="/dashboard/post/add?type=TEXT">
                  <span class="icons icons--text" />
                  <span>ブログ</span>
                </nuxt-link>
              </li>
              <li @click="hideModal">
                <nuxt-link to="/dashboard/post/add?type=IMAGE">
                  <span class="icons icons--image" />
                  <span>写真・画像</span>
                </nuxt-link>
              </li>
              <li @click="hideModal">
                <nuxt-link to="/dashboard/post/add?type=VIDEO">
                  <span class="icons icons--video" />
                  <span>動画</span>
                </nuxt-link>
              </li>
              <li @click="hideModal">
                <nuxt-link to="/dashboard/post/add?type=SOUND">
                  <span class="icons icons--sound" />
                  <span>音声</span>
                </nuxt-link>
              </li>
              <li @click="hideModal">
                <nuxt-link to="/dashboard/post/add?type=FILE">
                  <span class="icons icons--file" />
                  <span>ファイル</span>
                </nuxt-link>
              </li>
              <li @click="hideModal">
                <nuxt-link to="/dashboard/post/add?type=LINK">
                  <span class="icons icons--link" />
                  <span>リンク引用</span>
                </nuxt-link>
              </li>
              <li @click="hideModal">
                <nuxt-link to="/dashboard/request">
                  <span class="icons icons--answer" />
                  <span>質問回答</span>
                </nuxt-link>
              </li>
            </ul>
          </div>

          <div
            v-else-if="type == 'save_publish_setting'"
            class="c-modal__content__body__publish-setting"
          >
            <div class="p-form">
              <div class="p-form__group">
                <label class="p-form__label">公開範囲</label>
                <div style="margin: 12px 0 0; display: block;">
                  <div class="p-form__item">
                    <input
                      id="scope-all"
                      v-model="scope"
                      type="radio"
                      value="PUBLIC"
                    >
                    <label for="scope-all">全公開</label>
                  </div>
                  <div class="p-form__item">
                    <input
                      id="scope-member"
                      v-model="scope"
                      type="radio"
                      value="MEMBER"
                    >
                    <label for="scope-member">メンバー限定</label>
                  </div>

	                <div class="p-form__item">
		                <input type="radio" id="scope-payment" value="PAYMENT" v-model="scope" />
		                <label for="scope-payment">有料販売</label>
	                </div>
	                <div class="u-cf">
		                <div class="c-modal__content__body__publish-setting__yen">
			                <span>¥</span>
		                </div>
		                <div class="c-modal__content__body__publish-setting__price">
			                <input type="number" v-model="price" :disabled="scope != 'PAYMENT'" placeholder="1000" min="100" max="100000"/>
		                </div>
	                </div>
	                <p class="p-form__info">有料に設定した場合、購入した方のみが本文・コメント内容を閲覧できます。</p>
                </div>
              </div>
            </div>
          </div>

	        <div v-else-if="type == 'post_purchase_auth'">
		        <div>
			        <p>メンバーアカウントをお持ちの方</p>
			        <a href="/member/login" class="c-btn c-btn--main">メンバーログインして購入</a>
			        <a href="/member/sign_up" class="c-btn c-btn--main">新規メンバー登録して購入</a>
		        </div>
		        <div>
			        <p>メンバーアカウントをお持ちでない方</p>
			        <button type="button" class="c-btn c-btn--main">登録せず購入</button>
		        </div>
	        </div>

	        <div v-else-if="type == 'post_purchase_payment'" class="c-modal__content__body__post-purchase-payment">
		        <div style="margin-bottom: 25px;">
			        <p class="c-modal__content__body__post-purchase-payment__title">{{this.postPurchaseTitle}}</p>
			        <p class="c-modal__content__body__post-purchase-payment__price">¥{{Number(this.postPurchasePrice).toLocaleString()}}</p>
		        </div>

		        <div class="p-form">
			        <div class="p-form__payment__scope">
				        <img src="/img/post/transaction/visa.gif" alt="VISAカード">
				        <img src="/img/post/transaction/mastercard.gif" alt="MASTERカード">
			        </div>
			        <div class="p-form__group">
				        <label class="p-form__label">カード番号</label>
				        <div class="p-form__item">
					        <input type="text" pattern="[0-9]{13,16}" v-model="cardNumber" placeholder="例: 4444333322221111"/>
				        </div>
				        <p class="p-form__info">Visa・Mastercardのみ対応</p>
			        </div>
			        <div class="p-form__group">
				        <div>
					        <label class="p-form__label">有効期限</label>
				        </div>
				        <div style="width: 50px; display: inline-block;">
					        <div class="p-form__item">
						        <select v-model="cardExpireMonth">
							        <option :value="null" selected>月</option>
							        <option value="01">01</option>
							        <option value="02">02</option>
							        <option value="03">03</option>
							        <option value="04">04</option>
							        <option value="05">05</option>
							        <option value="06">06</option>
							        <option value="07">07</option>
							        <option value="08">08</option>
							        <option value="09">09</option>
							        <option value="10">10</option>
							        <option value="11">11</option>
							        <option value="12">12</option>
						        </select>
					        </div>
				        </div>
				        <span style="margin: 0 10px;">/</span>
				        <div style="width: 70px; display: inline-block;">
					        <div class="p-form__item">
						        <select v-model="cardExpireYear">
							        <option :value="null" selected>年</option>
							        <option value="19">2019</option>
							        <option value="20">2020</option>
							        <option value="21">2021</option>
							        <option value="22">2022</option>
							        <option value="23">2023</option>
							        <option value="24">2024</option>
							        <option value="25">2025</option>
							        <option value="26">2026</option>
							        <option value="27">2027</option>
						        </select>
					        </div>
				        </div>

			        </div>
			        <div class="p-form__group">
				        <div>
					        <label class="p-form__label">セキュリティコード</label>
				        </div>
				        <div style="width: 120px;display: inline-block;">
					        <div class="p-form__item">
						        <input type="number" v-model="cardSecurityCode" placeholder="例: 111"/>
					        </div>
				        </div>
			        </div>
			        <div v-if="1 || isAuthenticated" class="p-form__group">
				        <label class="p-form__label">メールアドレス</label>
				        <div class="p-form__item">
					        <input type="email" v-model="purchaseGuestEmail" placeholder="example@hello.com"/>
				        </div>
				        <p class="p-form__info">購入後、指定のメールアドレスに購入内容をメール送信します。</p>
			        </div>
		        </div>
	        </div>
        </div>

	      <div class="c-modal__content__action">
		      <div
			      v-if="actionMessage"
			      class="c-modal__content__action__btn-wrapper is-action"
		      >
			      <button class="c-btn" @click="handleButtonAction">
				      {{ actionMessage }}
			      </button>
		      </div>
		      <div
			      v-if="subActionMessage"
			      class="c-modal__content__action__btn-wrapper is-default"
		      >
			      <button class="c-btn" @click="handleButtonSubAction">
				      {{ subActionMessage }}
			      </button>
		      </div>
		      <div class="c-modal__content__action__btn-wrapper is-cancel">
			      <button class="c-btn" @click="handleButtonCancel">
				      キャンセル
			      </button>
		      </div>
	      </div>
      </div>
	  </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: [
	  'type', 'title', 'description', 'actionMessage', 'subActionMessage', 'cancelMessage', 'onHandleAction', 'onHandleSubAction', 'onHandleCancel',
	  'initialPageLinkTitle', 'initialPageLinkUrl', 'initialScope', 'initialPrice', 'postPurchaseTitle', 'postPurchasePrice',
  ],
  data() {
    return {
      // Page_linkの追加
      pageLinkTitle: this.initialPageLinkTitle,
      pageLinkUrl: this.initialPageLinkUrl,

      // Postの公開設定
      scope: this.initialScope,
      price: this.initialPrice,

      // post paymentの設定
	  cardNumber:         null,
      cardExpireMonth:    null,
      cardExpireYear:     null,
      cardSecurityCode:   null,
      purchaseGuestEmail: null,
    }
  },
  computed: {
    isActive() {
      return this.$store.getters["modal/isActive"]
    },
    pageLinkTitleComputed() {
      this.pageLinkTitle = this.initialPageLinkTitle
      return this.initialPageLinkTitle ? this.initialPageLinkTitle : ""
    },
    pageLinkUrlComputed() {
      this.pageLinkUrl = this.initialPageLinkUrl
      return this.initialPageLinkUrl ? this.initialPageLinkUrl : ""
    }
  },
  methods: {
    handleChangePageLinkTitle(e) {
      this.pageLinkTitle = e.target.value
    },
    handleChangePageLinkUrl(e) {
      this.pageLinkUrl = e.target.value
    },

    hideModal() {
	  this.setStateDefault()
      this.$store.dispatch("modal/hide")
    },
    handleButtonAction() {
      if (this.type == "page_link") {
        // urlチェック
        if (
          !this.pageLinkUrl.match(
            /^(https?|ftp)(:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+)$/
          )
        ) {
          console.log("invalid url")
          return
        }
        if (this.pageLinkTitle.length == 0) {
          console.log("no title")
          return
        }
        this.onHandleAction(this.pageLinkTitle, this.pageLinkUrl)
	    this.hideModal()

      } else if (this.type == "save_publish_setting") {
	      this.onHandleAction(this.scope, "public")
	      this.hideModal()

      } else if (this.type == "post_purchase_payment") {
	      const param = {
		      amount:       this.postPurchasePrice,
		      cardNumber:   this.cardNumber,
		      cardExpire:   this.cardExpireMonth + '/' + this.cardExpireYear, // MM/YY
		      securityCode: this.cardSecurityCode,
		      guestEmail:   this.purchaseGuestEmail,
		      // firstName:    this.cardName,
		      // lastName:     this.cardName,
	      }
	      this.onHandleAction(param)

      } else {
        this.onHandleAction()
	    this.hideModal()
      }
    },
    handleButtonSubAction() {
      if (this.type == "save_publish_setting") {
        this.onHandleAction(this.scope, "draft")
      }

      this.setStateDefault()
      this.$store.dispatch("modal/hide")
    },
    handleButtonCancel() {
      // this.onHandleCancel();
      this.setStateDefault()
      this.$store.dispatch("modal/hide")
    },
    setStateDefault() {
      this.pageLinkTitle = ""
      this.pageLinkUrl = ""
      this.scope = "PUBLIC"
      this.price         = null
      this.cardNumber         = null
      this.cardExpireMonth    = null
      this.cardExpireYear     = null
      this.cardSecurityCode   = null
      this.purchaseGuestEmail = null
    }
  }
}
</script>
