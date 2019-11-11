import Vue from "vue"

import FlashMessage from "~/components/ui/flashMessage"
import Modal from "~/components/ui/modal"
import CropModal from "~/components/ui/cropModal"
import Loading from "~/components/ui/loading"
import Spinner from "~/components/ui/spinner"

Vue.mixin({
  components: {
    FlashMessage,
    Modal,
    CropModal,
    Loading,
    Spinner
  }
})
