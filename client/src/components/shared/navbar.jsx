import { useState, useEffect } from "react";
import {
  PlusCircleIcon,
  UserIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../../features/app.slice";

export const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const disaptch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((store) => store.isLoggedIn);
  const user = useSelector((store) => store.user);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".menu-container")) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleMenuClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="py-4 px-8 border-b border-gray-200 bg-gradient-to-br from-indigo-900 to-purple-900 text-white">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center">
          <PlusCircleIcon className="h-8 w-8 mr-2" />
          Quizzle
          <div className="relative group">
            <button
              type="button"
              className="ml-4 text-white bg-pink-500 hover:bg-pink-600 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-md text-xs px-4 py-2 text-center"
            >
              Test Mode
            </button>
            <div
              id="tooltip-default"
              role="tooltip"
              className="absolute z-10 hidden text-sm font-medium text-gray-800 bg-gray-200 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 px-3 py-2 group-hover:block group-hover:opacity-100 top-full mt-1 whitespace-nowrap"
            >
              API's may be slow due to server wake-up time.
            </div>
          </div>
        </Link>
        <div className="flex gap-6">
          {isLoggedIn ? (
            <div className="relative menu-container">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center gap-2"
              >
                <img
                  src={user.avatar}
                  alt="avatar"
                  className="w-10 h-10 rounded-full border border-white"
                />
                <span className="hidden md:block font-medium">{user.name}</span>
              </button>
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-900 rounded-lg shadow-lg overflow-hidden z-50">
                  <Link
                    to="/profile"
                    className="flex items-center gap-3 px-4 py-2 hover:bg-gray-200"
                    onClick={handleMenuClick}
                  >
                    <UserIcon className="h-5 w-5" /> Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center gap-3 px-4 py-2 hover:bg-gray-200"
                    onClick={handleMenuClick}
                  >
                    <Cog6ToothIcon className="h-5 w-5" /> Settings
                  </Link>
                  <button
                    className="flex w-full text-left items-center gap-3 px-4 py-2 hover:bg-gray-200"
                    onClick={() => {
                      disaptch(userLogout());
                      handleMenuClick();
                      navigate("/");
                    }}
                  >
                    <ArrowLeftOnRectangleIcon className="h-5 w-5" /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex">
              <Link
                to="/login"
                className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700"
              >
                <UserIcon className="h-4 w-4 mr-2" />
                Join Quizzle!
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
