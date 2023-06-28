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
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center space-y-3 px-6 py-4 rounded-md shadow shadow-orange-400">
        <h1 className="text-4xl font-bold font-serif">Login</h1>
        {status === "loading" && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-400 px-2 py-1 rounded-md text-slate-700"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-400 px-2 py-1 rounded-md text-slate-700"
        />
        <button
          onClick={handleLogin}
          className="border border-slate-300 hover:border-orange-400 px-4 py-2 rounded-md"
        >
          Login
        </button>
        <p className="text-slate-400">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:text-blue-600">
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
