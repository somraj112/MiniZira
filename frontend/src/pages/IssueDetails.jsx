import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import API from "../services/api";
import CommentSection from "../components/CommentSection";

const IssueDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchIssue = async () => {
    try {
      const teamId = location.state?.teamId;
      if (!teamId) {
        console.warn("No teamId in state, cannot fetch issue details reliably");
        setLoading(false);
        return;
      }
      
      const res = await API.get(`/issues?teamId=${teamId}`);
      const foundIssue = res.data.find(i => i._id === id);
      setIssue(foundIssue);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIssue();
  }, [id]);

  const updateStatus = async (status) => {
    try {
      await API.patch(`/issues/${id}/status`, { status });
      fetchIssue();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
  );

  if (!issue) return (
    <div className="text-center py-12">
      <h3 className="text-xl font-bold text-gray-900">Issue not found</h3>
      <button onClick={() => navigate("/")} className="mt-4 text-indigo-600 hover:underline">Go back home</button>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center space-x-2 text-sm text-gray-400">
        <button onClick={() => navigate(-1)} className="hover:text-indigo-600 transition-colors">Back</button>
        <span>/</span>
        <span>Issue #{issue._id.slice(-6)}</span>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">{issue.title}</h2>
          <div className="flex space-x-2">
            {["open", "in_progress", "resolved"].map((s) => (
              <button
                key={s}
                onClick={() => updateStatus(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                  issue.status === s
                    ? "bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-500/20"
                    : "bg-white border-gray-200 text-gray-500 hover:border-gray-300"
                }`}
              >
                {s.replace("_", " ").toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 border-y border-gray-100 py-6">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Created By</p>
            <div className="flex items-center space-x-2">
               <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                 {issue.createdBy?.name?.[0]}
               </div>
               <span className="font-medium text-gray-700">{issue.createdBy?.name}</span>
            </div>
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Priority</p>
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${
              issue.priority === "high" ? "bg-rose-50 border-rose-100 text-rose-600" :
              issue.priority === "medium" ? "bg-amber-50 border-amber-100 text-amber-600" :
              "bg-blue-50 border-blue-100 text-blue-600"
            }`}>
              {issue.priority}
            </span>
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Status</p>
            <span className="text-gray-700 font-medium capitalize">{issue.status.replace("_", " ")}</span>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-bold text-gray-900 mb-4">Description</h4>
          <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
            {issue.description || "No description provided."}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
        <CommentSection issueId={issue._id} />
      </div>
    </div>
  );
};

export default IssueDetails;