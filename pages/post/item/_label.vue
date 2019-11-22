<template>
  <div class="p-post">
    <section class="c-section">
      <div
        v-if="!this.$store.state.subDomain.hasSubDomain"
        style="margin: 0 5% 20px; text-align: left;"
      >
        <span
          v-if="isMine"
          :class="{
            'p-post__label__publish': true,
            'is-published': isPublished
          }"
        >{{ isPublished ? "公開中" : "下書き" }}</span>
	      <span v-if="isMine" :class="{'p-post__label__scope': true, 'is-public': (scope == 'PUBLIC'), 'is-member': (scope == 'MEMBER'), 'is-payment': (scope == 'PAYMENT')}">{{(scope == 'PUBLIC') ? '全公開' : (scope == 'PAYMENT') ? '有料販売' : 'メンバー限定'}}</span>
      </div>

      <div class="p-post__thumbnail">
        <div v-if="type == 'TEXT' && thumbnailImageUrl">
          <span
            class="p-post__thumbnail__image"
            :style="'background-image: url(' + thumbnailImageUrl + ')'"
          />
          <img :src="thumbnailImageUrl" />
        </div>
        <div
          v-else-if="type == 'ANSWER' && thumbnailImageUrl"
          class="is-answer"
        >
          <h1><img :src="thumbnailImageUrl" :alt="title" /></h1>
        </div>
        <div v-else-if="type == 'LINK'" class="p-post__thumbnail__link-ogp">
          <div v-if="linkSiteType == 'YOUTUBE'">
            <div v-if="linkTitle" class="p-ogp">
              <iframe
                :src="`https://www.youtube.com/embed/${linkUniqueId}`"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              />
              <a :href="linkUrl" target="_blank">
                <div class="p-ogp__info">
                  <span class="p-ogp__info__title">{{ linkTitle }}</span>
                  <span class="p-ogp__info__description">{{
                    linkDescription
                  }}</span>
                  <span class="p-ogp__info__site">{{ linkUrl }}</span>
                </div>
              </a>
            </div>
          </div>
          <div v-else>
            <a :href="linkUrl" target="_blank">
              <div v-if="thumbnailImageUrl">
                <span
                  class="p-post__thumbnail__image"
                  :style="'background-image: url(' + thumbnailImageUrl + ')'"
                />
              </div>
              <img :src="thumbnailImageUrl" />
              <div v-if="linkTitle" class="p-ogp">
                <div class="p-ogp__info">
                  <span class="p-ogp__info__title">{{ linkTitle }}</span>
                  <span class="p-ogp__info__description">{{
                    linkDescription
                  }}</span>
                  <span class="p-ogp__info__site">{{ linkUrl }}</span>
                </div>
              </div>
            </a>
          </div>
        </div>
        <div v-else-if="type == 'VIDEO'" class="p-post__thumbnail__link-ogp">
          <video
            v-if="videoPath !== ''"
            style="width: 100%; outline: none"
            :src="videoFileUrl"
            controls
          />
          <div v-else class="p-embed">
            <iframe
              v-if="videoUrlSite === 'YOUTUBE'"
              :src="`https://www.youtube.com/embed/${videoUniqueId}`"
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            />
            <div v-else-if="videoUrlSite === 'VIMEO'">
              <iframe
                :src="`https://player.vimeo.com/video/${videoUniqueId}`"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              />
            </div>
          </div>
        </div>
        <div v-else-if="type == 'FILE' && 0 < thumbnailList.length">
          <slider :thumbnail-list="thumbnailList" />
        </div>
        <div v-else-if="type == 'SOUND' && 0 < thumbnailList.length">
          <slider :thumbnail-list="thumbnailList" />
        </div>
      </div>

      <div class="p-post__content">
        <div style="margin: 0 5% 20px;">
          <span class="p-post__label__type">
            <i v-if="type == 'TEXT'" class="material-icons">edit</i>
            <i v-else-if="type == 'IMAGE'" class="material-icons">camera_alt</i>
            <i v-else-if="type == 'LINK'" class="material-icons">link</i>
            <i v-else-if="type == 'VIDEO'" class="material-icons">videocam_off</i>
            <i v-else-if="type == 'SOUND'" class="material-icons">headset</i>
            <i v-else-if="type == 'ANSWER'" class="material-icons">forum</i>
            <i v-else-if="type == 'FILE'" class="material-icons">folder</i>
            <span>{{ typeText }}</span>
          </span>
        </div>
        <div v-if="type != 'ANSWER' && title" class="p-post__content__title">
          <h1>{{ title }}</h1>
        </div>

        <div v-if="isUserPage" style="margin: 0 5% 5px;">
          <div class="p-user-top__head__profile">
            <div class="p-user-top__head__profile__content">
              <nuxt-link to="/about">
                <div class="p-user-top__head__profile__content__thumbnail">
                  <span
                    class="p-user-top__head__profile__content__thumbnail__image"
                    :style="
                      'background-image: url(' + profile.iconImageUrl + ')'
                    "
                  />
                </div>
                <span class="p-user-top__head__profile__content__name">{{
                  profile.name
                }}</span>
              </nuxt-link>
            </div>
          </div>
        </div>
        <div class="p-post__content__time">
          <span v-if="isPublished" class="">{{ publishedAt }}</span>
        </div>

        <div>
          <div v-if="hasRightToReadLimitedBlocks">
            <div v-if="type == 'TEXT'">
              <div class="p-post__content__text">
                <post-text-body
                  :text-body="
                    isPublished ? textBody.blocks : draftTextBody.blocks
                  "
                />
              </div>
            </div>
            <div v-else-if="type == 'IMAGE'">
              <div class="p-post__content__comment">
                <div class="p-post__content__comment__content">
                  <p v-html="comment.replace(/\n/g, '<br/>')" />
                </div>
              </div>

              <div class="p-post__content__image-wrap">
                <div
                  v-for="postImage in this.$store.state.post.itemImages"
                  class="p-post__content__image"
                >
                  <img :src="postImage.url" />
                </div>
              </div>
            </div>
            <div v-else-if="type == 'LINK'">
              <div class="p-post__content__comment">
                <div class="p-post__content__comment__content">
                  <p v-html="comment.replace(/\n/g, '<br/>')" />
                </div>
              </div>
            </div>
            <div v-else-if="type == 'VIDEO'">
              <div class="p-post__content__comment">
                <div class="p-post__content__comment__content">
                  <p v-html="comment.replace(/\n/g, '<br/>')" />
                </div>
              </div>
            </div>
            <div v-else-if="type == 'SOUND'">
              <div class="p-post__content__comment">
                <div class="p-post__content__comment__content">
                  <p v-html="comment.replace(/\n/g, '<br/>')" />
                </div>
              </div>
              <div style="padding: 20px 5% 10px;">
                <audio controls :src="soundUrl" :style="{ width: '100%' }">
                  ご使用の中のブラウザが<code>audio</code>要素に対応していません
                </audio>
              </div>
            </div>
            <div v-else-if="type == 'FILE'">
              <div class="p-post__content__comment">
                <div class="p-post__content__comment__content">
                  <p v-html="comment.replace(/\n/g, '<br/>')" />
                </div>
              </div>
              <div style="padding: 0 5%;">
                <div class="p-post__content__file">
                  <div class="p-post__content__file__text-wrap">
                    <p class="p-post__content__file__label">
                      {{ fileName }}
                    </p>
                    <p class="p-post__content__file__text">
                      {{ fileSizeText }}
                    </p>
                  </div>
                  <form
                    :action="baseApiUrl + '/post_files/download'"
                    name="downloadform"
                    method="POST"
                  >
                    <input type="hidden" name="post_label" :value="label" />
                    <a
                      class="p-post__content__file__button"
                      href="javascript:downloadform.submit()"
                    >ダウンロード</a>
                  </form>
                </div>
              </div>
            </div>
            <div v-else-if="type == 'ANSWER'">
              <div class="p-post__content__comment">
                <div class="p-post__content__comment__content">
                  <p v-html="comment.replace(/\n/g, '<br/>')" />
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <div
              v-if="scope == 'MEMBER'"
              class="p-post__content__limited">
              <p class="p-post__content__limited__description">
                メンバー限定公開の内容です。
              </p>
              <div class="p-post__content__limited__action">
                <nuxt-link to="/member/sign_up" class="c-btn c-btn--main">
                  メンバーになる
                </nuxt-link>
              </div>
            </div>
            <div
              v-else-if="scope == 'PAYMENT'"
              class="p-post__content__limited">
              <p class="p-post__content__limited__description">有料公開の内容です。</p>
              <p class="p-post__content__limited__price">¥{{Number(price).toLocaleString()}}</p>
              <div class="p-post__content__limited__action">
                <div style="margin-bottom: 8px">
                  <button @click="handleCheckAlreadyPurchased" type="button" class="c-btn c-btn--main">すでに購入した方はこちらから認証</button>
                </div>
                <div>
                  <button @click="handlePurchaseBtn" type="button" class="c-btn c-btn--main">購入へ進む</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="type == 'ANSWER' && !isMine" style="padding: 0 5%;">
          <div class="p-user-top__request">
            <a
              class="c-btn p-user-top__request__action"
              :href="$getUrl('/request', this.$store.state.page.label)"
            >{{ profile.name ? profile.name + "さんに" : "" }}質問をする</a>
          </div>
        </div>
      </div>

      <div class="p-post__foot">
        <div class="p-post__foot__share">
          <div class="p-post__foot__share__btn is-twitter">
            <a
              :href="
                'http://twitter.com/share?url=' +
                  encodeURIComponent(
                    $getUrl('/post/item/' + label, pageLabel)
                  ) +
                  '&text=' +
                  encodeURIComponent(
                    comment.length > 127
                      ? comment.substr(0, 126) + '…'
                      : comment
                  )
              "
              target="_blank"
            >
              <img
                src="/img/share_btn_twitter@2x.png"
                alt="Twitterでシェアする"
              />
              <span>ツイート</span>
            </a>
          </div>
          <div class="p-post__foot__share__btn is-line">
            <a
              :href="
                'https://social-plugins.line.me/lineit/share?url=' +
                  encodeURIComponent($getUrl('/post/item/' + label, pageLabel))
              "
              target="_blank"
            >
              <img src="/img/share_btn_line@2x.png" alt="LINEでシェアする" />
              <span>LINE</span>
            </a>
          </div>
          <div class="p-post__foot__share__btn is-link-copy">
            <div
              v-clipboard:copy="$getUrl('/post/item/' + label, pageLabel)"
              v-clipboard:success="clipboardSuccess"
              v-clipboard:error="clipboardError"
            >
              <i class="material-icons">link</i>
              <span>URLコピー</span>
            </div>
          </div>
        </div>

        <div
          v-if="isMine"
          class="p-post__foot__more"
          @click="handleMoreControlClick"
        >
          <img src="/img/share_btn_more@2x.png" class="is-more-control" />
          <div v-show="isShowPopoverMoreControl" class="p-popover">
            <div class="p-popover__arrow" />
            <div class="p-popover__body">
              <ul>
                <li>
                  <nuxt-link :to="`/dashboard/post/edit/${label}`">
                    編集する
                  </nuxt-link>
                </li>

                <li v-if="isPublished" @click="handleModifyDraft">
                  下書きに戻す
                </li>
                <li v-else class="is-delete" @click="handleDeleteClick">
                  削除する
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="p-post__comment">
        <h2 class="c-title--sub">
          コメント{{
          hasRightToComment
              ? "（" + this.$store.state.postCommentList.itemCount + "件）"
              : ""
          }}
        </h2>

        <div v-if="hasRightToComment">
          <div
            v-if="this.$store.state.postCommentList.itemCount > 0"
            class="p-post__comment__list"
          >
            <div
              v-for="(postComment, postCommentIndex) in this.$store.state
                .postCommentList.items"
              class="p-post__comment__list__item"
            >
              <div class="p-post__comment__list__item__profile">
                <div class="p-post__comment__list__item__profile__icon">
                  <span
                    class="p-post__comment__list__item__profile__icon__image"
                    :style="
                      'background-image: url(' +
                        postComment.profile.icon_image_url +
                        ')'
                    "
                  />
                </div>
                <div class="p-post__comment__list__item__profile__name">
                  <span class="is-name">{{ postComment.profile.name }}</span>
                  <span class="is-time">{{
                    postComment.created_at | moment
                  }}</span>
                </div>
              </div>
              <div
                v-if="isMine || postComment.is_mine"
                :data-post-comment-label="postComment.label"
                :data-post-comment-index="postCommentIndex"
                class="p-post__comment__list__item__delete"
                @click="handleControlPostComment"
              >
                <img
                  src="/img/share_btn_more@2x.png"
                  class="is-post-comment-control"
                />
              </div>

              <div class="p-post__comment__list__item__body">
                <p v-html="postComment.body.replace(/\n/g, '<br/>')" />
              </div>
            </div>
          </div>
          <div v-else>
            <p style="margin-bottom: 15px;">
              コメントはまだありません。
            </p>
          </div>

          <div class="p-post__comment__add">
            <div class="p-post__comment__add__body">
              <div class="p-form">
                <textarea
                  v-model="commentBody"
                  rows="4"
                  placeholder="コメントを入力"
                >{{ commentBody }}</textarea>
              </div>
            </div>
            <div class="p-post__comment__add__action">
              <button
                type="button"
                :class="{
                  'c-btn': true,
                  'c-btn--main': true,
                  'is-loading': isAddCommentLoading
                }"
                :disabled="isAddCommentLoading"
                @click="handleAddPostComment"
              >
                コメント投稿
              </button>
            </div>
          </div>
        </div>
        <div v-else>
          <p style="text-align: center;margin-bottom: 15px;">
            メンバーになるとコメントを閲覧、投稿することができます。
          </p>
          <div style="text-align: center;">
            <nuxt-link to="/member/sign_up" class="c-btn c-btn--main">
              メンバーになる
            </nuxt-link>
          </div>
        </div>
      </div>

      <div v-if="isUserPage" class="p-post__profile">
        <div class="p-post__profile__head">
          <div class="p-post__profile__thumbnail">
            <span
              class="p-post__profile__thumbnail__image"
              :style="'background-image: url(' + profile.iconImageUrl + ')'"
            />
          </div>
          <div class="p-post__profile__name">
            <span>{{ profile.name }}</span>
          </div>
        </div>
        <div class="p-post__profile__description">
          <p>{{ profile.description }}</p>
        </div>
      </div>

      <div v-if="isUserPage" class="p-post__related">
        <h2 class="c-title--sub">
          その他の投稿
        </h2>
        <post-list :posts="relatedPosts" :is-dashboard="!isUserPage" />
      </div>

      <div class="u-mt-24 u-ta-c">
        <nuxt-link
          :to="
            this.$store.state.subDomain.hasSubDomain
              ? '/'
              : '/dashboard/post/manage'
          "
          class="c-btn c-btn--default"
        >
          {{
            this.$store.state.subDomain.hasSubDomain
              ? "ホームに戻る"
              : "投稿管理に戻る"
          }}
        </nuxt-link>
      </div>
    </section>
  
    <Modal type="postGuestPurchaseAuth"
           title="購入済みの方はこちらから認証"
           actionMessage="認証する"
           :postPurchaseTitle="title"
           :initialGuestCode="guestCode"
           :onHandleAction="checkPostAlreadyPurchasedGuest"
    ></Modal>

    <Modal type="postPurchasePayment"
           title="購入"
           actionMessage="購入する"
           :postPurchaseTitle="title"
           :postPurchasePrice="price"
           :isAuthenticated="isAuthenticated"
           :onHandleAction="executePurchasePost"
    ></Modal>

    <Loading :isActive="purchaseLoading"></Loading>

    <div
      v-show="isShowPopoverControlPostComment"
      id="post-comment-popover"
      class="p-popover"
    >
      <div class="p-popover__arrow" />
      <div class="p-popover__body">
        <ul>
          <li class="is-delete" @click="handleDeletePostComment">
            削除する
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Meta from "~/assets/mixins/meta"
import postTextBody from "~/components/pages/postTextBody"
import postList from "~/components/pages/postList"
import slider from "~/components/ui/slider"
import moment from "moment"
import axios from "axios"
import Api from "~/plugins/api"
import cookieparser from "cookieparser"

export default {
  components: { postTextBody, postList, slider },
  filters: {
    moment(unixtime) {
      return moment.unix(unixtime).format("YYYY/MM/DD HH:mm")
    }
  },
  mixins: [Meta],
  data() {
    return {
      isShowPopoverMoreControl: false,

      commentBody: "",
      isAddCommentLoading: false,
      isShowPopoverControlPostComment: false,
      selectedPostCommentLabel: null,
      selectedPostCommentIndex: null,

      purchaseLoading: false,

      meta: {
        subDomainForUrl: null
      }
    }
  },
  computed: {
    isAuthenticated() {
      // ユーザー認証済みか否か
      return this.$store.state.user.authenticated
    },
    thumbnailList() {
      if (this.thumbnailMediaList) {
        console.log(this.thumbnailMediaList)
        return this.thumbnailMediaList.map((v, i) => {
          return { url: v.url, selected: i === 0 ? true : false }
        })
      }
    },
    baseApiUrl() {
      return process.env.API_BASE_URL
    }
  },
  async asyncData(context) {
    // 記事ID（post.label）
    const label = context.params.label
    // ゲスト購入コード。ゲスト購入の認証の際に、フォームにデフォ入力するために取得
    const guestCode = context.route.query.guest_code
    
    // ゲスト購入認証コード。cookieから取得
    const parsedCookie = cookieparser.parse(context.req.headers.cookie)
    const guestAuthKey = "guest_auth_post_" + label
    const guestAuth    = parsedCookie[guestAuthKey]
    console.log(parsedCookie)
    console.log(guestAuth)
    
    await context.store.dispatch("post/get", {
      label: label,
      pageLabel: context.store.state.page.label,
      guestAuth: guestAuth
    })

    if (context.store.state.post.isError) {
      // 404処理
      context.error({
        statusCode: 404,
        message: "そのページは存在しません。"
      })
    }

    const type  = context.store.state.post.type
    const title = (type == 'LINK') ? context.store.state.post.itemLink.title : context.store.state.post.title

    let description = context.store.state.post.comment;
    if (context.store.state.post.scope === 'MEMBER') {
      description = 'メンバー限定公開の内容です。'
    } else if (context.store.state.post.scope === 'PAYMENT') {
      description = '有料公開の内容です。'
    }
    let twitterDescription = (type == 'ANSWER') ? '質問と回答の詳細はこちらから。他の回答も見ることができます。' : context.store.state.post.comment;
    if (context.store.state.post.scope === 'MEMBER' && type != 'ANSWER') {
      twitterDescription = 'メンバー限定公開の内容です。'
    } else if (context.store.state.post.scope === 'PAYMENT' && type != 'ANSWER') {
      twitterDescription = '有料公開の内容です。'
    }

    return {
      isUserPage: context.store.state.subDomain.hasSubDomain,
      pageLabel: context.store.state.page.label,
      
      // payment関係
      guestCode: guestCode,

      isMine: context.store.state.post.isMine,
      hasRightToReadLimitedBlocks: context.store.state.post.hasRightToReadLimitedBlocks,
      hasRightToComment: context.store.state.post.hasRightToComment,
      label: context.store.state.post.label,
      type: type,
      typeText: context.store.state.post.typeText,
      scope: context.store.state.post.scope,
      price: context.store.state.post.price,
      title: context.store.state.post.title,
      comment: context.store.state.post.comment,
      thumbnailImagePath: context.store.state.post.thumbnailImagePath,
      thumbnailImageUrl: context.store.state.post.thumbnailImageUrl,
      isPublished: context.store.state.post.isPublished,
      publishedAt: context.store.state.post.publishedAt,
      updatedAt: context.store.state.post.updatedAt,
      relatedPosts: context.store.state.post.relatedPosts,
      // for type = FILE, SOUND
      thumbnailMediaList: context.store.state.post.thumbnailMediaList,

      textBody: context.store.state.post.itemText.body,
      draftTextBody: context.store.state.post.itemText.draftBody,

      linkUrl: context.store.state.post.itemLink.linkUrl,
      linkTitle: context.store.state.post.itemLink.title,
      linkDescription: context.store.state.post.itemLink.description,
      linkSiteName: context.store.state.post.itemLink.siteName,
      linkThumbnailImageUrl:
        context.store.state.post.itemLink.thumbnailImageUrl,
      linkContentMediaType: context.store.state.post.itemLink.contentMediaType,
      linkContentMediaUrl: context.store.state.post.itemLink.contentMediaUrl,
      linkSiteType: context.store.state.post.itemLink.siteType,
      linkUniqueId: context.store.state.post.itemLink.uniqueId,

      videoUrlSite: context.store.state.post.itemVideo.urlSite,
      videoUniqueId: context.store.state.post.itemVideo.videoUniqueId,
      videoUrl: context.store.state.post.itemVideo.videoUrl,
      videoFileUrl: context.store.state.post.itemVideo.fileUrl,
      videoPath: context.store.state.post.itemVideo.path,

      soundUrl: context.store.state.post.itemSound.url,

      fileUrl: context.store.state.post.itemFile.url,
      fileName: context.store.state.post.itemFile.fileName,
      fileSize: context.store.state.post.itemFile.fileSize,
      fileSizeText: context.store.state.post.itemFile.fileSizeText,
      filePath: context.store.state.post.itemFile.path,
      fileContentType: context.store.state.post.itemFile.contentType,

      profile: {
        name: context.store.state.profile.name,
        iconImageUrl: context.store.state.profile.iconImageUrl,
        description: context.store.state.profile.description
      },

      meta: {
        title: title,
        twitterTitle: type == "ANSWER" ? "質問への回答" : title,

        description: description,
        twitterDescription: twitterDescription,

        image: context.store.state.post.thumbnailImageUrl,
        subDomainForUrl: context.store.state.page.label,
        userPageTitle: context.store.state.page.name,
        type: "article",
        isTwitterCardLarge: true
      }
    }
  },
  methods: {
    handleMoreControlClick() {
      this.isShowPopoverMoreControl = !this.isShowPopoverMoreControl

      if (this.isShowPopoverMoreControl) {
        document.body.addEventListener("click", this.handleClickOutside)
      } else {
        document.body.removeEventListener("click", this.handleClickOutside)
      }
    },
    handleClickOutside(e) {
      if (e.target.className != "is-more-control") {
        this.isShowPopoverMoreControl = false
      }
      if (e.target.className != "is-post-comment-control") {
        this.isShowPopoverControlPostComment = false
      }
    },
    async handleModifyDraft() {
      const res = confirm("この投稿を下書きに戻しますか？")
      if (res) {
        await this.$store.dispatch("post/modifyDraft", {
          label: this.label
        })

        this.isPublished = false

        if (!this.$store.state.post.isError) {
          // リダイレクト
          this.$router.push("/post/item/" + this.label)
        }
      }
    },
    async handleDeleteClick() {
      const res = confirm("この投稿を削除しますか？")
      if (res) {
        await this.$store.dispatch("post/delete", {
          label: this.label
        })

        if (!this.$store.state.post.isError) {
          // リダイレクト
          this.$router.push("/dashboard/post/manage")
        }
      }
    },
    clipboardSuccess() {
      alert("URLをコピーしました")
    },
    clipboardError() {
      alert("URLのコピーに失敗しました")
    },

    ////////////////////
    // comment処理
    ////////////////////
    async handleAddPostComment() {
      this.isAddCommentLoading = true

      await this.$store.dispatch("postComment/add", {
        postLabel: this.label,
        body: this.commentBody
      })

      this.isAddCommentLoading = false

      this.commentBody = ""
    },
    handleControlPostComment(e) {
      this.isShowPopoverControlPostComment = !this
        .isShowPopoverControlPostComment

      // popoverの位置処理
      const popover = document.getElementById("post-comment-popover")
      const top = e.target.getBoundingClientRect().top
      popover.style.top = window.pageYOffset + top + 30 + "px"

      this.selectedPostCommentLabel = e.currentTarget.dataset.postCommentLabel
      this.selectedPostCommentIndex = e.currentTarget.dataset.postCommentIndex

      if (this.isShowPopoverControlPostComment) {
        document.body.addEventListener("click", this.handleClickOutside)
      } else {
        document.body.removeEventListener("click", this.handleClickOutside)
      }
    },
    async handleDeletePostComment() {
      this.isShowPopoverControlPostComment = true

      await this.$store.dispatch("postComment/delete", {
        postCommentLabel: this.selectedPostCommentLabel,
        postCommentIndex: this.selectedPostCommentIndex
      })

      this.isShowPopoverControlPostComment = false
      this.selectedPostCommentLabel = null
      this.selectedPostCommentIndex = null
    },

    ////////////////////
    // 購入処理
    ////////////////////
    handlePurchaseBtn() {
      this.$store.dispatch('modal/show', 'postPurchasePayment')
    },
    async executePurchasePost(param) {
      console.log(param)
      // 全体ローディング start
      this.purchaseLoading = true

      // トークン取得処理
      const tokenApiUrl = 'https://api.veritrans.co.jp/4gtoken'
      const tokenApiKey = 'b05ae369-5cc2-4c90-95b0-47655ea994ec'
      const tokenParam  = {
        card_number:   param.cardNumber,
        card_expire:   param.cardExpire,
        security_code: param.securityCode,
        lang:          'ja',
        token_api_key: tokenApiKey,
      }
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      let tokenRes
      try {
        tokenRes = await axios.post(tokenApiUrl, tokenParam, config)
      } catch (e) {
        console.log(e)
        this.purchaseLoading = false
        this.$store.dispatch('flashMessage/showError', 'クレジットカードの認証に失敗しました。入力内容をご確認ください。')
        return
      }
      console.log(tokenRes);
      if (tokenRes.data.status == 'failure') {
        // console.log(tokenRes.code + ', ' + tokenRes.message)
        this.purchaseLoading = false
        this.$store.dispatch('flashMessage/showError', 'クレジットカードの認証に失敗しました。入力内容をご確認ください。')
        return
      }

      // 決済のAPI連携（pageful-serverのAPI）
      const requestParam = {
        token:               tokenRes.data.token,
        request_card_number: tokenRes.data.req_card_number,
        post_label:          this.label,
        amount:              param.amount,
        guest_email:         param.guestEmail,
      }
      console.log(requestParam)
      let res
      try {
        res = await Api.postTransactionAuthorize(requestParam, this.$store.state.user.authorizationToken)
      } catch (e) {
        console.log(e)
        this.purchaseLoading = false
        this.$store.dispatch("flashMessage/showError", "決済に失敗しました。通信環境をご確認ください。")
        return
      }
      console.log(res)
      if (res.hasOwnProperty("is_error") && res.is_error) {
        this.purchaseLoading = false
        this.$store.dispatch("flashMessage/showError", res.error_message)
        return
      }
  
      // cookieにguest_authを保存。今後の表示のためにcookieに保存
      const postTransactionGuestAuth = res.data.guest_auth
      this.$cookies.set(res.data.guest_auth_key, postTransactionGuestAuth, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
        domain: process.env.COOKIE_DOMAIN
      })
  
      // postデータの再取得
      await this.$store.dispatch("post/get", {
        label: this.label,
        pageLabel: this.$store.state.page.label,
        guestAuth: postTransactionGuestAuth,
      })
  
      // postの権限更新
      this.hasRightToReadLimitedBlocks = this.$store.state.post.hasRightToReadLimitedBlocks
      this.hasRightToComment =this.$store.state.post.hasRightToComment
  
      // 全体ローディング end
      this.purchaseLoading = false
      // モーダル閉じる
      this.$store.dispatch('modal/hide')
  
      // 決済成功メッセージ
      this.$store.dispatch('flashMessage/showSuccess', '決済が完了しました。')
    },
    handleCheckAlreadyPurchased() {
      this.$store.dispatch('modal/show', 'postGuestPurchaseAuth')
    },
    async checkPostAlreadyPurchasedGuest(param) {
      console.log(param)
  
      this.purchaseLoading = true
      
      const requestParam = {
        guest_email: param.guestEmail,
        guest_code: param.guestCode,
      }
      let res
      try {
        res = await Api.guestAuthPostTransaction(requestParam, this.$store.state.user.authorizationToken)
      } catch (e) {
        console.log(e)
        this.purchaseLoading = false
        this.$store.dispatch('flashMessage/showError', '認証に失敗しました。通信環境をご確認ください。')
        return
      }
      console.log(res)
      if (res.hasOwnProperty('is_error') && res.is_error) {
        this.purchaseLoading = false
        this.$store.dispatch('flashMessage/showError', res.error_message)
        return
      }
  
      // cookieにguest_authを保存。今後の表示のためにcookieに保存
      const postTransactionGuestAuth = res.data.guest_auth
      this.$cookies.set(res.data.guest_auth_key, postTransactionGuestAuth, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
        domain: process.env.COOKIE_DOMAIN
      })
  
      // postデータの再取得
      await this.$store.dispatch("post/get", {
        label: this.label,
        pageLabel: this.$store.state.page.label,
        guestAuth: postTransactionGuestAuth,
      })
  
      // postの権限更新
      this.hasRightToReadLimitedBlocks = this.$store.state.post.hasRightToReadLimitedBlocks
      this.hasRightToComment =this.$store.state.post.hasRightToComment
  
      // 全体ローディング end
      this.purchaseLoading = false
      // モーダル閉じる
      this.$store.dispatch('modal/hide')
  
      // 決済成功メッセージ
      this.$store.dispatch('flashMessage/showSuccess', '認証が完了しました。')
    }
  }
}
</script>

<style lang="scss"></style>
