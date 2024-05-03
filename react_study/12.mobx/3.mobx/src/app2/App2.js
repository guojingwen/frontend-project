import React, { Component } from 'react'
import Home from './Home'
import { Provider } from 'mobx-react'
import store from './store/'

export default class App2 extends Component {
  render() {
    return (
      <Provider store={store}>
        <Home></Home>
      </Provider>
    )
  }
}