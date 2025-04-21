const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/User');
const TodoModel = require('./models/todoList');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/todoApp");

// Register
app.post("/register", (req, res) => {
  UserModel.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.json(err));
});

// Login
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email })
    .then(user => {
      if (user && user.password === password) {
        res.json({ status: "Success", userId: user._id, username: user.name });
      } else {
        res.json("Invalid credentials");
      }
    });
});

// Get Todos for a User
app.get("/getTodoList/:userId", (req, res) => {
  TodoModel.find({ userId: req.params.userId })
    .then(todos => res.json(todos))
    .catch(err => res.json(err));
});

// Add a Todo
app.post("/addTodoList", (req, res) => {
  TodoModel.create(req.body)
    .then(todo => res.json(todo))
    .catch(err => res.json(err));
});

// Update a Todo
app.post("/updateTodoList/:id", (req, res) => {
  TodoModel.findByIdAndUpdate(req.params.id, req.body)
    .then(todo => res.json(todo))
    .catch(err => res.json(err));
});

// Delete a Todo
app.delete("/deleteTodoList/:id", (req, res) => {
  TodoModel.findByIdAndDelete(req.params.id)
    .then(todo => res.json(todo))
    .catch(err => res.json(err));
});

app.listen(3001, () => console.log("Server running on 3001"));
