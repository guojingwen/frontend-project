import { observable, action, computed } from 'mobx'

class AppStore {

  @observable title = 'mobx--'
  @observable todos = []

  @computed get desc(){
    return `一共${this.todos.length}条`
  }

  @action addTodo(todo) {
    this.todos.push(todo)
  }
  @action deleteTodo() {
    this.todos.pop()
  }
  @action resetTodo() {
    this.todos = []
  }
}

const store = new AppStore()

export default store