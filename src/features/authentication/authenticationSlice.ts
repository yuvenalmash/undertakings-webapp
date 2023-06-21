import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { login, register } from "./authenticationAPI"

export interface User {
  id: number
  name: string
  email: string
}

export interface AuthenticationState {
  user: User | null
  token: string | null
  status: "idle" | "loading" | "failed" | "succeeded"
  error: string | null
}

const initialState: AuthenticationState = {
  user: null,
  token: null,
  status: "idle",
  error: null,
}

export interface LoginCredentials {
  email: string
  password: string
}

export const loginAsync = createAsyncThunk(
  "authentication/login",
  async (credentials: LoginCredentials) => {
    const response = await login(credentials)
    return response
  },
)

export interface RegisterCredentials {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

export const registerAsync = createAsyncThunk(
  "authentication/register",
  async (credentials: RegisterCredentials) => {
    const response = await register(credentials)
    return response
  },
)

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null
      state.user = null
      state.status = "idle"
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.token = action.payload.token
        state.user = action.payload.user
        console.log(action.payload)
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message ?? null
      })

      .addCase(registerAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.status = "succeeded"
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message ?? null
      })
  },
})

export const { logout } = authenticationSlice.actions

export const selectToken = (state: RootState) => state.authentication.token
export const selectUser = (state: RootState) => state.authentication.user
export const selectStatus = (state: RootState) => state.authentication.status
export const selectError = (state: RootState) => state.authentication.error

export default authenticationSlice.reducer
