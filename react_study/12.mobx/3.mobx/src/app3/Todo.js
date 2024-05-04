import { observer } from "mobx-react"


export const TodoList = observer(({store}) => {
    const onNewTodo = () => {
        store.addTodo(prompt('Enter a new todo:','coffee plz'));
    }

    return (
        <div>
            { store.report }
            <ul>
                { store.todos.map(
                (todo, idx) => <TodoView todo={ todo } key={ idx } />
                ) }
            </ul>
            <button onClick={ onNewTodo }>New Todo</button>
            <small> (double-click a todo to edit)</small>
        </div>
    );
})
  
export const TodoView = observer(({todo}) => {
    const onToggleCompleted = () => {
      todo.completed = !todo.completed;
    }
  
    const onRename = () => {
      todo.task = prompt('Task name', todo.task) || todo.task;
    }
  
    return (
      <li onDoubleClick={ onRename }>
        <input
          type='checkbox'
          checked={ todo.completed }
          onChange={ onToggleCompleted }
        />
        { todo.task }
      </li>
    );
})