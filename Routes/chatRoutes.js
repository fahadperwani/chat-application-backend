const router = require("express").Router();
const {
  getChats,
  sendMessage,
  getMessages,
} = require("../controllers/chatController");

router.get("/chats", (req, res) => res.send("<div>Ok</div>"));
router.get("/chats/:id", getChats);

router.get("/chat/:id", getMessages);

router.post("/send", sendMessage);

module.exports = router;
