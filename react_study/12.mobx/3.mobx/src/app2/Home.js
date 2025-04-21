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
        <button onClick={() => store.addTodo('这是一条新内容')}>添加</button>
        <button onClick={store.deleteTodo}>删除</button>
        <button onClick={store.resetTodo}>重置</button>
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
}
export default Home;