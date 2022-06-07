const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String },
    like: [{ type: mongoose.schema.Types.ObjectId, ref: "Post" }],
    following: [{ type: mongoose.schema.Types.ObjectId, ref: "User" }],
    followers: [{ type: mongoose.schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
