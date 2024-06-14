const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const PostSchema = new Schema({
  username: { type: String, required: true, unique: true },
  caption: { type: String, required: true },
  cover: { type: String, required: true },
  users_liked: [{ type: String, required: true }],
});

const PostModel = model("Post", PostSchema);

module.exports = PostModel;
