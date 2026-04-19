import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [showJoin, setShowJoin] = useState(false);
  const [newTeamName, setNewTeamName] = useState("");
  const [joinInviteCode, setJoinInviteCode] = useState("");
  const [joinError, setJoinError] = useState("");
  const navigate = useNavigate();

  const fetchTeams = async () => {
    try {
      const res = await API.get("/teams");
      setTeams(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    if (!newTeamName.trim()) return;
    try {
      await API.post("/teams", { name: newTeamName });
      setNewTeamName("");
      setShowCreate(false);
      fetchTeams();
    } catch (err) {
      console.error(err);
    }
  };

  const handleJoinTeam = async (e) => {
    e.preventDefault();
    setJoinError("");
    if (!joinInviteCode.trim()) return;
    try {
      const res = await API.post("/teams/join", { inviteCode: joinInviteCode });
      setJoinInviteCode("");
      setShowJoin(false);
      navigate(`/team/${res.data._id}`);
    } catch (err) {
      setJoinError(err.response?.data?.message || "Failed to join team");
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Your Teams</h2>
          <p className="text-gray-500 mt-1">Manage your team projects and track progress.</p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => { setShowJoin(true); setShowCreate(false); }}
            className="inline-flex items-center px-4 py-2 bg-white text-indigo-600 border border-indigo-600 rounded-lg font-medium hover:bg-indigo-50 transition-colors shadow-sm"
          >
            Join Team
          </button>
          <button
            onClick={() => { setShowCreate(true); setShowJoin(false); }}
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/20"
          >
            <span className="mr-2 text-xl">+</span> New Team
          </button>
        </div>
      </div>

      {showCreate && (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 animate-in fade-in slide-in-from-top-4 duration-300">
          <form onSubmit={handleCreateTeam} className="flex gap-4">
            <input
              type="text"
              placeholder="Enter team name..."
              className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              value={newTeamName}
              onChange={(e) => setNewTeamName(e.target.value)}
              autoFocus
            />
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700"
            >
              Create
            </button>
            <button
              type="button"
              onClick={() => setShowCreate(false)}
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200"
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {showJoin && (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 animate-in fade-in slide-in-from-top-4 duration-300">
          <form onSubmit={handleJoinTeam} className="flex flex-col gap-2">
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Enter invite code..."
                className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all uppercase"
                value={joinInviteCode}
                onChange={(e) => setJoinInviteCode(e.target.value.toUpperCase())}
                autoFocus
              />
              <button
                type="submit"
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700"
              >
                Join
              </button>
              <button
                type="button"
                onClick={() => { setShowJoin(false); setJoinError(""); }}
                className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200"
              >
                Cancel
              </button>
            </div>
            {joinError && <p className="text-red-500 text-sm mt-1">{joinError}</p>}
          </form>
        </div>
      )}

      {teams.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border-2 border-dashed border-gray-200">
          <div className="h-20 w-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">🚀</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No teams found</h3>
          <p className="text-gray-500 mb-6">Create your first team to start tracking issues.</p>
          <button
            onClick={() => setShowCreate(true)}
            className="text-indigo-600 font-bold hover:text-indigo-700 underline underline-offset-4"
          >
            Create your first team
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((t) => (
            <div
              key={t._id}
              onClick={() => navigate(`/team/${t._id}`)}
              className="group cursor-pointer bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 hover:border-indigo-100 transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="h-12 w-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-4 text-xl font-bold group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                {t.name[0].toUpperCase()}
              </div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                {t.name}
              </h3>
              <p className="text-sm text-gray-500 mt-2 flex items-center">
                <span className="inline-block w-2 h-2 rounded-full bg-green-400 mr-2"></span>
                Active project
              </p>
              <div className="mt-6 flex justify-end">
                <span className="text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity font-medium flex items-center">
                  Open board <span className="ml-1">→</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;