import { useSelector } from "react-redux"
import { RootState } from "../../app/store"
import { Link } from "react-router-dom"
import TasksList from "../task/TasksList"

const Home = () => {
  const { user } = useSelector((state: RootState) => state.authentication)

  return (
    <div className="max-w-7xl mx-auto px-2">
      {user ? (
        <TasksList />
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-4xl font-bold font-serif text-center">
            Welcome to Undertakings
          </h1>
          <p className="text-2xl text-slate-400 font-serif">
            "track of your tasks"
          </p>
          <p className="text-xl font-serif mt-5">
            <Link to="/login" className="text-blue-500 hover:text-blue-600">
              Login
            </Link>{" "}
            or{" "}
            <Link to="/register" className=" text-blue-500 hover:text-blue-600">
              Register
            </Link>{" "}
            to get started
          </p>
        </div>
      )}
    </div>
  )
}

export default Home
