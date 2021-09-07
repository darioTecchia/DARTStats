const changeLoaderOptions = loaders => {
  if (loaders) {
    for (const loader of loaders) {
      if (loader.loader === 'sass-loader') {
        Object.assign(loader.options, {
          includePaths: ['./assets']
        })
      }
    }
  }
}

let development = process.env.NODE_ENV !== 'production';

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'DARTSStat',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'IntelliJ Idea\'s DARTS statistics viewer.' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  telemetry: false,

  /*
  ** Set the link active classes
  */
  router: {
    linkActiveClass: 'active open'
  },

  /*
  ** Customize the progress bar color
  */
  loading: { color: '#42A5CC' },

  /**
   * Import CSS
   */
  css: [
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~plugins/axios.js' }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    'bootstrap-vue/nuxt'
  ],
  /*
  ** Vue Bootrap module configuration
  */
  bootstrapVue: {
    // Install the `IconsPlugin` plugin (in addition to `BootstrapVue` plugin)
    icons: true
  },
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    proxy: false,
  },
  /*
  ** Style resources configuration
  */
  styleResources: {
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })

        const vueLoader = config.module.rules.find(
          ({ loader }) => loader === 'vue-loader')
        const { options: { loaders } } = vueLoader || { options: {} }

        if (loaders) {
          for (const loader of Object.values(loaders)) {
            changeLoaderOptions(Array.isArray(loader) ? loader : [loader])
          }
        }

        config.module.rules.forEach(rule => changeLoaderOptions(rule.use))
      }
    }
  }
}
