'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    //domain: '"http://work.beibeiyue.com"',
    domain: '"http://192.168.1.205:8822"',
    //domain: '"http://twork.beibeiyue.cn"'
})
