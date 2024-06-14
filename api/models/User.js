const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, min: 4, unique: true },
  password: { type: String, required: true },
  cover: {type: String}
});

const UserModel = model("User", UserSchema);

module.exports = UserModel;