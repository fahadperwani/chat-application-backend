const { mongoose } = require("mongoose");
const Request = require("../models/requestModel");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");

const createRequest = async (req, res) => {
  try {
    const { senderId, recieverId } = req.body;
    console.log("Body: " + req.body);
    console.log("Id's: " + senderId + recieverId);
    const exist = await Request.findOne(req.body);
    console.log("Exist: " + exist);
    if (exist) res.status(200).send({ ...exist, exist: true });
    else {
      const request = new Request(req.body);
      console.log("Request: " + request);
      await request.save();
      await User.findOneAndUpdate(
        { _id: req.body.senderId },
        { $push: { requestsSent: recieverId } }
      );
      res.status(200).send({ data: request });
    }
  } catch (error) {
    console.log("Error: " + error);
    res.status(401);
  }
};

const getRequest = async (req, res) => {
  const _id = req.params.id;
  try {
    const request = await Request.findOne({ senderId: _id });
    res.status(200).send({ data: request });
  } catch (error) {
    res.status(401);
  }
};

const getRequests = async (req, res) => {
  const _id = req.params.id;
  try {
    let requests = await Request.find({ recieverId: _id });
    requests = await Promise.all(
      requests.map(async (request) => {
        return await User.findOne({ _id: request.senderId });
      })
    );
    res.status(200).send({ requests });
  } catch (error) {
    console.log(error.message);
    res.status(401).send({ error });
  }
};

const acceptRequest = async (req, res) => {
  console.log("Acceptttt");
  try {
    const request = await Request.findOneAndDelete(req.body);
    const chat = new Chat({
      participants: [request.senderId, request.recieverId],
    });
    await chat.save();
    await User.findOneAndUpdate(
      { _id: request.senderId },
      {
        $push: { friends: request.recieverId },
        $pull: { requestsSent: request.recieverId },
      }
    );
    await User.findOneAndUpdate(
      { _id: request.recieverId },
      {
        $push: { friends: request.senderId },
      }
    );

    res.status(200).send({ res: "OK" });
  } catch (error) {
    console.log(error);
    res.status(401).send({ error });
  }
};

module.exports = { createRequest, getRequest, getRequests, acceptRequest };
