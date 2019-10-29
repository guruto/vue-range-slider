<template>
	<div class="l-footer">
		<div class="l-footer__content">
			<div class="l-footer__content__link">
				<ul>
					<li><a :href="$getUrl('/info/term')">利用規約</a></li>
					<li><a :href="$getUrl('/info/privacy')">プライバシーポリシー</a></li>
					<li><a :href="$getUrl('/info/inquiry')">お問い合わせ</a></li>
					<li><a href="https://guruto.jp" target="_blank">運営会社</a></li>
				</ul>
			</div>

			<div class="l-footer__content__copyright">
				©2019 PAGEFUL. All rights reserved.
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Footer"
	}
</script>

<style lang="scss">
	.l-footer {
		background-color: $color_main_light;
		&__content {
			margin: 0 auto;
			max-width: $screen_max_size_tablet;
			padding: 10px 5%;
			&__link {
				margin-bottom: 20px;
				display: flex;
				flex-wrap:wrap;
				li {
					box-sizing: border-box;
					display: inline-block;
					margin: 0 4px 5px;
					a {
						font-size: 13px;
					}
				}
			}
			&__copyright {
				text-align: center;
				font-size: 12px;
				margin: 0;
				color: $color_text;
			}
		}
	}
</style>