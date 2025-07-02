import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router";
import { toast } from "react-toastify";
import { ThemeContext } from "../contexts/ThemeContext";


const BrowseTips = () => {
  const [tips, setTips] = useState([]);
  const [filteredTips, setFilteredTips] = useState([]);
  const [difficulty, setDifficulty] = useState("All");
  const [loading, setLoading] = useState(true);
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";
  

  useEffect(() => {

    const fetchTips = async () => {
      try {
        const res = await fetch("http://localhost:3000/tips?status=Public");
        const data = await res.json();
        setTips(data);
        setFilteredTips(data);
      } catch (error) {
        toast.error("Failed to fetch garden tips.");
      } finally {
        setLoading(false);
      }
    };

    fetchTips();
  }, []);

  useEffect(() => {
    if (difficulty === "All") {
      setFilteredTips(tips);
    } else {
      const filtered = tips.filter(
        (tip) => tip.difficulty?.toLowerCase() === difficulty.toLowerCase()
      );
      setFilteredTips(filtered);
    }
  }, [difficulty, tips]);

  return (
    <div
      className={`min-h-screen px-4 py-16 ${
        isDark ? "bg-[#0c1b0c] text-white" : "bg-[#f3f8f3] text-[#122312]"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center text-[#579857]">
          Browse Public Garden Tips
        </h2>

        {/* Filter Dropdown */}
        <div className="mb-6 flex justify-end">
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="select select-bordered w-48"
          >
            <option value="All">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        {loading ? (
          <p className="text-center text-lg">Loading tips...</p>
        ) : filteredTips.length === 0 ? (
          <p className="text-center text-lg">
            No tips found for this difficulty.
          </p>
        ) : (
          <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200 dark:border-gray-700">
            <table className="table w-full">
              <thead>
                <tr className="bg-[#579857] text-white">
                  <th className="px-4 py-2">Image</th>
                  <th className="px-4 py-2">Title</th>
                  <th className="px-4 py-2">Category</th>
                  <th className="px-4 py-2">Difficulty</th>
                  <th className="px-4 py-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredTips.map((tip) => (
                  <tr
                    key={tip._id}
                    className={
                      isDark
                        ? "bg-[#1a2733] text-white"
                        : "bg-white text-gray-800"
                    }
                  >
                    <td className="p-2">
                      <img
                        src={
                          tip.imageUrl ||
                          "https://i.postimg.cc/j5L3yDkS/plant-placeholder.png"
                        }
                        alt={tip.title}
                        className="h-16 w-24 object-cover rounded"
                      />
                    </td>
                    <td className="p-2 font-medium">{tip.title}</td>
                    <td className="p-2">{tip.category}</td>
                    <td className="p-2">{tip.difficulty}</td>
                    <td className="p-2 text-center">
                      <Link
                        to={`/tip-details/${tip._id}`}
                        className="btn btn-outline btn-sm btn-success"
                      >
                        See More
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseTips;