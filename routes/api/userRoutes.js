const router = require("express").Router();

// Import controller functions
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  createFriends,
  deleteFriends,
} = require("../../controllers/userController");

// Set up the routing configuration
router.route("/").get(getUsers).post(createUser);
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);
router
  .route("/:userId/friends/:friendId")
  .post(createFriends)
  .delete(deleteFriends);

module.exports = router;
