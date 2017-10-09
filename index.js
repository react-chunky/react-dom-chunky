import React from 'react'
import ReactDOM from 'react-dom'
import { Core } from 'react-chunky'
// import { AppContainer } from 'react-hot-loader'
import Component from './src/core/Component'
import Router from './src/core/Router'
import Screen from './src/core/Screen'
import App from './src/core/App'
import * as firebase from "firebase"
import * as Components from './src/components'

// if (module.hot) module.hot.accept('./src/core/App', () => renderApp(App))

// <AppContainer>
//   <App {...props}/>
// </AppContainer>,

export function renderApp(props) {
  const Main = (
  <Core.AppContainer {...props}>
    <App {...props}/>
  </Core.AppContainer>)

  ReactDOM.render(Main, document.getElementById('chunky'))
}

export { Component, Screen, App, Components, Router }
