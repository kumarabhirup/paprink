require('dotenv').config()
const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass')
const webpack = require('webpack')

module.exports = withSass({
  webpack(config) {
    config.plugins.push(
      new webpack.ProvidePlugin({
          '$': 'jquery',
          'jQuery': 'jquery',
      })
    )
    return config
  },
  env: {
    'PROD_DOMAIN': process.env.PROD_DOMAIN
  }
})