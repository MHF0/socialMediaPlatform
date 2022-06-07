const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const postSchema = mongoose.Schema(
  {
    user: { type: ObjectId, ref: "User" },
    caption: { type: String, required: true },
    likes: [{ type: ObjectId, ref: "User" }],
    comments: [{ type: ObjectId, ref: "Comment" }],
    image: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
