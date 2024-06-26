import {makeObservable, observable, autorun, computed, action} from 'mobx';

class ObservableTodoStore {
    todos = [];

    constructor() {
        makeObservable(this, {
            todos: observable,
            completedTodosCount: computed,
            // report: computed,
            addTodo: action,
        });
        autorun(() => console.log(this.report()));
    }
    get completedTodosCount() {
        return this.todos.filter(
          todo => todo.completed === true
        ).length;
    }
    report() {
        if (this.todos.length === 0)
          return "<无>";
        const nextTodo = this.todos.find(todo => todo.completed === false);
        return `下一个待办："${nextTodo ? nextTodo.task : "<无>"}"。 ` +
          `进度：${this.completedTodosCount}/${this.todos.length}`;
      }
    addTodo(task) {
        this.todos.push({
          task: task,
          completed: false,
          assignee: null
        });
    }
}

const observableTodoStore = new ObservableTodoStore();
observableTodoStore.addTodo("阅读 MobX 教程");
observableTodoStore.addTodo("试用 MobX");
observableTodoStore.todos[0].completed = true;
observableTodoStore.todos[1].task = "在自己的项目中试用 MobX";
observableTodoStore.todos[0].task = "理解 MobX 教程";
