<template>
  <div :id="holderId" class="p-editor"></div>
</template>

<script>
// import EditorJS from '@editorjs/editorjs'
// const PLUGINS = {
// 	header: require('@editorjs/header'),
// 	list: require('@editorjs/list'),
// 	image: require('@editorjs/image'),
// 	inlineCode: require('@editorjs/inline-code'),
// 	embed: require('@editorjs/embed'),
// 	quote: require('@editorjs/quote'),
// 	marker: require('@editorjs/marker'),
// 	code: require('@editorjs/code'),
// 	link: require('@editorjs/link'),
// 	delimiter: require('@editorjs/delimiter'),
// 	raw: require('@editorjs/raw'),
// 	table: require('@editorjs/table'),
// 	warning: require('@editorjs/warning'),
// 	paragraph: require('@editorjs/paragraph'),
// 	checklist: require('@editorjs/checklist')
// }
// const PLUGIN_PROPS_TYPE = {
// 	type: [Boolean, Object],
// 	default: () => false,
// 	required: false
// }

import Api from "~/plugins/api";

export default {
  name: "editor",
  props: {
    holderId: {
      type: String,
      default: () => "pageful-editor",
      required: false
    },
    autofocus: {
      type: Boolean,
      default: () => false,
      required: false
    },
    initData: {
      type: Object,
      default: () => {},
      required: false
    },
    customTools: {
      type: Object,
      default: () => {},
      required: false
    },
    saveButtonId: {
      type: String,
      default: () => "",
      required: false
    },
    authorizationToken: {
      type: String,
      default: () => "",
      required: false
    }
    /**
     * Plugins
     */
    // header: PLUGIN_PROPS_TYPE,
    // list: PLUGIN_PROPS_TYPE,
    // code: PLUGIN_PROPS_TYPE,
    // inlineCode: PLUGIN_PROPS_TYPE,
    // embed: PLUGIN_PROPS_TYPE,
    // link: PLUGIN_PROPS_TYPE,
    // marker: PLUGIN_PROPS_TYPE,
    // table: PLUGIN_PROPS_TYPE,
    // raw: PLUGIN_PROPS_TYPE,
    // delimiter: PLUGIN_PROPS_TYPE,
    // quote: PLUGIN_PROPS_TYPE,
    // image: PLUGIN_PROPS_TYPE,
    // warning: PLUGIN_PROPS_TYPE,
    // paragraph: PLUGIN_PROPS_TYPE,
    // checklist: PLUGIN_PROPS_TYPE
  },
  data() {
    return {
      editor: null
    };
  },
  mounted() {
    this.initEditor();
  },
  watch: {
    initData: function() {
      this.initEditor();
    }
  },
  methods: {
    initEditor() {
      if (this.editor) {
        this.editor.destroy();
      }

      const EditorJS = require("@editorjs/editorjs");

      // tools config設定
      let toolsWithConfig = this.getTools();
      toolsWithConfig.image.config = {
        buttonContent: "ファイルを選択",
        captionPlaceholder: "キャプションを入力",
        uploader: {
          async uploadByFile(file) {
            const data = new FormData();
            data.append("file_data", file);
            const result = await Api.uploadImageForText(
              data,
              this.authorizationToken
            );
            if (!result.is_error) {
              return {
                success: 1,
                file: {
                  url: result.data.url
                }
              };
            } else {
              return {
                success: 0
              };
            }
          }
        }
      };

      toolsWithConfig.image.toolbox = { title: "画像" };

      // link の設定がそもそもdefault標準なので必要がない
      // toolsWithConfig.link.inlineToolbar = true;
      // toolsWithConfig.link.config = {
      //   endpoint: process.env.API_BASE_URL + "/post_texts/get_link_info"
      // };

      // @desc: quote
      toolsWithConfig.quote.config = {
        quotePlaceholder: "引用内容を入力",
        captionPlaceholder: "引用元を入力"
      };
      toolsWithConfig.quote.toolbox = { title: "引用" };

      toolsWithConfig.paragraph.inlineToolbar = true;

      // @desc: attaches
      toolsWithConfig.attaches.config = {
        endpoint: process.env.API_BASE_URL + "/post_texts/upload_file",
        field: "file_data",
        buttonText: "ファイルを選択",
        errorMessage: "ファイルのアップロードに失敗しました"
      };
      toolsWithConfig.attaches.toolbox = { title: "ファイル" };
      toolsWithConfig.header.toolbox = { title: "ヘッダー" };
      toolsWithConfig.delimiter.toolbox = { title: "区切り" };

      this.editor = new EditorJS({
        holder: this.holderId,
        autofocus: this.autofocus,
        onReady: () => {
          this.$emit("ready");
        },
        onChange: this.onChange,
        data: this.initData,
        tools: toolsWithConfig,
        placeholder: "本文を入力"
      });

      document.getElementById(this.saveButtonId).onclick = this.save;
    },
    getTools() {
      const PLUGINS = {
        header: require("@editorjs/header"),
        paragraph: require("@editorjs/paragraph"),
        // link: require("@editorjs/link"), // link がdefaultの標準搭載のため特段設定いらない
        image: require("@editorjs/image"),
        attaches: require("@editorjs/attaches"),
        quote: require("@editorjs/quote"),
        delimiter: require("@editorjs/delimiter"),
        embed: require("@editorjs/embed"),
        inlineCode: require("@editorjs/inline-code"),
        marker: require("@editorjs/marker")

        // code: require('@editorjs/code'),
        // list: require('@editorjs/list'),
        // raw: require('@editorjs/raw'),
        // table: require('@editorjs/table'),
        // warning: require('@editorjs/warning'),
        // checklist: require('@editorjs/checklist')
      };

      const pluginKeys = Object.keys(PLUGINS);
      const isFullyFeatured = pluginKeys.every(p => !this[p]);
      const tools = {
        ...this.customTools
      };

      /**
       * When plugin props are empty, enable all plugins
       */
      if (isFullyFeatured) {
        pluginKeys.forEach(key => (tools[key] = { class: PLUGINS[key] }));
        return tools;
      }

      pluginKeys.forEach(key => {
        const props = this.$props[key];
        if (!props) {
          return;
        }

        tools[key] = { class: PLUGINS[key] };

        if (typeof props === "object") {
          const options = Object.assign({}, this.$props[key]);
          delete options["class"]; // Prevent merge wrong `class`
          tools[key] = Object.assign(tools[key], options);
        }
      });
      return tools;
    },
    async save() {
      const response = await this.editor.save();
      this.$emit("save", response);
    },
    async onChange() {
      const response = await this.editor.save();
      this.$emit("change", response);
    }
  }
};
</script>

<style>
</style>
