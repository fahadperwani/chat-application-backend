const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  senderId: { type: String, ref: "User" },
  recieverId: { type: String, ref: "User" },
});

const Request = mongoose.model("Request", requestSchema);
module.exports = Request;
