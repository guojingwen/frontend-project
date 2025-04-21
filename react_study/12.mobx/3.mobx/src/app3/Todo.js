import { observer } from "mobx-react"

export const TodoList = observer(({store}) => {
    const onNewTodo = () => {
        store.addTodo(prompt('Enter a new todo:', 'coffee plz'));
    }
    return <div>
        <ul>
            {
                store.todos.map((todo, index) => <TodoView todo={todo} key={index} />)
            }
        </ul>
        <button onClick={onNewTodo}>ADD</button>
    </div>
})

export const TodoView = observer(({todo}) => {
    const onToggleCompleted = () => {
        todo.completed = !todo.completed;
    }
    const onRename = () => {
        todo.task = prompt('Task name', todo.task) || todo.task;
    }
    return <div onDoubleClick={onRename}>
        <input type="checkbox" checked={todo.completed} onChange={onToggleCompleted} />
        {todo.task}
    </div>
})