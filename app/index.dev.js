import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from '../src/core/App'
import './global'

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      { chunky.main(Component) }
    </AppContainer>,
  document.getElementById('chunky')
)
}

render(App)

if (module.hot) {
  module.hot.accept('../src/core/App', () => { render(App) })
}
