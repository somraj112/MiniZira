import Comment from "../models/Comment.js";

// Add comment
export const addComment = async (req, res) => {
  const comment = await Comment.create({
    issue: req.params.issueId,
    user: req.user._id,
    text: req.body.text,
  });

  res.status(201).json(comment);
};

// Get comments
export const getComments = async (req, res) => {
  const comments = await Comment.find({
    issue: req.params.issueId,
  }).populate("user", "name");

  res.json(comments);
};