import { NewTask } from "./taskSlice"

const API_URL = "https://undertakings-5fbcc97dce19.herokuapp.com/api/v1"
// const API_URL = "http://localhost:3000/api/v1"

export const fetchUserTasks = async (token: string, userId: number) => {
  const response = await fetch(`${API_URL}/users/${userId}/tasks`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const data = await response.json()
  if (response.ok) {
    return data
  } else {
    throw new Error(data.errors)
  }
}

export const createTask = async (
  token: string,
  userId: number,
  task: NewTask,
) => {
  const response = await fetch(`${API_URL}/users/${userId}/tasks`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  })
  const data = await response.json()
  if (response.ok) {
    return data
  } else {
    throw new Error(data.errors)
  }
}

export const updateTask = async (
  token: string,
  userId: number,
  taskId: number,
  task: NewTask,
) => {
  const response = await fetch(`${API_URL}/users/${userId}/tasks/${taskId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  })
  const data = await response.json()
  if (response.ok) {
    return data
  } else {
    throw new Error(data.errors)
  }
}

export const deleteTask = async (
  token: string,
  userId: number,
  taskId: number,
) => {
  const response = await fetch(`${API_URL}/users/${userId}/tasks/${taskId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const data = await response.json()
  if (response.ok) {
    return data
  } else {
    throw new Error(data.errors)
  }
}
