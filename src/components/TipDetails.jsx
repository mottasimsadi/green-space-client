import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { FaThumbsUp } from "react-icons/fa";
import Loading from "../pages/Loading";
import { ThemeContext } from "../contexts/ThemeContext";

const TipDetails = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [tip, setTip] = useState(null);
  const [loading, setLoading] = useState(true);
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  useEffect(() => {
    const fetchTip = async () => {
      try {
        const res = await fetch(
          `https://green-space-server.vercel.app/tips/${id}`
        );
        const data = await res.json();
        setTip(data);
      } catch (err) {
        toast.error("Failed to load tip.");
      } finally {
        setLoading(false);
      }
    };

    fetchTip();
  }, [id]);

  const handleLike = async () => {
    if (user?.email === tip.authorEmail) {
      toast.warn("You can't like your own tip!");
      return;
    }

    try {
      const res = await fetch(
        `https://green-space-server.vercel.app/tips/${id}/like`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res.ok) {
        setTip((prev) => ({
          ...prev,
          totalLiked: (prev.totalLiked || 0) + 1,
        }));
        toast.success("Thanks for the like!");
      } else {
        toast.error("Failed to like the tip.");
      }
    } catch (err) {
      toast.error("Server error. Try again.");
    }
  };

  if (loading) return <Loading />;
  if (!tip) return <p className="text-center mt-20 text-lg">Tip not found.</p>;

  return (
    <div
      className={`min-h-screen py-16 px-4 ${
        isDark ? "bg-[#0c1b0c] text-white" : "bg-[#f3f8f3] text-[#122312]"
      }`}
    >
      <div
        className={`max-w-3xl mx-auto p-8 rounded-lg shadow-md ${
          isDark ? "bg-[#1a2733]" : "bg-white"
        }`}
      >
        <img
          src={
            tip.imageUrl ||
            "https://i.postimg.cc/j5L3yDkS/plant-placeholder.png"
          }
          alt={tip.title}
          className="w-full h-64 object-cover rounded mb-6"
        />

        <h2 className="text-3xl font-bold mb-4 text-[#579857]">{tip.title}</h2>

        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <p>
            <strong>Plant Type:</strong> {tip.plantType}
          </p>
          <p>
            <strong>Difficulty:</strong> {tip.difficulty}
          </p>
          <p>
            <strong>Category:</strong> {tip.category}
          </p>
          <p>
            <strong>Availability:</strong> {tip.availability}
          </p>
          <p className="col-span-2">
            <strong>Author:</strong> {tip.authorName} ({tip.authorEmail})
          </p>
        </div>

        <div className="mb-6">
          <strong>Description:</strong>
          <p className="mt-1 whitespace-pre-wrap">{tip.description}</p>
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={handleLike}
            className="btn btn-success flex items-center gap-2"
            disabled={user?.email === tip.authorEmail}
          >
            <FaThumbsUp />
            Like ({tip.totalLiked || 0})
          </button>
          <p className="text-sm text-gray-400">
            Shared on: {new Date(tip.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      {/* Back Button */}
      <div className="mt-10 text-center">
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 cursor-pointer bg-[#579857] hover:bg-[#427c42] text-white rounded font-semibold shadow transition"
        >
          ← Back to Previous Page
        </button>
      </div>
    </div>
  );
};

export default TipDetails;
