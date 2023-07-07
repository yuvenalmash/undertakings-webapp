// Task component
import { useDispatch } from "react-redux"
import { deleteTaskAsync, updateTaskAsync, Task } from "./taskSlice"
import { AppDispatch } from "../../app/store"
import { IoTrashOutline } from "react-icons/io5"

const TaskItem = ({
  task,
  handleTaskClick,
}: {
  task: Task
  handleTaskClick: (task: Task) => void
}) => {
  const dispatch = useDispatch<AppDispatch>()
  const { id, title, description, completed, due_date } = task

  const handleCompletedChange = () => {
    const updatedTask = {
      title,
      due_date,
      description,
      completed: !completed,
    }
    dispatch(updateTaskAsync(updatedTask))
  }

  const handleDelete = () => {
    dispatch(deleteTaskAsync(id))
  }

  const handleClick = () => {
    handleTaskClick(task)
  }

  return (
    <li className="flex justify-between space-x-4 text-xl backdrop-blur-md border border-orange-400 px-4 py-2 rounded-md">
      <div className="flex items-center space-x-3 max-w-full">
        <input
          type="checkbox"
          checked={completed}
          onChange={handleCompletedChange}
          className="form-checkbox h-5 w-5 text-orange-500"
        />
        <span
          className={`${
            completed ? "line-through opacity-50" : ""
          }overflow-ellipsis overflow-hidden w-52 sm:w-72 md:w-96`}
          onClick={handleClick}
        >
          {title}
        </span>
      </div>
      <button onClick={handleDelete}>
        <IoTrashOutline className="text-red-500 text-2xl" />
      </button>
    </li>
  )
}

export default TaskItem
