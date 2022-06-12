const express = require("express");
const {
  createNewPost,
  getAllPosts,
  getAllPostsByUser,
} = require("../controllers/post");
const authCheck = require("../middleware/authCheck");

const postRouter = express.Router();

postRouter.post("/", authCheck, createNewPost);
postRouter.get("/", authCheck, getAllPosts);
postRouter.get("/profile/:id", authCheck, getAllPostsByUser);

module.exports = postRouter;
