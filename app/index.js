const React = require('react')
const ReactDOM = require('react-dom')
const ReactDOMServer = require('react-dom/server')
const Router = require('react-router-dom')

try {
  require('./global')

  if(typeof window != "undefined" || typeof document != "undefined") {
    ReactDOM.render(chunky.main(chunky.route, true), document.getElementById('chunky'))
  }
} catch (e) {
  console.log(e)
}

function renderStaticPage(route) {
  return new Promise((resolve, reject) => {
    try {
      const html = ReactDOMServer.renderToStaticMarkup(chunky.main(route))
      resolve(html)
    } catch (e) {
      reject(e)
    }
  })
}

module.exports = { renderStaticPage }
