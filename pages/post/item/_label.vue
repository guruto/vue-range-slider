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
        <span v-if="isMine" :class="{ 'p-post__label__scope': true }">{{
          scope == "PUBLIC" ? "全公開" : "メンバー限定"
        }}</span>
      </div>

      <div class="p-post__thumbnail">
        <div v-if="type == 'TEXT' && thumbnailImageUrl">
          <span
            class="p-post__thumbnail__image"
            :style="'background-image: url(' + thumbnailImageUrl + ')'"
          />
          <img :src="thumbnailImageUrl" >
        </div>
        <div
          v-else-if="type == 'ANSWER' && thumbnailImageUrl"
          class="is-answer"
        >
          <h1>
            <img :src="thumbnailImageUrl" :alt="title" >
          </h1>
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
              <img :src="thumbnailImageUrl" >
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
          <span v-if="isPublished" class>{{ publishedAt }}</span>
        </div>

        <div>
          <div
            v-if="
              scope == 'MEMBER' && !isMine && (!isAuthenticated || !isMember)
            "
            class="p-post__content__limited"
          >
            <p class="p-post__content__limited__description">
              メンバー限定公開の内容です。
            </p>
            <div class="p-post__content__limited__action">
              <nuxt-link to="/member/sign_up" class="c-btn c-btn--main">
                メンバーになる
              </nuxt-link>
            </div>
          </div>
          <div v-else>
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
                  <img :src="postImage.url" >
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
                  ご使用の中のブラウザが
                  <code>audio</code>要素に対応していません
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
                    <input type="hidden" name="post_label" :value="label" >
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
              <img src="/img/share_btn_line@2x.png" alt="LINEでシェアする" >
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
          <img src="/img/share_btn_more@2x.png" class="is-more-control" >
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
            isMine || isMember
              ? "（" + this.$store.state.postCommentList.itemCount + "件）"
              : ""
          }}
        </h2>

        <div v-if="isMine || isMember">
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

      <div class="p-post__related">
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
    isMember() {
      // 既にメンバーか否か
      const pageLabel = this.$store.state.subDomain.subDomain
      return (
        this.$store.state.user.memberPageLabelList.indexOf(pageLabel) !== -1
      )
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
    const label = context.params.label
    await context.store.dispatch("post/get", {
      label: label,
      pageLabel: context.store.state.page.label
    })

    if (context.store.state.post.isError) {
      // 404処理
      context.error({
        statusCode: 404,
        message: "そのページは存在しません。"
      })
    }

    const type = context.store.state.post.type

    let title = context.store.state.post.title
    if (type == "LINK") {
      title = context.store.state.post.itemLink.title
    }

    const isMember =
      context.store.state.user.memberPageLabelList.indexOf(label) !== -1
    const onlyMember =
      context.store.state.post.scope === "MEMBER" &&
      !context.store.state.post.isMine &&
      (!context.store.state.user.authenticated || !isMember)

    return {
      isUserPage: context.store.state.subDomain.hasSubDomain,
      pageLabel: context.store.state.page.label,

      isMine: context.store.state.post.isMine,
      label: context.store.state.post.label,
      type: type,
      typeText: context.store.state.post.typeText,
      scope: context.store.state.post.scope,
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

        description: onlyMember
          ? "メンバー限定公開の内容です。"
          : context.store.state.post.comment,
        twitterDescription: onlyMember
          ? "メンバー限定公開の内容です。"
          : type == "ANSWER"
          ? "質問と回答の詳細はこちらから。他の回答も見ることができます。"
          : context.store.state.post.comment,

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
    }
  }
}
</script>

<style lang="scss"></style>
