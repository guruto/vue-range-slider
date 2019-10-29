<template>
	<span @click="handleTextUrlInfoBtn" class="btn-toggle p-editor__embed__btn__link">
		<i class="fas fa-code"></i>
	</span>
</template>

<script>
	import _ from 'underscore';
	import Api from "~/plugins/api";

	export default {
		props: [
			'editor',
			'editorRef',
			'insert',
		],
		components: {
		},
		data() {
			return {
				embedElm: null,
			}
		},
		mounted() {
			this.subscribe()
			this.initializeExisting()
		},
		destroyed() {
			this.unsubscribe()
		},
		beforeMount() {
			// this.window = window;
			// window.addEventListener('scroll', this.handleScroll);
		},
		beforeDestroy() {
			// window.removeEventListener('scroll', this.handleScroll);
		},
		methods: {
			subscribe() {
				this.editor.subscribe('editableKeydown', this.detectEmbed)
			},
			unsubscribe() {
				this.editor.unsubscribe('editableKeydown', this.detectEmbed)
			},
			initializeExisting() {
				setTimeout(() => {
					const focused = this.editor.getFocusedElement()
					if(!focused) return false;

					const editorEmbeds = focused.getElementsByClassName('editor-embed')
					_.map(editorEmbeds, (elm) => {
						const nextElm = elm.nextElementSibling
						const link = elm.getElementsByTagName('a')[0]
						if(!link) return;

						const url = link.getAttribute('href')
						nextElm.outerHTML = ''

						this.renderEmbed(url, elm)
					})
				})
			},
			// URL入力欄の表示処理
			handleTextUrlInfoBtn() {
				if (this.insert.isToggle) {
					console.log('insertLink btn click')


					// // this.editorRef.focus()
					// this.editor.selectElement(this.insert.focusLine)
					// const currentLine             = this.editor.getSelectedParentElement()
					// const currentPos              = currentLine.getBoundingClientRect();
					// this.insertLink.position.top  = (currentPos.top - 7) + 'px'
					// this.insertLink.position.left = currentPos.left + 'px'
					// this.insertLink.isShow        = true
					//
					// const elContent = document.getElementsByClassName('p-editor__content')[0]
					// this.insertLink.position.width = elContent.getBoundingClientRect().width  + 'px'
					//
					// this.insert.isShow = false;
					//
					// this.$emit('onHandleInsertLink', currentLine);

					this.editorRef.focus()
					this.editor.selectElement(this.insert.focusLine)

					this.embedElm = this.editor.getSelectedParentElement()
					this.embedElm.parentNode.innerHTML = `<div class="p-editor__embed__form__link editor-embed" data-placeholder="http:// 入力後にエンターをクリック"></div>`

					//this.editor.pasteHTML(`<p class="p-editor__embed__form__link editor-embed" data-placeholder="http://example.com"><span class="p-editor__embed__form__link__placeholder">http://</span><br></p>`, { cleanAttrs: [], cleanTags: [], unwrapTags: []})
					// this.editor.pasteHTML(`<p class="p-editor__embed__form__link editor-embed" data-placeholder="http://"><span data-placeholder="test">test</span><br></p>`, { cleanAttrs: [], cleanTags: [], unwrapTags: []})

					this.embedElm = this.editor.getSelectedParentElement()

					this.insert.isToggle = false
					this.insert.isShow = false
				}
			},
			// URL入力欄のkeyupイベントの処理
			detectEmbed(e) {
				if (e.keyCode === 13 && this.embedElm) {
					console.log(this.embedElm.innerHTML)
					// console.log(this.embedElm.children)

					// console.log(this.embedElm.innerHTML.value)
					// console.log(this.embedElm.innerHTML)

					// const url = this.embedElm.innerHTML.replace("<br>", "")
					const url = this.embedElm.innerHTML.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'')
					console.log(url)

					this.renderEmbed(url, this.embedElm)
					// this.embedElm = null
					this.insert.isShow = false
				}
			},
			// URLのOGP表示処理
			async renderEmbed(url, elm) {
				console.log('insertURL: ' + url)
				if (!url) {
					elm.innerHTML = `<br>`
					this.$emit('onChange')
					return
				}
				if (!url.match(/^(https?|ftp)(:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+)$/)) {
					// 独自にURL判定
					console.log('invalid url')

					elm.innerHTML = `${url}`
					this.$emit('onChange')
					return
				}

				// ローディング表示

				const params = {
					link_url: url
				}
				const result = await Api.getInfoTextLinkUrl(params, this.$store.state.user.authorizationToken)
				console.log('API: get embed link info')
				console.log(result)

				// this.insertLink.isShow        = false
				// this.insertLink.canLinkSubmit = false
				// this.insertLink.url           = ''
				// htmlデータの挿入
				// this.$refs.editor.focus()
				// const currentLine = this.insertLink.currentLine
				// this.editor.selectElement(currentLine)

				elm.innerHTML = `<div class="p-editor__embed__link u-cf" contenteditable="false">
						<a href="${result.data.link_url}" target="_blank">
							<div class="p-editor__embed__link__thumbnail"><span class="p-editor__embed__link__thumbnail__image" style="background-image: url(${result.data.thumbnail_image_url})"></div>
							<div class="p-editor__embed__link__info">
								<span class="p-editor__embed__link__info__title">${result.data.title}</span>
								<span class="p-editor__embed__link__info__description">${result.data.description}</span>
								<span class="p-editor__embed__link__info__site">${result.data.site_name}</span>
							</div>
						</a>
                    </div>`

				this.$emit('onChange')

				this.insert.isToggle = false
				this.insert.isShow = false

				// setTimeout(() => {
				// 	// const focused = this.editor.getSelectedParentElement()
				// 	// const currentPos = focused.getBoundingClientRect()
				// 	// this.window.scrollTo(0, currentPos.top - currentPos.x);
				// 	// this.$emit('onChange')
				// })
			},
		}
	}
</script>
