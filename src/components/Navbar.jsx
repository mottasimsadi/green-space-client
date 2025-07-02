import { useState, useContext, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { FaSun, FaMoon, FaBars, FaTimes } from "react-icons/fa";
import { Fade, Slide } from "react-awesome-reveal";
import { Tooltip } from "react-tooltip";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const isDark = theme === "dark";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleLogout = () => {
    logOut()
      .then(() => toast.success("Logged out successfully!"))
      .catch(() => toast.error("Logout failed. Please try again."));
  };

  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
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
          onClick={handleMenuItemClick}
          data-tooltip-id="nav-tooltip"
          data-tooltip-content="Go to Home"
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
          onClick={handleMenuItemClick}
          data-tooltip-id="nav-tooltip"
          data-tooltip-content="Explore gardeners"
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
          onClick={handleMenuItemClick}
          data-tooltip-id="nav-tooltip"
          data-tooltip-content="Browse gardening tips"
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
              onClick={handleMenuItemClick}
              data-tooltip-id="nav-tooltip"
              data-tooltip-content="Share a gardening tip"
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
              onClick={handleMenuItemClick}
              data-tooltip-id="nav-tooltip"
              data-tooltip-content="View your tips"
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
      className={`sticky top-0 z-50 shadow-md ${
        isDark ? "bg-[#122312]" : "bg-[#E6F2E8]"
      }`}
    >
      <div className="max-w-[95%] mx-auto">
        <div className="navbar min-h-16">
          <div className="navbar-start">
            <div className="dropdown lg:hidden relative" ref={dropdownRef}>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="btn btn-ghost"
                aria-label="Toggle menu"
                data-tooltip-id="nav-tooltip"
                data-tooltip-content={isMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMenuOpen ? (
                  <FaTimes className="w-5 h-5" />
                ) : (
                  <FaBars className="w-5 h-5" />
                )}
              </button>
              {isMenuOpen && (
                <Slide direction="down" triggerOnce={false}>
                  <ul
                    className={`menu dropdown-content mt-3 z-[1000] p-4 shadow rounded-box w-52 absolute left-0 ${
                      isDark
                        ? "bg-[#122312] text-[#E6F2E8]"
                        : "bg-[#f3f8f3] text-[#333]"
                    }`}
                  >
                    {navLinks}
                  </ul>
                </Slide>
              )}
            </div>
            <Fade>
              <Link
                to="/"
                className="text-xl ml-4"
                data-tooltip-id="nav-tooltip"
                data-tooltip-content="Go to homepage"
              >
                <span
                  className={`${isDark ? "text-[#7db47d]" : "text-[#579857]"}`}
                >
                  Green
                </span>{" "}
                <span
                  className={`${isDark ? "text-[#b69079]" : "text-[#a87b61]"}`}
                >
                  Space
                </span>
              </Link>
            </Fade>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul
              className={`${
                isDark ? "text-[#E6F2E8]" : "text-[#333]"
              } flex space-x-4`}
            >
              {navLinks}
            </ul>
          </div>
          <div className="navbar-end flex items-center gap-2">
            <Fade>
              <button
                onClick={toggleTheme}
                className="btn btn-circle btn-ghost"
                data-tooltip-id="nav-tooltip"
                data-tooltip-content={
                  isDark ? "Switch to light mode" : "Switch to dark mode"
                }
              >
                {isDark ? (
                  <FaSun className="h-5 w-5" />
                ) : (
                  <FaMoon className="h-5 w-5" />
                )}
              </button>
            </Fade>
            {user ? (
              <div className="dropdown dropdown-end">
                <label
                  tabIndex={0}
                  className="btn btn-ghost btn-circle avatar"
                  data-tooltip-id="nav-tooltip"
                  data-tooltip-content="User menu"
                >
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
                  className={`mt-3 z-[1000] p-2 shadow menu menu-sm dropdown-content rounded-box w-52 ${
                    isDark ? "bg-[#122312]" : "bg-[#E6F2E8]"
                  }`}
                >
                  <li className="menu-title">
                    <span>{user.displayName}</span>
                  </li>
                  <li>
                    <Link
                      to="/profile"
                      data-tooltip-id="nav-tooltip"
                      data-tooltip-content="View profile"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      data-tooltip-id="nav-tooltip"
                      data-tooltip-content="Log out"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Fade>
                <Link
                  to="/login"
                  className="btn bg-[#579857] text-white font-bold rounded-lg"
                  data-tooltip-id="nav-tooltip"
                  data-tooltip-content="Log in or sign up"
                >
                  Login/Signup
                </Link>
              </Fade>
            )}
            <Tooltip
              id="nav-tooltip"
              place="top"
              style={{ zIndex: 1001 }}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;