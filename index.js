const express = require("express");
const userRoutes = require("./Routes/userRoutes");
const requestRoutes = require("./Routes/requestRoutes");
require("dotenv").config();
const env = process.env;
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

app.use(express.json());
app.use(cors());
app.use("/api/friend", requestRoutes);
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.send("<div>Connected</div>");
});

mongoose
  .connect("mongodb://localhost:27017")
  .then(() => console.log("Database connected"));

app.listen(env.PORT, () => console.log("Connected to port " + env.PORT));
