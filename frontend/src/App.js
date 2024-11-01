import React, { useState, useEffect } from 'react';
import { fetchTodos, createTodo, updateTodo, deleteTodo } from './api';

function App() {

  const [ todos, setTodos ] = useState([]);
  const [task, setTask] = useState('');

  useEffect(() => {
    fetchTodos().then((res) => setTodos(res.data));
  }, []);

  const addTodo = async () => {
    const { data } = await createTodo({ task });
    // ...todos get all the existing items and spreading it and the data is the newly added data. so it will show existing data and newly added data at the end
    setTodos([...todos, data]);
    setTask('')
  };

  const toggleComplete = async (id, completed) => {
    const {data} = await updateTodo(id, { completed });
    setTodos(todos.map(todo => todo._id === id ? data : todo));
  };

  const removeTodo = async (id) => {
    await deleteTodo(id);
    setTodos(todos.filter(todo => todo._id !== id));
  }

  return (
    <div>
      <h1>To-Do List</h1>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            <span
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
            >
              {todo.task}
            </span>
            <button onClick={() => removeTodo(todo._id)}>Delete</button>
            <button onClick={() => toggleComplete(todo._id, !todo.completed)}>Complete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
