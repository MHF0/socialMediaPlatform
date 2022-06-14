const express = require("express");
const {
  createNewComment,
  addLike,
  removeLike,
  replyTo,
} = require("../controllers/comment");
const authCheck = require("../middleware/authCheck");

const commentRouter = express.Router();

commentRouter.post("/", authCheck, createNewComment);
commentRouter.post("/:commentId/like", authCheck, addLike);
commentRouter.post("/:commentId/unlike", authCheck, removeLike);
commentRouter.post("/:commentId/reply", authCheck, replyTo);

module.exports = commentRouter;
