import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { FaUserEdit } from "react-icons/fa";
import EditableProfileModal from "../components/EditableProfileModal";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const [tipsCount, setTipsCount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchTipStats = async () => {
      try {
        const res = await fetch(
          `https://green-space-server.vercel.app/tips/user/${user?.email}`
        );
        const data = await res.json();
        setTipsCount(data.length || 0);
      } catch (err) {
        console.error("Failed to fetch user tips.");
      }
    };
    if (user?.email) fetchTipStats();
  }, [user]);

  return (
    <div
      className={`min-h-screen py-16 px-4 ${
        isDark ? "bg-[#0c1b0c] text-[#f3f8f3]" : "bg-[#f3f8f3] text-[#122312]"
      }`}
    >
      <div
        className={`max-w-3xl mx-auto p-8 rounded-lg shadow-md ${
          isDark ? "bg-[#1a2733]" : "bg-white"
        }`}
      >
        <div className="flex items-center gap-6 mb-6">
          <div className="avatar">
            <div className="w-24 rounded-full ring ring-success ring-offset-base-100 ring-offset-2">
              <img
                src={user?.photoURL || "https://i.postimg.cc/28QzJQ0y/user.png"}
                alt="User avatar"
              />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-1">
              {user?.displayName || "Anonymous User"}
            </h2>
            <p className="text-sm text-gray-400">{user?.email}</p>
          </div>
        </div>

        <div className="divider">Activity Summary</div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div
            className={`p-4 rounded-lg ${
              isDark ? "bg-[#2d3b4a]" : "bg-gray-100"
            }`}
          >
            <p className="text-lg font-semibold">Tips Shared</p>
            <p className="text-3xl font-bold text-[#579857]">{tipsCount}</p>
          </div>

          <div
            className={`p-4 rounded-lg ${
              isDark ? "bg-[#2d3b4a]" : "bg-gray-100"
            }`}
          >
            <p className="text-lg font-semibold">Account Status</p>
            <p className="text-md font-medium text-[#7db47d]">Active</p>
          </div>
        </div>

        <div className="divider">Settings</div>

        <button
          onClick={() => setShowModal(true)}
          className="btn btn-outline btn-success w-full flex items-center justify-center gap-2"
        >
          <FaUserEdit /> Edit Profile
        </button>
      </div>

      {showModal && (
        <EditableProfileModal user={user} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default Profile;
