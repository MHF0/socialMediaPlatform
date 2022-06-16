const commentModel = require("../models/comment");
const postModel = require("../models/post");

const createNewComment = async (req, res) => {
  try {
    const { text, postId } = req.body;
    const user = req.user._id;
    const newComment = new commentModel({
      user,
      text,
      post: postId,
    });
    console.log(postId);
    const savedComment = await newComment.save();
    if (savedComment) {
      const post = await postModel.findByIdAndUpdate(
        { _id: postId },
        {
          $push: { comments: savedComment._id },
        },
        { new: true }
      );
      res.json({ post });
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

const replies = async (req, res) => {
  const { commentId } = req.params;
  try {
    const comment = await commentModel
      .findById(commentId)
      .populate("replies")
      .populate({ path: "replies.user", select: "name avatar" });
    res.json({ comment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createNewComment, addLike, removeLike, replyTo, replies };
