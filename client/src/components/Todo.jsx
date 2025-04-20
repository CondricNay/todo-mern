import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Todo() {
  const [todoList, setTodoList] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [newStatus, setNewStatus] = useState('');
  const [newDeadline, setNewDeadline] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      navigate("/login");
      return;
    }

    axios.get(`http://localhost:3001/getTodoList/${userId}`)
      .then(res => setTodoList(res.data))
      .catch(err => console.log(err));
  }, []);

  const addTodo = () => {
    axios.post("http://localhost:3001/addTodoList", {
      userId: localStorage.getItem("userId"),
      task: newTask,
      status: newStatus,
      deadline: newDeadline
    }).then(() => window.location.reload());
  };

  const deleteTodo = (id) => {
    axios.delete(`http://localhost:3001/deleteTodoList/${id}`)
      .then(() => window.location.reload());
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <div>
      <h2>My TODO List</h2>
      <input placeholder="Task" onChange={(e) => setNewTask(e.target.value)} />
      <input placeholder="Status" onChange={(e) => setNewStatus(e.target.value)} />
      <input type="date" onChange={(e) => setNewDeadline(e.target.value)} />
      <button onClick={addTodo}>Add</button>
      <button onClick={handleLogout}>Logout</button>

      <ul>
        {todoList.map((todo) => (
          <li key={todo._id}>
            <strong>{todo.task}</strong> - {todo.status} - {new Date(todo.deadline).toLocaleDateString()}
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
