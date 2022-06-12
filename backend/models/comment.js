const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const commentSchema = mongoose.Schema(
  {
    user: { type: ObjectId, ref: "User" },
    text: { type: String, required: true },
    likes: [{ type: ObjectId, ref: "User" }],
    replies: [{ type: ObjectId, ref: "Comment" }],
    post: { type: ObjectId, ref: "Post" },
    replyTo: { type: ObjectId, ref: "Comment" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
