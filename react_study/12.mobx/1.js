class TodoStore {
    todos = [];
    get completedTodosCount() {
        return this.todos.filter(
            todo => todo.completed === true
        ).length
    }

    report () {
        if(this.todos.length === 0) return "<无>";
        const nextTodo = this.todos.find(todo => todo.completed === false);
        return `下一个待办："${nextTodo ? nextTodo.task : "<无>"}"。 ` +
      `进度：${this.completedTodosCount}/${this.todos.length}`;
    }
    addTodo(task) {
        this.todos.push({
            task,
            completed: false,
            assignee: null
        })
    }
}

const todoStore = new TodoStore();

todoStore.addTodo("阅读 MobX 教程");
console.log(todoStore.report());

todoStore.addTodo("试用 MobX");
console.log(todoStore.report());

todoStore.todos[0].completed = true;
console.log(todoStore.report());

todoStore.todos[1].task = "在自己的项目中试用 MobX";
console.log(todoStore.report());

todoStore.todos[0].task = "理解 MobX 教程";
console.log(todoStore.report());