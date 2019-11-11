<template>
  <div>
    <section class="c-section">
      <script src="https://sdk.form.run/js/v2/embed.js" />
      <div
        class="formrun-embed"
        data-formrun-form="@pageful-inquiry"
        data-formrun-redirect="true"
      />
    </section>
  </div>
</template>

<script>
import Meta from "~/assets/mixins/meta"
export default {
  name: "Inquiry",
  mixins: [Meta]
}
</script>

<style></style>
