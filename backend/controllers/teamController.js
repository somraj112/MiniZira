import Team from "../models/Team.js";

// Create Team
export const createTeam = async (req, res) => {
  const { name, description } = req.body;

  const team = await Team.create({
    name,
    description,
    owner: req.user._id,
    members: [{ user: req.user._id, role: "admin" }],
  });

  res.status(201).json(team);
};

// Get user teams
export const getTeams = async (req, res) => {
  const teams = await Team.find({
    "members.user": req.user._id,
  }).populate("members.user", "name email");

  res.json(teams);
};

// Add member
export const addMember = async (req, res) => {
  const { userId } = req.body;

  const team = await Team.findById(req.params.id);

  team.members.push({ user: userId });

  await team.save();

  res.json(team);
};