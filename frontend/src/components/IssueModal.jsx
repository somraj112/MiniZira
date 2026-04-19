import { useState } from "react";
import API from "../services/api";

const IssueModal = ({ teamId, onClose, refresh }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [loading, setLoading] = useState(false);

  const createIssue = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    setLoading(true);
    try {
      await API.post("/issues", {
        title,
        description,
        priority,
        team: teamId,
        status: "open",
      });
      refresh();
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900">New Issue</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors text-2xl">&times;</button>
      </div>

      <form onSubmit={createIssue} className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Title</label>
          <input
            required
            placeholder="What needs to be fixed?"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Description</label>
          <textarea
            rows="3"
            placeholder="Add some details..."
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Priority</label>
          <div className="grid grid-cols-3 gap-3">
            {["low", "medium", "high"].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPriority(p)}
                className={`py-2 px-4 rounded-lg text-sm font-bold border transition-all ${
                  priority === p
                    ? "bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-500/20"
                    : "bg-white border-gray-200 text-gray-500 hover:border-gray-300"
                }`}
              >
                {p.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-grow py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/25 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Issue"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="py-3 px-6 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default IssueModal;