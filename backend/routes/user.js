const express = require("express");
const {
  updateUser,
  getUserById,
  addFollwoersAndFollowing,
  removeFollwoersAndFollowing,
  getUserSuggesterBySearch,
} = require("../controllers/user");

const authCheck = require("../middleware/authCheck");

const userRouter = express.Router();

userRouter.put("/", authCheck, updateUser);
userRouter.get("/getUser/:id", authCheck, getUserById);
userRouter.put("/add/:id", authCheck, addFollwoersAndFollowing);
userRouter.put("/remove/:id", authCheck, removeFollwoersAndFollowing);
userRouter.get("/suggester", authCheck, getUserSuggesterBySearch);

module.exports = userRouter;
