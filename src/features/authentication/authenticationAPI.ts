import { LoginCredentials, RegisterCredentials } from "./authenticationSlice"

const API_URL = "https://undertakings-5fbcc97dce19.herokuapp.com/api/v1"
// const API_URL = "http://localhost:3000/api/v1"

export const login = async (credentials: LoginCredentials) => {
  const response = await fetch(`${API_URL}/users/sign_in`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  })
  const data = await response.json()
  if (response.ok) {
    return data
  } else {
    throw new Error(data.errors)
  }
}

export const register = async (credentials: RegisterCredentials) => {
  const response = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  })
  const data = await response.json()
  if (response.ok) {
    return data
  } else {
    throw new Error(data.errors)
  }
}
