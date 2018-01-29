module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'tetrisone',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'My first stab at creating a tetris game. Implementation using Nuxt.js. Start 6 December 2017. '}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
        //  loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
