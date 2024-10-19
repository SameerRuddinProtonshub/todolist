import React from "react";
import "./App.css";

function App() {
  const [todoList, setTodoList] = React.useState([]);
  const [todoInput, setTodoInput] = React.useState("");
  const [isEditing, setIsEditing] = React.useState(false);
  const [editId, setEditId] = React.useState(null);

  const handleAddTodo = () => {
    if (todoInput.trim()) {
      if (isEditing) {
        handleEditTask(editId);
      } else {
        const newTodo = {
          id: todoList.length + 1,
          task: todoInput,
          complete: false,
        };
        setTodoList([...todoList, newTodo]);
        setTodoInput("");
      }
    } else {
      alert("Please enter a task");
    }
  };

  const handleDelete = (id) => {
    const updatedTodos = todoList.filter((task) => task.id !== id);
    setTodoList(updatedTodos);
  };

  const handleComplete = (id) => {
    const updatedTodos = todoList.map((task) =>
      task.id === id ? { ...task, complete: !task.complete } : task
    );
    setTodoList(updatedTodos);
  };

  const showEditInput = (id) => {
    const taskToEdit = todoList.find((task) => task.id === id);
    setTodoInput(taskToEdit.task);
    setIsEditing(true);
    setEditId(id);
  };

  const handleEditTask = (id) => {
    const updatedTodos = todoList.map((task) =>
      task.id === id ? { ...task, task: todoInput } : task
    );
    setTodoList(updatedTodos);
    setTodoInput("");
    setIsEditing(false);
    setEditId(null);
  };

  return (
    <div className="App">
      <input
        type="text"
        onChange={(e) => setTodoInput(e.target.value)}
        value={todoInput}
      />
      <button onClick={handleAddTodo}>{isEditing ? "Edit Todo" : "Add Todo"}</button>
      {todoList.map((item) => (
        <div key={item.id}>
          <span style={{ textDecoration: item.complete ? "line-through" : "none" }}>
            {item.task}
          </span>
          <button onClick={() => handleComplete(item.id)}>
            {item.complete ? "Undo" : "Complete"}
          </button>
          <button onClick={() => showEditInput(item.id)}>Edit</button>
          <button onClick={() => handleDelete(item.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;
