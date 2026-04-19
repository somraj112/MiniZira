import Team from "../models/Team.js";

// Create Team
export const createTeam = async (req, res) => {
  const { name, description } = req.body;

  // Generate a random 6-8 character alphanumeric invite code
  const inviteCode = Math.random().toString(36).substring(2, 8).toUpperCase();

  const team = await Team.create({
    name,
    description,
    inviteCode,
    owner: req.user._id,
    members: [{ user: req.user._id, role: "admin" }],
  });

  res.status(201).json(team);
};

// Join Team via invite code
export const joinTeam = async (req, res) => {
  const { inviteCode } = req.body;

  if (!inviteCode) {
    return res.status(400).json({ message: "Invite code is required" });
  }

  try {
    const team = await Team.findOne({ inviteCode });

    if (!team) {
      return res.status(404).json({ message: "Invalid invite code or team not found" });
    }

    // Check if user is already a member
    const isMember = team.members.some(
      (member) => member.user.toString() === req.user._id.toString()
    );

    if (isMember) {
      return res.status(400).json({ message: "You are already a member of this team" });
    }

    // Add user to the team
    team.members.push({ user: req.user._id, role: "member" });
    await team.save();

    res.json(team);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
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