var utils = require('./utils')
var config = require('../config')

var isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isProduction
      ? config.build.productionSourceMap
      : config.dev.cssSourceMap,
    extract: isProduction
  }),
  // postcss:[require('postcss-px2rem')({'remUnit':75,'baseDpr':1})]           /*因为我是以750px(iphone6)宽度为基准，所以remUnit为37.5*/
}
