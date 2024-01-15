const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  dp: { type: String, required: true },
  email: { type: String, required: true },
  friends: { type: Array, default: [] },
  requestsSent: { type: Array, default: [] },
});

User = mongoose.model("User", userSchema);
module.exports = User;
