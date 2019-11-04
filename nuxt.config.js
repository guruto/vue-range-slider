const environment = process.env.NODE_ENV || 'development';
const envFilename = `./config/.env.${environment}`;
require('dotenv').config({path: envFilename})

module.exports = {
	head: {
		htmlAttrs: {
			prefix: 'og: http://ogp.me/ns#'
		},
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width,initial-scale=1,minimum-scale=1.0' },
			
			// { property: 'article:publisher', content: 'FacebookURL' },
			// { property: 'fb:app_id', content: 'FacebookAppID' },
			// { name: 'twitter:site', content: '@pagefulapp' },
			
		],
		link: [
			// { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
			// { rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' }
		]
	},
	loading: {
		color: '#738290',
		height: '3px'
	},
	router: {
		middleware: ['auth', 'pageLabel']
	},
	plugins: [
		{ src: '@/plugins/editor', ssr: false },
		{ src: '@/plugins/vue-js-toggle-button'},
		{ src: '@/plugins/ui' },
		{ src: '@/plugins/get-url' },
		{ src: '@/plugins/clipboard'},
		{ src: '@/plugins/vee-validate/i18n.js' },
		{ src: '@/plugins/route' },
		{ src: '@/plugins/vue-range-component', ssr: false },
	],
	modules: [
		'@nuxtjs/dotenv',
		['cookie-universal-nuxt', { parseJSON: false }],
		'@nuxtjs/axios',
		[
			'@nuxtjs/google-gtag',
			{
				id: 'UA-87283044-9',
				debug: false //本番環境以外でもGAを有効にしたい場合はtrueに。
			}
		],
		['nuxt-i18n', {
			locales: [
				{code: 'ja', iso: 'ja_JP'},
				// {code: 'en', iso: 'en-US'},
			],
			defaultLocale: 'ja',
			vueI18n:       {
				fallbackLocale: 'ja',
			},
			vueI18nLoader: true,
		}],
		'@nuxtjs/style-resources',
	],
	styleResources: {
		scss: [
			'@/assets/sass/variables.scss',
		]
	},
	css: [
		'@fortawesome/fontawesome-free/css/all.min.css',
		{ src: '@/assets/sass/style.scss', lang: 'scss' },
	],
	env: {
		BASE_URL: process.env.BASE_URL,
		BASE_DOMAIN: process.env.BASE_DOMAIN,
		BASE_SCHEME: process.env.BASE_SCHEME,
		API_BASE_URL: process.env.API_BASE_URL,
		COOKIE_DOMAIN: process.env.COOKIE_DOMAIN,
	},
};