const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");

const env = process.env;
const app = express();
const server = http.createServer(app);

const userRoutes = require("./Routes/userRoutes");
const requestRoutes = require("./Routes/requestRoutes");
const chatRoutes = require("./Routes/chatRoutes");

const { Server } = require("socket.io");
const { initializeIO } = require("./socket");
const io = new Server(server);

initializeIO(io);

app.use(express.json());
app.use(cors());
app.use("/api/friend", requestRoutes);
app.use("/api/user", userRoutes);
app.use("/api/messages", chatRoutes);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

mongoose
  .connect("mongodb://localhost:27017")
  .then(() => console.log("Database connected"));

server.listen(env.PORT, () => console.log("Connected to port " + env.PORT));
