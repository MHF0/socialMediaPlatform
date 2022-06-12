const commentModel = require("../models/comment");

const createNewComment = async (req, res) => {
  try {
    const { text, postId } = req.body;
    const user = req.user._id;
    const newComment = new commentModel({
      user,
      text,
      post: postId,
    });
    const savedComment = await newComment.save();
    if (savedComment) {
      return res.status(200).json(savedComment);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createNewComment };
