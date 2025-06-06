import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import gardenersData from "../data/gardeners.json";
import Loading from "./Loading";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [activeGardeners, setActiveGardeners] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    description: "",
  });

  const isDark = theme === "dark";

  useEffect(() => {
    const active = gardenersData.filter((g) => g.status === "active");
    setActiveGardeners(active);
    setLoading(false);

    document.documentElement.classList.toggle("dark", isDark);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const bannerSlides = [
    {
      title: "Grow Together",
      subtitle: "Join our thriving gardening community",
      image: "https://i.postimg.cc/6qCRbcYq/banner-1.jpg",
      buttonText: "Get Started",
      buttonLink: "/register",
    },
    {
      title: "Urban Gardening Made Simple",
      subtitle: "Discover how to create green spaces anywhere",
      image: "https://i.postimg.cc/PxgYM9b0/banner-2.jpg",
      buttonText: "Learn More",
      buttonLink: "/browse-tips",
    },
    {
      title: "Your Green Journey Starts Here",
      subtitle: "Find tips, resources, and fellow plant enthusiasts",
      image: "https://i.postimg.cc/XJG9d45w/banner-3.jpg",
      buttonText: "Explore Now",
      buttonLink: "/explore-gardeners",
    },
  ];

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? bannerSlides.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === bannerSlides.length - 1 ? 0 : prev + 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  const openModal = (title, description) => {
    setModalContent({ title, description });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className={`min-h-screen ${isDark ? "bg-[#0c1b0c]" : "bg-[#f3f8f3]"}`}>
      {/* Banner */}
      <section className="relative h-[500px] overflow-hidden">
        <div
          className="absolute inset-0 flex transition-transform duration-500 transform-gpu"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {bannerSlides.map((slide, i) => (
            <div key={i} className="min-w-full h-full relative flex">
              <img
                src={slide.image}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-black/50 z-10"></div>
              <div className="relative z-20 w-full flex flex-col justify-center items-center text-center px-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl mb-8 max-w-xl text-white/90">
                  {slide.subtitle}
                </p>
                <Link
                  to={slide.buttonLink}
                  className="px-6 py-3 rounded-lg font-semibold bg-[#579857] hover:bg-[#427c42] text-white transition shadow-lg"
                >
                  {slide.buttonText}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/30 hover:bg-white/50 text-white flex items-center justify-center"
        >
          <FaChevronLeft size={18} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/30 hover:bg-white/50 text-white flex items-center justify-center"
        >
          <FaChevronRight size={18} />
        </button>
      </section>

      {/* Gardeners Section */}
      <section className="py-16 px-4 container mx-auto">
        <h2
          className={`text-3xl font-bold text-center mb-12 ${
            isDark ? "text-[#f3f8f3]" : "text-[#122312]"
          }`}
        >
          Active Gardeners in Our Community
        </h2>
        {loading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-6 lg:px-8">
            {activeGardeners.map((g) => (
              <div
                key={g.id}
                className={`p-6 rounded-lg shadow-md hover:scale-[1.02] transition-transform ${
                  isDark ? "bg-[#1a2733]" : "bg-white"
                }`}
              >
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <img
                      src={g.imageUrl}
                      alt={g.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold">{g.name}</h3>
                    <p
                      className={`${
                        isDark ? "text-[#7db47d]" : "text-[#579857]"
                      }`}
                    >
                      {g.specialty}
                    </p>
                  </div>
                </div>
                <p
                  className={`mb-4 ${
                    isDark ? "text-[#cccccc]" : "text-gray-600"
                  }`}
                >
                  {g.bio}
                </p>
                <div className="text-right">
                  <span className="px-2 py-1 rounded-full text-xs badge badge-success text-white">
                    Active
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Community Spotlight */}
      <section
        className={`py-16 px-4 ${isDark ? "bg-[#301f1a]" : "bg-[#f3f0eb]"}`}
      >
        <div className="max-w-6xl mx-auto">
          <h2
            className={`text-3xl font-bold text-center mb-12 ${
              isDark ? "text-[#f9f6f4]" : "text-[#573d34]"
            } transition-colors duration-300`}
          >
            Community Garden Spotlights
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Urban Oasis Card */}
            <div
              className={`group rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl ${
                isDark
                  ? "bg-[#573d34] hover:bg-[#4a342f]"
                  : "bg-white hover:bg-gray-50"
              }`}
            >
              <div className="flex flex-col md:flex-row h-full">
                <div className="md:w-1/2 h-64 md:h-auto overflow-hidden">
                  <img
                    src="https://i.postimg.cc/DzrQH9LK/spotlight-1.png"
                    alt="Urban community garden with raised beds"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div
                  className={`md:w-1/2 p-6 flex flex-col justify-center ${
                    isDark ? "text-[#f0e9e4]" : "text-gray-800"
                  }`}
                >
                  <h3
                    className={`text-xl font-semibold mb-3 transition-colors duration-300 ${
                      isDark
                        ? "text-[#f9f6f4] group-hover:text-[#e8d5b5]"
                        : "text-[#274227] group-hover:text-[#3a5e3a]"
                    }`}
                  >
                    Urban Oasis Community Garden
                  </h3>
                  <p className="mb-4 transition-colors duration-300 group-hover:text-opacity-90">
                    Transformed a vacant lot into a thriving community space
                    with 32 garden plots, a children's garden, and communal herb
                    spiral.
                  </p>
                  <button
                    onClick={() =>
                      openModal(
                        "Urban Oasis Community Garden",
                        "This community garden transformed a vacant city lot into a lush green space with 32 individual plots, a children's educational garden, and a beautiful communal herb spiral. It serves over 50 families in the neighborhood."
                      )
                    }
                    className="mt-auto inline-block bg-[#579857] hover:bg-[#427c42] text-white font-semibold px-4 py-2 rounded transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-md"
                  >
                    Explore Community Gardens
                  </button>
                </div>
              </div>
            </div>

            {/* Green Sprouts Card */}
            <div
              className={`group rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl ${
                isDark
                  ? "bg-[#573d34] hover:bg-[#4a342f]"
                  : "bg-white hover:bg-gray-50"
              }`}
            >
              <div className="flex flex-col md:flex-row h-full">
                <div className="md:w-1/2 h-64 md:h-auto overflow-hidden">
                  <img
                    src="https://i.postimg.cc/mrfNdLcw/spotlight-2.png"
                    alt="Children learning in school garden"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div
                  className={`md:w-1/2 p-6 flex flex-col justify-center ${
                    isDark ? "text-[#f0e9e4]" : "text-gray-800"
                  }`}
                >
                  <h3
                    className={`text-xl font-semibold mb-3 transition-colors duration-300 ${
                      isDark
                        ? "text-[#f9f6f4] group-hover:text-[#e8d5b5]"
                        : "text-[#274227] group-hover:text-[#3a5e3a]"
                    }`}
                  >
                    Green Sprouts School Program
                  </h3>
                  <p className="mb-4 transition-colors duration-300 group-hover:text-opacity-90">
                    Supporting education through gardening in 15 local schools,
                    teaching students about sustainability, nutrition, and
                    science.
                  </p>
                  <button
                    onClick={() =>
                      openModal(
                        "Green Sprouts School Program",
                        "Our school gardening program brings hands-on learning to students in 15 local schools. Children learn about plant biology, sustainable practices, and nutrition while tending to their own garden plots."
                      )
                    }
                    className="mt-auto inline-block bg-[#579857] hover:bg-[#427c42] text-white font-semibold px-4 py-2 rounded transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-md"
                  >
                    Learn About School Gardens
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div
            className={`relative max-w-md w-full rounded-lg shadow-xl p-6 ${
              isDark ? "bg-[#1a2733]" : "bg-white"
            }`}
          >
            <button
              onClick={closeModal}
              className={`absolute top-4 right-4 p-1 rounded-full ${
                isDark ? "hover:bg-[#2d3b4a]" : "hover:bg-gray-200"
              }`}
              aria-label="Close modal"
            >
              <FaTimes
                className={isDark ? "text-[#cccccc]" : "text-gray-500"}
              />
            </button>
            <h3
              className={`text-2xl font-bold mb-4 ${
                isDark ? "text-[#f3f8f3]" : "text-gray-800"
              }`}
            >
              {modalContent.title}
            </h3>
            <p
              className={`mb-6 ${isDark ? "text-[#cccccc]" : "text-gray-600"}`}
            >
              {modalContent.description}
            </p>
            <div
              className={`p-4 rounded-lg mb-6 ${
                isDark ? "bg-[#805040] bg-opacity-30" : "bg-yellow-100"
              }`}
            >
              <p
                className={`text-center ${
                  isDark ? "text-[#f9d5bb]" : "text-yellow-800"
                }`}
              >
                This feature is coming soon! Stay tuned for updates.
              </p>
            </div>
            <button
              onClick={closeModal}
              className={`w-full py-2 px-4 rounded-lg font-semibold ${
                isDark
                  ? "bg-[#579857] hover:bg-[#427c42]"
                  : "bg-[#579857] hover:bg-[#427c42]"
              } text-white transition-colors`}
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
