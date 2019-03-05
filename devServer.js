require('babel-register')({
  babelrc: false,
  presets: [
      '@babel/preset-env'
    // 'stage-3', // I use object-reset-spread 😀
  ],
})
require('./server')