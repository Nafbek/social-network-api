const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

module.exports = {
  async getThoughts(req, res) {
    try {
      const result = await Thought.find();
      if (!result) {
        res.status(400).json({ message: "Thought not found" });
      }
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getSingleThought(req, res) {
    try {
      const result = await Thought.findOne({ _id: req.params.thoughtId });

      if (!result) {
        res.status(400).json({ message: "Thought with that Id not found" });
      }
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createThought(req, res) {
    const result = await Thought.create(req.body);
  },

  async updateThought(req, res) {
    try {
      const result = await Thought.findOneAndUpdate(
        { _id: req.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!result) {
        res.status(400).json({ message: "Thought with that Id not found" });
      }
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteThought(req, res) {
    try {
      const result = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });

      if (!result) {
        res.status(400).json({ message: "Thought with that Id not found" });
      }
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
