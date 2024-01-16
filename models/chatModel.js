const { default: mongoose } = require("mongoose");

const Schema = require("mongoose").Schema;

const chatSchema = new Schema(
  {
    participants: [{ type: String, ref: "Request" }],
    lastMessage: {
      type: String,
      ref: "ChatMessage",
    },
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
