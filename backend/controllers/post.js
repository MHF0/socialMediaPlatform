const postModel = require("../models/post");

const createNewPost = async (req, res) => {
  try {
    const { caption, image } = req.body;
    const user = req.user.token;
    const newPost = new postModel({
      user,
      caption,
      image,
    });
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await postModel.find({});
    res.json({ posts }).reverse();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllPostsByUser = async (req, res) => {
  try {
    const posts = await postModel.find({ user: req.params.id });
    res.json({ posts }).reverse();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createNewPost,
  getAllPosts,
  getAllPostsByUser,
};
