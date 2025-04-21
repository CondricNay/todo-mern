# 📝 Todo MERN App

A full-stack Todo List application built using the **MERN stack**. This app allows users to register, log in, and manage their personal todo lists efficiently.

---

## 📌 Framework

This project is built using the **MERN stack**, which includes:

- **MongoDB** – NoSQL database for storing users and todo tasks.
- **Express.js** – Backend web framework for handling API routes and logic.
- **React.js** – Frontend library for creating interactive UI components.
- **Node.js** – Runtime environment for running JavaScript server-side.

---

## 🗄️ Database

The application uses **MongoDB** along with **Mongoose** to define and manage schemas.

### 🧑‍💼 User Schema

```js
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});
```

- Stores user credentials.
- Email is unique for each user.
- Passwords are stored in plain text (no encryption, can be enhanced).

### 📝 Todo Schema

```js
const todoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  task: { type: String, required: true },
  status: { type: String, required: true },
  deadline: { type: Date },
});
```

- Each todo is linked to a specific user.
- Contains task details, status (e.g., pending/done), and deadline.

---

## 📂 GitHub Repository

🔗 [https://github.com/CondricNay/todo-mern](https://github.com/CondricNay/todo-mern)

---

## 🚀 Application Deployment

### 🧠 Backend Setup

1. Navigate to the server directory:

```bash
cd server
npm install
npm start
```

2. Ensure MongoDB is running locally or via a remote URI.

### 🎨 Frontend Setup

1. Navigate to the client directory:

```bash
cd client
npm install
npm start
```

2. The React app will launch at `http://localhost:3000`.

---

## 🧠 Code Explanation & Architecture

### 🔧 Project Structure

```
client/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   └── Todo.jsx
│   ├── styles/
│   │   ├── Login.css
│   │   └── Todo.css
│   ├── App.jsx
│   └── index.js
├── package.json

server/
├── models/
│   ├── User.js
│   └── Todo.js
├── server.js
├── package.json
```

### ⚙️ Design Decisions

- **Component-Based UI**: The frontend is split into logical components like `Login`, `Signup`, and `Todo` to separate responsibilities.
- **Modular Backend**: Routes and models are organized for scalability and easy debugging.
- **RESTful API**: Backend routes follow REST principles for clarity and consistency.
- **Mongoose Population**: Todos are linked to specific users using `ObjectId` references to support multi-user functionality.
