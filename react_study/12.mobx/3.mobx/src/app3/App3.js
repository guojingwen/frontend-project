import React, { Component } from 'react'
import { TodoList } from './Todo'
import observableTodoStore from './store'

export default class App3 extends Component {
    render() {
      return (
        <TodoList store={ observableTodoStore }/>
      )
    }
}