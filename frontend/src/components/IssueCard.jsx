import { useNavigate } from "react-router-dom";

const IssueCard = ({ issue }) => {
  const navigate = useNavigate();

  const priorityColors = {
    low: "text-blue-600 bg-blue-50 border-blue-100",
    medium: "text-amber-600 bg-amber-50 border-amber-100",
    high: "text-rose-600 bg-rose-50 border-rose-100",
  };

  return (
    <div
      onClick={() => navigate(`/issues/${issue._id}`, { state: { teamId: issue.team } })}
      className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all cursor-pointer group"
    >
      <div className="flex justify-between items-start mb-2">
        <span className={`text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full border ${priorityColors[issue.priority] || "text-gray-500 bg-gray-50 border-gray-100"}`}>
          {issue.priority}
        </span>
        <span className="text-gray-400 group-hover:text-indigo-600 transition-colors text-lg">→</span>
      </div>
      
      <h4 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
        {issue.title}
      </h4>
      
      <div className="mt-4 flex items-center justify-between">
        <div className="flex -space-x-2">
           <div className="h-6 w-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-gray-500">
             {issue.createdBy?.name?.[0] || "?"}
           </div>
        </div>
        <span className="text-[10px] text-gray-400 font-medium">
          #{issue._id.slice(-4)}
        </span>
      </div>
    </div>
  );
};

export default IssueCard;