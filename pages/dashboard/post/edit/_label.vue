<template>
  <div class="p-post-edit">
    <post-form :is-edit="true" :post="post" />
  </div>
</template>

<script>
import Meta from "~/assets/mixins/meta"
import PostForm from "~/components/pages/postForm"

export default {
  layout: "dashboard",
  components: { PostForm },
  mixins: [Meta],
  data() {
    return {

      meta: {
        title: "投稿編集",
        description: "PAGEFUL（ペイジフル）の投稿編集ページ"
      }
    }
  },
  async asyncData(context) {
    const label = context.params.label

    // 自分のPOSTかチェックを含めて取得
    await context.store.dispatch("post/getMyself", {
      label: label
    })

    return {
      post: {
        label: context.store.state.post.label,
        type: context.store.state.post.type,
        scope: context.store.state.post.scope,
        typeText: context.store.state.post.typeText,
        title: context.store.state.post.title,
        comment: context.store.state.post.comment,
        thumbnailImagePath: context.store.state.post.thumbnailImagePath,
        thumbnailImageUrl: context.store.state.post.thumbnailImageUrl,
        isPublished: context.store.state.post.isPublished,
        thumbnailMediaList: context.store.state.post.thumbnailMediaList,

        itemLink: {
          linkUrl: context.store.state.post.itemLink.linkUrl,
          linkTitle: context.store.state.post.itemLink.title,
          linkDescription: context.store.state.post.itemLink.description,
          linkSiteName: context.store.state.post.itemLink.siteName,
          linkThumbnailImageUrl:
            context.store.state.post.itemLink.thumbnailImageUrl,
          linkContentMediaType:
            context.store.state.post.itemLink.contentMediaType,
          linkContentMediaUrl:
            context.store.state.post.itemLink.contentMediaUrl,
          linkSiteType: context.store.state.post.itemLink.siteType,
          linkUniqueId: context.store.state.post.itemLink.uniqueId
        },
        itemText: {
          draftBody: context.store.state.post.itemText.draftBody,
          body: context.store.state.post.itemText.body
        },
        itemVideo: {
          urlSite: context.store.state.post.itemVideo.urlSite,
          videoUrl: context.store.state.post.itemVideo.videoUrl,
          fileUrl: context.store.state.post.itemVideo.fileUrl,
          path: context.store.state.post.itemVideo.path,
          videoUniqueId: context.store.state.post.itemVideo.videoUniqueId
        },
        itemSound: {
          url: context.store.state.post.itemSound.url,
          path: context.store.state.post.itemSound.path,
          contentType: context.store.state.post.itemSound.contentType,
          fileSize: context.store.state.post.itemSound.fileSize
        },
        itemFile: {
          url: context.store.state.post.itemFile.url,
          path: context.store.state.post.itemFile.path,
          contentType: context.store.state.post.itemFile.contentType,
          fileSize: context.store.state.post.itemFile.fileSize,
          fileSizeText: context.store.state.post.itemFile.fileSizeText,
          fileName: context.store.state.post.itemFile.fileName
        },
        itemAnswer: {
          request: {
            label: context.store.state.post.itemAnswer.request.label,
            body: context.store.state.post.itemAnswer.request.body,
            createdAt: context.store.state.post.itemAnswer.request.createdAt
          }
        }
      }
    }
  },
  methods: {}
}
</script>

<style lang="scss">
.p-post-edit {
  background-color: $color_white;
  padding-top: 10px;
}
</style>
