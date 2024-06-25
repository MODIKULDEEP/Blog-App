import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../actions/userAction/userAction";
import watcherImage from "../assets/images/watcher.jpeg";

export default function NavHeader() {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.User);

  const logout = async () => {
    await dispatch(logoutUser());
    Navigate("/");
  };

  return (
    <nav className=" p-4 fixed w-full z-10 bg-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link className="flex items-center" to="/">
          <img
            src={watcherImage}
            alt="Blog App Logo"
            className="h-8 w-auto mr-2"
          />
          <span className="text-purple-600 text-lg font-semibold">
            Blog App
          </span>
        </Link>
        <div>
          {user ? (
            <>
              <button
                className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded me-3"
                onClick={(e) => Navigate("/dashboard")}
              >
                Dashboard
              </button>
              <button
                className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded"
                onClick={(e) => logout()}
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/"
              className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
