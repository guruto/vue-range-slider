<template>
  <div class="p-post__content__text__body p-post-text-body">
    <div
      v-for="(bodyItem, i) in textBody"
      :key="bodyItem.type + i"
      class="p-post-text-body__item"
    >
      <div
        v-if="bodyItem.type == 'paragraph'"
        class="p-post-text-body__item__paragraph"
      >
        <p v-html="bodyItem.data.text.replace(/\n/g, '<br/>')" />
      </div>
      <div
        v-else-if="bodyItem.type == 'link'"
        class="p-post-text-body__item__link"
      >
        <a :href="bodyItem.data.link" target="_blank">
          <span
            class="p-post-text-body__item__link__image"
            :style="
              'background-image: url(' + bodyItem.data.meta.image.url + ')'
            "
          />
          <span class="p-post-text-body__item__link__title">{{ bodyItem.data.meta.title }}</span>
          <p class="p-post-text-body__item__link__description">
            {{ bodyItem.data.meta.description }}
          </p>
          <span class="p-post-text-body__item__link__site-name">{{ bodyItem.data.link }}</span>
        </a>
      </div>
      <div
        v-else-if="bodyItem.type == 'header'"
        class="p-post-text-body__item__header"
      >
        <h2>{{ bodyItem.data.text }}</h2>
      </div>
      <div
        v-else-if="bodyItem.type == 'image'"
        class="p-post-text-body__item__image"
      >
        <div class="p-post-text-body__item__image__content">
          <img :src="bodyItem.data.file.url" :alt="bodyItem.data.caption">
        </div>
        <div
          v-if="bodyItem.data.caption"
          class="p-post-text-body__item__image__caption"
        >
          <span>{{ bodyItem.data.caption }}</span>
        </div>
      </div>
      <div
        v-else-if="bodyItem.type == 'quote'"
        class="p-post-text-body__item__quote"
      >
        <div class="p-post-text-body__item__quote__content">
          <blockquote>{{ bodyItem.data.text }}</blockquote>
        </div>
        <div
          v-if="bodyItem.data.caption"
          class="p-post-text-body__item__quote__caption"
        >
          <span>{{ bodyItem.data.caption }}</span>
        </div>
      </div>
      <div
        v-else-if="bodyItem.type == 'delimiter'"
        class="p-post-text-body__item__delimiter"
      >
        <div class="p-post-text-body__item__delimiter__content" />
      </div>
      <div
        v-else-if="bodyItem.type == 'embed'"
        class="p-post-text-body__item__embed"
      >
        <div class="p-post-text-body__item__embed__content">
          <iframe
            :src="bodyItem.data.embed"
            :width="bodyItem.data.width"
            :height="bodyItem.data.height"
            frameborder="0"
            allowfullscreen
            style="max-width: 100%;"
          />
        </div>
        <div
          v-if="bodyItem.data.caption"
          class="p-post-text-body__item__embed__caption"
        >
          <span>{{ bodyItem.data.caption }}</span>
        </div>
      </div>
      <div
        v-else-if="bodyItem.type == 'attaches'"
        class="p-post-text-body__item__attaches"
      >
        <div>
          <p class="p-post-text-body__item__attaches__title">
            {{ bodyItem.data.title }}
          </p>
          </p>
          <p class="p-post-text-body__item__attaches__caption">
            {{ formatBytes(bodyItem.data.file.size) }}
          </p>
        </div>
        <a
          target="_blank"
          rel="nofollow noindex noreferrer"
          class="p-post-text-body__item__attaches__icon"
          :href="bodyItem.data.file.url"
        >
          <i class="material-icons md-24 md-dark">vertical_align_bottom</i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["textBody"],
  data() {
    return {}
  },
  methods: {
    formatBytes(bytes, decimals = 2) {
      if (bytes === 0) return "0 Bytes"
      const k = 1024
      const dm = decimals < 0 ? 0 : decimals
      const sizes = ["Bytes", "KiB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
    }
  }
}
</script>
<style lang="scss">
.p-post-text-body {
  font-size: 16px;
  color: $color_text;
  &__item {
    margin: 0;
    padding: 0.7em 0;
    &__paragraph {
      p {
        font-size: 16px;
        color: $color_text;
      }
      .inline-code {
        background: rgba(251,241,241,0.78);
        color: #C44545;
        padding: 4px 6px;
        border-radius: 2px;
        margin: 0 2px;
        font-family: Menlo, Monaco, Consolas, Courier New, monospace;
        font-size: 0.9em;
      }
    }
    &__link {
      position: relative;
      &__title {
        font-size: 17px;
        font-weight: 600;
        line-height: 1.5em;
        margin: 0 0 10px 0;
      }
      &__description {
        margin: 0 0 20px 0;
        font-size: 15px;
        line-height: 1.55em;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      &__site-name {
        display: block;
        font-size: 15px;
        line-height: 1em;
        color: #888 !important;
        border: 0 !important;
        padding: 0 !important;
      }
      &__image {
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
        margin: 0 0 0 30px;
        width: 65px;
        height: 65px;
        border-radius: 3px;
        float: right;
      }
      a {
        display: block;
        padding: 25px;
        color: initial !important;
        text-decoration: none !important;

        background: #fff;
        border: 1px solid rgba(201, 201, 204, 0.48);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        border-radius: 6px;
      }
    }
    &__header {
      h2 {
        padding: 1em 0;
        margin: 0;
        margin-bottom: -0.9em;
        line-height: 1.5em;
        outline: none;
      }
    }
    &__image {
      &__content {
        border-radius: 3px;
        overflow: hidden;
        margin-bottom: 4px;
        img {
          max-width: 100%;
          vertical-align: bottom;
          display: block;
        }
      }
      &__caption {
        span {
          color: $color_gray;
        }
      }
    }
    &__quote {
      padding: 0 1em;
      &__content {
        blockquote {
          padding: 1em 2em;
          margin: 0 0 4px;
          background-color: #f2f5f8;
          border-radius: 4px;
        }
      }
      &__caption {
        span {
          color: $color_gray;
        }
      }
    }
    &__delimiter {
      &__content {
        line-height: 1.6em;
        width: 100%;
        text-align: center;
        &:before {
          display: inline-block;
          content: "...";
          font-size: 30px;
          line-height: 65px;
          height: 30px;
          letter-spacing: 0.2em;
        }
      }
    }
    &__embed {
      &__content {
        blockquote {
          padding: 1em 2em;
          margin: 0 0 4px;
          background-color: #f2f5f8;
          border-radius: 4px;
        }
      }
      &__caption {
        span {
          color: $color_gray;
        }
      }
    }
    &__attaches {
      display: flex;
      flex-flow: nowrap row;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 13px 20px;
      border: 1px solid $color_border;
      border-radius: 3px;
      background: $color_white;
      &__title {
        text-overflow: ellipsis;
        overflow: hidden;
        outline: none;
      }
      &__caption {
        color: $color_gray;
      }
      &__icon {
        cursor: pointer;
        display: flex;
        flex-flow: wrap row;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
</style>
