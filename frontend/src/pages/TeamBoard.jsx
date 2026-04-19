import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import IssueCard from "../components/IssueCard";
import IssueModal from "../components/IssueModal";

const TeamBoard = () => {
  const { id } = useParams();
  const [issues, setIssues] = useState([]);
  const [team, setTeam] = useState(null);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchTeamData = async () => {
    try {
      // Find the team name from the list
      const resTeams = await API.get("/teams");
      const currentTeam = resTeams.data.find(t => t._id === id);
      setTeam(currentTeam);
      
      const resIssues = await API.get(`/issues?teamId=${id}`);
      setIssues(resIssues.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamData();
  }, [id]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
  );

  const columns = [
    { title: "Open", status: "open", color: "bg-blue-500" },
    { title: "In Progress", status: "in_progress", color: "bg-amber-500" },
    { title: "Resolved", status: "resolved", color: "bg-emerald-500" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">{team?.name || "Team Board"}</h2>
          <p className="text-gray-500">Manage and track issues for this team.</p>
          {team?.inviteCode && (
            <div className="mt-3 flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-md border border-gray-200">
                Invite Code: <span className="font-bold tracking-wider text-indigo-600 ml-1">{team.inviteCode}</span>
              </span>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(team.inviteCode);
                  alert("Invite code copied to clipboard!");
                }}
                className="text-xs px-3 py-1 bg-white border border-gray-300 rounded-md hover:bg-gray-50 text-gray-700 transition-colors shadow-sm"
                title="Copy Invite Code"
              >
                Copy
              </button>
            </div>
          )}
        </div>
        <button
          onClick={() => setShow(true)}
          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/20"
        >
          <span className="mr-2">+</span> Add Issue
        </button>
      </div>

      {show && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-gray-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-300">
            <IssueModal
              teamId={id}
              onClose={() => setShow(false)}
              refresh={fetchTeamData}
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((col) => (
          <div key={col.status} className="bg-gray-100/50 rounded-2xl p-4 min-h-[500px] border border-gray-200">
            <div className="flex items-center justify-between mb-4 px-2">
              <div className="flex items-center">
                <span className={`w-3 h-3 rounded-full ${col.color} mr-2`}></span>
                <h3 className="font-bold text-gray-700 uppercase text-sm tracking-wider">{col.title}</h3>
              </div>
              <span className="bg-gray-200 text-gray-600 text-xs font-bold px-2 py-1 rounded-full">
                {issues.filter(i => i.status === col.status).length}
              </span>
            </div>
            
            <div className="space-y-4">
              {issues
                .filter((i) => i.status === col.status)
                .map((i) => (
                  <IssueCard key={i._id} issue={i} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamBoard;