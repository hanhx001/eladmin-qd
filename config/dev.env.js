'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://101.37.34.226:8000"'
  //  BASE_API: '"http://localhost:8013"'
  // BASE_API: '"https://api.auauz.net"'
})
