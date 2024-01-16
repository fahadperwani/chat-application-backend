const joinChat = (socket) => {
  socket.on("join-chat", (chatId) => {
    socket.join(chatId);
  });
};

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

    socket.on("disconnect", () => {
      console.log("Disconnected, id: " + socket.id);
    });
  });
};

module.exports = { initializeIO };
