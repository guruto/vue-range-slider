<template>
  <div class="p-post-list">
    <div v-if="posts.length > 0">
      <div v-for="item in posts" class="p-post-list__item">
        <div class="p-post-list__item__content">
          <nuxt-link :to="'/post/item/' + item.label">
            <div
              v-if="
                item.type != 'ANSWER' &&
                  item.type != 'FILE' &&
                  item.thumbnail_image_url
              "
              class="p-post-list__item__content__thumbnail"
            >
              <span
                v-if="item.thumbnail_image_url"
                :style="
                  'background-image: url(' + item.thumbnail_image_url + ')'
                "
              />
              <img
                v-if="item.thumbnail_image_url"
                :src="item.thumbnail_image_url"
                :alt="item.title"
              />
            </div>
            <div
              v-else-if="item.type == 'ANSWER' && item.thumbnail_image_url"
              class="p-post-list__item__content__thumbnail is-answer"
            >
              <img :src="item.thumbnail_image_url" alt="">
            </div>
            <div
              v-else-if="item.type == 'FILE' && item.thumbnail_image_url"
              class="p-post-list__item__content__thumbnail p-post-list__item__content__thumbnail--fit"
            >
              <span
                v-if="item.thumbnail_image_url"
                :style="
                  'background-image: url(' + item.thumbnail_image_url + ')'
                "
              />
            </div>
            <div
              v-else-if="item.type == 'VIDEO' && item"
              class="p-post-list__item__content__thumbnail"
            >
              <video
                v-if="item.post_item.path !== ''"
                style="width: 100%; outline: none"
                :src="item.post_item.file_url"
                controls
              />
              <div v-else class="p-embed" :style="'border-radius: 4px 4px 0 0'">
                <iframe
                  v-if="item.post_item.url_site === 'YOUTUBE'"
                  :src="
                    `https://www.youtube.com/embed/${item.post_item.url_id}`
                  "
                  frameborder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                />
                <div v-else-if="item.post_item.url_site === 'VIMEO'">
                  <iframe
                    :src="
                      `https://player.vimeo.com/video/${item.post_item.url_id}`
                    "
                    frameborder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  />
                </div>
              </div>
            </div>
            <div
              v-else
              class="p-post-list__item__content__thumbnail is-empty"
            />

            <div
              v-if="item.type == 'SOUND'"
              class="p-post-list__item__content__link"
            >
              <audio
                controls
                :src="item.post_item.url"
                :style="{ width: '100%' }"
              >
                ご使用の中のブラウザが<code>audio</code>要素に対応していません
              </audio>
            </div>

            <div
              v-if="item.type == 'LINK'"
              class="p-post-list__item__content__link"
            >
              <span class="p-post-list__item__content__link__title">{{
                item.post_item.title
              }}</span>
              <span class="p-post-list__item__content__link__url">{{
                item.post_item.link_url
              }}</span>
            </div>
            <div class="p-post-list__item__content__info u-cf">
              <div style="display: inline-block; margin-bottom: 12px;">
                <div
                  v-if="isDashboard"
                  :class="{
                    'p-post__label__publish': true,
                    'is-published': item.is_published === '1'
                  }"
                >
                  <span>{{
                    item.is_published === "1" ? "公開中" : "下書き"
                  }}</span>
                </div>
                <span class="p-post__label__type">
                  <i v-if="item.type == 'TEXT'" class="material-icons">edit</i>
                  <i v-else-if="item.type == 'IMAGE'" class="material-icons"
                    >camera_alt</i
                  >
                  <i v-else-if="item.type == 'LINK'" class="material-icons"
                    >link</i
                  >
                  <i v-else-if="item.type == 'VIDEO'" class="material-icons"
                    >videocam_off</i
                  >
                  <i v-else-if="item.type == 'SOUND'" class="material-icons"
                    >headset</i
                  >
                  <i v-else-if="item.type == 'ANSWER'" class="material-icons"
                    >forum</i
                  >
                  <i v-else-if="item.type == 'FILE'" class="material-icons"
                    >folder</i
                  >
                  <span>{{ item.type_text }}</span>
                </span>
              </div>
              <span
                v-if="item.title && item.type != 'LINK'"
                class="p-post-list__item__content__info__title"
                >{{ item.title }}</span
              >
              <div
                v-if="item.comment"
                class="p-post-list__item__content__info__comment"
              >
                <span>{{ item.comment }}</span>
              </div>
              <span class="p-post-list__item__content__info__time">{{
                isDashboard ? item.updated_at : item.published_at | moment
              }}</span>
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
    <div v-else class="p-post-list__none">
      <p class="p-post-list__none__message">
        投稿はまだありません。
      </p>

      <button
        v-if="isDashboard"
        type="button"
        class="c-btn c-btn--main"
        @click="$store.dispatch('modal/show')"
      >
        投稿を作成する
      </button>
    </div>
  </div>
</template>

<script>
import moment from "moment"
export default {
  filters: {
    moment(unixtime) {
      return moment.unix(unixtime).format("YYYY/MM/DD HH:mm")
    }
  },
  props: ["posts", "isDashboard"]
}
</script>

<style lang="scss"></style>
