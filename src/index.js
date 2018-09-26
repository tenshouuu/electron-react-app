import React from 'react'
import { hydrate } from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from "react-redux"
import thunk from 'redux-thunk'

import rootReducer from './reducers'
import App from './components/App/App.js'
import 'antd/dist/antd.css'
import './index.css'

let devTool = f => f
if (process.env.NODE_ENV === 'development') {
  console.log('development')
  devTool = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
}

const composeSetup = process.env.NODE_ENV !== 'production' && typeof window === 'object' &&
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose

const previewState = localStorage.getItem('store') ? JSON.parse(localStorage.getItem('store')) : {};
const store = createStore(rootReducer, previewState, composeSetup(applyMiddleware(thunk)))

store.subscribe(handleChange)

function handleChange() {
    console.log('STORE',store.getState());
    localStorage.setItem('store', JSON.stringify(store.getState()))
}


const root = document.createElement('div')

root.id = 'root'
document.body.appendChild(root)

const render = Component => {
  hydrate(
    <Provider store={store}>
      <BrowserRouter>
        <Component />
      </BrowserRouter>
    </Provider>,
    document.getElementById('root'),
  )
}


render(App)


