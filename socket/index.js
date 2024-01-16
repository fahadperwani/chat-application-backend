const initializeIO = (io) => {
  io.on("connection", (socket) => {
    console.log("connected....");
  });
};

module.exports = { initializeIO };
