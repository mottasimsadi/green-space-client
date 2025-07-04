import React, { useContext } from "react";
import { toast } from "react-toastify";
import { ThemeContext } from "../contexts/ThemeContext";

const UpdateTipModal = ({ tip, user, onClose, onSuccess }) => {
  if (!tip) return null;

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedTip = {
      title: form.title.value,
      plantType: form.plantType.value,
      difficulty: form.difficulty.value,
      description: form.description.value,
      imageUrl: form.imageUrl.value,
      category: form.category.value,
      availability: form.availability.value,
    };

    try {
      const res = await fetch(
        `https://green-space-server.vercel.app/tips/${tip._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedTip),
        }
      );

      if (res.ok) {
        toast.success("Tip updated!");
        onSuccess(tip._id, updatedTip);
        onClose();
      } else {
        toast.error("Update failed.");
      }
    } catch {
      toast.error("Server error.");
    }
  };

  const { theme } = useContext(ThemeContext);

  const isDark = theme === "dark";

  return (
    <dialog id="update_modal" className="modal modal-open">
      <div
        className={`modal-box ${
          isDark ? "bg-[#1a2733] text-white" : "bg-white text-[#122312]"
        }`}
      >
        <h3 className="font-bold text-lg mb-4 text-[#579857]">Update Tip</h3>
        <form onSubmit={handleUpdate} className="space-y-3">
          <input
            name="title"
            defaultValue={tip.title}
            className="input input-bordered w-full"
            required
          />
          <input
            name="plantType"
            defaultValue={tip.plantType}
            className="input input-bordered w-full"
            required
          />
          <select
            name="difficulty"
            defaultValue={tip.difficulty}
            className="select select-bordered w-full"
            required
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
          <textarea
            name="description"
            defaultValue={tip.description}
            className="textarea textarea-bordered w-full"
            required
          />
          <input
            name="imageUrl"
            defaultValue={tip.imageUrl}
            className="input input-bordered w-full"
          />
          <select
            name="category"
            defaultValue={tip.category}
            className="select select-bordered w-full"
            required
          >
            <option>Composting</option>
            <option>Plant Care</option>
            <option>Vertical Gardening</option>
            <option>Pest Control</option>
            <option>Seasonal Tips</option>
          </select>
          <select
            name="availability"
            defaultValue={tip.availability}
            className="select select-bordered w-full"
            required
          >
            <option>Public</option>
            <option>Hidden</option>
          </select>
          <input
            value={user?.displayName || ""}
            readOnly
            className={`input input-bordered w-full cursor-not-allowed ${
              isDark ? "bg-gray-500" : "bg-gray-300"
            }`}
          />
          <input
            value={user?.email || ""}
            readOnly
            className={`input input-bordered w-full cursor-not-allowed ${
              isDark ? "bg-gray-500" : "bg-gray-300"
            }`}
          />
          <div className="modal-action">
            <button type="submit" className="btn btn-success">
              Save
            </button>
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default UpdateTipModal;
