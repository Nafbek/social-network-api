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

  // Get a single user and populate the field with user's thoughts and friends
  async getSingleUser(req, res) {
    try {
      const result = await User.findOne({ _id: req.params.userId })
        .populate("thoughts")
        .populate("friends");

      if (!result) {
        return res.status(404).json({ message: "No user with that Id" });
      }
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a user
  async createUser(req, res) {
    try {
      const result = await User.create(req.body);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Update a user
  async updateUser(req, res) {
    try {
      const result = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!result) {
        return res.status(404).json({ message: "No user found with that Id" });
      }
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete a user
  async deleteUser(req, res) {
    try {
      const result = await User.findOneAndDelete({ _id: req.params.userId });
      await Thought.deleteMany({ user: req.params.userId });
      if (!result) {
        return res.status(404).json({ message: "No user found with that Id" });
      }
      res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //   **`/api/users/:userId/friends/:friendId`**

  // Create a friend for the user
  async createFriends(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId });

      if (!user) {
        res.status(400).json({ message: "User with that Id not found" });
      }
      const friend = await User.findOne({ _id: req.params.friendId });

      if (!friend) {
        res.status(400).json({ message: "No friend found with that Id " });
      }
      user.friends.push(friend._id);

      await user.save();
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Remove a friend from a user's friend list
  async deleteFriends(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId });

      if (!user) {
        res.status(400).json({ message: "No user found with that Id" });
      }
      const friend = await User.findOne({ _id: req.params.friendId });

      if (!friend) {
        res.status(400).json({ message: "No friend found with that Id" });
      }

      user.friends.pull(friend._id);
      await user.save();

      res.status(200).json({ message: "Friend is successfully deleted", user });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
