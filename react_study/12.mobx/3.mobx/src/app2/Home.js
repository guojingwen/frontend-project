import React, { Component } from 'react'
import {inject, observer} from 'mobx-react'

@inject('store') 
@observer
class Home extends Component {
  render() {
    const {store} = this.props
    return (
      <div>
        <div>{store.title}</div>
        <button onClick={this.handleTodos.bind(this, 'add')}>添加</button>
        <button onClick={this.handleTodos.bind(this, 'delete')}>删除</button>
        <button onClick={this.handleTodos.bind(this, 'reset')}>重置</button>
        <h6>{store.length}</h6>
        {
          store.todos.map((ele, index)=>(
            <div key={index}>
              {ele}---
            </div>
          ))
        }
      </div>
    )
  }
  handleTodos(type){
    const {store} = this.props
    console.log('handleTodos', type, store.todos)
    switch (type) {
      case 'add':
        store.addTodo('这是一条新内容')
        break
      case 'delete':
        store.deleteTodo()
        break
      case 'reset':
        store.resetTodo()
        break
      default:
        break
    }
  }
}
export default Home;