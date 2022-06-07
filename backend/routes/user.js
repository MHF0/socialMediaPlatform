const express = require("express");
const {
  updateUser,
  getUserById,
  addFollwoersAndFollowing,
} = require("../controllers/user");

const authCheck = require("../middleware/authCheck");

const userRouter = express.Router();

userRouter.put("/", authCheck, updateUser);
userRouter.get("/:id", authCheck, getUserById);
userRouter.put("/add/:id", authCheck, addFollwoersAndFollowing);

module.exports = userRouter;
