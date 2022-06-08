const express = require("express");
const {
  updateUser,
  getUserById,
  addFollwoersAndFollowing,
  removeFollwoersAndFollowing,
} = require("../controllers/user");

const authCheck = require("../middleware/authCheck");

const userRouter = express.Router();

userRouter.put("/", authCheck, updateUser);
userRouter.get("/:id", authCheck, getUserById);
userRouter.put("/add/:id", authCheck, addFollwoersAndFollowing);
userRouter.put("/remove/:id", authCheck, removeFollwoersAndFollowing);

module.exports = userRouter;
