const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass')
const { parsed: localEnv } = require('dotenv').config()
const webpack = require('webpack')

module.exports = withSass({
  webpack(config) {
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv))
    config.plugins.push(
      new webpack.ProvidePlugin({
          '$': 'jquery',
          'jQuery': 'jquery',
      })
    )
    return config
  }
})