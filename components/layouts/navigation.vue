<template>
  <div class="l-navigation">
    <div
      v-if="toggleSidebar"
      class="l-navigation__backdrop"
      @click="closeToggle"
    />

    <transition name="l-navigation__slide-side">
      <div v-if="toggleSidebarForDashboard" class="l-navigation__sidenav">
        <div class="l-navigation__sidenav__header">
          <span
            class="l-navigation__sidenav__header__close"
            @click="closeToggle"
          />
        </div>
        <div class="l-navigation__sidenav__info">
          <span class="l-navigation__sidenav__info__page-title">{{
            this.$store.state.user.page.name
          }}</span>
          <div
            class="l-navigation__sidenav__info__profile"
            @click="closeToggle"
          >
            <nuxt-link
              to="/dashboard/setting/profile"
              class="l-navigation__sidenav__info__profile__content"
            >
              <div class="p-user-top__head__profile__content__thumbnail">
                <span
                  class="p-user-top__head__profile__content__thumbnail__image"
                  :style="
                    'background-image: url(' +
                      this.$store.state.profile.iconImageUrl +
                      ')'
                  "
                />
              </div>
              <span class="p-user-top__head__profile__content__name">{{
                this.$store.state.profile.name
              }}</span>
            </nuxt-link>
          </div>

          <a
            class="l-navigation__sidenav__info__action"
            :href="$getUrl('/', this.$store.state.user.page.label)"
            target="_blank"
          >
            <i class="material-icons">open_in_new</i>
            <span>自分のページを開く</span>
          </a>
          <div
            v-clipboard:copy="$getUrl('/', this.$store.state.user.page.label)"
            v-clipboard:success="clipboardSuccess"
            v-clipboard:error="clipboardError"
            class="l-navigation__sidenav__info__action"
          >
            <i class="material-icons">link</i>
            <span class="">自分のページのURLをコピー</span>
          </div>
        </div>
        <ul class="l-navigation__sidenav__list">
          <li class="l-navigation__sidenav__list__item" @click="closeToggle">
            <nuxt-link to="/dashboard">
              ダッシュボード
            </nuxt-link>
          </li>
          <li class="l-navigation__sidenav__list__item" @click="closeToggle">
            <nuxt-link to="/dashboard/post/manage">
              投稿管理
            </nuxt-link>
          </li>
          <li class="l-navigation__sidenav__list__item" @click="closeToggle">
            <nuxt-link to="/dashboard/request">
              質問管理
            </nuxt-link>
          </li>
          <li class="l-navigation__sidenav__list__item" @click="closeToggle">
            <nuxt-link to="/dashboard/setting/page">
              サイト設定
            </nuxt-link>
          </li>
          <li class="l-navigation__sidenav__list__item" @click="closeToggle">
            <nuxt-link to="/dashboard/setting/profile">
              プロフィール設定
            </nuxt-link>
          </li>
          <li class="l-navigation__sidenav__list__item" @click="closeToggle">
            <nuxt-link to="/dashboard/setting/design">
              デザイン設定
            </nuxt-link>
          </li>
          <li class="l-navigation__sidenav__list__item" @click="closeToggle">
            <nuxt-link to="/dashboard/member/manage">
              メンバー一覧
            </nuxt-link>
          </li>
          <li class="l-navigation__sidenav__list__item" @click="closeToggle">
            <nuxt-link to="/dashboard/member/belong">
              メンバー登録サイト一覧
            </nuxt-link>
          </li>
          <li class="l-navigation__sidenav__list__item" @click="closeToggle">
            <nuxt-link to="/dashboard/setting/list">
              各種設定一覧
            </nuxt-link>
          </li>
          <li
            class="l-navigation__sidenav__list__item is-logout"
            @click="handleLogout"
          >
            <nuxt-link to="#">
              ログアウト
            </nuxt-link>
          </li>
        </ul>
        <ul class="l-navigation__sidenav__list is-info">
          <li class="l-navigation__sidenav__list__item">
            <a :href="$getUrl('/info/term')">利用規約</a>
          </li>
          <li class="l-navigation__sidenav__list__item">
            <a :href="$getUrl('/info/privacy')">プライバシーポリシー</a>
          </li>
          <li class="l-navigation__sidenav__list__item">
            <a :href="$getUrl('/info/inquiry')">お問い合わせ</a>
          </li>
          <li class="l-navigation__sidenav__list__item">
            <a href="https://guruto.jp" target="_blank">運営会社</a>
          </li>
        </ul>
      </div>
    </transition>

    <transition name="l-navigation__slide-side">
      <div v-if="toggleSidebarForUserPage" class="l-navigation__sidenav">
        <div class="l-navigation__sidenav__header">
          <span
            class="l-navigation__sidenav__header__close"
            @click="closeToggle"
          />
        </div>
        <div class="l-navigation__sidenav__info">
          <span class="l-navigation__sidenav__info__page-title">{{
            this.$store.state.page.name
          }}</span>
          <div
            class="l-navigation__sidenav__info__profile"
            @click="closeToggle"
          >
            <nuxt-link
              to="/about"
              class="l-navigation__sidenav__info__profile__content"
            >
              <div class="p-user-top__head__profile__content__thumbnail">
                <span
                  class="p-user-top__head__profile__content__thumbnail__image"
                  :style="
                    'background-image: url(' +
                      this.$store.state.profile.iconImageUrl +
                      ')'
                  "
                />
              </div>
              <span class="p-user-top__head__profile__content__name">{{
                this.$store.state.profile.name
              }}</span>
            </nuxt-link>
          </div>
          <div
            v-clipboard:copy="$getUrl('/', this.$store.state.page.label)"
            v-clipboard:success="clipboardSuccess"
            v-clipboard:error="clipboardError"
            class="l-navigation__sidenav__info__action"
          >
            <i class="material-icons">link</i>
            <span class="">このページのURLをコピー</span>
          </div>
        </div>
        <ul class="l-navigation__sidenav__list">
          <li class="l-navigation__sidenav__list__item" @click="closeToggle">
            <nuxt-link to="/">
              HOME
            </nuxt-link>
          </li>
          <li class="l-navigation__sidenav__list__item" @click="closeToggle">
            <nuxt-link to="/about">
              ABOUT
            </nuxt-link>
          </li>
          <li class="l-navigation__sidenav__list__item" @click="closeToggle">
            <nuxt-link to="/request">
              QUESTION
            </nuxt-link>
          </li>
        </ul>
        <ul class="l-navigation__sidenav__list">
          <!--					<li v-if="false && isAuthenticated && isMember" class="l-navigation__sidenav__list__item" @click="closeToggle"><nuxt-link to="/member/profile">プロフィール</nuxt-link></li>-->
          <li
            v-if="isAuthenticated && isMember"
            class="l-navigation__sidenav__list__item"
            @click="closeToggle"
          >
            <nuxt-link to="/member/setting">
              メンバー設定
            </nuxt-link>
          </li>
          <li
            v-if="!isAuthenticated"
            class="l-navigation__sidenav__list__item"
            @click="closeToggle"
          >
            <nuxt-link to="/member/sign_up">
              メンバー新規登録
            </nuxt-link>
          </li>
          <li
            v-if="!isAuthenticated"
            class="l-navigation__sidenav__list__item"
            @click="closeToggle"
          >
            <nuxt-link to="/member/login">
              メンバーログイン
            </nuxt-link>
          </li>
          <li
            v-if="isAuthenticated && !isMember && !isMyPage"
            class="l-navigation__sidenav__list__item"
            @click="closeToggle"
          >
            <nuxt-link to="/member/sign_up">
              メンバー新規登録
            </nuxt-link>
          </li>
          <li class="l-navigation__sidenav__list__item" @click="closeToggle">
            <a :href="$getUrl('/dashboard')" target="_blank">自分のダッシュボードへ</a>
          </li>
        </ul>
        <ul class="l-navigation__sidenav__list is-info">
          <li class="l-navigation__sidenav__list__item" @click="closeToggle">
            <nuxt-link to="/member/info/term">
              利用規約
            </nuxt-link>
          </li>
          <li class="l-navigation__sidenav__list__item" @click="closeToggle">
            <nuxt-link to="/member/info/transaction_law">
              特定商取引法に基づく表示
            </nuxt-link>
          </li>
        </ul>

        <div class="l-navigation__sidenav__introduction">
          <a :href="$getUrl('/')" target="_blank">
            <span>powered by</span>
            <img src="/img/title@2x.png" alt="PAGEFUL[ペイジフル]">
          </a>
        </div>
      </div>
    </transition>

    <!--		<transition name="l-navigation__slide-hover">-->
    <!--			<div v-if="toggleSidebarForTopPage" class="l-navigation__hover">-->
    <!--				<div class="l-navigation__hover__content">-->
    <!--					<div class="l-navigation__hover__content__logo">-->
    <!--						<img src="/img/title_white@2x.png" alt="PAGEFUL[ペイジフル]">-->
    <!--					</div>-->
    <!--					<span class="l-navigation__hover__content__description">PAGEFUL（ペイジフル）は簡単に自分だけのページを作成でき、コンテンツを配信できます。</span>-->
    <!--					<ul class="l-navigation__hover__content__list">-->
    <!--						<li class="l-navigation__hover__content__list__item" @click="closeToggle"><a :href="$getUrl('/user/sign_up')">登録して自分のページを作成</a><i class="fas fa-angle-right"></i></li>-->
    <!--						<li class="l-navigation__hover__content__list__item" @click="closeToggle"><a :href="$getUrl('/user/login')">ログイン</a><i class="fas fa-angle-right"></i></li>-->
    <!--					</ul>-->
    <!--					<div class="l-navigation__hover__content__close">-->
    <!--						<button @click="closeToggle" type="button" class="c-btn">閉じる</button>-->
    <!--					</div>-->
    <!--				</div>-->
    <!--			</div>-->
    <!--		</transition>-->
  </div>
</template>

<script>
export default {
  computed: {
    toggleSidebar() {
      return (
        this.toggleSidebarForDashboard ||
        this.toggleSidebarForTopPage ||
        this.toggleSidebarForUserPage
      )
    },
    toggleSidebarForDashboard() {
      return this.$store.getters["navigation/toggleSidebarForDashboard"]
    },
    toggleSidebarForTopPage() {
      return this.$store.getters["navigation/toggleSidebarForTopPage"]
    },
    toggleSidebarForUserPage() {
      return this.$store.getters["navigation/toggleSidebarForUserPage"]
    },
    isAuthenticated() {
      // ユーザー認証済みか否か
      return this.$store.state.user.authenticated
    },
    isMember() {
      // 既にメンバーか否か
      const pageLabel = this.$store.state.subDomain.subDomain
      return (
        this.$store.state.user.memberPageLabelList.indexOf(pageLabel) !== -1
      )
    },
    isMyPage() {
      if (!this.$store.state.user.authenticated) {
        return false
      }
      const pageLabel = this.$store.state.subDomain.subDomain
      return this.$store.state.user.page.label === pageLabel
    }
  },
  methods: {
    closeToggle() {
      this.$store.dispatch("navigation/closeToggleSidebar")
    },
    handleLogout() {
      this.closeToggle()
      this.$store.dispatch("user/logout")
      this.$router.push("/user/login")
    },
    clipboardSuccess() {
      alert("自分のページのURLをコピーしました")
    },
    clipboardError() {
      alert("自分のページのURLのコピーに失敗しました")
    }
  }
}
</script>

<style lang="scss">
.l-navigation {
  height: 100%;
  width: 100%;
  &__backdrop {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 2;
    position: fixed;
    top: 0;
    left: 0;
  }
  // サイドバー
  &__slide-side {
    &-enter-active,
    &-leave-active {
      transition: all 0.3s ease-out;
    }
    &-enter,
    &-leave-to {
      transform: translateX(-100%);
    }
  }
  &__sidenav {
    height: 100%;
    width: 300px;
    background-color: $color_base;
    z-index: 2;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    box-sizing: border-box;
    overflow-y: auto;

    &__header {
      position: relative;
      text-align: center;
      /*&.is-unauthenticated {*/
      /*	padding: 16px 0 7px;*/
      /*}*/
      span {
        font-size: 16px;
        font-weight: bold;
      }
      img {
        width: 103px;
      }
      &__close {
        &::after {
          position: absolute;
          font-family: "Font Awesome 5 Free";
          content: "\f00d";
          font-size: 20px;
          right: 20px;
          top: 11px;
        }
      }
    }
    &__info {
      border-bottom: 1px solid $color_border;
      padding: 40px 15px 20px;
      &__page-title {
        font-size: 18px;
        font-weight: bold;
        display: inline-block;
        margin-bottom: 20px;
      }
      &__profile {
        margin-bottom: 30px;
        &__content {
          display: flex;
          &__thumbnail {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            overflow: hidden;
            background-color: $color_light;
            display: inline-block;
            margin-right: 8px;
            &__image {
              display: inline-block;
              background-size: cover;
              background-position: 50%;
              background-repeat: no-repeat;
              width: 100%;
              height: 100%;
            }
          }
          &__name {
            display: inline-block;
            font-size: 14px;
            font-weight: normal;
            color: $color_text;
            margin-top: 6px;
          }
        }
      }
      &__action {
        display: flex;
        cursor: pointer;
        margin-bottom: 18px;
        &:last-child {
          margin-bottom: 0;
        }
        i {
          width: 24px;
          height: 24px;
          margin-right: 8px;
          color: $color_link;
        }
        span {
          font-weight: bold;
          font-size: 14px;
          margin-top: 1px;
          color: $color_link;
        }
      }
    }
    &__list {
      list-style: none;
      margin: 0;
      display: block;
      background: $color_white;
      padding: 10px 15px;
      border-bottom: 1px solid $color_border;
      &.is-info {
        border-bottom: none;
        .l-navigation__sidenav__list__item {
          a {
            font-weight: normal;
          }
        }
      }
      &__item {
        a {
          display: block;
          padding: 12px 0;
          text-decoration: none;
          color: $color_text !important;
          font-size: 15px;
          font-weight: bold;
        }
        &.is-logout {
          a {
            color: $color_accent !important;
          }
        }
      }
    }
    &__add {
      text-align: center;
      padding: 15px 15px;
      .c-btn {
        width: 100%;
      }
    }
    &__introduction {
      padding: 30px 15px;
      span {
        color: $color_dark_gray;
        font-size: 14px;
      }
      img {
        vertical-align: -2px;
        width: 82px;
      }
      &__link {
        display: flex;
        img {
          width: 24px;
          height: 24px;
          margin-right: 8px;
        }
        span {
          font-weight: normal;
          font-size: 14px;
          margin-top: 1px;
          color: $color_text !important;
        }
      }
    }
  }

  // トップページ
  &__slide-hover {
  }
  &__hover {
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 2;
    position: fixed;
    top: 0;
    left: 0;
    &__content {
      margin: 120px 20%;
      &__logo {
        text-align: center;
        margin-bottom: 20px;
        img {
          width: 103px;
        }
      }
      &__description {
        margin-bottom: 40px;
        color: $color_white;
        text-align: center;
        display: block;
        font-size: 14px;
      }
      &__list {
        margin-bottom: 50px;
        &__item {
          text-align: center;
          font-size: 15px;
          color: #ffffff !important;
          margin-bottom: 15px;
          a {
            color: $color_white !important;
          }
          i {
            margin-left: 5px;
          }
        }
      }
      &__close {
        text-align: center;
        button {
          color: $color_text !important;
          background-color: $color_white;
          width: 170px;
          border-radius: 30px;
          padding: 8px 0;
          font-size: 15px;
        }
      }
    }
  }
}
</style>
