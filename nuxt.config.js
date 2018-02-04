const isP = process.env.NODE_ENV === 'production'
module.exports = {
  head: {
    title: '商城',
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    // script: [
    //   {type: 'text/javascript', src: 'https://cdn.bootcss.com/event-source-polyfill/0.0.9/eventsource.js'},
    // ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  plugins: [
    { src: '~plugins/3rd', ssr: false }
  ],
  build: {
    /*
    ** Run ESLint on save
    */
    //publicPath: 'http://jc.mmark.cn',
    vendor: ['axios'],
    babel: {
      presets: [['vue-app', {
        useBuiltIns: true,
        ie: 9,
        uglify: true
      }], "stage-3"],
      "plugins": [
        ["transform-runtime", {
          "helpers": true,
          "polyfill": true,
          "regenerator": true,
        }]
      ]
    },
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
        config.devtool = 'eval-source-map'
      }
      // 对入口文件进行 更改
      // html5-history-api 解决 ie9 下 history placeState 问题
      if (isClient) {
        const app = config['entry']['app']
        if (typeof app === "string") {
          config['entry']['app'] = ['html5-history-api', app]
        } else {
          // 下面 是在 ie9 下 开发环境
         // config['entry']['app'].unshift('babel-polyfill')
            config['entry']['app'].unshift('html5-history-api')
        }
      }
    },
    loaders: [
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'url-loader',
        query: {
          limit: 1000, // 1KO
          name: 'img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 1000, // 1 KO
          name: 'fonts/[name].[hash:7].[ext]'
        }
      }
    ],
    postcss: [
      require('postcss-salad')({
        browsers: ['ie > 8', 'last 2 version'],
        features: {
          //"bem": false, //pass boolean false can disable the plugin
          "inlineSvg": {
            "path": "src/svgs"
          }
        }
      }),
      // rem 视口 / 10  === remUnit
      require('postcss-px2rem')({remUnit: 75})
    ]
  }
}
