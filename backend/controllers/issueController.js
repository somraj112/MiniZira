import Issue from "../models/Issue.js";

// Create Issue
export const createIssue = async (req, res) => {
  const issue = await Issue.create({
    ...req.body,
    createdBy: req.user._id,
  });

  res.status(201).json(issue);
};

// Get Issues (by team)
export const getIssues = async (req, res) => {
  const { teamId } = req.query;

  const issues = await Issue.find({ team: teamId })
    .populate("assignedTo", "name email")
    .populate("createdBy", "name");

  res.json(issues);
};

// Update Issue
export const updateIssue = async (req, res) => {
  const issue = await Issue.findById(req.params.id);

  if (!issue) {
    return res.status(404).json({ message: "Issue not found" });
  }

  Object.assign(issue, req.body);

  const updated = await issue.save();

  res.json(updated);
};

// Delete Issue
export const deleteIssue = async (req, res) => {
  await Issue.findByIdAndDelete(req.params.id);
  res.json({ message: "Issue removed" });
};

// Change Status
export const updateStatus = async (req, res) => {
  const issue = await Issue.findById(req.params.id);

  issue.status = req.body.status;

  await issue.save();

  res.json(issue);
};