import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import * as serviceWorker from './serviceWorker'
import { createGlobalStyle } from 'styled-components'

import Main from './components/main'
import reducer from './redux/reducers'

const GlobalStyle = createGlobalStyle`
  body {
    font-family: trebuchet;
    background-color: #fff;
    color: #a1a1a1;
  }
`

let composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const middlewares = [thunk]

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(...middlewares))
)

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <GlobalStyle />
        <Main />
      </Provider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
