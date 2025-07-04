import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import { Fade } from "react-awesome-reveal";
import { Tooltip } from "react-tooltip";
import gardenersData from "../data/gardeners.json";
import Loading from "./Loading";
import { ThemeContext } from "../contexts/ThemeContext";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [trendingTips, setTrendingTips] = useState([]);
  const [activeGardeners, setActiveGardeners] = useState([]);
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    const active = gardenersData.filter((g) => g.status === "active");
    setActiveGardeners(active);
    setLoading(false);
  }, []);

  useEffect(() => {
    const fetchTrendingTips = async () => {
      try {
        const res = await fetch(
          "https://green-space-server.vercel.app/tips/trending"
        );
        if (!res.ok) throw new Error("Failed to fetch trending tips");
        const data = await res.json();
        setTrendingTips(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchTrendingTips();
  }, []);

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
                  data-tooltip-id="banner-tooltip"
                  data-tooltip-content={`Go to ${slide.buttonText}`}
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
          data-tooltip-id="banner-tooltip"
          data-tooltip-content="Previous slide"
        >
          <FaChevronLeft size={18} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/30 hover:bg-white/50 text-white flex items-center justify-center"
          data-tooltip-id="banner-tooltip"
          data-tooltip-content="Next slide"
        >
          <FaChevronRight size={18} />
        </button>
        <Tooltip id="banner-tooltip" />
      </section>

      {/* Gardeners Section */}
      <section className="py-16 px-4 container mx-auto">
        <Fade>
          <h2
            className={`text-3xl font-bold text-center mb-12 ${
              isDark ? "text-[#f3f8f3]" : "text-[#122312]"
            }`}
          >
            Active Gardeners in Our Community
          </h2>
        </Fade>
        {loading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-6 lg:px-8">
            {activeGardeners.map((g) => (
              <Fade key={g.id} triggerOnce>
                <div
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
                    <span
                      className="px-2 py-1 rounded-full text-xs badge badge-success text-white"
                      data-tooltip-id="gardener-tooltip"
                      data-tooltip-content="This gardener is active"
                    >
                      Active
                    </span>
                  </div>
                </div>
              </Fade>
            ))}
            <Tooltip id="gardener-tooltip" />
          </div>
        )}
      </section>

      {/* Top Trending Tips Section */}
      <section
        className={`py-16 px-4 ${isDark ? "bg-[#274227]" : "bg-[#e7f1e7]"}`}
      >
        <div className="mx-auto max-w-[1400px] px-8">
          <Fade>
            <h2
              className={`text-3xl font-bold text-center mb-12 ${
                isDark ? "text-[#f3f8f3]" : "text-[#366236]"
              }`}
            >
              Top Trending Garden Tips
            </h2>
          </Fade>
          {loading ? (
            <div className="flex justify-center">
              <Loading />
            </div>
          ) : trendingTips.length === 0 ? (
            <p
              className={`text-center text-lg ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              No trending tips to display.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {trendingTips.map((tip) => (
                <Fade key={tip._id} triggerOnce>
                  <div
                    className={`overflow-hidden rounded-lg shadow-md ${
                      isDark
                        ? "bg-[#1a2733] text-[#f3f8f3]"
                        : "bg-white text-[#274227]"
                    }`}
                  >
                    <figure className="relative h-48">
                      <img
                        src={
                          tip.imageUrl ||
                          "https://i.postimg.cc/j5L3yDkS/plant-placeholder.png"
                        }
                        alt={tip.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <span
                          className={`badge ${
                            tip.difficulty === "Easy"
                              ? "badge-success"
                              : tip.difficulty === "Medium"
                              ? "badge-warning"
                              : "badge-error"
                          }`}
                          data-tooltip-id="tip-tooltip"
                          data-tooltip-content={`Difficulty: ${tip.difficulty}`}
                        >
                          {tip.difficulty}
                        </span>
                      </div>
                    </figure>
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-2">
                        <span
                          className={`text-sm ${
                            isDark ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          {tip.category}
                        </span>
                        <div className="flex items-center text-[#d53f3f]">
                          <svg
                            className="h-5 w-5 mr-1"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                              2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 
                              4.5 2.09C13.09 3.81 14.76 3 16.5 
                              3 19.58 3 22 5.42 22 8.5c0 
                              3.78-3.4 6.86-8.55 11.54L12 
                              21.35z"
                            />
                          </svg>
                          <span>{tip.totalLiked || 0}</span>
                        </div>
                      </div>
                      <h3
                        className={`text-xl font-semibold mb-2 ${
                          isDark ? "text-[#f3f8f3]" : "text-[#366236]"
                        }`}
                      >
                        {tip.title}
                      </h3>
                      <p
                        className={`text-sm mb-4 ${
                          isDark ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        Plant type: {tip.plantType}
                      </p>
                      <div className="flex justify-between items-center">
                        <span
                          className={`text-sm ${
                            isDark ? "text-[#b69079]" : "text-[#805646]"
                          }`}
                        >
                          By {tip.authorName}
                        </span>
                        <Link
                          to={`/tip-details/${tip._id}`}
                          className={`inline-block px-3 py-1.5 rounded-md font-semibold text-white text-sm transition-colors ${
                            isDark
                              ? "bg-[#427c42] hover:bg-[#579857]"
                              : "bg-[#579857] hover:bg-[#427c42]"
                          }`}
                          data-tooltip-id="tip-tooltip"
                          data-tooltip-content="View tip details"
                        >
                          Read More
                        </Link>
                      </div>
                    </div>
                  </div>
                </Fade>
              ))}
              <Tooltip id="tip-tooltip" />
            </div>
          )}
        </div>
      </section>

      {/* Extra Section 1 */}
      {/* Seasonal Calendar */}
      <section className="py-16 px-4 container mx-auto">
        <Fade>
          <h2
            className={`text-3xl font-bold text-center mb-12 ${
              isDark ? "text-[#f3f8f3]" : "text-[#122312]"
            }`}
          >
            Seasonal Gardening Calendar
          </h2>
        </Fade>
        <div
          className={`p-8 mx-8 rounded-lg shadow-md ${
            isDark ? "bg-[#1a2733]" : "bg-white"
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {["Spring", "Summer", "Fall", "Winter"].map((season, index) => (
              <Fade key={index} triggerOnce delay={index * 100}>
                <div
                  className={`text-center p-4 rounded-lg ${
                    isDark
                      ? {
                          Spring: "bg-[#274227]",
                          Summer: "bg-[#573d34]",
                          Fall: "bg-[#805646]",
                          Winter: "bg-[#1a3a4a]",
                        }[season]
                      : {
                          Spring: "bg-[#e7f1e7]",
                          Summer: "bg-[#f0e9e4]",
                          Fall: "bg-[#f9f6f4]",
                          Winter: "bg-[#e0f0f7]",
                        }[season]
                  }`}
                >
                  <h3
                    className={`text-xl font-semibold mb-3 ${
                      isDark
                        ? {
                            Spring: "text-[#7db47d]",
                            Summer: "text-[#cbb1a1]",
                            Fall: "text-[#e0d0c7]",
                            Winter: "text-[#8fc1e3]",
                          }[season]
                        : {
                            Spring: "text-[#366236]",
                            Summer: "text-[#a87b61]",
                            Fall: "text-[#9b6b52]",
                            Winter: "text-[#31708f]",
                          }[season]
                    }`}
                  >
                    {season}
                  </h3>
                  <ul
                    className={`space-y-2 text-left ${
                      isDark
                        ? {
                            Spring: "text-[#d0e3d0]",
                            Summer: "text-[#e0d0c7]",
                            Fall: "text-[#f0e9e4]",
                            Winter: "text-[#d0e3f0]",
                          }[season]
                        : {
                            Spring: "text-[#2e4f2e]",
                            Summer: "text-[#6a483c]",
                            Fall: "text-[#805646]",
                            Winter: "text-[#1a3a4a]",
                          }[season]
                    }`}
                  >
                    {season === "Spring" && (
                      <>
                        <li>• Start seeds indoors</li>
                        <li>• Prepare garden beds</li>
                        <li>• Plant cold-hardy vegetables</li>
                        <li>• Divide perennials</li>
                        <li>• Prune flowering shrubs</li>
                      </>
                    )}
                    {season === "Summer" && (
                      <>
                        <li>• Regular watering schedule</li>
                        <li>• Harvest vegetables</li>
                        <li>• Deadhead flowers</li>
                        <li>• Monitor for pests</li>
                        <li>• Mulch to retain moisture</li>
                      </>
                    )}
                    {season === "Fall" && (
                      <>
                        <li>• Plant spring bulbs</li>
                        <li>• Harvest final crops</li>
                        <li>• Clean up garden beds</li>
                        <li>• Compost fallen leaves</li>
                        <li>• Plant trees and shrubs</li>
                      </>
                    )}
                    {season === "Winter" && (
                      <>
                        <li>• Plan next year's garden</li>
                        <li>• Order seeds</li>
                        <li>• Maintain tools</li>
                        <li>• Protect sensitive plants</li>
                        <li>• Start indoor herb garden</li>
                      </>
                    )}
                  </ul>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* Extra Section 2 */}
      {/* Community Spotlight */}
      <section
        className={`py-16 px-4 ${isDark ? "bg-[#301f1a]" : "bg-[#f3f0eb]"}`}
      >
        <div className="max-w-6xl mx-auto">
          <Fade>
            <h2
              className={`text-3xl font-bold text-center mb-12 ${
                isDark ? "text-[#f9f6f4]" : "text-[#573d34]"
              } transition-colors duration-300`}
            >
              Community Garden Spotlights
            </h2>
          </Fade>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Urban Oasis Community Garden",
                description:
                  "Transformed a vacant lot into a thriving community space with 32 garden plots, a children's garden, and communal herb spiral.",
                image: "https://i.postimg.cc/DzrQH9LK/spotlight-1.png",
                buttonText: "Explore Community Gardens",
                modalDescription:
                  "This community garden transformed a vacant city lot into a lush green space with 32 individual plots, a children's educational garden, and a beautiful communal herb spiral. It serves over 50 families in the neighborhood.",
              },
              {
                title: "Green Sprouts School Program",
                description:
                  "Supporting education through gardening in 15 local schools, teaching students about sustainability, nutrition, and science.",
                image: "https://i.postimg.cc/mrfNdLcw/spotlight-2.png",
                buttonText: "Learn About School Gardens",
                modalDescription:
                  "Our school gardening program brings hands-on learning to students in 15 local schools. Children learn about plant biology, sustainable practices, and nutrition while tending to their own garden plots.",
              },
            ].map((spotlight, index) => (
              <Fade key={index} triggerOnce delay={index * 100}>
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
                        src={spotlight.image}
                        alt={spotlight.title}
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
                        {spotlight.title}
                      </h3>
                      <p className="mb-4 transition-colors duration-300 group-hover:text-opacity-90">
                        {spotlight.description}
                      </p>
                      <button
                        onClick={() =>
                          openModal(spotlight.title, spotlight.modalDescription)
                        }
                        className="mt-auto inline-block bg-[#579857] hover:bg-[#427c42] text-white font-semibold px-4 py-2 rounded transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-md"
                        data-tooltip-id="spotlight-tooltip"
                        data-tooltip-content={spotlight.buttonText}
                      >
                        {spotlight.buttonText}
                      </button>
                    </div>
                  </div>
                </div>
              </Fade>
            ))}
            <Tooltip id="spotlight-tooltip" />
          </div>
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <Fade>
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
                data-tooltip-id="modal-tooltip"
                data-tooltip-content="Close modal"
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
                className={`mb-6 ${
                  isDark ? "text-[#cccccc]" : "text-gray-600"
                }`}
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
                data-tooltip-id="modal-tooltip"
                data-tooltip-content="Close modal"
              >
                Got it!
              </button>
              <Tooltip id="modal-tooltip" />
            </div>
          </div>
        </Fade>
      )}
    </div>
  );
};

export default Home;
