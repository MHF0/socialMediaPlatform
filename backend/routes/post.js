const express = require("express");
const {
  createNewPost,
  getAllPosts,
  getAllPostsByUser,
  createLike,
  createDislike,
} = require("../controllers/post");
const authCheck = require("../middleware/authCheck");

const postRouter = express.Router();

postRouter.post("/", authCheck, createNewPost);
postRouter.get("/", authCheck, getAllPosts);
postRouter.get("/profile/:id", authCheck, getAllPostsByUser);
postRouter.post("/like/:postId", authCheck, createLike);
postRouter.post("/dislike/:postId", authCheck, createDislike);

module.exports = postRouter;
