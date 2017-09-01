'use strict'

// let coreutils = require('coreutils')
let path = require('path')
let fs = require('fs-extra')
let webpack = require('webpack')
let config = require('../config/webpack.config')
let WebpackDevServer  = require('webpack-dev-server')

function start() {
  console.log("Ddd")
  return new Promise((resolve, reject) => {

    new WebpackDevServer(webpack(config), {

      }).
      listen(3000, 'localhost', (error) => {

        if (error) {
          // Looks like webpack failed with a hard error
          reject(error)
          return
        }

        // Open a browser with the website loaded
        const url = 'http://localhost:3000'
        resolve(url)
      })
  })
}

start().then((url) => {
  console.log(url)
})
