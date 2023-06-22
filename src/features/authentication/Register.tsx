import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { AppDispatch, RootState } from "../../app/store"
import {
  registerAsync,
  RegisterCredentials,
  setStatus,
} from "./authenticationSlice"

const Register = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { status, error } = useSelector(
    (state: RootState) => state.authentication,
  )

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")

  useEffect(() => {
    console.log("Register: useEffect")
    console.log("Register: status", status)
    if (status === "succeeded") {
      dispatch(setStatus("idle"))
      navigate("/login")
    }
  }, [status, navigate, dispatch])

  const handleSignup = () => {
    if (password !== passwordConfirmation) {
      alert("Passwords don't match")
      return
    }
    const credentials: RegisterCredentials = {
      name,
      email,
      password,
      passwordConfirmation,
    }
    dispatch(registerAsync(credentials))
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-3">
      <h1 className="text-4xl font-bold font-serif">Signup</h1>
      {status === "loading" && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border border-gray-400 px-2 py-1 rounded-md text-slate-700"
      />
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
      <input
        type="password"
        placeholder="Password Confirmation"
        value={passwordConfirmation}
        onChange={(e) => setPasswordConfirmation(e.target.value)}
        className="border border-gray-400 px-2 py-1 rounded-md text-slate-700"
      />

      <button
        onClick={handleSignup}
        className="font-bold border border-slate-300 hover:border-orange-400 px-4 py-2 rounded-md"
      >
        Signup
      </button>
      <p className="text-slate-400">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500 hover:text-blue-600">
          Login
        </Link>
      </p>
    </div>
  )
}

export default Register
