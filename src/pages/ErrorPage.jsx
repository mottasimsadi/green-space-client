import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router";

const ErrorPage = () => {
  const location = useLocation();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const isDark = theme === "dark";

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    document.documentElement.setAttribute("data-theme", theme);
    console.error("404 Error: Page not found →", location.pathname);
  }, [location.pathname, theme]);

  return (
    <div
      className={`min-h-screen flex flex-col justify-center items-center px-4 py-8 transition-colors duration-300 ${
        isDark ? "bg-[#0c1b0c] text-[#f3f8f3]" : "bg-[#f3f8f3] text-[#122312]"
      }`}
    >
      <div className="max-w-xs w-full mb-10 animate-fade-in">
        <img
          src="https://i.postimg.cc/prp0FP1t/404-error-page.png"
          alt="404 Not Found - Nature-themed error illustration"
          className="w-full h-auto rounded-lg shadow-xl hover:scale-[1.02] transition-transform duration-300"
          width={600}
          height={400}
        />
      </div>

      <div className="text-center space-y-8 max-w-2xl">
        <div className="space-y-2">
          <h1
            className={`text-6xl md:text-7xl font-bold tracking-tight ${
              isDark ? "text-[#7db47d]" : "text-[#579857]"
            }`}
          >
            404
          </h1>
          <h2
            className={`text-3xl md:text-4xl font-semibold ${
              isDark ? "text-[#e0d0c7]" : "text-gray-800"
            }`}
          >
            Page Not Found
          </h2>
        </div>

        <p
          className={`text-lg leading-relaxed ${
            isDark ? "text-[#cccccc]" : "text-gray-600"
          }`}
        >
          The page at
          <code
            className={`px-2 py-1 rounded mx-1 ${
              isDark
                ? "bg-[#1a2733] text-[#7db47d]"
                : "bg-gray-100 text-[#366236]"
            }`}
          >
            {location.pathname}
          </code>
          doesn't exist or has been moved.
        </p>

        <div className="pt-4">
          <Link to="/" aria-label="Return to home page">
            <button
              className={`px-8 py-3 rounded-lg font-semibold text-lg ${
                isDark
                  ? "bg-[#579857] hover:bg-[#4a8a4a] shadow-lg"
                  : "bg-[#579857] hover:bg-[#427c42] shadow-md"
              } text-white transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5`}
            >
              ← Return to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
