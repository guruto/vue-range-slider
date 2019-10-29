<template>
	<div>
		<!-- Editor Mode -->
		<div class="p-editor medium-editor-container" @click="handleEditorClick" v-if="!readOnly">
			<div class="p-editor__content editor"
			     v-bind:class="editorClass"
			     v-html="prefill"
			     ref="editor">
			</div>

			<insert-embed v-if="editor"
			              :onChange="triggerChange"
			              :editorRef="$refs.editor"
			              :editor="editor"
			              :insertLink="insertLink"
			              :onHandleInsertLink="handleInsertLink">
			</insert-embed>

<!--	<list-handler v-if="editor" :editor="editor" :onChange="triggerChange"></list-handler>-->

		</div>

		<!-- Read Only Mode -->
		<read-mode v-if="readOnly" :content="prefill"></read-mode>
	</div>
</template>

<script>
	import MediumEditor from 'medium-editor';
	import InsertEmbed from './insertEmbed';
	import ListHandler from './listHandler';
	import ReadMode from './readMode';
	import _ from 'underscore';

	export default {
		name: "medium-editor",
		props: [
			"options",
			"onChange",
			"prefill",
			"readOnly",
			"onHandleSaveContent"
		],
		data() {
			return {
				editor: null,
				defaultOptions: {
					placeholder: {
						text: "Write something great!!"
					},
					toolbar: {
						buttons: ["bold", "italic", "quote", "h1", "h2", "h3", "h4", "h5"]
					}
				},
				hasContent: false,

				// リンク挿入フォームの状態
				insertLink: {
					url: '',
					canLinkSubmit: false,
					isShow: false,
					currentLine: null,
					position: {
						top: '0',
						left: '0',
						width: '0',
					},
				}
			};
		},
		computed: {
			editorOptions() {
				return _.extend(this.defaultOptions, this.options);
			},
			editorClass() {
				return {
					'has-content': this.hasContent
				}
			}
		},
		components: {
			InsertEmbed,
			ListHandler,
			ReadMode
		},
		mounted() {
			if (!this.readOnly) {
				this.createElm();
			}
		},
		destroyed() {
			this.destroyElm();
		},

		methods: {
			//////////////////////////////////
			// リンク挿入フォームのアクション
			//////////////////////////////////
			handleInsertLink(currentLine) {
				console.log('handleInsertLink')
				console.log(currentLine)
				this.insertLink.currentLine = currentLine

				setTimeout(() => {
					document.querySelector('#editor-embed-form-link').focus()
				}, 0);
			},

			//////////////////////////////////
			// editorのセットアップ
			//////////////////////////////////
			createElm() {
				console.log('editor初期化')
				this.editor = new MediumEditor(this.$refs.editor, this.editorOptions);

				if (this.prefill) {
					if (/<[a-z][\s\S]*>/i.test(this.prefill)) {
						this.hasContent = true;
					} else {
						this.hasContent = false;
					}
					this.$refs.editor.focus();
				}

				this.editor.subscribe("editableInput", this.triggerChange);
				// 更新処理
				this.editor.subscribe('editableKeyup', this.handleEditorKeyup)
			},
			destroyElm() {
				this.editor.destroy();
			},
			triggerChange() {
				console.log('triggerChange')
				const content = this.editor.getContent();

				setTimeout(() => {
					if (/<[a-z][\s\S]*>/i.test(content)) {
						this.hasContent = true;
					} else {
						this.hasContent = false;
					}
				}, 0);

				this.$emit("input", content);

				if (this.onChange) {
					this.onChange(content);
				}
			},
			handleEditorClick(e) {
				// console.log('index handleEditorClick')
				// p-editorエリアをクリックでフォーカスがあたるようにする
				// if (e.target.id == 'editor-embed-form-link') {
				// 	return
				// }

				// this.$refs.editor.focus();
			},
			handleEditorKeyup() {
				// 一時保存処理を行う
				const content = this.editor.getContent();
				this.$emit('onHandleSaveContent', content)
			},
		},
	};
</script>
