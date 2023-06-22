import { useState } from "react"
import { useDispatch } from "react-redux"
import { deleteTaskAsync, updateTaskAsync, Task } from "./taskSlice"
import { AppDispatch } from "../../app/store"
import { IoTrashOutline, IoClose } from "react-icons/io5"

interface TaskDetailsPopupProps {
  task: Task
  onClose: (closedTask: Task) => void
}

const TaskDetailsPopup = ({ task, onClose }: TaskDetailsPopupProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const { id, title, description, due_date, completed } = task

  const [completedState, setCompleted] = useState(completed)

  const dateOnly = due_date.split("T")[0]
  const timeOnly = due_date.split("T")[1].split(".")[0]

  const handleCompletedChange = () => {
    const updatedTask = { ...task, completed: !completed }
    dispatch(updateTaskAsync(updatedTask))
    setCompleted(!completedState)
  }

  const handleDelete = () => {
    dispatch(deleteTaskAsync(id))
    onClose(task)
  }

  const closePopup = () => {
    onClose(task)
  }

  return (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center popup-outer ">
      <div className="popup backdrop-blur-md p-10 shadow-lg shadow-black max-w-lg min-w-sm">
        <button onClick={closePopup} className="absolute top-0 right-0">
          <IoClose className="text-3xl font-bold" />
        </button>
        <div className="popup-content bg-gray-900 text-slate-200 rounded-md p-4 space-y-3">
          <h2 className="text-4xl font-bold font-serif">{title}</h2>
          <p className="text-xl font-serif">{description}</p>
          <p className="text-xl font-serif">
            Due: {dateOnly} {timeOnly}hrs
          </p>
          <div className="flex items-center justify-between max-w-md mt-4">
            <div>
              <input
                type="checkbox"
                checked={completedState}
                onChange={handleCompletedChange}
                className="form-checkbox h-5 w-5 text-orange-500"
              />{" "}
              Completed
            </div>
            <button onClick={handleDelete}>
              <IoTrashOutline className="text-red-500 text-2xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskDetailsPopup
