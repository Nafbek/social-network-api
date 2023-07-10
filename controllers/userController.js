const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

module.exports = {
  //Get all users
  async getUsers(req, res) {
    try {
      const result = await User.find();
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get a single user
  async getSingleUser(req, res) {
    try {
      const result = await User.findOne({ _id: req.params.userId })
        .populate("thought")
        .populate("user");

      //????????
      if (!result) {
        return res.status(404).json({ message: "No user with that Id" });
      }
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createUser(req, res) {
    try {
      const result = await User.create(req.body);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateUser(req, res) {
    try {
      const result = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!result) {
        return res.status(404).json({ message: "No user with that Id" });
      }
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteUser(req, res) {
    try {
      const result = await User.findOneAndDelete({ _id: req.params.userId });
      await Thought.deleteMany({ user: req.params.userId });
      if (!result) {
        return res.status(404).json({ message: "No user with that Id" });
      }
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
