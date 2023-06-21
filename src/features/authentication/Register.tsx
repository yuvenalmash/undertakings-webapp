import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { AppDispatch, RootState } from "../../app/store"
import { registerAsync, RegisterCredentials } from "./authenticationSlice"

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
    if (status === "succeeded") {
      navigate("/login")
    }
  }, [status, navigate])

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
    <div>
      <h1>Signup</h1>
      {status === "loading" && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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
      <input
        type="password"
        placeholder="Password Confirmation"
        value={passwordConfirmation}
        onChange={(e) => setPasswordConfirmation(e.target.value)}
      />

      <button onClick={handleSignup}>Signup</button>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  )
}

export default Register
