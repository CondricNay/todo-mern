import { Routes, Route } from "react-router-dom";
import Todo from "./components/Todo";
import Login from "./Login";
import Signup from "./Signup";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Todo />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;