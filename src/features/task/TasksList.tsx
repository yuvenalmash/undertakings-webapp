import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../../app/store"
import { fetchUserTasksAsync, selectTaskStatus, selectTasks } from "./taskSlice"
import { selectUser } from "../authentication/authenticationSlice"
import TaskItem from "./TaskItem"

const TasksList = () => {
  const tasks = useSelector(selectTasks)
  const status = useSelector(selectTaskStatus)
  const dispatch = useDispatch<AppDispatch>()
  const userId = useSelector(selectUser)?.id || 0

  useEffect(() => {
    console.log("TasksList: useEffect")
    console.log("TasksList: status", status)
    if (status === "idle") {
      dispatch(fetchUserTasksAsync(userId))
    }
  }, [status, dispatch, userId])

  return (
    <section className="tasks-list-container">
      <h2>Tasks</h2>
      {status === "loading" ? (
        <div className="loader">Loading...</div>
      ) : (
        <ul className="tasks-list">
          {tasks && tasks.length > 0 ? (
            tasks.map((task) => <TaskItem key={task.id} task={task} />)
          ) : (
            <div className="no-tasks">No tasks found</div>
          )}
        </ul>
      )}
    </section>
  )
}

export default TasksList
