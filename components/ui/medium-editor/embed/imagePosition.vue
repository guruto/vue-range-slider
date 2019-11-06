<template>
  <div v-if="handler.isShow" class="image-handler" :style="handler.position">
    <div class="image-hander-menu">
      <button class="btn-toggle" @click="imageSizing('is-normal')">
        <img
          v-if="handler.currentSize == 'is-normal'"
          src="/static/img/editor/icons/image-align-normal-active.png"
        />
        <img
          v-if="handler.currentSize != 'is-normal'"
          src="/static/img/editor/assets/icons/image-align-normal.png"
        />
      </button>
      <button class="btn-toggle" @click="imageSizing('is-expand')">
        <img
          v-if="handler.currentSize == 'is-expand'"
          src="/static/img/editor/assets/icons/image-align-expand-active.png"
        />
        <img
          v-if="handler.currentSize != 'is-expand'"
          src="/static/img/editor/assets/icons/image-align-expand.png"
        />
      </button>
      <button class="btn-toggle" @click="imageSizing('is-full')">
        <img
          v-if="handler.currentSize == 'is-full'"
          src="/static/img/editor/assets/icons/image-align-full-active.png"
        />
        <img
          v-if="handler.currentSize != 'is-full'"
          src="/static/img/editor/assets/icons/image-align-full.png"
        />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["handler"],
  methods: {
    imageSizing(sizing) {
      this.handler.currentSize = sizing
      this.handler.currentLine.className = "editor-image " + sizing

      this.$emit("onPositionChange")
    }
  }
}
</script>
