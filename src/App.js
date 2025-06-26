import { TodoForm } from "./components/TodoForm";
import './App.css';
import { TodoList } from "./components/TodoList";
import { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  // const [inputValue, setInputValue] = useState("");

  // Load to Localstorage
  useEffect(() => {
    const storedTodos = localStorage.getItem('todos')
    if (storedTodos) setTodos(JSON.parse(storedTodos));
    setHasLoaded(true);
  }, []);

  // Save to Localstorage
  useEffect(() => {
    if (hasLoaded) localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos, hasLoaded]);

  const addTodo = (todoText) => {
    setTodos([...todos, {id: Date.now(), text: todoText, complete: false }]);
    // setInputValue("");
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo => (
      todo.id === id ? {...todo, complete: !todo.complete } : todo
    )))
  }

  const onDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  const onEdit = (id, newTodo) => {
    setTodos(todos.map(todo => (
      todo.id === id ? {...todo, text: newTodo } : todo
    )));
  }

  return (
    <div className="todo-app">
      <h1>To-Do List</h1>
      <TodoForm addTodo={addTodo} />
      <div className="todo-scroll-area">
      <TodoList onEdit={onEdit} onDelete={onDelete} onToggle={toggleComplete} todos={todos}/>
      </div>
    </div>
  );
}

export default App;
