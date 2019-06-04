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
    'PROD_DOMAIN': process.env.PROD_DOMAIN,
    'BACKEND_SERVER': process.env.BACKEND_SERVER,
    'FB_LOGIN_APP_ID': process.env.FB_LOGIN_APP_ID,
    'GOOGLE_LOGIN_APP_ID': process.env.GOOGLE_LOGIN_APP_ID,
    'GOOGLE_LOGIN_APP_SECRET': process.env.GOOGLE_LOGIN_APP_SECRET,
    'FB_LOGIN_APP_VERSION': process.env.FB_LOGIN_APP_VERSION,
    'DEV_DOMAIN': process.env.DEV_DOMAIN,
    'ENDPOINT': process.env.ENDPOINT,
    'GA_TRACKING_ID': process.env.GA_TRACKING_ID,
    'CLOUDINARY_USERNAME': process.env.CLOUDINARY_USERNAME,
    'PUBLIC_VAPID': process.env.PUBLIC_VAPID,
    'PRIVATE_VAPID': process.env.PRIVATE_VAPID
  }
})