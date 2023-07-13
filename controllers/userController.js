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

  // Get a single user    //not working. its error = {"path": "thought"?????????????}
  async getSingleUser(req, res) {
    try {
      const result = await User.findOne({ _id: req.params.userId })
        .populate("thoughts")
        .populate("friends");

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
        return res.status(404).json({ message: "No user found with that Id" });
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
        return res.status(404).json({ message: "No user found with that Id" });
      }
      res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //   **`/api/users/:userId/friends/:friendId`**

  // - `DELETE` to remove a friend from a user's friend list

  async createFriends(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId });

      if (!user) {
        res.status(400).json({ message: "User with that Id not found" });
      }

      const friend = await User.findOne({ _id: req.params.friendId });

      console.log(friend);
      if (!friend) {
        res.status(400).json({ message: "No friend found with that Id " });
      }

      user.friends.push(friend._id);

      await user.save();
      res.status(200).json({ message: "Friend successfully added" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteFriends(req, res) {
    console.log(req.params.friendId);
    try {
      const user = await User.findOne({ _id: req.params.userId });

      if (!user) {
        res.status(400).json({ message: "No user found with that Id" });
      }

      const friend = await User.findOne({ _id: req.params.friendId });

      if (!friend) {
        res.status(400).json({ message: "No friend found with that Id" });
      }

      // const friend = user.friends.find(friend=>friend._id===req.params.friendId)

      // const currentLength = user.friends.length;
      console.log(user.friends);
      user.friends.pull(friend._id);
      await user.save();
      // if (currentLength === user.friends.length) {
      //   return res.status(400).json({ message: "not found" });
      // }

      res.status(200).json({ message: "Friend is successfully deleted" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
