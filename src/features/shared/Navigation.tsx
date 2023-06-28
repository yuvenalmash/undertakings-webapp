import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../app/store"
import { Link, useNavigate } from "react-router-dom"
import { logout } from "../authentication/authenticationSlice"
import { IoMenuOutline } from "react-icons/io5"

const Navigation = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state: RootState) => state.authentication)

  const handleLogout = () => {
    dispatch(logout())
    navigate("/")
  }

  const handleMobileMenu = () => {
    const menu = document.querySelector(".mobile-menu")
    menu?.classList.toggle("hidden")
  }

  const loggedInLinks = [
    { to: "/", text: "Home" },
    { to: "/newTask", text: "New Task" },
    { to: "#", text: "Logout", onClick: handleLogout },
  ]

  const loggedOutLinks = [
    { to: "/", text: "Home" },
    { to: "/login", text: "Login" },
    { to: "/register", text: "Signup" },
  ]

  return (
    <nav className="bg-gray-800 shadow-orange-400 shadow h-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/">
              <span className="text-white text-3xl font-bold font-serif border-b-2 border-orange-400">
                Undertakings
              </span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {user
                ? loggedInLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="text-gray-300 hover:border border-orange-400 hover:text-white px-3 py-2 rounded-md text-md font-medium"
                      onClick={link.onClick}
                    >
                      {link.text}
                    </Link>
                  ))
                : loggedOutLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="text-gray-300 hover:border border-orange-400 hover:text-white px-3 py-2 rounded-md text-md font-medium"
                    >
                      {link.text}
                    </Link>
                  ))}
            </div>
          </div>
        </div>

        <div className="-mr-2 flex items-center md:hidden">
          <button
            onClick={handleMobileMenu}
            className="rounded-md border border-orange-400 h-fit p-1 hover:scale-105 transform transition ease-in-out duration-300"
          >
            <IoMenuOutline className="text-3xl" />
          </button>
        </div>
      </div>

      <div className="mobile-menu hidden md:hidden bg-gray-800">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {user
            ? loggedInLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={link.onClick}
                  className="text-gray-300 hover:border border-orange-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  {link.text}
                </Link>
              ))
            : loggedOutLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-gray-300 hover:border border-orange-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  {link.text}
                </Link>
              ))}
        </div>
      </div>
    </nav>
  )
}

export default Navigation
