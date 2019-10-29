<template>
	<div class="image-handler-container">

		<div class="p-editor__embed insert-image-container" v-show="insert.isShow" v-bind:style="insert.position">
			<div class="insert-image-toggle">
				<button v-on:click="toggle" class="btn-toggle">
					<i class="fas fa-plus"></i>
				</button>
			</div>

			<div class="insert-image-menu" v-show="insert.isToggle">
				<insert-image
					:editor="editor"
					:insert="insert"
					:editorRef="editorRef"
					:handler="handler"
					v-on:imageClick="imageClickHandler">
				</insert-image>

				<insert-link
					:editor="editor"
					:insert="insert"
					:editorRef="editorRef"
					:insertLink="insertLink"
					v-on:onChange="onChange"
					v-on:onHandleInsertLink="onHandleInsertLink">
				</insert-link>

			</div>
		</div>
	</div>
</template>

<script>
	import InsertImage from './embed/insertImage';
	import InsertLink from './embed/insertLink';
	// import InsertGist from './embed/insertGist';
	import ImagePosition from './embed/imagePosition';
	import _ from 'underscore';

	export default {
		components: {
			InsertImage,
			InsertLink,
			// InsertGist,
			ImagePosition
		},
		data() {
			return {
				insert: {
					position: {
						top: '0',
						left: '0'
					},
					isShow: false,
					isToggle: false,
					embedElm: null,
					files: [],
					focusLine: null
				},
				handler: {
					currentLine: null,
					currentImg: null,
					currentSize: 'is-normal',
					position: {
						top: '0'
					},
					isShow: false
				}
			}
		},
		props: [
			'editor',
			'insertLink',
			'editorRef',
			'onChange',
			'onHandleInsertLink'
		],
		onChange() {
			this.$emit('onChange')
		},
		mounted() {
			this.subscribe()
		},
		destroyed() {
			this.unsubscribe()
		},
		beforeMount () {
			this.window = window;
			window.addEventListener('scroll', this.handleScroll);
		},
		beforeDestroy () {
			window.removeEventListener('scroll', this.handleScroll);
		},
		methods: {
			subscribe() {
				this.editor.subscribe('editableKeyup', this.detectShowToggle)
				this.editor.subscribe('editableClick', this.detectShowToggle)
				this.editor.subscribe('editableKeyup', this.detectImageDescription)
				this.editor.subscribe('editableClick', this.detectImageDescription)
			},
			unsubscribe() {
				this.editor.unsubscribe('editableKeyup', this.detectShowToggle)
				this.editor.unsubscribe('editableClick', this.detectShowToggle)
				this.editor.unsubscribe('editableKeyup', this.detectImageDescription)
				this.editor.unsubscribe('editableClick', this.detectImageDescription)
			},
			detectImageDescription() {
				const focused = this.editor.getFocusedElement()
				if(!focused) return;

				const editorImages = focused.getElementsByClassName('editor-image-description')
				_.map(editorImages, (elm) => {
					const description = elm.innerHTML.trim()

					if(!description || description == "<br>") {
						elm.className = 'editor-image-description is-empty'
					} else {
						elm.className = 'editor-image-description'
					}
				})
			},
			detectShowToggle(e) {
				if(this.insert.isShow && this.insert.isToggle) {
					this.toggle();
				}

				if(e.keyCode == 13) {
					const focused = this.editor.getSelectedParentElement()
					const nextElm = focused.nextElementSibling
					const prevElm = focused.previousElementSibling

					if(nextElm && prevElm && nextElm.className.indexOf('editor-image-description') > -1 && prevElm.className.indexOf('editor-image') > -1) {
						nextElm.parentNode.insertBefore(nextElm, focused);
					}
				}

				this.handler.isShow = false
				if(e.target.className.indexOf('editor-image-description') <= -1) {
					const editorImages = this.editor.getFocusedElement().getElementsByClassName('editor-image')
					_.map(editorImages, (imgElm) => {
						imgElm.className = imgElm.className.replace('is-focus', '')
					})
				}

				const currentLine = this.editor.getSelectedParentElement()
				const outerHtml = currentLine.outerHTML
				const isList = outerHtml.indexOf('<li>') > -1
				const content = currentLine.innerHTML.replace(/^(<br\s*\/?>)+/,'').trim()
				if(content || isList) {
					// Not show toggle if focus line has content & list
					this.insert.isShow = false
					this.insert.isToggle = false
					this.insert.focusLine = null
				} else {
					const currentPos = currentLine.getBoundingClientRect();

					// 50px add
					this.insert.position.top = currentPos.top + 38 + 'px'
					this.insert.position.left = currentPos.left + 50 + 'px'
					this.insert.isShow = true

					this.insert.focusLine = currentLine
				}
			},
			toggle () {
				this.insert.isToggle = !this.insert.isToggle;
			},
			imageClickHandler(value) {
				this.handler = value
			},
			handleScroll() {
				console.log('scroll')
				this.handler.isShow = false

				if(this.insert.isShow) {
					const currentLine = this.editor.getSelectedParentElement()
					const currentPos = currentLine.getBoundingClientRect()
					this.insert = {
						...this.insert,
						isShow: true,
						focusLine: currentLine,
						position: {
							// 50px add
							top: currentPos.top + 38 + 'px',
							left: currentPos.left + 50 + 'px'
						}
					}
				}
			}
		},
	}
</script>