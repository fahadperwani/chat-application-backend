const { default: mongoose } = require("mongoose");

const Schema = require("mongoose").Schema;

const chatSchema = new Schema(
  {
    participants: [{ type: Schema.Types.ObjectId, ref: "Request" }],
    lastMessage: {
      type: Schema.Types.ObjectId,
      ref: "ChatMessage",
    },
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
