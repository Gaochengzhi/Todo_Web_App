import TodoList from './TodoList'
import uuidv4 from 'uuid/v4'
import 'bootstrap/dist/css/bootstrap.min.css'

import React, {
    useState,
    useRef,
    useEffect
} from 'react'

const LOCAL_STOR_KEY = 'todoApp.todos'

function App() {
    const [todos, setTodos] = useState([])
    const todoNameRef = useRef()

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STOR_KEY))
        if (storedTodos) setTodos(storedTodos)
    }, [])

    useEffect(() => {
        localStorage.setItem(LOCAL_STOR_KEY, JSON.stringify(todos))
    }, [todos])

    function toggleTodo(id){
        const newTodos = [...todos]
        const todo = newTodos.find(todo=>todo.id===id)
        todo.complete =!todo.complete
        setTodos(newTodos)
    }

    function handleAddTodo(e) {
        const name = todoNameRef.current.value
        if (name === '') return
        setTodos(prevTodos => {
            return [...prevTodos, {
                id: uuidv4(),
                name: name,
                complete: false
            }]
        })
        todoNameRef.current.value = null
    }

    function handleClearTodo() {
        const newTodos = todos.filter(todo=>!todo.complete)
        setTodos(newTodos)
        
    }

    return (
        <div className='container'>
            <TodoList todos={todos} toggleTodo={toggleTodo} />

         




            <input ref={todoNameRef} type="text" />

                <button type="button" class="btn btn-primary" onClick={handleAddTodo}>Add</button>
                <button type="button" class="btn btn-danger" onClick={handleClearTodo}> Clear</button> 

            
            <div > 
                {todos.filter(todo=>!todo.complete).length} left to do 
            </div>
        </div>
    )
}

export default App;
