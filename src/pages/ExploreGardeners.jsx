import React, { useState, useEffect, useContext } from "react";
import { FaTimes, FaSearch } from "react-icons/fa";
import gardenersData from "../data/gardeners.json";
import Loading from "./Loading";
import { ThemeContext } from "../contexts/ThemeContext";
import ImageOptimizer from "../components/ImageOptimizer";

const ExploreGardeners = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const [gardeners, setGardeners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalData, setModalData] = useState(null);
  const [filter, setFilter] = useState("all");
  const [sortKey, setSortKey] = useState("name");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setGardeners(gardenersData);
    setLoading(false);
  }, []);

  const openModal = (gardener) => setModalData(gardener);
  const closeModal = () => setModalData(null);

  const filteredGardeners = gardeners
    .filter((g) => {
      const matchesSearch =
        searchTerm === "" ||
        g.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        g.specialty.toLowerCase().includes(searchTerm.toLowerCase());

      if (filter === "active") return matchesSearch && g.status === "active";
      if (filter === "inactive")
        return matchesSearch && g.status === "inactive";
      return matchesSearch;
    })
    .sort((a, b) => {
      const valA = a[sortKey]?.toLowerCase() || "";
      const valB = b[sortKey]?.toLowerCase() || "";
      return valA.localeCompare(valB);
    });

  const badgeClass = (status) =>
    status === "active" ? "badge badge-success" : "badge badge-warning";

  const gardenerDetailsMap = {
    1: {
      experience: "10+ years",
      location: "New York, NY",
      favoritePlant: "Fern",
      availability: "Weekends only",
    },
    2: {
      experience: "7 years",
      location: "San Francisco, CA",
      favoritePlant: "Heirloom Tomatoes",
      availability: "Weekdays (9am–3pm)",
    },
    3: {
      experience: "6 years",
      location: "Miami, FL",
      favoritePlant: "Bird of Paradise",
      availability: "Evenings & weekends",
    },
    4: {
      experience: "12 years",
      location: "Seattle, WA",
      favoritePlant: "Lupine",
      availability: "Mon–Thu only",
    },
    5: {
      experience: "8 years",
      location: "Austin, TX",
      favoritePlant: "Basil",
      availability: "Every day (10am–6pm)",
    },
    6: {
      experience: "15+ years",
      location: "Los Angeles, CA",
      favoritePlant: "Japanese Maple Bonsai",
      availability: "Weekends & holidays",
    },
    7: {
      experience: "9 years",
      location: "Portland, OR",
      favoritePlant: "Comfrey",
      availability: "Tue & Fri only",
    },
    8: {
      experience: "11 years",
      location: "Honolulu, HI",
      favoritePlant: "Cattleya Orchid",
      availability: "Flexible schedule",
    },
    9: {
      experience: "5 years",
      location: "Chicago, IL",
      favoritePlant: "Lettuce (Hydro)",
      availability: "Remote only",
    },
    10: {
      experience: "6 years",
      location: "Phoenix, AZ",
      favoritePlant: "Aloe Vera",
      availability: "Early mornings",
    },
  };

  return (
    <div className={`min-h-screen ${isDark ? "bg-[#0c1b0c]" : "bg-[#f3f8f3]"}`}>
      <section className="py-16 px-4 container mx-auto">
        <h2
          className={`text-3xl font-bold text-center mb-6 ${
            isDark ? "text-[#f3f8f3]" : "text-[#122312]"
          }`}
        >
          Explore All Gardeners
        </h2>

        {/* Controls Layout */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          {/* Filters - Left */}
          <div className="flex space-x-2 w-full md:w-auto">
            <button
              onClick={() => setFilter("all")}
              className={`btn btn-sm ${filter === "all" ? "btn-active" : ""}`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("active")}
              className={`btn btn-sm btn-success ${
                filter === "active" ? "btn-active" : ""
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setFilter("inactive")}
              className={`btn btn-sm btn-warning ${
                filter === "inactive" ? "btn-active" : ""
              }`}
            >
              Inactive
            </button>
          </div>

          {/* Search - Middle */}
          <div className="relative w-full md:w-1/3">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
              <FaSearch
                className={`${
                  isDark ? "text-gray-400" : "text-gray-500"
                } text-lg`}
              />
            </div>
            <input
              type="text"
              placeholder="Search gardeners..."
              className={`input input-bordered w-full pl-12 ${
                isDark
                  ? "bg-[#1a2733] border-gray-700 focus:border-[#579857]"
                  : "bg-white border-gray-300 focus:border-[#579857]"
              }`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Sort - Right */}
          <div>
            <label
              className={`mr-2 text-sm ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Sort by:
            </label>
            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value)}
              className={`select select-sm ${
                isDark
                  ? "bg-[#1a2733] border-gray-700"
                  : "bg-white border-gray-300"
              }`}
            >
              <option value="name">Name</option>
              <option value="specialty">Specialty</option>
            </select>
          </div>
        </div>

        {/* Search Results Count */}
        {searchTerm && (
          <div
            className={`mb-4 text-sm ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Found {filteredGardeners.length} gardener(s) matching "{searchTerm}"
          </div>
        )}

        {loading ? (
          <Loading />
        ) : filteredGardeners.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">🌱</div>
            <h3
              className={`text-xl font-medium mb-2 ${
                isDark ? "text-gray-300" : "text-gray-800"
              }`}
            >
              No gardeners found
            </h3>
            <p className={`mb-4 ${isDark ? "text-gray-500" : "text-gray-600"}`}>
              Try adjusting your search or filters
            </p>
            <button
              onClick={() => {
                setFilter("all");
                setSearchTerm("");
              }}
              className="btn bg-[#579857] hover:bg-[#427c42] text-white"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGardeners.map((g) => (
              <div
                key={g.id}
                className={`p-6 rounded-lg shadow-md hover:scale-[1.02] transition-transform ${
                  isDark ? "bg-[#1a2733]" : "bg-white"
                }`}
              >
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <ImageOptimizer
                      src={g.imageUrl}
                      alt={g.name}
                      width="64px"
                      height="64px"
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
                  {g.bio.length > 120 ? g.bio.slice(0, 120) + "..." : g.bio}
                </p>
                <div className="flex justify-between items-center">
                  <span
                    className={`${badgeClass(
                      g.status
                    )} text-xs px-2 py-1 rounded-full text-white capitalize`}
                  >
                    {g.status}
                  </span>
                  <button
                    onClick={() => openModal(g)}
                    className="text-sm bg-[#579857] hover:bg-[#427c42] text-white px-4 py-1.5 rounded transition"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {modalData && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <div
              className={`relative max-w-3xl w-full rounded-xl shadow-xl overflow-hidden ${
                isDark ? "bg-[#1a2733]" : "bg-white"
              }`}
            >
              <button
                onClick={closeModal}
                className={`absolute top-3 right-3 p-1 rounded-full z-10 ${
                  isDark ? "hover:bg-[#2d3b4a]" : "hover:bg-gray-200"
                }`}
                aria-label="Close modal"
              >
                <FaTimes
                  className={`w-4 h-4 ${
                    isDark ? "text-[#cccccc]" : "text-gray-700"
                  }`}
                />
              </button>

              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 w-full h-64 md:h-auto">
                  <img
                    src={modalData.imageUrl}
                    alt={modalData.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="md:w-1/2 w-full p-6 overflow-y-auto max-h-[90vh]">
                  <h3
                    className={`text-2xl font-bold mb-1 ${
                      isDark ? "text-[#f3f8f3]" : "text-gray-800"
                    }`}
                  >
                    {modalData.name}
                  </h3>
                  <p
                    className={`text-sm mb-3 italic ${
                      isDark ? "text-[#7db47d]" : "text-[#579857]"
                    }`}
                  >
                    {modalData.specialty}
                  </p>
                  <p
                    className={`mb-4 text-sm leading-relaxed ${
                      isDark ? "text-[#cccccc]" : "text-gray-600"
                    }`}
                  >
                    {modalData.bio}
                  </p>

                  {(() => {
                    const d = gardenerDetailsMap[modalData.id];
                    return (
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div
                          className={`p-3 rounded ${
                            isDark ? "bg-[#274227]" : "bg-[#e7f1e7]"
                          }`}
                        >
                          <p className="text-xs font-medium">Experience</p>
                          <p className="text-sm font-semibold">
                            {d.experience}
                          </p>
                        </div>
                        <div
                          className={`p-3 rounded ${
                            isDark ? "bg-[#573d34]" : "bg-[#f0e9e4]"
                          }`}
                        >
                          <p className="text-xs font-medium">Favorite Plant</p>
                          <p className="text-sm font-semibold">
                            {d.favoritePlant}
                          </p>
                        </div>
                        <div
                          className={`p-3 rounded ${
                            isDark ? "bg-[#1a3a4a]" : "bg-[#e0f0f7]"
                          }`}
                        >
                          <p className="text-xs font-medium">Location</p>
                          <p className="text-sm font-semibold">{d.location}</p>
                        </div>
                        <div
                          className={`p-3 rounded ${
                            isDark ? "bg-[#805040]" : "bg-orange-100"
                          }`}
                        >
                          <p className="text-xs font-medium">Availability</p>
                          <p className="text-sm font-semibold">
                            {d.availability}
                          </p>
                        </div>
                      </div>
                    );
                  })()}

                  <div
                    className={`p-3 rounded mb-4 text-sm text-center ${
                      isDark
                        ? "bg-[#805040]/30 text-[#f9d5bb]"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    More features like messaging and booking coming soon!
                  </div>

                  <button
                    onClick={closeModal}
                    className="w-full py-2 px-4 rounded-lg font-semibold bg-[#579857] hover:bg-[#427c42] text-white transition"
                  >
                    Got it!
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default ExploreGardeners;
