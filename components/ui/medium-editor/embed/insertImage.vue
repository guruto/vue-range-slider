<template>
	<span @click="handleSelectTextImage" class="btn-toggle file-uploads file-uploads-html5 p-editor__embed__btn__image">
		<i class="far fa-images"></i>
		<input @change="handleTextImageFile" id="form-select-text-image" type="file" accept="image/*"/>
	</span>
</template>

<script>
	import _ from 'underscore';
	import Api from "~/plugins/api";

	export default {
		props: [
			'editor',
			'insert',
			'editorRef',
			'handler'
		],
		components: {
		},
		data() {
			return {
				currentLine: null,
				currentImg: null,
				currentSize: 'is-normal',
				position: {
					top: '0'
				},
				isShow: false
			}
		},
		mounted() {
			this.initializeExisting()
		},
		beforeMount () {
			// this.window = window;
			// window.addEventListener('scroll', this.handleScroll);
		},
		beforeDestroy () {
			// window.removeEventListener('scroll', this.handleScroll);
		},
		methods: {
			handleSelectTextImage() {
				const input = document.querySelector('#form-select-text-image');
				input.click();
			},
			handleTextImageFile(e) {
				e.preventDefault();
				if (e.target.files.length === 0) {
					return
				}

				this.uploadTextImage(e.target.files[0])
			},
			async uploadTextImage(selectedImage) {
				console.log(selectedImage)

				// upload
				const data = new FormData();
				data.append('file_data', selectedImage);

				const result = await Api.uploadImageForText(data, this.$store.state.user.authorizationToken)
				console.log(result)

				if(this.insert.isToggle) {
					this.editorRef.focus()
					this.editor.selectElement(this.insert.focusLine)

					// this.editor.pasteHTML(`<p class="p-editor__embed__item"><div class="p-editor__embed__image editor-image">
                    //     <img src="${result.data.url}" />
                    // </div>
                    // <div class="editor-image-description"><br></div>
                    // </p>`, { cleanAttrs: [], cleanTags: [], unwrapTags: []})

					this.embedElm = this.editor.getSelectedParentElement()
					// console.log(this.embedElm) = <br>
					this.embedElm.parentNode.innerHTML = `<div class="p-editor__embed__image editor-image">
                        <img src="${result.data.url}" />
                    </div>`

					this.currentLine = this.editor.getSelectedParentElement().previousElementSibling.previousElementSibling
					this.currentImg = this.currentLine.querySelector('img')
					const currentPos = this.currentImg.getBoundingClientRect();

					this.window.scrollTo(0, currentPos.top - currentPos.x);

					const handlerVm = this
					this.currentLine.onclick = function() {
						setTimeout(() => {
							handlerVm.sizingHandler(this)
						})
					}

					this.insert.isShow = false;
				}
			},

			initializeExisting() {
				const handlerVm = this;
				setTimeout(() => {
					const focused = this.editor.getFocusedElement()
					if(!focused) return false;

					const editorImages = focused.getElementsByClassName('editor-image')
					_.map(editorImages, (elm) => {
						// Set Onclick to Show Image Size Handler
						elm.onclick = function() {
							setTimeout(() => {
								handlerVm.sizingHandler(this)
							})
						}
					})
				})
			},

			// inputFilter(newFile, oldFile, prevent) {
			// 	if (newFile && !oldFile) {
			// 		if (/(\/|^)(Thumbs\.db|desktop\.ini|\..+)$/.test(newFile.name)) {
			// 			return prevent()
			// 		}
			// 		if (/\.(php5?|html?|jsx?)$/i.test(newFile.name)) {
			// 			return prevent()
			// 		}
			// 	}
			// },
			// inputFile(newFile, oldFile) {
			// 	if (newFile && !oldFile) {
			// 		this.$refs.upload.active = true
			// 	}
			//
			// 	// Image Upload Successful
			// 	if(newFile && newFile.success) {
			// 		this.addImage(newFile.response.url)
			// 	}
			// },
			// addImage(url) {
			// 	this.$emit('uploaded', url);
			//
			// 	if(this.insert.isToggle) {
			// 		const handlerVm = this
			// 		this.editorRef.focus()
			// 		this.editor.selectElement(this.insert.focusLine)
			// 		this.editor.pasteHTML(`<div class="editor-image">
            //             <img src="${url}" />
            //         </div>
            //         <div class="editor-image-description"><br></div>
            //         <br />`, { cleanAttrs: [], cleanTags: [], unwrapTags: []})
			//
			// 		this.currentLine = this.editor.getSelectedParentElement().previousElementSibling.previousElementSibling
			// 		this.currentImg = this.currentLine.querySelector('img')
			// 		const currentPos = this.currentImg.getBoundingClientRect();
			//
			// 		this.window.scrollTo(0, currentPos.top - currentPos.x);
			// 		this.currentLine.onclick = function() {
			// 			setTimeout(() => {
			// 				handlerVm.sizingHandler(this)
			// 			})
			// 		}
			// 		this.insert.isShow = false;
			// 	}
			// },
			sizingHandler(elm) {
				const className = elm.className
				elm.className = className.replace('is-focus', '') + ' is-focus'
				if(className.indexOf('expand') > -1) {
					this.currentSize = 'is-expand'
				} else if(className.indexOf('full') > -1) {
					this.currentSize = 'is-full'
				} else {
					this.currentSize = 'is-normal'
				}

				const img = elm.querySelector('img')
				this.currentLine = elm;
				this.isShow = true;
				const currentPos = img.getBoundingClientRect();
				this.position.top = currentPos.top + 'px'
				this.$emit('imageClick', {
					position: this.position,
					currentLine: this.currentLine,
					isShow: this.isShow,
					currentSize: this.currentSize
				})
			},
		},
	}
</script>
