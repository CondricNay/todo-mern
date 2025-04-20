import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Todo.css';

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
    <div className="todo-container">
      <h2 className="todo-heading">My TODO List</h2>

      <div className="todo-input-group">
        <input
          placeholder="Task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="auth-input"
        />
        <input
          placeholder="Status"
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
          className="auth-input"
        />
        <input
          type="date"
          value={newDeadline}
          onChange={(e) => setNewDeadline(e.target.value)}
          className="auth-input"
        />
        <button onClick={addTodo} className="auth-button">Add</button>
        <button
          onClick={handleLogout}
          className="auth-button"
          style={{ backgroundColor: '#dc3545' }}
        >
          Logout
        </button>
      </div>

      <ul className="todo-list">
        {todoList.map((todo) => (
          <li key={todo._id} className="todo-item">
            <div>
              <strong>{todo.task}</strong> - {todo.status} - {new Date(todo.deadline).toLocaleDateString()}
            </div>
            <button
              onClick={() => deleteTodo(todo._id)}
              className="todo-delete-button"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
