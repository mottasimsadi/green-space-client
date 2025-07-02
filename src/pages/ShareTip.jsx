import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../contexts/AuthContext";
import { ThemeContext } from "../contexts/ThemeContext";

const ShareTip = () => {
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";
  
  const [loading, setLoading] = useState(false);


  const [formData, setFormData] = useState({
    title: "",
    plantType: "",
    difficulty: "",
    description: "",
    imageUrl: "",
    category: "",
    availability: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const tipData = {
      ...formData,
      authorName: user?.displayName || "Anonymous",
      authorEmail: user?.email || "unknown@example.com",
      createdAt: new Date().toISOString(),
      totalLiked: 0,
    };

    try {
      const res = await fetch("http://localhost:3000/tips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tipData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Your tip has been shared!");
        setFormData({
          title: "",
          plantType: "",
          difficulty: "",
          description: "",
          imageUrl: "",
          category: "",
          availability: "",
        });
      } else {
        toast.error(data.message || "Failed to submit tip.");
      }
      setLoading(false);
    } catch (error) {
      toast.error("Server error. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen py-16 px-4 ${
        isDark ? "bg-[#0c1b0c] text-[#f3f8f3]" : "bg-[#f3f8f3] text-[#122312]"
      }`}
    >
      <div
        className={`max-w-2xl mx-auto p-8 rounded-lg shadow-md ${
          isDark ? "bg-[#1a2733]" : "bg-white"
        }`}
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-[#579857]">
          Share a Garden Tip
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Tip title */}
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Tip Title"
            required
            className="input input-bordered w-full"
          />
          {/* Plant type */}
          <input
            name="plantType"
            value={formData.plantType}
            onChange={handleChange}
            placeholder="Plant Type (e.g., Rose, Tomato)"
            required
            className="input input-bordered w-full"
          />
          {/* Difficulty select */}
          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            required
            className="select select-bordered w-full"
          >
            <option value="">Select Difficulty</option>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
          {/* Description area */}
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Detailed Tip Description"
            required
            className="textarea textarea-bordered w-full"
          />
          {/* Image url */}
          <input
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="Optional Image URL"
            className="input input-bordered w-full"
          />

          {/* Category select */}
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="select select-bordered w-full"
          >
            <option value="">Select Category</option>
            <option>Composting</option>
            <option>Plant Care</option>
            <option>Vertical Gardening</option>
            <option>Pest Control</option>
            <option>Seasonal Tips</option>
          </select>

          {/* Availability select */}
          <select
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            required
            className="select select-bordered w-full"
          >
            <option value="">Select Availability</option>
            <option>Public</option>
            <option>Hidden</option>
          </select>

          {/* Read-only user name */}
          <input
            name="authorName"
            value={user?.displayName || ""}
            readOnly
            className={`input input-bordered w-full cursor-not-allowed ${
              isDark ? "bg-[#2d3b4a]" : "bg-gray-300"
            }`}
          />
          {/* Read-only user email */}
          <input
            name="authorEmail"
            value={user?.email || ""}
            readOnly
            type="email"
            className={`input input-bordered w-full cursor-not-allowed ${
              isDark ? "bg-[#2d3b4a]" : "bg-gray-300"
            }`}
          />

          <button
            type="submit"
            disabled={loading}
            className="btn btn-success w-full"
          >
            {loading ? "Sharing..." : "Submit Tip"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ShareTip;
