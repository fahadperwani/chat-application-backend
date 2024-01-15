const User = require("../models/userModel");

const createUser = async (req, res) => {
  try {
    const exists = await User.findOne({ _id: req.body._id });
    if (exists) {
      res.status(200).send({ user: exists });
    } else {
      const user = new User(req.body);
      await user.save();
      console.log(user);
      res.status(200).send({ user });
    }
  } catch (error) {
    console.log(error);
    res.status(401);
  }
};

const getUser = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });
    res.status(200).send({ user });
  } catch (error) {
    res.status(404);
  }
};

module.exports = { createUser, getUser };
