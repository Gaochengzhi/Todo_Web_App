import React from "react";
import "pretty-checkbox/dist/pretty-checkbox.css";
export default function Todo({ todo, toggleTodo }) {
  function handleClick() {
    toggleTodo(todo.id);
  }
  return (
    <div>
      <label>
        <div className="pl-1 ml-4  pretty p-default">
          <input
            type="checkbox"
            checked={todo.complete}
            onChange={handleClick}
          />
          <div className="state">
            <label>{todo.name}</label>
          </div>
        </div>
      </label>
    </div>
  );
}
