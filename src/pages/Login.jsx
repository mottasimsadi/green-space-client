import { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const { signIn, googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    signIn(email, password)
      .then(() => {
        toast.success("Logged in successfully!");
        setLoading(false);
        navigate(location.state || "/");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Login failed. Please check your credentials.");
        setLoading(false);
      });
  };

  const handleGoogleSignIn = () => {
    setLoading(true);

    googleSignIn()
      .then(() => {
        toast.success("Google sign-in successful!");
        setLoading(false);
        navigate(location.state || "/");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Google sign-in failed.");
        setLoading(false);
      });
  };

  const handleForgotPassword = () => {
    navigate("/forget-password", { state: { email } });
  };

  const isDark = theme === "dark";

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 py-24 ${
        isDark ? "bg-[#0c1b0c]" : "bg-[#f3f8f3]"
      }`}
    >
      <div
        className={`w-full max-w-md rounded-lg shadow-md p-8 ${
          isDark ? "bg-[#1a2733] text-[#f3f8f3]" : "bg-white text-[#333333]"
        }`}
      >
        <h2 className="text-3xl font-bold text-center mb-2 text-[#579857]">
          Welcome Back
        </h2>
        <p
          className={`text-sm text-center mb-6 ${
            isDark ? "text-[#cccccc]" : "text-[#666666]"
          }`}
        >
          Sign in to your gardening community account
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className={`block text-sm font-medium mb-1 ${
                isDark ? "text-[#f0f0f0]" : "text-gray-700"
              }`}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              className={`w-full px-3 py-2 rounded-md border text-sm shadow-sm focus:outline-none focus:ring-2 ${
                isDark
                  ? "bg-[#101c26] text-white border-[#3b4d5e]"
                  : "bg-white text-gray-800 border-gray-200"
              }`}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className={`block text-sm font-medium mb-1 ${
                isDark ? "text-[#f0f0f0]" : "text-gray-700"
              }`}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className={`w-full px-3 py-2 rounded-md border text-sm shadow-sm focus:outline-none focus:ring-2 ${
                isDark
                  ? "bg-[#101c26] text-white border-[#3b4d5e]"
                  : "bg-white text-gray-800 border-gray-200"
              }`}
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleForgotPassword}
              className={`text-sm cursor-pointer hover:underline ${
                isDark ? "text-[#7db47d]" : "text-[#579857]"
              }`}
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded font-semibold transition bg-[#579857] text-white ${
              loading
                ? "cursor-not-allowed bg-gray-300"
                : "cursor-pointer"
            }`}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 relative">
          <div className="absolute inset-0 flex items-center">
            <div
              className={`w-full border-t ${
                isDark ? "border-[#3b4d5e]" : "border-gray-300"
              }`}
            />
          </div>
          <div className="relative flex justify-center text-sm">
            <span
              className={`px-2 ${
                isDark
                  ? "bg-[#1a2733] text-[#aaaaaa]"
                  : "bg-white text-gray-500"
              }`}
            >
              OR
            </span>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className={`w-full flex justify-center items-center gap-2 py-2 px-4 rounded-md border text-sm font-medium cursor-pointer ${
              isDark
                ? "bg-[#101c26] text-[#f3f8f3] border-[#3b4d5e]"
                : "bg-white text-gray-800 border-gray-300"
            }`}
          >
            <FcGoogle className="h-5 w-5" />
            Sign in with Google
          </button>
        </div>

        <div
          className={`mt-6 text-center text-sm ${
            isDark ? "text-[#cccccc]" : "text-gray-500"
          }`}
        >
          Don't have an account?{" "}
          <Link
            to="/register"
            className={`font-medium hover:underline ${
              isDark ? "text-[#7db47d]" : "text-[#579857]"
            }`}
          >
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;