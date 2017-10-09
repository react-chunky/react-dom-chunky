import React from 'react'
import { Core } from 'react-chunky'

import App from '../src/core/App'
import config from './config'
import firebaseConfig from 'web/firebase-config.json'
import firebase from 'firebase'

config.id = "chunky"
config.firebase = firebaseConfig

const main = (route, redirect) => (<Core.AppContainer {...config}>
    <App {...config} route={route} redirect={redirect}/>
  </Core.AppContainer>)

global.chunky = Object.assign({}, global.chunky, { config, main })
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

firebase.initializeApp(config.firebase)
