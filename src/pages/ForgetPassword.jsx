import { useState, useContext, useEffect } from "react";
import { useLocation, Link } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { ThemeContext } from "../contexts/ThemeContext";


const ForgetPassword = () => {
  const { resetPassword } = useContext(AuthContext);
  const location = useLocation();

  const [email, setEmail] = useState(location.state?.email || "");
  const [loading, setLoading] = useState(false);
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";
  

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    resetPassword(email)
      .then(() => {
        toast.success("Password reset email sent!");
        setLoading(false);
        window.location.href = "https://mail.google.com";
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to send reset email.");
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
          Reset your password
        </h2>
        <p
          className={`text-sm text-center mb-6 ${
            isDark ? "text-[#cccccc]" : "text-[#666666]"
          }`}
        >
          Enter your email address and we'll send a link to reset your password.
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
              placeholder="you@example.com"
              className={`w-full px-3 py-2 rounded-md border text-sm shadow-sm focus:outline-none focus:ring-2 ${
                isDark
                  ? "bg-[#101c26] text-white border-[#3b4d5e]"
                  : "bg-white text-gray-800 border-gray-200"
              }`}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded font-semibold transition bg-[#579857] text-white ${
              loading ? "cursor-not-allowed opacity-70" : "cursor-pointer"
            }`}
          >
            {loading ? "Sending..." : "Reset Password"}
          </button>
        </form>

        <div
          className={`mt-6 text-center text-sm ${
            isDark ? "text-[#cccccc]" : "text-gray-500"
          }`}
        >
          Remember your password?{" "}
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

export default ForgetPassword;