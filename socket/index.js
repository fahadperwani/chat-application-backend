const User = require("../models/userModel");

const sendRequest = (io, socket) => {
  socket.on("send-message", (message) => {
    console.log("Message: " + message.reciever);
    console.log("Socket Id: " + socket.id);
    console.log(socket.id === message.reciever);
    io.to(socket.id).emit("message-from-server", message);
  });
};

const initializeIO = (io) => {
  io.on("connection", (socket) => {
    const id = socket.handshake.query["id"];

    socket.join(id);

    socket.on("send-message", (message) => {
      io.to(message.reciever).emit("message-from-server", message);
      io.to(socket.id).emit("update-last-message", message);
    });

    socket.on("friend-request-sent", async (response) => {
      console.log(JSON.stringify(response));
      const user = await User.findOne({ _id: response.senderId });
      io.to(response.recieverId).emit("friend-request-from-server", user);
    });

    socket.on("request-accepted", (response) => {
      io.to(response.reciever._id).emit("request-accepted-from-server", {
        _id: response.chat._id,
        friend: response.sender,
      });
      io.to(response.sender._id).emit("request-accepted-from-server", {
        _id: response.chat._id,
        friend: response.reciever,
      });
    });

    socket.on("disconnect", () => {
      socket.leave(socket.id);
    });

    socket.on("typing", ({ id, chatId }) => {
      io.to(id).emit("typing-started-from-server", chatId);
      io.to(id).emit("typing-started-from-server/" + chatId);
    });

    socket.on("typing-stopped", ({ id, chatId }) => {
      io.to(id).emit("typing-stopped-from-server", chatId);
      io.to(id).emit("typing-stopped-from-server/" + chatId);
    });
  });
};

module.exports = { initializeIO };
