<template>
  <div>
    <h1 class="c-title">
      投稿管理
    </h1>

    <div style="padding: 0 5%;">
      <post-list
        :posts="this.$store.state.postList.items"
        :is-dashboard="true"
      />

      <div class="p-post-manage__add">
        <div
          class="p-post-manage__add__link"
          @click="$store.dispatch('modal/show')"
        >
          <span>投稿</span>
          <i class="material-icons">add</i>
        </div>
      </div>
    </div>

    <Modal type="add_post" title="新規投稿" />
  </div>
</template>

<script>
import postList from "~/components/pages/postList"
import Meta from "~/assets/mixins/meta"

export default {
  layout: "dashboard",
  components: { postList },
  mixins: [Meta],
  data() {
    return {
      meta: {
        title: "投稿管理",
        description: "PAGEFUL（ペイジフル）の投稿管理ページ"
      }
    }
  },
  async asyncData(context) {
    // 自分の投稿を取得
    await context.store.dispatch("postList/getListMyself", {
      label: context.store.state.user.page.label
    })

    return {}
  },
  methods: {}
}
</script>

<style lang="scss"></style>
