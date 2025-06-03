import { useState, useEffect, useContext } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import { FaSun, FaMoon, FaBars, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import Loading from "../pages/Loading";

const Navbar = () => {
  const { user, logOut, loading } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
  };

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("Logged out successfully!");
      })
      .catch((error) => {
        console.error("Logout error:", error);
        toast.error("Logout failed. Please try again.");
      });
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-[#7db47d] font-semibold underline"
              : "hover:text-[#7db47d] transition"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/explore-gardeners"
          className={({ isActive }) =>
            isActive
              ? "text-[#7db47d] font-semibold underline"
              : "hover:text-[#7db47d] transition"
          }
        >
          Explore Gardeners
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/browse-tips"
          className={({ isActive }) =>
            isActive
              ? "text-[#7db47d] font-semibold underline"
              : "hover:text-[#7db47d] transition"
          }
        >
          Browse Tips
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink
              to="/share-tips"
              className={({ isActive }) =>
                isActive
                  ? "text-[#7db47d] font-semibold underline"
                  : "hover:text-[#7db47d] transition"
              }
            >
              Share a Garden Tip
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-tips"
              className={({ isActive }) =>
                isActive
                  ? "text-[#7db47d] font-semibold underline"
                  : "hover:text-[#7db47d] transition"
              }
            >
              My Tips
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <nav
      className="shadow-md"
      style={{ backgroundColor: theme === "dark" ? "#122312" : "#E6F2E8" }}
    >
      <div className="max-w-11/12 mx-auto">
        <div className="navbar min-h-16">
          {/* Start: Mobile menu + logo */}
          <div className="navbar-start">
            {/* Mobile dropdown */}
            <div className="dropdown lg:hidden">
              <label
                tabIndex={0}
                className="btn btn-ghost"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <FaTimes className="w-5 h-5" />
                ) : (
                  <FaBars className="w-5 h-5" />
                )}
              </label>
              {isMenuOpen && (
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-50 p-2 shadow rounded-box w-52"
                  style={{
                    backgroundColor: theme === "dark" ? "#122312" : "#f3f8f3",
                  }}
                >
                  {navLinks}
                </ul>
              )}
            </div>

            {/* Logo */}
            <Link
              to="/"
              className="btn btn-ghost normal-case text-xl"
              style={{ color: theme === "dark" ? "#b69079" : "#6B4E31" }}
            >
              <span
                className={`${
                  theme === "dark" ? "text-[#7db47d]" : "text-[#579857]"
                }`}
              >
                Green
              </span>
              <span
                className={`${
                  theme === "dark" ? "text-[#b69079]" : "text-[#a87b61]"
                }`}
              >
                Space
              </span>
            </Link>
          </div>

          {/* Center: Desktop menu */}
          <div className="navbar-center hidden lg:flex">
            <ul
              className="flex space-x-4"
              style={{ color: theme === "dark" ? "#E6F2E8" : "#333" }}
            >
              {navLinks}
            </ul>
          </div>

          {/* End: Theme + Auth */}
          <div className="navbar-end flex items-center gap-2">
            <button onClick={toggleTheme} className="btn btn-circle btn-ghost">
              {theme === "light" ? (
                <FaMoon className="h-5 w-5" />
              ) : (
                <FaSun className="h-5 w-5" />
              )}
            </button>

            {loading ? (
              <Loading />
            ) : user ? (
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img
                      src={
                        user.photoURL ||
                        "https://img.icons8.com/?size=100&id=uOoIUTYvxnso&format=png&color=000000"
                      }
                      alt={user.displayName || "User"}
                    />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="mt-3 z-[999] p-2 shadow menu menu-sm dropdown-content rounded-box w-52"
                  style={{
                    backgroundColor: theme === "dark" ? "#122312" : "#E6F2E8",
                  }}
                >
                  <li className="menu-title">
                    <span>{user.displayName}</span>
                  </li>
                  <li>
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li>
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link
                to="/login"
                className="btn bg-[#579857] text-white font-bold rounded-lg"
              >
                Login/Signup
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;