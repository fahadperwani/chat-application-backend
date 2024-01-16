const ObjectId = require("mongoose").Types.ObjectId;
const Message = require("../models/MessageModel");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");

const getChats = async (req, res) => {
  const _id = req.params.id;
  try {
    const chats = await Chat.find({ participants: _id });
    const result = await Promise.all(
      chats.map(async (chat) => {
        const other = chat.participants.filter((p) => p != _id)[0];
        const user = await User.findOne({ _id: other });
        let msg = chat.lastMessage;
        if (msg) {
          msg = await Message.findById(new ObjectId(msg));
        }
        return {
          _id: chat._id,
          lastMessage: msg,
          friend: user,
        };
      })
    );
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(401).send({ error });
  }
};

const sendMessage = async (req, res) => {
  try {
    // const {content, sender, chat}
    const message = new Message(req.body);
    await message.save();
    console.log(message);
    const chat = await Chat.findByIdAndUpdate(new ObjectId(req.body.chat), {
      lastMessage: message._id,
    });
    res.status(200).send(message);
  } catch (error) {
    console.log(error);
    res.status(401).send({ error });
  }
};

const getMessages = async (req, res) => {
  const id = req.params.id;
  try {
    const messages = await Message.find({ chat: new ObjectId(id) });
    res.status(200).send(messages);
  } catch (error) {
    res.status(400).send({ error });
  }
};

module.exports = { getChats, sendMessage, getMessages };
