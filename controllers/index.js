const { createUser, deleteUser, getAllUsers, getSingleUser, updateUser, addFriend, removeFriend } = require('./userController');
const { createThought, deleteThought, getAllThoughts, getSingleThought, updateThought, createReaction, removeReaction } = require('./thoughtsController');

module.exports = {
  // User controller functions
     createUser,
     deleteUser,
     getAllUsers,
     getSingleUser,
     updateUser,
     addFriend,
     removeFriend,

  // Thoughts controller functions
     createThought,
     deleteThought,
     getAllThoughts,
     getSingleThought,
     updateThought,
     createReaction,
     removeReaction
};
