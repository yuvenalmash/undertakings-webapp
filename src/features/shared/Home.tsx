import { useSelector } from "react-redux"
import { RootState } from "../../app/store"
import { Link } from "react-router-dom"
import TasksList from "../task/TasksList"

const Home = () => {
  const { user } = useSelector((state: RootState) => state.authentication)

  return (
    <div>
      {user ? (
        <TasksList />
      ) : (
        <div>
          <h1>Welcome to Task Manager</h1>
          <p>
            <Link to="/login">Login</Link> or{" "}
            <Link to="/register">Register</Link> to get started
          </p>
        </div>
      )}
    </div>
  )
}

export default Home
