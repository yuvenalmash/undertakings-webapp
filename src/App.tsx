import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./features/authentication/Login"
import Register from "./features/authentication/Register"
import Home from "./features/shared/Home"
import Navigation from "./features/shared/Navigation"

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App
