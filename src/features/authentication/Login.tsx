import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { AppDispatch, RootState } from "../../app/store"
import { loginAsync, LoginCredentials, setStatus } from "./authenticationSlice"

const Login = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { status, error } = useSelector(
    (state: RootState) => state.authentication,
  )

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    console.log("Login: useEffect")
    console.log("Login: status", status)
    if (status === "succeeded") {
      dispatch(setStatus("idle"))
      navigate("/")
    }
  }, [status, navigate, dispatch])

  const handleLogin = () => {
    const credentials: LoginCredentials = { email, password }

    dispatch(loginAsync(credentials))
  }

  return (
    <div>
      <h1>Login</h1>
      {status === "loading" && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  )
}

export default Login
