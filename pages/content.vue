<template>
  <section class="c-section">
    <post-list
      :posts="this.$store.state.postList.items"
      :is-dashboard="false"
    />
  </section>
</template>

<script>
import Meta from "~/assets/mixins/meta"

export default {
  mixins: [Meta],
  data() {
    return {}
  },
  async asyncData(context) {
    // pageのページングの際のパス
    console.log("page page")

    const pageLabel = context.store.state.page.label
    console.log(pageLabel)

    if (pageLabel) {
      await context.store.dispatch("page/getWithPostList", {
        label: pageLabel
      })
      console.log(context.store.state.page)

      if (context.store.state.page.isError) {
        // 404処理
        context.error({
          statusCode: 404
        })
      }
    }
  },
  methods: {}
}
</script>

<style lang="scss"></style>
