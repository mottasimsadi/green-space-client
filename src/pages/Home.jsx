import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { FaChevronLeft, FaChevronRight, FaHeart } from "react-icons/fa";
import gardenersData from "../data/gardeners.json"
import Loading from "./Loading";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [activeGardeners, setActiveGardeners] = useState([]);

  useEffect(() => {
    // Filter active gardeners on component mount
    const active = gardenersData.filter(
      (gardener) => gardener.status === "active"
    );
    setActiveGardeners(active);
    setLoading(false);

    // Theme setup
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Mock data
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

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

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
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  const isDark = theme === "dark";

  return (
    <div className={`min-h-screen ${isDark ? "bg-[#0c1b0c]" : "bg-[#f3f8f3]"}`}>
      {/* Hero Banner */}
      <section className="relative h-[500px] overflow-hidden">
        {/* Slider container */}
        <div
          className="absolute inset-0 flex transition-transform duration-500 transform-gpu"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {bannerSlides.map((slide, index) => (
            <div key={index} className="min-w-full h-full relative flex">
              {/* Image with opacity control */}
              <div className="absolute inset-0">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover opacity-80" // Added opacity here
                />
              </div>
              {/* Dark overlay (now combined with additional opacity) */}
              <div className="absolute inset-0 bg-black/50 z-10"></div>{" "}
              {/* Increased darkness for better contrast */}
              {/* Content */}
              <div className="relative z-20 w-full flex flex-col justify-center items-center text-center px-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl mb-8 max-w-xl text-white/90 drop-shadow-md">
                  {slide.subtitle}
                </p>
                <Link
                  to={slide.buttonLink}
                  className="px-6 py-3 rounded-lg font-semibold bg-[#579857] hover:bg-[#427c42] text-white transition-colors shadow-lg"
                >
                  {slide.buttonText}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Slider controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 w-10 h-10 rounded-full flex items-center justify-center bg-white/30 hover:bg-white/50 text-white"
          aria-label="Previous slide"
        >
          <FaChevronLeft size={18} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 w-10 h-10 rounded-full flex items-center justify-center bg-white/30 hover:bg-white/50 text-white"
          aria-label="Next slide"
        >
          <FaChevronRight size={18} />
        </button>

        {/* Slide indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
          {bannerSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentSlide ? "bg-white" : "bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </section>

      {/* Featured Gardeners Section */}
      <section className="py-16 px-4 container mx-auto">
        <h2
          className={`text-3xl font-bold text-center mb-12 ${
            isDark ? "text-[#f3f8f3]" : "text-[#122312]"
          }`}
        >
          Active Gardeners in Our Community
        </h2>

        {loading ? <Loading></Loading> : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeGardeners.map((gardener) => (
              <div
                key={gardener.id}
                className={`p-6 rounded-lg ${
                  isDark ? "bg-[#1a2733]" : "bg-white"
                } shadow-md transition-transform hover:scale-[1.02]`}
              >
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <img
                      src={gardener.imageUrl}
                      alt={gardener.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold">{gardener.name}</h3>
                    <p
                      className={`${
                        isDark ? "text-[#7db47d]" : "text-[#579857]"
                      }`}
                    >
                      {gardener.specialty}
                    </p>
                  </div>
                </div>
                <p
                  className={`mb-4 ${
                    isDark ? "text-[#cccccc]" : "text-gray-600"
                  }`}
                >
                  {gardener.bio}
                </p>
                <div className="flex justify-end">
                  <span className="px-2 py-1 rounded text-xs badge badge-success text-white">
                    Active
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
