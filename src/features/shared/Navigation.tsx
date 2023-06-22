import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../app/store"
import { Link, useNavigate } from "react-router-dom"
import { logout } from "../authentication/authenticationSlice"

const Navigation = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state: RootState) => state.authentication)

  const handleLogout = () => {
    dispatch(logout())
    navigate("/")
  }

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {user ? (
          <>
            <li>
              <Link to="/newTask">New Task</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Signup</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Navigation
