const userModel = require("../models/user");

const updateUser = async (req, res) => {
  try {
    const { firstname, lastname, username, email, avatar } = req.body;

    const user = await userModel.findByIdAndUpdate(req.user._id, {
      $set: {
        firstname,
        lastname,
        username,
        email,
        avatar,
      },
    });
    res.json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    res.json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const addFollwoersAndFollowing = async (req, res) => {
  try {
    const following = req.params.id;
    const user = await userModel.findByIdAndUpdate(req.user._id, {
      $push: {
        following,
      },
    });
    if (user) {
      await userModel.findByIdAndUpdate(req.params.id, {
        $push: {
          followers: req.user._id,
        },
      });
    }
    res.json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const removeFollwoersAndFollowing = async (req, res) => {
  try {
    const following = req.params.id;
    const user = await userModel.findByIdAndUpdate(req.user._id, {
      $pull: {
        following,
      },
    });
    if (user) {
      await userModel.findByIdAndUpdate(req.params.id, {
        $pull: {
          followers: req.user._id,
        },
      });
    }
    res.json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getUserSuggesterBySearch = async (req, res) => {
  try {
    const users = await userModel.find({
      name: { $regex: req.query.name, $options: "i" },
    });
    res.json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  updateUser,
  getUserById,
  addFollwoersAndFollowing,
  removeFollwoersAndFollowing,
  getUserSuggesterBySearch,
};
