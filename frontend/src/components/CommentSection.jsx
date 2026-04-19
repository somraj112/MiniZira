import { useEffect, useState } from "react";
import API from "../services/api";

const CommentSection = ({ issueId }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchComments = async () => {
    try {
      const res = await API.get(`/comments/${issueId}`);
      setComments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [issueId]);

  const addComment = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    setLoading(true);
    try {
      await API.post(`/comments/${issueId}`, { text });
      setText("");
      fetchComments();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h4 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-4">Comments</h4>

      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {comments.length === 0 ? (
          <p className="text-gray-400 text-center py-4 italic">No comments yet. Start the conversation!</p>
        ) : (
          comments.map((c) => (
            <div key={c._id} className="flex space-x-3 group">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-xs uppercase">
                {c.user?.name?.[0] || "?"}
              </div>
              <div className="flex-grow bg-gray-50 rounded-2xl px-4 py-3 border border-gray-100 group-hover:bg-white group-hover:border-indigo-100 transition-all">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-bold text-gray-900">{c.user?.name}</span>
                  <span className="text-[10px] text-gray-400">{new Date(c.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{c.text}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <form onSubmit={addComment} className="relative mt-8">
        <textarea
          rows="2"
          placeholder="Write a comment..."
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none pr-24"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading || !text.trim()}
          className="absolute right-3 bottom-3 px-4 py-1.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all disabled:opacity-50 shadow-lg shadow-indigo-500/20"
        >
          {loading ? "..." : "Post"}
        </button>
      </form>
    </div>
  );
};

export default CommentSection;