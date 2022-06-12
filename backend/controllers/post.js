const postModel = require("../models/post");

const createNewPost = async (req, res) => {
  try {
    const { caption, image } = req.body;
    const user = req.user._id;
    const newPost = new postModel({
      user,
      caption,
      image,
    });
    const savedPost = await newPost.save();
    if (savedPost) {
      return res.status(200).json(savedPost);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await postModel
      .find({})
      .populate("user", "-_id -password -createdAt -updatedAt");
    res.json({ posts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllPostsByUser = async (req, res) => {
  try {
    const posts = await postModel.find({ user: req.params.id });
    res.json({ posts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createLike = async (req, res) => {
  const { postId } = req.params;
  const userId = req.user._id;
  try {
    const post = await postModel.findByIdAndUpdate(
      { _id: postId },
      {
        $addToSet: { likes: userId },
      },
      { new: true }
    );
    res.json({ post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createDislike = async (req, res) => {
  const { postId } = req.params;
  const userId = req.user._id;

  try {
    const post = await postModel.findByIdAndUpdate(
      { _id: postId },
      {
        $pull: { likes: userId },
      },
      { new: true }
    );
    res.json({ post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createNewPost,
  getAllPosts,
  getAllPostsByUser,
  createLike,
  createDislike,
};
