import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./features/authentication/Login"
import Register from "./features/authentication/Register"
import Home from "./features/shared/Home"
import Navigation from "./features/shared/Navigation"
import NewTask from "./features/task/NewTask"

function App() {
  return (
    <Router>
      <main className="min-h-screen flex flex-col">
        <Navigation />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/newTask" element={<NewTask />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
