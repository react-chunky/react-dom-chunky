'use strict'

let path = require('path')
let fs = require('fs-extra')
let webpack = require('webpack')
let config = require('./config')
let copyfiles = require('copyfiles')

function build(options) {
  return new Promise((resolve, reject) => {
      const setup = config(options)
      process.noDeprecation = true
      webpack(setup, (error, stats) => {
        if (error) {
          // Looks like webpack failed with a hard error
          reject(error)
          return
        }
        copyfiles(["./web/public/*/**", "./web/build"], { up: 2 }, () => resolve())
      })
  })
}

module.exports = build
