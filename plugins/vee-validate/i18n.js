import Vue from "vue"

import messageEn from "vee-validate/dist/locale/en"
import messageJa from "vee-validate/dist/locale/ja"

import attributes from "./attributes"

import VeeValidate, { Validator } from "vee-validate"

export default function({ app }) {
  Vue.use(VeeValidate)

  Validator.localize("en", messageEn)
  Validator.localize("ja", messageJa)
  Validator.localize(attributes)

  // とりあえずデフォルト設定
  Validator.localize(app.i18n.defaultLocale)

  // if (['en', 'ja'].includes(app.i18n.loadedLanguages[0])) {
  // 	Validator.localize(app.i18n.loadedLanguages[0])
  // }
}
