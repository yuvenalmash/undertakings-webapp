// New Task component
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { AppDispatch, RootState } from "../../app/store"
import { createTaskAsync } from "./taskSlice"

const NewTask = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { status, error } = useSelector((state: RootState) => state.task)

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [dueDate, setDueDate] = useState("")

  const handleCreateTask = () => {
    const newTask = {
      title,
      description,
      completed: false,
      due_date: dueDate,
      user_id: 0,
      id: 0,
    }

    dispatch(createTaskAsync(newTask))
  }

  useEffect(() => {
    console.log("NewTask: useEffect")
    console.log("NewTask: status", status)
    if (status === "idle") {
      console.log("Task created successfully")
      navigate("/")
    }
  }, [status, navigate])

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-3">
      <h1 className="text-4xl font-bold font-serif">New Task</h1>
      {status === "loading" && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border border-gray-400 px-2 py-1 rounded-md text-slate-700"
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border border-gray-400 px-2 py-1 rounded-md text-slate-700"
      />
      <input
        type="datetime-local"
        placeholder="Due date"
        value={dueDate ? dueDate.toString() : ""}
        onChange={(e) => setDueDate(e.target.value)}
        className="border border-gray-400 px-2 py-1 rounded-md text-slate-700"
      />
      <button
        onClick={handleCreateTask}
        className="border border-slate-300 hover:border-orange-400 px-4 py-2 rounded-md"
      >
        Add task
      </button>
    </div>
  )
}

export default NewTask
