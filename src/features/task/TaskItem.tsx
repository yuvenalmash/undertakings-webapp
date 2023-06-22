// Task component
import { useDispatch } from "react-redux"
import { deleteTaskAsync, updateTaskAsync, Task } from "./taskSlice"
import { AppDispatch } from "../../app/store"

const TaskItem = ({ task }: { task: Task }) => {
  const dispatch = useDispatch<AppDispatch>()
  const { id, title, completed } = task

  const handleCompletedChange = () => {
    const updatedTask = { ...task, completed: !completed }
    dispatch(updateTaskAsync(updatedTask))
  }

  const handleDelete = () => {
    dispatch(deleteTaskAsync(id))
  }

  return (
    <li className="task-item">
      <input
        type="checkbox"
        checked={completed}
        onChange={handleCompletedChange}
      />
      <span className={completed ? "completed" : ""}>{title}</span>
      <button onClick={handleDelete}>Delete</button>
    </li>
  )
}

export default TaskItem
