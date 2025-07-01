import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import Loading from "./Loading";
import UpdateTipModal from "../components/UpdateTipModal";

const MyTips = () => {
  const { user } = useContext(AuthContext);
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [theme] = useState(localStorage.getItem("theme") || "light");
  const [selectedTip, setSelectedTip] = useState(null);

  const isDark = theme === "dark";

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    document.documentElement.setAttribute("data-theme", theme);

    const fetchUserTips = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/tips/user/${user?.email}`
        );
        const data = await res.json();
        setTips(data);
        setLoading(false);
      } catch (err) {
        toast.error("Failed to load your tips.");
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchUserTips();
    }
  }, [user, isDark]);

  const handleDelete = async (id) => {
    toast.info(
      <div>
        Are you sure you want to delete this tip?
        <div className="mt-2 flex justify-end gap-2">
          <button
            onClick={async () => {
              try {
                const res = await fetch(`http://localhost:3000/tips/${id}`, {
                  method: "DELETE",
                });

                if (res.ok) {
                  setTips((prev) => prev.filter((tip) => tip._id !== id));
                  toast.dismiss();
                  toast.success("Tip deleted successfully.");
                } else {
                  toast.error("Failed to delete tip.");
                }
              } catch (err) {
                toast.error("Server error.");
              }
            }}
            className="btn btn-sm btn-error"
          >
            Yes, Delete
          </button>
          <button
            onClick={() => toast.dismiss()}
            className="btn btn-sm btn-ghost"
          >
            Cancel
          </button>
        </div>
      </div>,
      { autoClose: false }
    );
  };

  if (loading) return <Loading />;

  return (
    <div
      className={`min-h-screen py-16 px-4 ${
        isDark ? "bg-[#0c1b0c] text-[#f3f8f3]" : "bg-[#f3f8f3] text-[#122312]"
      }`}
    >
      <div
        className={`max-w-6xl mx-auto p-6 rounded-lg shadow-md ${
          isDark ? "bg-[#1a2733]" : "bg-white"
        }`}
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-[#579857]">
          My Garden Tips
        </h2>

        {tips.length === 0 ? (
          <p className="text-center text-gray-500">
            You haven’t shared any tips yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tips.map((tip, index) => (
                  <tr key={tip._id}>
                    <td>{index + 1}</td>
                    <td>{tip.title}</td>
                    <td>{tip.category}</td>
                    <td>
                      <span
                        className={`badge ${
                          tip.availability === "Public"
                            ? "badge-success"
                            : "badge-warning"
                        }`}
                      >
                        {tip.availability}
                      </span>
                    </td>
                    <td className="flex gap-2 flex-wrap">
                      <button
                        onClick={() => setSelectedTip(tip)}
                        className="btn btn-sm btn-info"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(tip._id)}
                        className="btn btn-sm btn-error"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedTip && (
        <UpdateTipModal
          tip={selectedTip}
          user={user}
          onClose={() => setSelectedTip(null)}
          onSuccess={(id, updated) => {
            setTips((prev) =>
              prev.map((tip) => (tip._id === id ? { ...tip, ...updated } : tip))
            );
          }}
        />
      )}
    </div>
  );
};

export default MyTips;