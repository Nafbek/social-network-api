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
  // don't forget to push the created thought's `_id` to the associated user's `thoughts` array field

  async createThought(req, res) {
    try {
      const newThought = await Thought.create(req.body);

      const targetUser = await User.findOne({ _id: req.body.userId });

      await targetUser.thoughts.push(newThought._id);
      await targetUser.save();

      res.status(200).json({ newThought, targetUser });
    } catch (err) {
      res.status(500).json(err);
    }
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

  // **`/api/thoughts/:thoughtId/reactions`**

  // * `POST` to create a reaction stored in a single thought's `reactions` array field

  // * `DELETE` to pull and remove a reaction by the reaction's `reactionId` value

  async createReaction(req, res) {
    try {
      const targetThought = await Thought.findOne({
        _id: req.params.thoughtId,
      });

      if (!targetThought) {
        res.status(400).json({ message: "No thought found witht that Id" });
      }
      const reactionResult = await Thought.create(req.body);
      targetThought.reactions.push(reactionResult);

      await targetThought.save();

      res.status(200).json({ message: "Reaction is successfully created" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteReaction(req, res) {
    try {
      const targetThought = await Thought.findOne({
        _id: req.params.thoughtId,
      });
      if (!targetThought) {
        res.status(400).json({ message: "No thought found witht that Id" });
      }

      const targetReaction = await targetThought.reactions.pull({
        _id: reactionId,
      });
      if (!targetReaction) {
        res.status(400).json({ message: "No reaction found witht that Id" });
      }

      await targetThought.save();

      res.status(200).json({ message: "Reaction is successfully deleted" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
