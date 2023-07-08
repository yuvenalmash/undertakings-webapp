import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../../app/store"
import {
  fetchUserTasksAsync,
  selectTaskStatus,
  selectTasks,
  Task,
  deleteTaskAsync,
} from "./taskSlice"
import { selectUser } from "../authentication/authenticationSlice"
import TaskItem from "./TaskItem"
import TaskDetailsPopup from "./TaskDetailsPopup"

const TasksList = () => {
  const tasks = useSelector(selectTasks)
  const status = useSelector(selectTaskStatus)
  const dispatch = useDispatch<AppDispatch>()
  const userId = useSelector(selectUser)?.id || 0

  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  useEffect(() => {
    console.log("TasksList: useEffect")
    console.log("TasksList: status", status)
    if (status === "idle") {
      dispatch(fetchUserTasksAsync(userId))
    }
  }, [status, dispatch, userId])

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task)
  }

  const handleDelete = (taskId: number) => {
    dispatch(deleteTaskAsync(taskId))
  }

  const handleClosePopup = (closedTask: Task) => {
    if (selectedTask && closedTask.id === selectedTask.id) {
      setSelectedTask(null)
    }
  }

  return (
    <section className="mx-auto flex flex-col items-center mt-6  bg-gray-800 rounded-md p-4">
      <h2 className="text-4xl font-bold font-serif">Tasks</h2>
      {status === "loading" ? (
        <div className="text-2xl font-serif w-52 sm:w-72 md:w-96">
          Loading...
        </div>
      ) : (
        <ul className="mt-4 flex flex-col space-y-4 justify-center">
          {tasks && tasks.length > 0 ? (
            tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                handleTaskClick={handleTaskClick}
                handleDelete={handleDelete}
              />
            ))
          ) : (
            <div className="text-2xl font-serif w-52 sm:w-72 md:w-96">
              No tasks found
            </div>
          )}
        </ul>
      )}
      {selectedTask && (
        <TaskDetailsPopup task={selectedTask} onClose={handleClosePopup} />
      )}
    </section>
  )
}

export default TasksList
