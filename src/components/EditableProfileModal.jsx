import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";

const EditableProfileModal = ({ user, onClose }) => {
  const { updateUser, setUser } = useContext(AuthContext);
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [loading, setLoading] = useState(false);

  const theme = localStorage.getItem("theme") || "light";
  const isDark = theme === "dark";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateUser({ displayName: name, photoURL });
      setUser((prev) => ({ ...prev, displayName: name, photoURL }));
      toast.success("Profile updated successfully!");
      onClose();
    } catch (err) {
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div
        className={`w-full max-w-md rounded-lg shadow-lg relative p-6 ${
          isDark ? "bg-[#1a2733] text-white" : "bg-white text-gray-800"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl text-gray-400 hover:text-red-500"
        >
          <FaTimes />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center text-[#579857]">
          Edit Profile
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-3 py-2 rounded border shadow-sm focus:outline-none focus:ring-2 ${
                isDark
                  ? "bg-[#101c26] text-white border-[#3b4d5e]"
                  : "bg-white border-gray-300"
              }`}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Photo URL</label>
            <input
              type="url"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              className={`w-full px-3 py-2 rounded border shadow-sm focus:outline-none focus:ring-2 ${
                isDark
                  ? "bg-[#101c26] text-white border-[#3b4d5e]"
                  : "bg-white border-gray-300"
              }`}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full btn btn-success"
          >
            {loading ? "Updating..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditableProfileModal;