const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");

const env = process.env;
const app = express();
const server = http.createServer(app);

const userRoutes = require("../Routes/userRoutes");
const requestRoutes = require("../Routes/requestRoutes");
const chatRoutes = require("../Routes/chatRoutes");

const { Server } = require("socket.io");
const { initializeIO } = require("../socket");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

initializeIO(io);
app.use(function (req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*");
  const allowedOrigins = [
    "http://localhost:3000",
    "https://chat-appi.onrender.com",
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
  next();
});
app.use(express.json());
app.use(cors());
app.use("/api/friend", requestRoutes);
app.use("/api/user", userRoutes);
app.use("/api/messages", chatRoutes);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => console.log("Database connected"));

server.listen(env.PORT, () => console.log("Connected to port " + env.PORT));
