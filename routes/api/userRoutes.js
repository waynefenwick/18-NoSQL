const router = require('express').Router();
const {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend
} = require('../../controllers');

// /api/users
router.route('/')
  .get(getAllUsers)
  .post(createUser);

// /api/users/:id
router.route('/:id')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
  .post(addFriend) // POST to add a new friend to a user's friend list
  .delete(removeFriend); // DELETE to remove a friend from a user's friend list

module.exports = router;


