import {makeObservable, observable, computed, action, autorun} from 'mobx'

class ObservableTodoStore {
    todos = [];
  
    constructor() {
      makeObservable(this, {
        todos: observable,
        completedTodosCount: computed,
        report: computed,
        addTodo: action,
      });
      autorun(() => console.log(this.report));
    }
  
    get completedTodosCount() {
      return this.todos.filter(
        todo => todo.completed === true
      ).length;
    }
  
    get report() {
      if (this.todos.length === 0)
        return "<none>";
      const nextTodo = this.todos.find(todo => todo.completed === false);
      return `Next todo: "${nextTodo ? nextTodo.task : "<none>"}". ` +
        `Progress: ${this.completedTodosCount}/${this.todos.length}`;
    }
  
    addTodo(task) {
      this.todos.push({
        task: task,
        completed: false,
      });
    }
  }
  
  const observableTodoStore = new ObservableTodoStore();
  export default observableTodoStore