<template>
  <div class="p-top">
    <div class="p-top__wrapper">
      <div class="p-top__logo">
        <h1>
          <a href="/"><img
            src="/img/top_page/logo@2x.png"
            alt="PAGEUFL[ペイジフル] 誰でも簡単にコンテンツ配信・販売サイトを作成"
          ></a>
        </h1>
      </div>

      <div class="p-top__concept">
        <h2 class="p-top__concept__heading">
          簡単に自分だけのコンテンツ配信・販売サイトを作成
        </h2>
        <p class="p-top__concept__description">
          PAGEFUL（ペイジフル）では、テキスト・ブログ、写真、動画、音声、ファイルなど様々な形式のコンテンツを配信・販売できます。
        </p>
        <div class="p-top__concept__image">
          <img src="/img/top_page/concept@2x.png" />
        </div>
        <div class="p-top__concept__action">
          <nuxt-link to="/user/sign_up" class="c-btn c-btn--main">
            いますぐはじめる
          </nuxt-link>
          <p class="p-top__concept__action__help">
            登録初期費用・月額費用はかかりません
          </p>
        </div>
      </div>

      <div class="p-top__info">
        <div style="text-align: center; margin-bottom: 57px">
          <img
            src="/img/top_page/use_case@2x.png"
            alt="USE CASE。ペイジフルの使い方"
            style="width: 150px"
          >
        </div>
        <div class="u-cf">
          <div class="p-top__info__icon">
            <img
              src="/img/top_page/use_case_icon@2x.png"
              alt="ペイジフルの使い方を説明します"
            >
          </div>
          <div class="p-top__info__text">
            <ul>
              <li>ブログ・日記</li>
              <li>SNSから質問を集めて回答</li>
              <li>写真・デザインのポートフォリオ</li>
              <li>自分のホームページを作る</li>
              <li>動画・映像のアップロード</li>
              <li>自作のテキスト・デジタルファイルの販売</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="p-top__feature">
        <div
          style="text-align: center; margin-bottom: 57px; display: block; width: 100%;"
        >
          <img
            src="/img/top_page/feature@2x.png"
            alt="WHY PAGEFUL。ペイジフルの特徴"
            style="width: 218px;"
          >
        </div>

        <div class="p-top__feature__item">
          <div class="p-top__feature__item__image">
            <img src="/img/top_page/feature_content@2x.png" />
          </div>
          <div class="p-top__feature__item__content">
            <p class="p-top__feature__item__content__title">
              コンテンツ作成・配信
            </p>
            <p class="p-top__feature__item__content__description">
              ブログや写真、動画、音声などあらゆるコンテンツを簡単に配信できます。
            </p>
          </div>
        </div>
        <div class="p-top__feature__item">
          <div class="p-top__feature__item__image">
            <img src="/img/top_page/feature_profile@2x.png" />
          </div>
          <div class="p-top__feature__item__content">
            <p class="p-top__feature__item__content__title">
              プロフィール作成
            </p>
            <p class="p-top__feature__item__content__description">
              アイコンの設定はもちろん、自己紹介を書いたり、自分のもっているSNSアカウントをまとめることもできます。
            </p>
          </div>
        </div>
        <div class="p-top__feature__item">
          <div class="p-top__feature__item__image">
            <img src="/img/top_page/feature_member@2x.png" />
          </div>
          <div class="p-top__feature__item__content">
            <p class="p-top__feature__item__content__title">
              メンバー機能<br />※comming soon
            </p>
            <p class="p-top__feature__item__content__description">
              自分のメンバー限定コンテンツを作成・配信が出来ます。
            </p>
          </div>
        </div>
        <div class="p-top__feature__item">
          <div class="p-top__feature__item__image">
            <img src="/img/top_page/feature_sell@2x.png" />
          </div>
          <div class="p-top__feature__item__content">
            <p class="p-top__feature__item__content__title">
              コンテンツ販売<br />
            </p>
            <p class="p-top__feature__item__content__description">
              デジタルコンテンツを簡単に販売することができます。<br />初期費用・月額費用無し、かつ低い手数料で販売・管理が可能です。
            </p>
          </div>
        </div>
        <div class="p-top__feature__item">
          <div class="p-top__feature__item__image">
            <img src="/img/top_page/feature_subscription@2x.png" />
          </div>
          <div class="p-top__feature__item__content">
            <p class="p-top__feature__item__content__title">
              月額会員機能<br />※comming soon
            </p>
            <p class="p-top__feature__item__content__description">
              自分のサイトに月額会員を集めることが出来ます。月額会員限定にコンテンツを作成・配信できます。
            </p>
          </div>
        </div>
        <div class="p-top__feature__item">
          <div class="p-top__feature__item__image">
            <img src="/img/top_page/feature_design@2x.png" />
          </div>
          <div class="p-top__feature__item__content">
            <p class="p-top__feature__item__content__title">
              デザインカスタマイズ
            </p>
            <p class="p-top__feature__item__content__description">
              自分のサイトのロゴの設定やヘッダーの設定はもちろん、好きなレイアウト、色などのデザインのカスタマイズができます。
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="p-top__concept is-bottom">
      <p class="p-top__concept__heading">
        簡単に自分だけのコンテンツ配信・販売サイトを作成
      </p>
      <p class="p-top__concept__description">
        PAGEFUL（ペイジフル）は自分の好きなものを集めたページを簡単に作れます。
      </p>
      <div class="p-top__concept__action">
        <nuxt-link to="/user/sign_up" class="c-btn c-btn--main">
          いますぐはじめる
        </nuxt-link>
        <p class="p-top__concept__action__help">
          登録初期費用・月額費用はかかりません
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: []
}
</script>

<style lang="scss">
.p-top {
  background-color: $color_white;
  h1 {
    margin: 0;
  }
  p {
    font-size: 14px;
    letter-spacing: 0.14em;
    line-height: 1.8em;
  }

  &__wrapper {
    padding: 0 5%;
  }

  &__logo {
    text-align: center;
    margin-top: -10px;
    margin-bottom: 60px;
    img {
      width: 138px;
      height: auto;
    }
  }

  &__concept {
    padding: 0 0 90px;
    &__heading {
      text-align: left;
      font-size: 25px !important;
      font-weight: bold;
      margin: 0 0 32px;
      color: $color_text;
      @media #{$screen_pc} {
        text-align: center;
      }
    }
    &__description {
      font-size: 14px;
      font-weight: bold;
      color: $color_dark_gray;
      margin: 0 0 40px;
    }
    &__image {
      text-align: center;
      margin-bottom: 56px;
      img {
        width: 312px;
      }
    }
    &__action {
      text-align: center;
      a {
        background-color: #66bde0 !important;
        font-size: 16px;
      }
      &__help {
        color: $color_dark_gray;
        font-weight: bold;
        margin-top: 10px;
      }
    }
    &.is-bottom {
      background-color: #66bde0;
      color: $color_white;
      margin: 0;
      padding: 48px 5%;
      .p-top__concept__heading {
        color: $color_white;
      }
      .p-top__concept__description {
        display: none;
      }
      .p-top__concept__action {
        text-align: left;
        @media #{$screen_pc} {
          text-align: center;
        }
        a {
          background-color: $color_white !important;
          color: #66bde0 !important;
        }
        &__help {
          color: $color_white;
        }
      }
    }
  }
  &__info {
    margin-bottom: 130px;
    &__icon {
      float: left;
      text-align: center;
      width: 40%;
      @media #{$screen_pc} {
        width: 50%;
      }
      img {
        width: 81px;
      }
    }
    &__text {
      float: right;
      text-align: left;
      width: 60%;
      @media #{$screen_pc} {
        width: 50%;
      }
      ul {
        li {
          margin: 0 0 18px;
          font-size: 13px;
          font-weight: bold;
          color: $color_dark_gray;
          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }
  }
  &__feature {
    text-align: center;
    @media #{$screen_pc} {
      display: -webkit-flex;
      display: flex;

      -webkit-flex-direction: row;
      flex-direction: row;
      -webkit-flex-wrap: wrap;
      flex-wrap: wrap;
      justify-content: space-around;
    }

    &__item {
      border-radius: 8px;
      margin-bottom: 48px;
      box-shadow: 0 1px 20px rgba(0, 0, 0, 0.16);
      display: inline-block;
      max-width: 350px;
      @media #{$screen_pc} {
        max-width: 300px;
      }

      &__image {
        margin: 0;
        img {
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
          width: 100%;
          height: auto;
        }
      }
      &__content {
        padding: 28px 24px;
        text-align: left;
        &__title {
          font-size: 16px !important;
          font-weight: bold;
          color: $color_text;
          margin: 0 0 20px;
        }
        &__description {
          font-size: 14px;
          font-weight: normal;
          color: $color_text;
        }
      }
    }
  }
}
</style>
