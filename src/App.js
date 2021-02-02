import TodoList from "./TodoList";
import uuidv4 from "uuid/v4";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import React, { useState, useRef, useEffect } from "react";

const LOCAL_STOR_KEY = "todoApp.todos";

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STOR_KEY));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STOR_KEY, JSON.stringify(todos));
  }, [todos]);

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value;
    if (name === "") return;
    setTodos((prevTodos) => {
      return [
        ...prevTodos,
        {
          id: uuidv4(),
          name: name,
          complete: false,
        },
      ];
    });
    todoNameRef.current.value = null;
  }
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleAddTodo(e);
    }
    if (e.key === "Backspace") {
      handleClearTodo(e);
    }
  }

  function handleClearTodo() {
    const newTodos = todos.filter((todo) => !todo.complete);
    setTodos(newTodos);
  }

  return (
    <div className="container">
      <nav className="navbar">
        <div className="container-fluid">
          <lable className="h2 text-center">My Todo </lable>
          <label className="font-italic">
            {" "}
            {todos.filter((todo) => !todo.complete).length} left to do{" "}
          </label>
        </div>
      </nav>

      <div className="input-group" onKeyDown={handleKeyDown}>
        <input
          ref={todoNameRef}
          type="text"
          className="m-1  form-control"
          placeholder="please input..."
          aria-label="please input your todos"
        ></input>
        <button
          className="btn btn-outline-secondary m-1"
          onClick={handleAddTodo}
          type="button"
        >
          ＋
        </button>
        <button
          className="btn btn-outline-secondary m-1"
          onClick={handleClearTodo}
          type="button"
        >
          ×
        </button>
      </div>
      <TodoList
        todos={todos}
        toggleTodo={toggleTodo}
        handleKeyDown={handleKeyDown}
      />
    </div>
  );
}

export default App;
