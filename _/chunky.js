import React from 'react'
import ReactDOM from 'react-dom'
import App from './src/core/App'

ReactDOM.render(<App/>, document.getElementById('chunky'))

// /**
// /**
//  *  This is the main entry point for webpack, and is
//  *  primarily in charge of loading and generating product assets
//  **/
// export default class Chunky {
//
//   /**
//    *  We expect a Context to start with and then we
//    *  load the pages and required components right away
//    **/
//   constructor(context) {
//     this._context = context
//     this.initialize()
//   }
//
//   initialize() {
//   }
//
//   get context() {
//     return this._context
//   }
//
//   logOk(message) {
//     console.log(`%c[Chunky] ✔ ${message}`, 'background: #66BB6A; color: white; display: block;');
//   }
//
//   /**
//    *  This is a Webpack hook that loads all pages
//    **/
//   render() {
//     // if(typeof window === "undefined" || typeof document === "undefined") {
//     //   // Looks like we're not in browser mode
//     //   return
//     // }
//
//     // Keep track of the render time
//     const startTime = new Date().getTime()
//
//     // Check if we're in hot reloading mode
//     // this._hotReloading = module.hot && module.hot.accept()
//
//     // Create a dynamic container
//     ReactDOM.render(<App />, document.getElementById('chunky'))
//
//     // Display a friendly message about the time it took to render
//     var time = new Date().getTime() - startTime
//     time = (time < 1000 ? time + "ms" : (parseFloat(time/1000).toFixed(2) + "s"))
//     this.logOk(`Finished rendering in ${time}`)
//   }
// }
//
// // Create the in-browser session
// const session = new Chunky(chunky.context)
// session.render()
