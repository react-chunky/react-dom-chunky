import { renderApp } from '..'
import config from './config'
import firebaseConfig from 'web/firebase-config.json'

config.id = "chunky"
config.firebase = firebaseConfig

renderApp(config)
