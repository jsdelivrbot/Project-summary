'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

var api1 = 'http://www.y34.lmh168.com/';
var api2 = 'http://amfapi.amfzone.com/';
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API1:'"amfapi.amfzone.com/"',
  API2:'"www.y34.lmh168.com/"'
})
