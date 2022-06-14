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

const addLike = async (req, res) => {
  const { commentId } = req.params;
  const userId = req.user._id;
  try {
    const comment = await commentModel.findByIdAndUpdate(
      { _id: commentId },
      {
        $addToSet: { likes: userId },
      },
      { new: true }
    );
    res.json({ comment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeLike = async (req, res) => {
  const { commentId } = req.params;
  const userId = req.user._id;
  try {
    const comment = await commentModel.findByIdAndUpdate(
      { _id: commentId },
      {
        $pull: { likes: userId },
      },
      { new: true }
    );
    res.json({ comment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const replyTo = async (req, res) => {
  const { commentId } = req.params;
  const { text } = req.body;
  const user = req.user._id;
  try {
    const comment = await commentModel.findByIdAndUpdate(
      { _id: commentId },
      {
        $addToSet: { replies: { text, user } },
      },
      { new: true }
    );
    res.json({ comment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createNewComment, addLike, removeLike, replyTo };
