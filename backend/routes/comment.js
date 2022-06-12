const express = require("express");
const { createNewComment } = require("../controllers/comment");
const authCheck = require("../middleware/authCheck");

const commentRouter = express.Router();

commentRouter.post("/", authCheck, createNewComment);

module.exports = commentRouter;
