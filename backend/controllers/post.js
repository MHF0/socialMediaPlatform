const postModel = require("../models/post");
const userModel = require("../models/user");

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
      const userInfo = await userModel.findById({ _id: user });
      return res.status(200).json({
        _id: savedPost._id,
        caption: savedPost.caption,
        createdAt: savedPost.createdAt,
        updatedAt: savedPost.updatedAt,
        likes: savedPost.likes,
        comments: savedPost.comments,
        user: {
          firstname: userInfo.firstname,
          lastname: userInfo.lastname,
          username: userInfo.username,
          avatar: userInfo.avatar,
        },
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await postModel
      .find({})
      .populate("user", "-_id -password -createdAt -updatedAt")
      .populate("comments", "-_id -createdAt -updatedAt")
      .populate({
        path: "comments",
        populate: { path: "user", select: "_id firstname lastname username" },
      })
      .populate({ path: "likes", select: "_id firstname lastname username" })
      .populate({
        path: "comments",
        populate: { path: "likes", select: "_id firstname lastname username" },
      })
      .populate({
        path: "comments",
        populate: { path: "post", select: "caption image createdAt updatedAt" },
      })
      .populate({
        path: "comments",
        populate: {
          path: "post",
          populate: {
            path: "user",
            select: "firstname lastname username avatar",
          },
        },
      });
    res.json({ posts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllPostsByUser = async (req, res) => {
  try {
    const posts = await postModel
      .find({ user: req.params.id })
      .populate("user")
      .populate("comments");
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
        $push: { likes: userId },
      },
      { new: true }
    );
    if (post) {
      const userInfo = await userModel.findById({ _id: userId });

      res.json({
        _id: post._id,
        likes: post.likes,
        caption: post.caption,
        comments: post.comments,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        user: {
          firstname: userInfo.firstname,
          lastname: userInfo.lastname,
          username: userInfo.username,
          avatar: userInfo.avatar,
        },
      });
    }
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
