import Vue from "vue"
import Editor from "~/components/ui/editor"

// Vue.use(Editor)

Vue.component("Editor", Editor)
Vue.mixin({
  components: {
    Editor
  }
})
