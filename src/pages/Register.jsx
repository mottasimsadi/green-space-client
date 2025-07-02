import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ThemeContext } from "../contexts/ThemeContext";

const Register = () => {
  const { createUser, googleSignIn, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";
  
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validatePassword = (password) => {
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const isLong = password.length >= 8;

    if (!hasUpper || !hasLower || !isLong) {
      let msg = "Password must:";
      if (!hasUpper) msg += " include an uppercase letter,";
      if (!hasLower) msg += " include a lowercase letter,";
      if (!isLong) msg += " be at least 8 characters long,";
      toast.error(msg.slice(0, -1));
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validatePassword(formData.password)) return;

    setLoading(true);
    createUser(formData.email, formData.password)
      .then(() => {
        return updateUser({
          displayName: formData.name,
          photoURL: formData.photoURL,
        });
      })
      .then(() => {
        toast.success("Account created!");
        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Registration failed.");
        setLoading(false);
      });
  };

  const handleGoogleSignIn = () => {
    setLoading(true);
    googleSignIn()
      .then(() => {
        toast.success("Signed up with Google!");
        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Google sign-in failed.");
        setLoading(false);
      });
  };

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
          Join Our Community
        </h2>
        <p
          className={`text-sm text-center mb-6 ${
            isDark ? "text-[#cccccc]" : "text-[#666666]"
          }`}
        >
          Create an account to start your gardening journey
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className={`block text-sm font-medium mb-1 ${
                isDark ? "text-[#f0f0f0]" : "text-gray-700"
              }`}
            >
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className={`w-full px-3 py-2 rounded-md border text-sm shadow-sm focus:outline-none focus:ring-2 ${
                isDark
                  ? "bg-[#101c26] text-white border-[#3b4d5e]"
                  : "bg-white text-gray-800 border-gray-200"
              }`}
            />
          </div>

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
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
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
              htmlFor="photoURL"
              className={`block text-sm font-medium mb-1 ${
                isDark ? "text-[#f0f0f0]" : "text-gray-700"
              }`}
            >
              Photo URL (optional)
            </label>
            <input
              id="photoURL"
              name="photoURL"
              type="url"
              value={formData.photoURL}
              onChange={handleChange}
              placeholder="https://example.com/your-photo.jpg"
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
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full px-3 py-2 rounded-md border text-sm shadow-sm focus:outline-none focus:ring-2 ${
                  isDark
                    ? "bg-[#101c26] text-white border-[#3b4d5e]"
                    : "bg-white text-gray-800 border-gray-200"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute cursor-pointer right-2 top-1/2 transform -translate-y-1/2 text-sm text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <p
              className={`mt-1 text-xs ${
                isDark ? "text-[#aaaaaa]" : "text-gray-500"
              }`}
            >
              Must be at least 8 characters with 1 uppercase, 1 lowercase, and 1
              special character
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded font-semibold transition bg-[#579857] text-white ${
              loading
                ? "cursor-not-allowed opacity-70"
                : "cursor-pointer"
            }`}
          >
            {loading ? "Creating account..." : "Sign up"}
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
            Register with Google
          </button>
        </div>

        <div
          className={`mt-6 text-center text-sm ${
            isDark ? "text-[#cccccc]" : "text-gray-500"
          }`}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            className={`font-medium hover:underline ${
              isDark ? "text-[#7db47d]" : "text-[#579857]"
            }`}
          >
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;