export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt-app',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''},
    ],
    link: [{rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/styles/reset.css',
    '~/assets/styles/global.css',
    '~/assets/styles/variables.css',
    '~/assets/styles/main.css',
  ],

  loading: {
    color: 'green',
    height: '1px',
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['@nuxtjs/style-resources'],

  styleResources: {
    // your settings here
    scss: ['./assets/styles/mixins.scss'],
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL:
      process.env.BASE_URL ||
      'https://my-nuxt-education-default-rtdb.europe-west1.firebasedatabase.app',
    https: true,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  transition: {
    name: 'fade',
    mode: 'out-in',
  },
}
