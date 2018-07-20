import React from 'react'
import {Provider} from 'react-redux'
import ReactDOM from 'react-dom'
import App from './App'
import store from './store'


const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App store={store} />
    </Provider>,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)