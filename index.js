import React from 'react'
import ReactDOM from 'react-dom'
import { Core } from 'react-chunky'
// import { AppContainer } from 'react-hot-loader'
import Component from './src/core/Component'
import Screen from './src/core/Screen'
import App from './src/core/App'
import * as firebase from "firebase"
import * as Components from './src/components'

// if (module.hot) module.hot.accept('./src/core/App', () => renderApp(App))

// <AppContainer>
//   <App {...props}/>
// </AppContainer>,

global.firebase = firebase
global.storage = {
    setItem: function (key, value, callback) {
      try {
        localStorage.setItem(key, value)
        callback()
      } catch (e) {
        callback(e)
      }
    },
    getItem: function (key, callback) {
      try {
        const value = localStorage.getItem(key)
        callback(null, value)
      } catch (e) {
        callback(e)
      }
    },
    removeItem: function (key, callback) {
      try {
        localStorage.removeItem(key)
        callback()
      } catch (e) {
        callback(e)
      }
    }
}

export function renderApp(props) {
  const Main = (
  <Core.AppContainer {...props}>
    <App {...props}/>
  </Core.AppContainer>)

  firebase.initializeApp(props.firebase)
  ReactDOM.render(Main, document.getElementById('chunky'))
}

export { Component, Screen, App, Components }
