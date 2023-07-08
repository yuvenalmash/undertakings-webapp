import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { fetchUserTasks, createTask, updateTask, deleteTask } from "./taskAPI"

export interface TaskState {
  tasks: Task[]
  status: "idle" | "loading" | "failed" | "succeeded"
  error: string | null
}

const initialState: TaskState = {
  tasks: [],
  status: "idle",
  error: null,
}

export interface Task {
  id: number
  title: string
  description: string
  due_date: string
  completed: boolean
  user_id: number
}

export interface NewTask {
  title: string
  description: string
  due_date: string
  completed: boolean
}

export const fetchUserTasksAsync = createAsyncThunk(
  "task/fetchUserTask",
  async (userId: number, { getState }) => {
    const token = (getState() as RootState).authentication.token || ""
    const response = await fetchUserTasks(token, userId)
    return response
  },
)

export const createTaskAsync = createAsyncThunk(
  "task/createTask",
  async (newTask: NewTask, { getState }) => {
    const token = (getState() as RootState).authentication.token || ""
    const userId = (getState() as RootState).authentication.user?.id || 0
    const response = await createTask(token, userId, newTask)
    return response
  },
)

export const updateTaskAsync = createAsyncThunk(
  "task/updateTask",
  async (updatedTask: NewTask, { getState }) => {
    const token = (getState() as RootState).authentication.token || ""
    const userId = (getState() as RootState).authentication.user?.id || 0
    const taskId: number =
      (getState() as RootState).task.tasks.find(
        (task) => task.title === updatedTask.title,
      )?.id || 0
    const response = await updateTask(token, userId, taskId, updatedTask)
    return response
  },
)

export const deleteTaskAsync = createAsyncThunk(
  "task/deleteTask",
  async (taskId: number, { getState }) => {
    const token = (getState() as RootState).authentication.token || ""
    const userId = (getState() as RootState).authentication.user?.id || 0
    const response = await deleteTask(token, userId, taskId)
    return response
  },
)

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserTasksAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchUserTasksAsync.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.tasks = action.payload
      })
      .addCase(fetchUserTasksAsync.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message ?? null
      })

      .addCase(createTaskAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(createTaskAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.tasks.push(action.payload.task)
      })
      .addCase(createTaskAsync.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message ?? null
      })

      .addCase(updateTaskAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(updateTaskAsync.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.tasks = state.tasks.map((task) =>
          task.id === action.payload.task.id ? action.payload.task : task,
        )
      })
      .addCase(updateTaskAsync.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message ?? null
      })

      .addCase(deleteTaskAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(deleteTaskAsync.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.tasks = state.tasks.filter(
          (task) => task.id !== action.payload.task_id,
        )
      })
      .addCase(deleteTaskAsync.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message ?? null
      })
  },
})

export const { setStatus } = taskSlice.actions

export const selectTasks = (state: RootState) => state.task.tasks
export const selectTaskStatus = (state: RootState) => state.task.status
export const selectTaskError = (state: RootState) => state.task.error

export default taskSlice.reducer
